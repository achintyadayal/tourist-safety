import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MapPin, 
  Shield, 
  Phone, 
  Navigation,
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  Users,
  Settings,
  Bell,
  Camera,
  IdCard,
  QrCode,
  Download
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SafetyZone {
  id: string;
  name: string;
  type: 'safe' | 'caution' | 'restricted' | 'emergency';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  alertMessage: string;
  isActive: boolean;
}

interface LocationUpdate {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: string;
}

export default function TouristDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState<LocationUpdate | null>(null);
  const [nearbyZones, setNearbyZones] = useState<SafetyZone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [digitalIds, setDigitalIds] = useState<any[]>([]);
  const [isLoadingDigitalIds, setIsLoadingDigitalIds] = useState(false);

  useEffect(() => {
    requestLocationPermission();
    fetchNearbyZones();
    fetchDigitalIds();
  }, []);

  const requestLocationPermission = async () => {
    if (!navigator.geolocation) {
      setLocationPermission(false);
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      const location: LocationUpdate = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: new Date().toISOString()
      };

      setCurrentLocation(location);
      setLocationPermission(true);
      
      // Update location on server
      updateLocationOnServer(location);
    } catch (error) {
      console.error('Location access denied:', error);
      setLocationPermission(false);
    }
  };

  const updateLocationOnServer = async (location: LocationUpdate) => {
    try {
      await fetch('/api/tracking/update-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          touristId: user?.id,
          location: location
        })
      });
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const fetchNearbyZones = async () => {
    try {
      if (currentLocation) {
        const response = await fetch(`/api/safety-zones/nearby?lat=${currentLocation.latitude}&lng=${currentLocation.longitude}&radius=5000`);
        const data = await response.json();
        if (data.success) {
          setNearbyZones(data.data || []);
        }
      }
    } catch (error) {
      console.error('Error fetching nearby zones:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDigitalIds = async () => {
    setIsLoadingDigitalIds(true);
    try {
      const response = await fetch('/api/digital-id', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setDigitalIds(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching Digital IDs:', error);
    } finally {
      setIsLoadingDigitalIds(false);
    }
  };

  const sendSOSAlert = async (alertType: 'panic' | 'medical' | 'security' | 'lost' | 'other') => {
    if (!currentLocation) {
      alert('Location not available. Please enable location services.');
      return;
    }

    try {
      const response = await fetch('/api/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          touristId: user?.id,
          alertType: alertType,
          location: currentLocation,
          message: `Emergency alert: ${alertType}`
        })
      });

      if (response.ok) {
        alert('Emergency alert sent! Help is on the way.');
      } else {
        alert('Failed to send emergency alert. Please try again.');
      }
    } catch (error) {
      console.error('Error sending SOS:', error);
      alert('Failed to send emergency alert. Please try again.');
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getZoneTypeColor = (type: string) => {
    switch (type) {
      case 'safe': return 'bg-green-100 text-green-800';
      case 'caution': return 'bg-yellow-100 text-yellow-800';
      case 'restricted': return 'bg-orange-100 text-orange-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tourist Safety Dashboard</h1>
              <p className="text-gray-600">Welcome, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-purple-100 text-purple-800">
                {user?.role}
              </Badge>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Status */}
        {locationPermission === false && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Location access is required for safety features. Please enable location services.
            </AlertDescription>
          </Alert>
        )}

        {/* Emergency SOS Button */}
        <div className="mb-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-red-800 mb-4">Emergency SOS</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <Button 
                    onClick={() => sendSOSAlert('panic')}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Panic
                  </Button>
                  <Button 
                    onClick={() => sendSOSAlert('medical')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Medical
                  </Button>
                  <Button 
                    onClick={() => sendSOSAlert('security')}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Security
                  </Button>
                  <Button 
                    onClick={() => sendSOSAlert('lost')}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Lost
                  </Button>
                  <Button 
                    onClick={() => sendSOSAlert('other')}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Other
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Location */}
        {currentLocation && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Location</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  <p>Lat: {currentLocation.latitude.toFixed(4)}</p>
                  <p>Lng: {currentLocation.longitude.toFixed(4)}</p>
                  {currentLocation.accuracy && (
                    <p>Accuracy: ±{Math.round(currentLocation.accuracy)}m</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nearby Zones</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{nearbyZones.length}</div>
                <p className="text-xs text-muted-foreground">
                  Safety zones nearby
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Update</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  {new Date(currentLocation.timestamp).toLocaleTimeString()}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Digital ID Section */}
        <div className="mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <IdCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Digital Tourist ID</h3>
                    <p className="text-blue-700">Generate your blockchain-verified digital identity for secure travel</p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/generate-digital-id')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate Digital ID
                </Button>
              </div>

              {/* Display Generated Digital IDs */}
              {isLoadingDigitalIds ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-blue-700 mt-2">Loading Digital IDs...</p>
                </div>
              ) : digitalIds.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-900">Your Digital IDs</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {digitalIds.map((digitalId) => (
                      <Card key={digitalId.id} className="bg-white border-blue-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Shield className="w-5 h-5 text-blue-600" />
                              <span className="font-mono text-sm font-semibold">{digitalId.id}</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              {digitalId.status}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">Name:</span> {digitalId.fullName}
                            </div>
                            <div>
                              <span className="font-medium">Destination:</span> {digitalId.destination}
                            </div>
                            <div>
                              <span className="font-medium">Valid Until:</span> {new Date(digitalId.departureDate).toLocaleDateString()}
                            </div>
                            <div>
                              <span className="font-medium">Created:</span> {new Date(digitalId.createdAt).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="bg-gray-100 p-2 rounded">
                              <img src={digitalId.qrCode} alt="QR Code" className="w-12 h-12" />
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500 font-mono">
                                {digitalId.blockchainHash.substring(0, 10)}...
                              </p>
                            </div>
                          </div>

                          <div className="flex space-x-2 mt-4">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => window.open(digitalId.qrCode, '_blank')}
                            >
                              <QrCode className="w-4 h-4 mr-1" />
                              View QR
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => window.print()}
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Print
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <IdCard className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <p className="text-blue-700 mb-4">No Digital IDs generated yet</p>
                  <Button 
                    onClick={() => navigate('/generate-digital-id')}
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    Create Your First Digital ID
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="safety" className="space-y-6">
          <TabsList>
            <TabsTrigger value="safety">Safety Zones</TabsTrigger>
            <TabsTrigger value="tracking">Location Tracking</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="safety" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nearby Safety Zones</CardTitle>
                <CardDescription>Safety information for your current area</CardDescription>
              </CardHeader>
              <CardContent>
                {nearbyZones.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No safety zones found in your area</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {nearbyZones.map((zone) => (
                      <div key={zone.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">{zone.name}</h3>
                              <Badge className={getZoneTypeColor(zone.type)}>
                                {zone.type.toUpperCase()}
                              </Badge>
                              <Badge className={getRiskLevelColor(zone.riskLevel)}>
                                {zone.riskLevel.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {zone.description}
                            </p>
                            {zone.alertMessage && (
                              <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                                <p className="text-sm text-yellow-800">
                                  <strong>Alert:</strong> {zone.alertMessage}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Location Tracking</CardTitle>
                <CardDescription>Your location history and tracking preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Location tracking features coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>Manage your tourist profile and emergency contacts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <p className="text-sm text-gray-900">{user?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-sm text-gray-900">{user?.profile?.phoneNumber || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nationality</label>
                    <p className="text-sm text-gray-900">{user?.profile?.nationality || 'Not provided'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your safety preferences and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Settings panel coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
