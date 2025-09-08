import { RequestHandler } from "express";
import { 
  ApiResponse, 
  TouristCluster, 
  IncidentReport, 
  PoliceUnit,
  TouristId,
  SOSAlert,
  AnomalyAlert
} from "@shared/api";
import { generateId, calculateDistance, generateEFIRNumber } from "../utils/helpers";
import { 
  touristIdStore, 
  sosAlertsStore, 
  anomalyAlertsStore, 
  policeUnitsStore,
  incidentReportsStore,
  touristClustersStore,
  getLastKnownLocation 
} from "../data/store";

// Get dashboard overview statistics
export const getDashboardStats: RequestHandler = (req, res) => {
  try {
    const totalTourists = touristIdStore.size;
    const activeTourists = Array.from(touristIdStore.values()).filter(t => t.isActive).length;
    const activeSOSAlerts = Array.from(sosAlertsStore.values()).filter(alert => alert.status === 'active').length;
    const pendingIncidents = Array.from(incidentReportsStore.values()).filter(incident => 
      incident.status === 'reported' || incident.status === 'investigating'
    ).length;
    const availablePoliceUnits = Array.from(policeUnitsStore.values()).filter(unit => unit.isAvailable).length;
    const unverifiedTourists = Array.from(touristIdStore.values()).filter(t => 
      t.kycData.verificationStatus === 'pending'
    ).length;

    // Calculate average safety score
    const safetyScores = Array.from(touristIdStore.values()).map(t => t.safetyScore);
    const averageSafetyScore = safetyScores.length > 0 
      ? safetyScores.reduce((sum, score) => sum + score, 0) / safetyScores.length 
      : 0;

    const stats = {
      totalTourists,
      activeTourists,
      activeSOSAlerts,
      pendingIncidents,
      availablePoliceUnits,
      unverifiedTourists,
      averageSafetyScore: Math.round(averageSafetyScore),
      lastUpdated: new Date().toISOString()
    };

    const response: ApiResponse<typeof stats> = {
      success: true,
      data: stats
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Get tourist clusters for heat map
export const getTouristClusters: RequestHandler = (req, res) => {
  try {
    const radiusKm = parseFloat(req.query.radius as string) || 5; // Default 5km clustering
    const minTourists = parseInt(req.query.minTourists as string) || 3; // Minimum tourists per cluster

    const touristLocations: Array<{
      touristId: string;
      location: { latitude: number; longitude: number };
      safetyScore: number;
    }> = [];

    // Get current locations of all active tourists
    for (const [touristId, tourist] of touristIdStore.entries()) {
      if (tourist.isActive) {
        const lastLocation = getLastKnownLocation(touristId);
        if (lastLocation) {
          touristLocations.push({
            touristId,
            location: lastLocation.location,
            safetyScore: tourist.safetyScore
          });
        }
      }
    }

    // Simple clustering algorithm
    const clusters: TouristCluster[] = [];
    const processed = new Set<string>();

    for (const tourist of touristLocations) {
      if (processed.has(tourist.touristId)) continue;

      const clusterTourists = [tourist];
      processed.add(tourist.touristId);

      // Find nearby tourists
      for (const otherTourist of touristLocations) {
        if (processed.has(otherTourist.touristId)) continue;

        const distance = calculateDistance(tourist.location, otherTourist.location);
        if (distance <= radiusKm * 1000) { // Convert km to meters
          clusterTourists.push(otherTourist);
          processed.add(otherTourist.touristId);
        }
      }

      // Only create cluster if it has minimum number of tourists
      if (clusterTourists.length >= minTourists) {
        // Calculate cluster center
        const centerLat = clusterTourists.reduce((sum, t) => sum + t.location.latitude, 0) / clusterTourists.length;
        const centerLng = clusterTourists.reduce((sum, t) => sum + t.location.longitude, 0) / clusterTourists.length;
        
        // Calculate average risk level
        const avgSafetyScore = clusterTourists.reduce((sum, t) => sum + t.safetyScore, 0) / clusterTourists.length;
        
        // Count active alerts in cluster
        const activeAlerts = Array.from(sosAlertsStore.values()).filter(alert => 
          alert.status === 'active' && clusterTourists.some(t => t.touristId === alert.touristId)
        ).length;

        const cluster: TouristCluster = {
          id: generateId(),
          centerLocation: { latitude: centerLat, longitude: centerLng },
          touristCount: clusterTourists.length,
          averageRiskLevel: 100 - avgSafetyScore, // Invert safety score to get risk level
          activeAlerts,
          radius: radiusKm * 1000
        };

        clusters.push(cluster);
        touristClustersStore.set(cluster.id, cluster);
      }
    }

    const response: ApiResponse<TouristCluster[]> = {
      success: true,
      data: clusters
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Get all incident reports
export const getIncidentReports: RequestHandler = (req, res) => {
  try {
    const status = req.query.status as IncidentReport['status'];
    const type = req.query.type as IncidentReport['type'];
    const severity = req.query.severity as IncidentReport['severity'];

    let reports = Array.from(incidentReportsStore.values());

    if (status) {
      reports = reports.filter(report => report.status === status);
    }

    if (type) {
      reports = reports.filter(report => report.type === type);
    }

    if (severity) {
      reports = reports.filter(report => report.severity === severity);
    }

    // Sort by severity and date
    reports.sort((a, b) => {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
      if (severityDiff !== 0) return severityDiff;
      
      return new Date(b.timeline[0]?.timestamp || 0).getTime() - new Date(a.timeline[0]?.timestamp || 0).getTime();
    });

    const response: ApiResponse<IncidentReport[]> = {
      success: true,
      data: reports
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Create incident report
export const createIncidentReport: RequestHandler = (req, res) => {
  try {
    const {
      type,
      touristId,
      location,
      description,
      severity,
      reportedBy
    }: Partial<IncidentReport> = req.body;

    if (!type || !touristId || !location || !description || !severity || !reportedBy) {
      return res.status(400).json({
        success: false,
        error: "All fields are required"
      } as ApiResponse);
    }

    // Verify tourist exists
    if (!touristIdStore.has(touristId)) {
      return res.status(404).json({
        success: false,
        error: "Tourist not found"
      } as ApiResponse);
    }

    const incident: IncidentReport = {
      id: generateId(),
      type,
      touristId,
      location,
      description,
      severity,
      reportedBy,
      status: 'reported',
      timeline: [{
        timestamp: new Date().toISOString(),
        action: 'Incident reported',
        performedBy: reportedBy
      }],
      efirNumber: type === 'missing_person' ? generateEFIRNumber() : undefined
    };

    incidentReportsStore.set(incident.id, incident);

    const response: ApiResponse<IncidentReport> = {
      success: true,
      data: incident,
      message: "Incident report created successfully"
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Update incident report
export const updateIncidentReport: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedOfficer, notes, performedBy } = req.body;

    const incident = incidentReportsStore.get(id);
    if (!incident) {
      return res.status(404).json({
        success: false,
        error: "Incident report not found"
      } as ApiResponse);
    }

    // Update incident
    if (status) incident.status = status;
    if (assignedOfficer) incident.assignedOfficer = assignedOfficer;

    // Add timeline entry
    incident.timeline.push({
      timestamp: new Date().toISOString(),
      action: `Status updated to ${status || 'updated'}`,
      performedBy: performedBy || 'system',
      notes
    });

    incidentReportsStore.set(id, incident);

    const response: ApiResponse<IncidentReport> = {
      success: true,
      data: incident,
      message: "Incident report updated successfully"
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Get police units
export const getPoliceUnits: RequestHandler = (req, res) => {
  try {
    const isAvailable = req.query.isAvailable as string;
    const jurisdiction = req.query.jurisdiction as string;

    let units = Array.from(policeUnitsStore.values());

    if (isAvailable !== undefined) {
      units = units.filter(unit => unit.isAvailable === (isAvailable === 'true'));
    }

    if (jurisdiction) {
      units = units.filter(unit => 
        unit.jurisdiction.some(j => j.toLowerCase().includes(jurisdiction.toLowerCase()))
      );
    }

    const response: ApiResponse<PoliceUnit[]> = {
      success: true,
      data: units
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Get high-risk zones analysis
export const getRiskAnalysis: RequestHandler = (req, res) => {
  try {
    const riskZones = Array.from(safetyZonesStore.values())
      .filter(zone => zone.riskLevel === 'high' || zone.riskLevel === 'critical');

    const riskAnalysis = riskZones.map(zone => {
      // Count tourists currently in this zone
      let touristsInZone = 0;
      let activeAlerts = 0;

      for (const [touristId, tourist] of touristIdStore.entries()) {
        if (tourist.isActive) {
          const lastLocation = getLastKnownLocation(touristId);
          if (lastLocation && isPointInPolygon(lastLocation.location, zone.coordinates)) {
            touristsInZone++;
            
            // Check for active SOS alerts
            const sosAlerts = Array.from(sosAlertsStore.values()).filter(alert => 
              alert.touristId === touristId && alert.status === 'active'
            );
            activeAlerts += sosAlerts.length;
          }
        }
      }

      return {
        zone: zone,
        touristsInZone,
        activeAlerts,
        riskScore: zone.riskLevel === 'critical' ? 100 : 75
      };
    });

    const response: ApiResponse<typeof riskAnalysis> = {
      success: true,
      data: riskAnalysis
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Helper function (duplicate to avoid circular import)
function isPointInPolygon(point: { latitude: number; longitude: number }, polygon: { latitude: number; longitude: number }[]): boolean {
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