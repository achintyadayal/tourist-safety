import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

// Tourist Safety System Routes
import * as touristIdRoutes from "./routes/touristId";
import * as safetyZoneRoutes from "./routes/safetyZones";
import * as sosRoutes from "./routes/sos";
import * as trackingRoutes from "./routes/tracking";
import * as dashboardRoutes from "./routes/dashboard";
import * as anomalyRoutes from "./routes/anomaly";

// Initialize sample data
import { initializeSampleData, getStoreStats } from "./data/store";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Initialize sample data on startup
  initializeSampleData();

  // Health check and system info
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  app.get("/api/health", (_req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      services: {
        database: "connected",
        gps: "active",
        notifications: "active"
      },
      dataStats: getStoreStats()
    });
  });

  // Tourist ID Management Routes
  app.post("/api/tourists", touristIdRoutes.createTouristId);
  app.get("/api/tourists", touristIdRoutes.getAllTouristIds);
  app.get("/api/tourists/search", touristIdRoutes.searchTouristIds);
  app.get("/api/tourists/:id", touristIdRoutes.getTouristId);
  app.put("/api/tourists/:id", touristIdRoutes.updateTouristId);
  app.post("/api/tourists/:id/verify-kyc", touristIdRoutes.verifyKYC);

  // Safety Zone Management Routes
  app.post("/api/safety-zones", safetyZoneRoutes.createSafetyZone);
  app.get("/api/safety-zones", safetyZoneRoutes.getAllSafetyZones);
  app.get("/api/safety-zones/nearby", safetyZoneRoutes.getNearbySafetyZones);
  app.get("/api/safety-zones/:id", safetyZoneRoutes.getSafetyZone);
  app.put("/api/safety-zones/:id", safetyZoneRoutes.updateSafetyZone);
  app.delete("/api/safety-zones/:id", safetyZoneRoutes.deleteSafetyZone);
  app.post("/api/safety-zones/check-location", safetyZoneRoutes.checkLocationInZones);

  // SOS and Emergency Routes
  app.post("/api/sos", sosRoutes.createSOSAlert);
  app.get("/api/sos", sosRoutes.getAllSOSAlerts);
  app.get("/api/sos/active", sosRoutes.getActiveSOSAlerts);
  app.get("/api/sos/:id", sosRoutes.getSOSAlert);
  app.put("/api/sos/:id/status", sosRoutes.updateSOSStatus);
  app.post("/api/emergency/test", sosRoutes.testEmergencySystem);

  // Location Tracking Routes
  app.post("/api/tracking/update-location", trackingRoutes.updateLocation);
  app.get("/api/tracking/:touristId/history", trackingRoutes.getLocationHistory);
  app.get("/api/tracking/:touristId/current", trackingRoutes.getCurrentLocation);
  app.get("/api/tracking/:touristId/analyze", trackingRoutes.analyzeMovementPattern);
  app.get("/api/tracking/nearby", trackingRoutes.getNearbyTourists);
  app.post("/api/tracking/:touristId/preferences", trackingRoutes.setTrackingPreference);

  // Dashboard and Police Routes
  app.get("/api/dashboard/stats", dashboardRoutes.getDashboardStats);
  app.get("/api/dashboard/clusters", dashboardRoutes.getTouristClusters);
  app.get("/api/dashboard/risk-analysis", dashboardRoutes.getRiskAnalysis);
  app.get("/api/incidents", dashboardRoutes.getIncidentReports);
  app.post("/api/incidents", dashboardRoutes.createIncidentReport);
  app.put("/api/incidents/:id", dashboardRoutes.updateIncidentReport);
  app.get("/api/police-units", dashboardRoutes.getPoliceUnits);

  // Anomaly Detection Routes
  app.post("/api/anomalies", anomalyRoutes.createAnomalyAlert);
  app.get("/api/anomalies", anomalyRoutes.getAnomalyAlerts);
  app.get("/api/anomalies/:touristId/analyze", anomalyRoutes.analyzeForAnomalies);
  app.put("/api/anomalies/:id/resolve", anomalyRoutes.resolveAnomalyAlert);
  app.post("/api/anomalies/bulk-analyze", anomalyRoutes.bulkAnalyzeAnomalies);

  // Error handling middleware
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('API Error:', err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });

  // 404 handler for API routes
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) {
      res.status(404).json({
        success: false,
        error: `API endpoint not found: ${req.method} ${req.path}`
      });
    } else {
      next();
    }
  });

  return app;
}
