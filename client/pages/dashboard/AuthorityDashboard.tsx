import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Activity,
  TrendingUp,
  Navigation
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SOSAlert {
  id: string;
  touristId: string;
  location: { latitude: number; longitude: number };
  alertType: 'panic' | 'medical' | 'security' | 'lost' | 'other';
  message?: string;
  status: 'active' | 'responded' | 'resolved' | 'false_alarm';
  timestamp: string;
  respondingUnits: string[];
}

interface IncidentReport {
  id: string;
  type: 'missing_person' | 'medical_emergency' | 'security_threat' | 'accident' | 'other';
  touristId: string;
  location: { latitude: number; longitude: number };
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'investigating' | 'resolved' | 'closed';
  timestamp: string;
}

export default function AuthorityDashboard() {
  const { user, logout } = useAuth();
  const [sosAlerts, setSosAlerts] = useState<SOSAlert[]>([]);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    // Set up real-time updates (in a real app, this would be WebSocket)
    const interval = setInterval(fetchDashboardData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch SOS alerts
      const sosResponse = await fetch('/api/sos/active');
      const sosData = await sosResponse.json();
      if (sosData.success) {
        setSosAlerts(sosData.data || []);
      }

      // Fetch incident reports
      const incidentsResponse = await fetch('/api/incidents');
      const incidentsData = await incidentsResponse.json();
      if (incidentsData.success) {
        setIncidents(incidentsData.data || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSOSResponse = async (alertId: string) => {
    try {
      const response = await fetch(`/api/sos/${alertId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'responded' }),
      });
      
      if (response.ok) {
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error responding to SOS:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'panic': return 'bg-red-100 text-red-800';
      case 'medical': return 'bg-blue-100 text-blue-800';
      case 'security': return 'bg-orange-100 text-orange-800';
      case 'lost': return 'bg-yellow-100 text-yellow-800';
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
              <h1 className="text-3xl font-bold text-gray-900">Emergency Control Center</h1>
              <p className="text-gray-600">Welcome, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-100 text-green-800">
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
        {/* Emergency Alerts */}
        {sosAlerts.length > 0 && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>{sosAlerts.length} active emergency alert(s)</strong> require immediate attention.
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{sosAlerts.length}</div>
              <p className="text-xs text-muted-foreground">
                Emergency alerts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Incidents</CardTitle>
              <Shield className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{incidents.length}</div>
              <p className="text-xs text-muted-foreground">
                Total incidents
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Clock className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2m</div>
              <p className="text-xs text-muted-foreground">
                Average response
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground">
                Resolution rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="alerts">Emergency Alerts</TabsTrigger>
            <TabsTrigger value="incidents">Incident Reports</TabsTrigger>
            <TabsTrigger value="map">Live Map</TabsTrigger>
            <TabsTrigger value="units">Police Units</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Emergency Alerts</CardTitle>
                <CardDescription>Real-time emergency notifications</CardDescription>
              </CardHeader>
              <CardContent>
                {sosAlerts.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-gray-500">No active emergency alerts</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sosAlerts.map((alert) => (
                      <div key={alert.id} className="border rounded-lg p-4 bg-red-50 border-red-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={getAlertTypeColor(alert.alertType)}>
                                {alert.alertType.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className="bg-red-100 text-red-800">
                                {alert.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Tourist ID: {alert.touristId}
                            </p>
                            {alert.message && (
                              <p className="text-sm text-gray-800 mb-2">
                                Message: {alert.message}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">
                              {new Date(alert.timestamp).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              Location: {alert.location.latitude.toFixed(4)}, {alert.location.longitude.toFixed(4)}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleSOSResponse(alert.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Respond
                            </Button>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Incident Reports</CardTitle>
                <CardDescription>All reported incidents and their status</CardDescription>
              </CardHeader>
              <CardContent>
                {incidents.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No incident reports</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {incidents.map((incident) => (
                      <div key={incident.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={getSeverityColor(incident.severity)}>
                                {incident.severity.toUpperCase()}
                              </Badge>
                              <Badge variant="outline">
                                {incident.type.replace('_', ' ').toUpperCase()}
                              </Badge>
                              <Badge variant="outline">
                                {incident.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Tourist ID: {incident.touristId}
                            </p>
                            <p className="text-sm text-gray-800 mb-2">
                              {incident.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(incident.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Investigate
                            </Button>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Emergency Map</CardTitle>
                <CardDescription>Real-time location tracking and emergency zones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Interactive map coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="units" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Police Units</CardTitle>
                <CardDescription>Available police units and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Police unit management coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
