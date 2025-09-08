import { RequestHandler } from "express";
import { 
  SafetyZone, 
  CreateSafetyZoneRequest, 
  ApiResponse, 
  GeoLocation 
} from "@shared/api";
import { generateId, isPointInPolygon, calculateDistance } from "../utils/helpers";
import { safetyZonesStore } from "../data/store";

// Create a new safety zone
export const createSafetyZone: RequestHandler = async (req, res) => {
  try {
    const request: CreateSafetyZoneRequest = req.body;
    
    if (!request.name || !request.coordinates || request.coordinates.length < 3) {
      return res.status(400).json({
        success: false,
        error: "Name and at least 3 coordinates are required"
      } as ApiResponse);
    }

    const safetyZone: SafetyZone = {
      id: generateId(),
      name: request.name,
      coordinates: request.coordinates,
      type: request.type,
      riskLevel: request.riskLevel,
      description: request.description,
      alertMessage: request.alertMessage,
      isActive: true,
      createdBy: "admin", // TODO: Get from authenticated user
      createdAt: new Date().toISOString()
    };

    safetyZonesStore.set(safetyZone.id, safetyZone);

    const response: ApiResponse<SafetyZone> = {
      success: true,
      data: safetyZone,
      message: "Safety zone created successfully"
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Get all safety zones
export const getAllSafetyZones: RequestHandler = (req, res) => {
  try {
    const type = req.query.type as string;
    const isActive = req.query.isActive as string;

    let zones = Array.from(safetyZonesStore.values());

    if (type) {
      zones = zones.filter(zone => zone.type === type);
    }

    if (isActive !== undefined) {
      zones = zones.filter(zone => zone.isActive === (isActive === 'true'));
    }

    const response: ApiResponse<SafetyZone[]> = {
      success: true,
      data: zones
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Get safety zone by ID
export const getSafetyZone: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const zone = safetyZonesStore.get(id);

    if (!zone) {
      return res.status(404).json({
        success: false,
        error: "Safety zone not found"
      } as ApiResponse);
    }

    const response: ApiResponse<SafetyZone> = {
      success: true,
      data: zone
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Update safety zone
export const updateSafetyZone: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const existingZone = safetyZonesStore.get(id);

    if (!existingZone) {
      return res.status(404).json({
        success: false,
        error: "Safety zone not found"
      } as ApiResponse);
    }

    const updatedZone: SafetyZone = {
      ...existingZone,
      ...req.body,
      id // Prevent ID modification
    };

    safetyZonesStore.set(id, updatedZone);

    const response: ApiResponse<SafetyZone> = {
      success: true,
      data: updatedZone,
      message: "Safety zone updated successfully"
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Check if location is in any safety zone
export const checkLocationInZones: RequestHandler = (req, res) => {
  try {
    const { latitude, longitude } = req.body as { latitude: number; longitude: number };

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        error: "Latitude and longitude are required"
      } as ApiResponse);
    }

    const location: GeoLocation = { latitude, longitude };
    const matchingZones: SafetyZone[] = [];

    for (const zone of safetyZonesStore.values()) {
      if (zone.isActive && isPointInPolygon(location, zone.coordinates)) {
        matchingZones.push(zone);
      }
    }

    const response: ApiResponse<{
      location: GeoLocation;
      zones: SafetyZone[];
      hasAlerts: boolean;
      highestRiskLevel: string;
    }> = {
      success: true,
      data: {
        location,
        zones: matchingZones,
        hasAlerts: matchingZones.length > 0,
        highestRiskLevel: matchingZones.length > 0 
          ? matchingZones.reduce((max, zone) => {
              const levels = { low: 1, medium: 2, high: 3, critical: 4 };
              return levels[zone.riskLevel] > levels[max] ? zone.riskLevel : max;
            }, 'low')
          : 'none'
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Get nearby safety zones
export const getNearbySafetyZones: RequestHandler = (req, res) => {
  try {
    const { latitude, longitude, radius = 5000 } = req.query as { 
      latitude: string; 
      longitude: string; 
      radius?: string; 
    };

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        error: "Latitude and longitude are required"
      } as ApiResponse);
    }

    const location: GeoLocation = { 
      latitude: parseFloat(latitude), 
      longitude: parseFloat(longitude) 
    };
    const searchRadius = parseInt(radius.toString());

    const nearbyZones = Array.from(safetyZonesStore.values())
      .filter(zone => zone.isActive)
      .map(zone => {
        // Calculate distance to zone center (approximate)
        const zoneCenter = {
          latitude: zone.coordinates.reduce((sum, coord) => sum + coord.latitude, 0) / zone.coordinates.length,
          longitude: zone.coordinates.reduce((sum, coord) => sum + coord.longitude, 0) / zone.coordinates.length
        };
        const distance = calculateDistance(location, zoneCenter);
        return { zone, distance };
      })
      .filter(({ distance }) => distance <= searchRadius)
      .sort((a, b) => a.distance - b.distance)
      .map(({ zone, distance }) => ({ ...zone, distance }));

    const response: ApiResponse<(SafetyZone & { distance: number })[]> = {
      success: true,
      data: nearbyZones
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Delete safety zone
export const deleteSafetyZone: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    
    if (!safetyZonesStore.has(id)) {
      return res.status(404).json({
        success: false,
        error: "Safety zone not found"
      } as ApiResponse);
    }

    safetyZonesStore.delete(id);

    const response: ApiResponse = {
      success: true,
      message: "Safety zone deleted successfully"
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};