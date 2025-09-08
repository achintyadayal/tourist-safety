import { RequestHandler } from "express";
import { 
  LocationUpdate, 
  UpdateLocationRequest, 
  ApiResponse, 
  MovementPattern,
  GeoLocation 
} from "@shared/api";
import { calculateDistance, calculateSpeed, detectMovementAnomalies } from "../utils/helpers";
import { addLocationUpdate, getLocationHistory, getLastKnownLocation } from "../data/store";
import { touristIdStore, safetyZonesStore } from "../data/store";

// Update tourist location
export const updateLocation: RequestHandler = async (req, res) => {
  try {
    const request: UpdateLocationRequest = req.body;
    
    if (!request.touristId || !request.location) {
      return res.status(400).json({
        success: false,
        error: "Tourist ID and location are required"
      } as ApiResponse);
    }

    // Verify tourist exists
    const tourist = touristIdStore.get(request.touristId);
    if (!tourist) {
      return res.status(404).json({
        success: false,
        error: "Tourist not found"
      } as ApiResponse);
    }

    const locationUpdate: LocationUpdate = {
      touristId: request.touristId,
      location: {
        ...request.location,
        timestamp: new Date().toISOString()
      },
      batteryLevel: request.batteryLevel,
      isManual: false
    };

    // Calculate speed if previous location exists
    const lastLocation = getLastKnownLocation(request.touristId);
    if (lastLocation) {
      locationUpdate.speed = calculateSpeed(lastLocation.location, locationUpdate.location);
    }

    // Add to location history
    addLocationUpdate(request.touristId, locationUpdate);

    // Check if location is in any safety zones
    const activeZones = Array.from(safetyZonesStore.values()).filter(zone => zone.isActive);
    const matchingZones = activeZones.filter(zone => 
      isPointInPolygon(request.location, zone.coordinates)
    );

    const response: ApiResponse<{
      locationUpdate: LocationUpdate;
      safetyZones: typeof matchingZones;
      alerts: string[];
    }> = {
      success: true,
      data: {
        locationUpdate,
        safetyZones: matchingZones,
        alerts: matchingZones
          .filter(zone => zone.type === 'restricted' || zone.riskLevel === 'high' || zone.riskLevel === 'critical')
          .map(zone => zone.alertMessage)
      },
      message: "Location updated successfully"
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Get location history for a tourist
export const getLocationHistory: RequestHandler = (req, res) => {
  try {
    const { touristId } = req.params;
    const limit = parseInt(req.query.limit as string) || 100;

    if (!touristIdStore.has(touristId)) {
      return res.status(404).json({
        success: false,
        error: "Tourist not found"
      } as ApiResponse);
    }

    const history = getLocationHistory(touristId, limit);

    const response: ApiResponse<LocationUpdate[]> = {
      success: true,
      data: history
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Get current location for a tourist
export const getCurrentLocation: RequestHandler = (req, res) => {
  try {
    const { touristId } = req.params;

    if (!touristIdStore.has(touristId)) {
      return res.status(404).json({
        success: false,
        error: "Tourist not found"
      } as ApiResponse);
    }

    const currentLocation = getLastKnownLocation(touristId);

    if (!currentLocation) {
      return res.status(404).json({
        success: false,
        error: "No location data found for this tourist"
      } as ApiResponse);
    }

    const response: ApiResponse<LocationUpdate> = {
      success: true,
      data: currentLocation
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Analyze movement patterns
export const analyzeMovementPattern: RequestHandler = (req, res) => {
  try {
    const { touristId } = req.params;
    const days = parseInt(req.query.days as string) || 7;

    if (!touristIdStore.has(touristId)) {
      return res.status(404).json({
        success: false,
        error: "Tourist not found"
      } as ApiResponse);
    }

    const history = getLocationHistory(touristId);
    
    // Filter by date range
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const recentLocations = history
      .filter(update => new Date(update.location.timestamp || 0) >= cutoffDate)
      .map(update => update.location);

    if (recentLocations.length < 2) {
      return res.status(400).json({
        success: false,
        error: "Insufficient location data for analysis"
      } as ApiResponse);
    }

    // Calculate total distance traveled
    let totalDistance = 0;
    const speeds: number[] = [];
    
    for (let i = 1; i < recentLocations.length; i++) {
      const distance = calculateDistance(recentLocations[i - 1], recentLocations[i]);
      totalDistance += distance;
      
      const speed = calculateSpeed(recentLocations[i - 1], recentLocations[i]);
      if (speed > 0) speeds.push(speed);
    }

    const avgSpeed = speeds.length > 0 ? speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length : 0;
    
    // Detect anomalies
    const anomalyDetection = detectMovementAnomalies(recentLocations);

    const movementPattern: MovementPattern = {
      touristId,
      locations: recentLocations,
      totalDistance,
      avgSpeed,
      unusualBehavior: anomalyDetection.hasAnomalies,
      riskAssessment: anomalyDetection.hasAnomalies ? 'elevated' : 'normal'
    };

    const response: ApiResponse<{
      pattern: MovementPattern;
      anomalies: string[];
      statistics: {
        totalLocations: number;
        timeSpan: string;
        maxSpeed: number;
        minSpeed: number;
      };
    }> = {
      success: true,
      data: {
        pattern: movementPattern,
        anomalies: anomalyDetection.anomalies,
        statistics: {
          totalLocations: recentLocations.length,
          timeSpan: `${days} days`,
          maxSpeed: Math.max(...speeds, 0),
          minSpeed: Math.min(...speeds.filter(s => s > 0), 0)
        }
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

// Get nearby tourists
export const getNearbyTourists: RequestHandler = (req, res) => {
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

    const searchLocation: GeoLocation = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    };
    const searchRadius = parseInt(radius);

    const nearbyTourists: Array<{
      touristId: string;
      touristName: string;
      location: LocationUpdate;
      distance: number;
    }> = [];

    // Check all tourists
    for (const [touristId, tourist] of touristIdStore.entries()) {
      const lastLocation = getLastKnownLocation(touristId);
      if (lastLocation) {
        const distance = calculateDistance(searchLocation, lastLocation.location);
        if (distance <= searchRadius) {
          nearbyTourists.push({
            touristId,
            touristName: tourist.kycData.name,
            location: lastLocation,
            distance
          });
        }
      }
    }

    // Sort by distance
    nearbyTourists.sort((a, b) => a.distance - b.distance);

    const response: ApiResponse<typeof nearbyTourists> = {
      success: true,
      data: nearbyTourists
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Enable/disable real-time tracking
export const setTrackingPreference: RequestHandler = (req, res) => {
  try {
    const { touristId } = req.params;
    const { enabled, shareWithFamily, shareWithPolice } = req.body as {
      enabled: boolean;
      shareWithFamily?: boolean;
      shareWithPolice?: boolean;
    };

    const tourist = touristIdStore.get(touristId);
    if (!tourist) {
      return res.status(404).json({
        success: false,
        error: "Tourist not found"
      } as ApiResponse);
    }

    // In a real implementation, this would update tracking preferences
    // For now, we'll just simulate the response
    const trackingPreferences = {
      touristId,
      realTimeTracking: enabled,
      shareWithFamily: shareWithFamily || false,
      shareWithPolice: shareWithPolice || false,
      updatedAt: new Date().toISOString()
    };

    const response: ApiResponse<typeof trackingPreferences> = {
      success: true,
      data: trackingPreferences,
      message: `Real-time tracking ${enabled ? 'enabled' : 'disabled'}`
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Helper function (duplicate from helpers.ts to avoid circular import)
function isPointInPolygon(point: GeoLocation, polygon: GeoLocation[]): boolean {
  const { latitude: x, longitude: y } = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const { latitude: xi, longitude: yi } = polygon[i];
    const { latitude: xj, longitude: yj } = polygon[j];

    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }

  return inside;
}