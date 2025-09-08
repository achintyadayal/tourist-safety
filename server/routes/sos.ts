import { RequestHandler } from "express";
import { 
  SOSAlert, 
  CreateSOSRequest, 
  ApiResponse, 
  PoliceUnit,
  TouristId 
} from "@shared/api";
import { generateId, calculateDistance, sendNotification } from "../utils/helpers";
import { sosAlertsStore, policeUnitsStore, touristIdStore } from "../data/store";

// Create SOS alert
export const createSOSAlert: RequestHandler = async (req, res) => {
  try {
    const request: CreateSOSRequest = req.body;
    
    if (!request.touristId || !request.location || !request.alertType) {
      return res.status(400).json({
        success: false,
        error: "Tourist ID, location, and alert type are required"
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

    const sosAlert: SOSAlert = {
      id: generateId(),
      touristId: request.touristId,
      location: {
        ...request.location,
        timestamp: new Date().toISOString()
      },
      alertType: request.alertType,
      message: request.message,
      status: 'active',
      timestamp: new Date().toISOString(),
      respondingUnits: [],
      notifiedContacts: []
    };

    // Find nearest police units
    const nearbyUnits = findNearestPoliceUnits(request.location, 10000); // 10km radius
    sosAlert.respondingUnits = nearbyUnits.slice(0, 3).map(unit => unit.id);

    // Notify emergency contacts
    const emergencyContacts = tourist.emergencyContacts
      .filter(contact => contact.isPrimary)
      .map(contact => contact.phoneNumber);
    
    sosAlert.notifiedContacts = emergencyContacts;

    sosAlertsStore.set(sosAlert.id, sosAlert);

    // Send notifications (simulate)
    await Promise.all([
      ...sosAlert.respondingUnits.map(unitId => 
        sendNotification(`police_unit_${unitId}`, `SOS Alert: ${request.alertType} at ${request.location.latitude}, ${request.location.longitude}`)
      ),
      ...sosAlert.notifiedContacts.map(contact => 
        sendNotification(`sms_${contact}`, `Emergency alert from ${tourist.kycData.name}. Location: ${request.location.latitude}, ${request.location.longitude}`)
      )
    ]);

    const response: ApiResponse<SOSAlert> = {
      success: true,
      data: sosAlert,
      message: "SOS alert created and notifications sent"
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Get SOS alert by ID
export const getSOSAlert: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const alert = sosAlertsStore.get(id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        error: "SOS alert not found"
      } as ApiResponse);
    }

    const response: ApiResponse<SOSAlert> = {
      success: true,
      data: alert
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Update SOS alert status
export const updateSOSStatus: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { status, respondingUnitId }: { 
      status: SOSAlert['status']; 
      respondingUnitId?: string; 
    } = req.body;

    const alert = sosAlertsStore.get(id);
    if (!alert) {
      return res.status(404).json({
        success: false,
        error: "SOS alert not found"
      } as ApiResponse);
    }

    alert.status = status;
    
    if (respondingUnitId && !alert.respondingUnits.includes(respondingUnitId)) {
      alert.respondingUnits.push(respondingUnitId);
    }

    sosAlertsStore.set(id, alert);

    const response: ApiResponse<SOSAlert> = {
      success: true,
      data: alert,
      message: `SOS alert status updated to ${status}`
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Get all SOS alerts
export const getAllSOSAlerts: RequestHandler = (req, res) => {
  try {
    const status = req.query.status as SOSAlert['status'];
    const touristId = req.query.touristId as string;
    const alertType = req.query.alertType as SOSAlert['alertType'];

    let alerts = Array.from(sosAlertsStore.values());

    if (status) {
      alerts = alerts.filter(alert => alert.status === status);
    }

    if (touristId) {
      alerts = alerts.filter(alert => alert.touristId === touristId);
    }

    if (alertType) {
      alerts = alerts.filter(alert => alert.alertType === alertType);
    }

    // Sort by timestamp (newest first)
    alerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const response: ApiResponse<SOSAlert[]> = {
      success: true,
      data: alerts
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Get active SOS alerts
export const getActiveSOSAlerts: RequestHandler = (req, res) => {
  try {
    const activeAlerts = Array.from(sosAlertsStore.values())
      .filter(alert => alert.status === 'active')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const response: ApiResponse<SOSAlert[]> = {
      success: true,
      data: activeAlerts
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Test emergency systems
export const testEmergencySystem: RequestHandler = async (req, res) => {
  try {
    const { touristId } = req.body;

    if (!touristId) {
      return res.status(400).json({
        success: false,
        error: "Tourist ID is required"
      } as ApiResponse);
    }

    const tourist = touristIdStore.get(touristId);
    if (!tourist) {
      return res.status(404).json({
        success: false,
        error: "Tourist not found"
      } as ApiResponse);
    }

    // Simulate emergency system test
    const testResults = {
      gpsConnection: true,
      networkConnection: true,
      emergencyContacts: tourist.emergencyContacts.length > 0,
      nearbyPoliceUnits: findNearestPoliceUnits({ latitude: 0, longitude: 0 }, 50000).length,
      systemStatus: 'operational'
    };

    const response: ApiResponse<typeof testResults> = {
      success: true,
      data: testResults,
      message: "Emergency system test completed"
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Helper function to find nearest police units
function findNearestPoliceUnits(location: { latitude: number; longitude: number }, maxDistance: number): PoliceUnit[] {
  return Array.from(policeUnitsStore.values())
    .filter(unit => unit.isAvailable)
    .map(unit => ({
      unit,
      distance: calculateDistance(location, unit.location)
    }))
    .filter(({ distance }) => distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
    .map(({ unit }) => unit);
}