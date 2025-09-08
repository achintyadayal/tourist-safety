import { RequestHandler } from "express";
import { 
  AnomalyAlert, 
  ApiResponse, 
  LocationUpdate 
} from "@shared/api";
import { generateId, detectMovementAnomalies, calculateDistance } from "../utils/helpers";
import { anomalyAlertsStore, touristIdStore, getLocationHistory } from "../data/store";

// Create anomaly alert
export const createAnomalyAlert: RequestHandler = (req, res) => {
  try {
    const {
      touristId,
      anomalyType,
      severity,
      description,
      location
    }: Partial<AnomalyAlert> = req.body;

    if (!touristId || !anomalyType || !severity || !description) {
      return res.status(400).json({
        success: false,
        error: "Tourist ID, anomaly type, severity, and description are required"
      } as ApiResponse);
    }

    // Verify tourist exists
    if (!touristIdStore.has(touristId)) {
      return res.status(404).json({
        success: false,
        error: "Tourist not found"
      } as ApiResponse);
    }

    const anomaly: AnomalyAlert = {
      id: generateId(),
      touristId,
      anomalyType,
      severity,
      description,
      detectedAt: new Date().toISOString(),
      location,
      isResolved: false
    };

    anomalyAlertsStore.set(anomaly.id, anomaly);

    const response: ApiResponse<AnomalyAlert> = {
      success: true,
      data: anomaly,
      message: "Anomaly alert created successfully"
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Analyze tourist for anomalies
export const analyzeForAnomalies: RequestHandler = (req, res) => {
  try {
    const { touristId } = req.params;

    if (!touristIdStore.has(touristId)) {
      return res.status(404).json({
        success: false,
        error: "Tourist not found"
      } as ApiResponse);
    }

    const locationHistory = getLocationHistory(touristId, 50); // Last 50 locations
    
    if (locationHistory.length < 2) {
      return res.status(400).json({
        success: false,
        error: "Insufficient location data for anomaly analysis"
      } as ApiResponse);
    }

    const locations = locationHistory.map(update => update.location);
    const anomalyResults = detectMovementAnomalies(locations);
    
    // Additional anomaly checks
    const additionalAnomalies: string[] = [];
    
    // Check for battery level anomalies (if available)
    const batteryLevels = locationHistory
      .filter(update => update.batteryLevel !== undefined)
      .map(update => update.batteryLevel!);
    
    if (batteryLevels.length > 0) {
      const latestBattery = batteryLevels[batteryLevels.length - 1];
      if (latestBattery < 10) {
        additionalAnomalies.push('Critical battery level detected');
      }
    }

    // Check for location accuracy issues
    const lowAccuracyLocations = locations.filter(loc => 
      loc.accuracy && loc.accuracy > 100 // More than 100m accuracy
    ).length;
    
    if (lowAccuracyLocations > locations.length * 0.5) {
      additionalAnomalies.push('Poor GPS accuracy detected in multiple locations');
    }

    // Check for time gaps in location updates
    const timeGaps: number[] = [];
    for (let i = 1; i < locations.length; i++) {
      if (locations[i].timestamp && locations[i - 1].timestamp) {
        const gap = new Date(locations[i].timestamp!).getTime() - new Date(locations[i - 1].timestamp!).getTime();
        timeGaps.push(gap);
      }
    }
    
    const largeGaps = timeGaps.filter(gap => gap > 4 * 60 * 60 * 1000); // More than 4 hours
    if (largeGaps.length > 0) {
      additionalAnomalies.push(`${largeGaps.length} significant time gaps in location data`);
    }

    const allAnomalies = [...anomalyResults.anomalies, ...additionalAnomalies];
    
    // Create anomaly alerts for new anomalies if any exist
    const newAlerts: AnomalyAlert[] = [];
    if (allAnomalies.length > 0) {
      // Check if similar alerts already exist
      const existingAlerts = Array.from(anomalyAlertsStore.values())
        .filter(alert => alert.touristId === touristId && !alert.isResolved);

      for (const anomalyDescription of allAnomalies) {
        const alreadyExists = existingAlerts.some(alert => 
          alert.description.includes(anomalyDescription.substring(0, 20))
        );

        if (!alreadyExists) {
          const severity: AnomalyAlert['severity'] = 
            anomalyDescription.includes('Critical') || anomalyDescription.includes('Rapid') ? 'critical' :
            anomalyDescription.includes('Unusual') || anomalyDescription.includes('Poor') ? 'high' :
            anomalyDescription.includes('Prolonged') ? 'medium' : 'low';

          const alert: AnomalyAlert = {
            id: generateId(),
            touristId,
            anomalyType: 'location_dropout', // Default type, would be more specific in real implementation
            severity,
            description: anomalyDescription,
            detectedAt: new Date().toISOString(),
            location: locations[locations.length - 1],
            isResolved: false
          };

          anomalyAlertsStore.set(alert.id, alert);
          newAlerts.push(alert);
        }
      }
    }

    const response: ApiResponse<{
      hasAnomalies: boolean;
      anomalies: string[];
      newAlerts: AnomalyAlert[];
      analysis: {
        locationsAnalyzed: number;
        timeSpan: string;
        riskLevel: string;
      };
    }> = {
      success: true,
      data: {
        hasAnomalies: allAnomalies.length > 0,
        anomalies: allAnomalies,
        newAlerts,
        analysis: {
          locationsAnalyzed: locations.length,
          timeSpan: locations.length > 1 && locations[0].timestamp && locations[locations.length - 1].timestamp
            ? `${Math.round((new Date(locations[locations.length - 1].timestamp!).getTime() - new Date(locations[0].timestamp!).getTime()) / (1000 * 60 * 60))} hours`
            : 'Unknown',
          riskLevel: allAnomalies.length > 3 ? 'high' : allAnomalies.length > 1 ? 'medium' : 'low'
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

// Get all anomaly alerts
export const getAnomalyAlerts: RequestHandler = (req, res) => {
  try {
    const touristId = req.query.touristId as string;
    const severity = req.query.severity as AnomalyAlert['severity'];
    const isResolved = req.query.isResolved as string;

    let alerts = Array.from(anomalyAlertsStore.values());

    if (touristId) {
      alerts = alerts.filter(alert => alert.touristId === touristId);
    }

    if (severity) {
      alerts = alerts.filter(alert => alert.severity === severity);
    }

    if (isResolved !== undefined) {
      alerts = alerts.filter(alert => alert.isResolved === (isResolved === 'true'));
    }

    // Sort by severity and detection time
    alerts.sort((a, b) => {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
      if (severityDiff !== 0) return severityDiff;
      
      return new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime();
    });

    const response: ApiResponse<AnomalyAlert[]> = {
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

// Resolve anomaly alert
export const resolveAnomalyAlert: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { investigationNotes } = req.body;

    const alert = anomalyAlertsStore.get(id);
    if (!alert) {
      return res.status(404).json({
        success: false,
        error: "Anomaly alert not found"
      } as ApiResponse);
    }

    alert.isResolved = true;
    alert.investigationNotes = investigationNotes;

    anomalyAlertsStore.set(id, alert);

    const response: ApiResponse<AnomalyAlert> = {
      success: true,
      data: alert,
      message: "Anomaly alert resolved successfully"
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Bulk analyze all tourists for anomalies
export const bulkAnalyzeAnomalies: RequestHandler = async (req, res) => {
  try {
    const results: Array<{
      touristId: string;
      touristName: string;
      hasAnomalies: boolean;
      anomaliesCount: number;
      riskLevel: string;
    }> = [];

    for (const [touristId, tourist] of touristIdStore.entries()) {
      if (!tourist.isActive) continue;

      const locationHistory = getLocationHistory(touristId, 20);
      if (locationHistory.length < 2) continue;

      const locations = locationHistory.map(update => update.location);
      const anomalyResults = detectMovementAnomalies(locations);

      results.push({
        touristId,
        touristName: tourist.kycData.name,
        hasAnomalies: anomalyResults.hasAnomalies,
        anomaliesCount: anomalyResults.anomalies.length,
        riskLevel: anomalyResults.anomalies.length > 2 ? 'high' : 
                  anomalyResults.anomalies.length > 0 ? 'medium' : 'low'
      });
    }

    // Sort by risk level and anomaly count
    results.sort((a, b) => {
      const riskOrder = { high: 3, medium: 2, low: 1 };
      const riskDiff = riskOrder[b.riskLevel as keyof typeof riskOrder] - riskOrder[a.riskLevel as keyof typeof riskOrder];
      if (riskDiff !== 0) return riskDiff;
      
      return b.anomaliesCount - a.anomaliesCount;
    });

    const response: ApiResponse<{
      analysisResults: typeof results;
      summary: {
        totalAnalyzed: number;
        highRisk: number;
        mediumRisk: number;
        lowRisk: number;
      };
    }> = {
      success: true,
      data: {
        analysisResults: results,
        summary: {
          totalAnalyzed: results.length,
          highRisk: results.filter(r => r.riskLevel === 'high').length,
          mediumRisk: results.filter(r => r.riskLevel === 'medium').length,
          lowRisk: results.filter(r => r.riskLevel === 'low').length
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