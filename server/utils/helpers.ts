import crypto from "crypto";
import { GeoLocation, TravelItinerary } from "@shared/api";

// Generate unique ID
export function generateId(): string {
  return crypto.randomBytes(16).toString('hex');
}

// Generate blockchain hash (simulated)
export function generateBlockchainHash(): string {
  const timestamp = Date.now().toString();
  const randomData = crypto.randomBytes(32).toString('hex');
  return crypto.createHash('sha256').update(timestamp + randomData).digest('hex');
}

// Calculate tourist safety score
export function calculateSafetyScore(itinerary: TravelItinerary): number {
  let baseScore = 85; // Start with good score
  
  // Adjust based on travel type
  const typeScoreAdjustment = {
    leisure: 0,
    business: 5,
    pilgrimage: -5,
    adventure: -15,
    other: -5
  };
  
  baseScore += typeScoreAdjustment[itinerary.travelType] || 0;
  
  // Adjust based on destinations risk level
  const highRiskDestinations = itinerary.plannedDestinations.filter(d => d.riskLevel === 'high' || d.riskLevel === 'restricted');
  baseScore -= highRiskDestinations.length * 10;
  
  // Adjust based on trip duration
  if (itinerary.plannedDuration > 14) {
    baseScore -= 5; // Longer trips slightly increase risk
  }
  
  return Math.max(0, Math.min(100, baseScore));
}

// Calculate distance between two points (Haversine formula)
export function calculateDistance(point1: GeoLocation, point2: GeoLocation): number {
  const R = 6371000; // Earth's radius in meters
  const lat1Rad = (point1.latitude * Math.PI) / 180;
  const lat2Rad = (point2.latitude * Math.PI) / 180;
  const deltaLatRad = ((point2.latitude - point1.latitude) * Math.PI) / 180;
  const deltaLngRad = ((point2.longitude - point1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLngRad / 2) * Math.sin(deltaLngRad / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Check if a point is inside a polygon
export function isPointInPolygon(point: GeoLocation, polygon: GeoLocation[]): boolean {
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

// Send notification (simulated)
export async function sendNotification(recipient: string, message: string): Promise<boolean> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Log notification (in real implementation, this would send SMS, email, etc.)
  console.log(`Notification sent to ${recipient}: ${message}`);
  
  return true;
}

// Validate coordinates
export function isValidCoordinate(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

// Generate E-FIR number
export function generateEFIRNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `EFIR${year}${month}${day}${random}`;
}

// Calculate movement speed
export function calculateSpeed(location1: GeoLocation, location2: GeoLocation): number {
  if (!location1.timestamp || !location2.timestamp) {
    return 0;
  }
  
  const distance = calculateDistance(location1, location2);
  const timeDiff = (new Date(location2.timestamp).getTime() - new Date(location1.timestamp).getTime()) / 1000; // seconds
  
  if (timeDiff === 0) return 0;
  
  return (distance / timeDiff) * 3.6; // Convert m/s to km/h
}

// Detect anomalies in movement pattern
export function detectMovementAnomalies(locations: GeoLocation[]): {
  hasAnomalies: boolean;
  anomalies: string[];
} {
  const anomalies: string[] = [];
  
  if (locations.length < 2) {
    return { hasAnomalies: false, anomalies };
  }
  
  // Check for unusual speeds
  for (let i = 1; i < locations.length; i++) {
    const speed = calculateSpeed(locations[i - 1], locations[i]);
    if (speed > 120) { // More than 120 km/h might indicate data error or vehicle travel
      anomalies.push(`Unusual speed detected: ${speed.toFixed(2)} km/h`);
    }
  }
  
  // Check for prolonged inactivity (no movement for > 6 hours)
  if (locations.length >= 2) {
    const lastLocation = locations[locations.length - 1];
    const secondLastLocation = locations[locations.length - 2];
    const timeDiff = new Date(lastLocation.timestamp || 0).getTime() - new Date(secondLastLocation.timestamp || 0).getTime();
    
    if (timeDiff > 6 * 60 * 60 * 1000) { // 6 hours
      anomalies.push('Prolonged inactivity detected');
    }
  }
  
  // Check for rapid location changes (possible GPS errors)
  for (let i = 1; i < locations.length; i++) {
    const distance = calculateDistance(locations[i - 1], locations[i]);
    if (distance > 50000) { // More than 50km instant jump
      anomalies.push(`Rapid location change detected: ${(distance / 1000).toFixed(2)} km`);
    }
  }
  
  return {
    hasAnomalies: anomalies.length > 0,
    anomalies
  };
}

// Encrypt sensitive data (basic implementation)
export function encryptData(data: string, key: string = process.env.ENCRYPTION_KEY || 'default-key'): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key.padEnd(32, '0').substring(0, 32)), iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

// Decrypt sensitive data
export function decryptData(encryptedData: string, key: string = process.env.ENCRYPTION_KEY || 'default-key'): string {
  const parts = encryptedData.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key.padEnd(32, '0').substring(0, 32)), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Validate phone number (basic Indian format)
export function isValidPhoneNumber(phone: string): boolean {
  const indianPhoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
  return indianPhoneRegex.test(phone.replace(/\s+/g, ''));
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Generate random coordinates within a radius (for testing)
export function generateRandomCoordinates(center: GeoLocation, radiusKm: number): GeoLocation {
  const radiusInDegrees = radiusKm / 111.32; // Rough conversion
  
  const randomAngle = Math.random() * 2 * Math.PI;
  const randomRadius = Math.random() * radiusInDegrees;
  
  return {
    latitude: center.latitude + Math.cos(randomAngle) * randomRadius,
    longitude: center.longitude + Math.sin(randomAngle) * randomRadius,
    timestamp: new Date().toISOString()
  };
}