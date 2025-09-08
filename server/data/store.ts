import { 
  TouristId, 
  SafetyZone, 
  SOSAlert, 
  AnomalyAlert, 
  PoliceUnit, 
  IncidentReport,
  LocationUpdate,
  TouristCluster,
  GeoLocation
} from "@shared/api";

// In-memory data stores (in production, these would be database collections)
export const touristIdStore = new Map<string, TouristId>();
export const safetyZonesStore = new Map<string, SafetyZone>();
export const sosAlertsStore = new Map<string, SOSAlert>();
export const anomalyAlertsStore = new Map<string, AnomalyAlert>();
export const policeUnitsStore = new Map<string, PoliceUnit>();
export const incidentReportsStore = new Map<string, IncidentReport>();
export const locationUpdatesStore = new Map<string, LocationUpdate[]>(); // Key: touristId, Value: array of location updates
export const touristClustersStore = new Map<string, TouristCluster>();

// Initialize with sample data for development
export function initializeSampleData() {
  // Sample safety zones
  const sampleZones: SafetyZone[] = [
    {
      id: "zone_001",
      name: "Guwahati Airport Safe Zone",
      coordinates: [
        { latitude: 26.1401, longitude: 91.7742 },
        { latitude: 26.1450, longitude: 91.7800 },
        { latitude: 26.1350, longitude: 91.7850 },
        { latitude: 26.1300, longitude: 91.7700 }
      ],
      type: "safe",
      riskLevel: "low",
      description: "Safe zone around Guwahati airport",
      alertMessage: "You are in a safe zone",
      isActive: true,
      createdBy: "admin",
      createdAt: new Date().toISOString()
    },
    {
      id: "zone_002",
      name: "Border Area Restricted Zone",
      coordinates: [
        { latitude: 27.0000, longitude: 92.0000 },
        { latitude: 27.0500, longitude: 92.0500 },
        { latitude: 26.9500, longitude: 92.1000 },
        { latitude: 26.9000, longitude: 91.9500 }
      ],
      type: "restricted",
      riskLevel: "critical",
      description: "Restricted border area",
      alertMessage: "Warning: You are entering a restricted border area",
      isActive: true,
      createdBy: "admin",
      createdAt: new Date().toISOString()
    },
    {
      id: "zone_003",
      name: "Kaziranga National Park",
      coordinates: [
        { latitude: 26.5775, longitude: 93.1663 },
        { latitude: 26.6200, longitude: 93.2000 },
        { latitude: 26.5500, longitude: 93.2500 },
        { latitude: 26.5200, longitude: 93.1200 }
      ],
      type: "caution",
      riskLevel: "medium",
      description: "Wildlife sanctuary - caution required",
      alertMessage: "You are entering Kaziranga National Park. Stay on designated paths.",
      isActive: true,
      createdBy: "forest_dept",
      createdAt: new Date().toISOString()
    }
  ];

  // Sample police units
  const samplePoliceUnits: PoliceUnit[] = [
    {
      id: "unit_001",
      name: "Guwahati Police Station 1",
      location: { latitude: 26.1445, longitude: 91.7362 },
      isAvailable: true,
      contactNumber: "+91-361-2345678",
      jurisdiction: ["Guwahati", "Dispur"],
      responseRadius: 10000 // 10km
    },
    {
      id: "unit_002",
      name: "Tourist Police Unit",
      location: { latitude: 26.1800, longitude: 91.7500 },
      isAvailable: true,
      contactNumber: "+91-361-2345679",
      jurisdiction: ["Tourist Areas", "Hotels"],
      responseRadius: 15000 // 15km
    },
    {
      id: "unit_003",
      name: "Border Security Force",
      location: { latitude: 27.0200, longitude: 92.0200 },
      isAvailable: true,
      contactNumber: "+91-361-2345680",
      jurisdiction: ["Border Areas"],
      responseRadius: 25000 // 25km
    }
  ];

  // Add sample data to stores
  sampleZones.forEach(zone => safetyZonesStore.set(zone.id, zone));
  samplePoliceUnits.forEach(unit => policeUnitsStore.set(unit.id, unit));

  console.log("Sample data initialized successfully");
}

// Helper functions for data management
export function clearAllData() {
  touristIdStore.clear();
  safetyZonesStore.clear();
  sosAlertsStore.clear();
  anomalyAlertsStore.clear();
  policeUnitsStore.clear();
  incidentReportsStore.clear();
  locationUpdatesStore.clear();
  touristClustersStore.clear();
}

export function getStoreStats() {
  return {
    touristIds: touristIdStore.size,
    safetyZones: safetyZonesStore.size,
    sosAlerts: sosAlertsStore.size,
    anomalyAlerts: anomalyAlertsStore.size,
    policeUnits: policeUnitsStore.size,
    incidentReports: incidentReportsStore.size,
    locationUpdates: Array.from(locationUpdatesStore.values()).reduce((total, updates) => total + updates.length, 0),
    touristClusters: touristClustersStore.size
  };
}

// Location update helpers
export function addLocationUpdate(touristId: string, locationUpdate: LocationUpdate) {
  const existingUpdates = locationUpdatesStore.get(touristId) || [];
  existingUpdates.push(locationUpdate);
  
  // Keep only last 1000 updates per tourist to prevent memory issues
  if (existingUpdates.length > 1000) {
    existingUpdates.splice(0, existingUpdates.length - 1000);
  }
  
  locationUpdatesStore.set(touristId, existingUpdates);
}

export function getLocationHistory(touristId: string, limit?: number): LocationUpdate[] {
  const updates = locationUpdatesStore.get(touristId) || [];
  if (limit) {
    return updates.slice(-limit);
  }
  return updates;
}

export function getLastKnownLocation(touristId: string): LocationUpdate | null {
  const updates = locationUpdatesStore.get(touristId) || [];
  return updates.length > 0 ? updates[updates.length - 1] : null;
}