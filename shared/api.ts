/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Tourist Safety System API Types
 */

// Digital Tourist ID Types
export interface TouristId {
  id: string;
  kycData: KYCData;
  itinerary: TravelItinerary;
  emergencyContacts: EmergencyContact[];
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  safetyScore: number;
  blockchainHash?: string;
}

export interface KYCData {
  documentType: 'aadhaar' | 'passport' | 'other';
  documentNumber: string;
  name: string;
  nationality: string;
  phoneNumber: string;
  email: string;
  photo?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface TravelItinerary {
  entryPoint: string;
  plannedDestinations: Destination[];
  plannedDuration: number; // days
  travelType: 'leisure' | 'business' | 'pilgrimage' | 'adventure' | 'other';
  accommodation?: string;
}

export interface Destination {
  name: string;
  coordinates: GeoLocation;
  plannedArrival: string;
  plannedDeparture: string;
  riskLevel: 'low' | 'medium' | 'high' | 'restricted';
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
  email?: string;
  isPrimary: boolean;
}

// Geo-fencing and Safety Zone Types
export interface SafetyZone {
  id: string;
  name: string;
  coordinates: GeoLocation[];
  type: 'safe' | 'caution' | 'restricted' | 'emergency';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  alertMessage: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: string;
}

// SOS and Panic Button Types
export interface SOSAlert {
  id: string;
  touristId: string;
  location: GeoLocation;
  alertType: 'panic' | 'medical' | 'security' | 'lost' | 'other';
  message?: string;
  status: 'active' | 'responded' | 'resolved' | 'false_alarm';
  timestamp: string;
  respondingUnits: string[];
  notifiedContacts: string[];
}

// Anomaly Detection Types
export interface AnomalyAlert {
  id: string;
  touristId: string;
  anomalyType: 'location_dropout' | 'prolonged_inactivity' | 'route_deviation' | 'speed_anomaly' | 'zone_violation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detectedAt: string;
  location?: GeoLocation;
  isResolved: boolean;
  investigationNotes?: string;
}

// Tracking and Movement Types
export interface LocationUpdate {
  touristId: string;
  location: GeoLocation;
  batteryLevel?: number;
  speed?: number;
  heading?: number;
  isManual: boolean;
}

export interface MovementPattern {
  touristId: string;
  locations: GeoLocation[];
  totalDistance: number;
  avgSpeed: number;
  unusualBehavior: boolean;
  riskAssessment: string;
}

// Dashboard and Police Types
export interface TouristCluster {
  id: string;
  centerLocation: GeoLocation;
  touristCount: number;
  averageRiskLevel: number;
  activeAlerts: number;
  radius: number;
}

export interface PoliceUnit {
  id: string;
  name: string;
  location: GeoLocation;
  isAvailable: boolean;
  contactNumber: string;
  jurisdiction: string[];
  responseRadius: number;
}

export interface IncidentReport {
  id: string;
  type: 'missing_person' | 'medical_emergency' | 'security_threat' | 'accident' | 'other';
  touristId: string;
  location: GeoLocation;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reportedBy: string;
  assignedOfficer?: string;
  status: 'reported' | 'investigating' | 'resolved' | 'closed';
  timeline: IncidentTimeline[];
  efirNumber?: string;
}

export interface IncidentTimeline {
  timestamp: string;
  action: string;
  performedBy: string;
  notes?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Request Types
export interface CreateTouristIdRequest {
  kycData: Omit<KYCData, 'verificationStatus'>;
  itinerary: TravelItinerary;
  emergencyContacts: EmergencyContact[];
}

export interface UpdateLocationRequest {
  touristId: string;
  location: GeoLocation;
  batteryLevel?: number;
  isEmergency?: boolean;
}

export interface CreateSOSRequest {
  touristId: string;
  alertType: SOSAlert['alertType'];
  message?: string;
  location: GeoLocation;
}

export interface CreateSafetyZoneRequest {
  name: string;
  coordinates: GeoLocation[];
  type: SafetyZone['type'];
  riskLevel: SafetyZone['riskLevel'];
  description: string;
  alertMessage: string;
}

// Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tourist' | 'authority' | 'admin';
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  profile?: {
    phoneNumber?: string;
    nationality?: string;
    avatar?: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role?: 'tourist' | 'authority';
  profile?: {
    phoneNumber?: string;
    nationality?: string;
  };
}

export interface AuthResponse {
  success: boolean;
  user: Omit<User, 'password'>;
  token: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface LoginResponse extends AuthResponse {
  message: string;
}

export interface SignupResponse extends AuthResponse {
  message: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}
