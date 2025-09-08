import React, { useState } from 'react';
import {
  Shield, Users, AlertTriangle, Eye, MapPin, Clock,
  TrendingUp, Activity, CheckCircle, XCircle, Bell,
  Search, Filter, Download, Settings, BarChart3
} from 'lucide-react';

const AuthoritiesDashboard = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data for dashboard
  const stats = {
    totalTourists: 15247,
    activeAlerts: 3,
    safetyScore: 86,
    incidentsToday: 2,
    monitoringZones: 12,
    responseTime: '3.2 min'
  };

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Crowd Density',
      location: 'Eiffel Tower Area',
      time: '2 hours ago',
      status: 'active',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'info',
      title: 'Weather Advisory',
      location: 'City-wide',
      time: '4 hours ago',
      status: 'resolved',
      priority: 'low'
    },
    {
      id: 3,
      type: 'emergency',
      title: 'Tourist Assistance Request',
      location: 'Louvre Museum',
      time: '6 hours ago',
      status: 'resolved',
      priority: 'high'
    }
  ];

  const monitoringZones = [
    { name: 'Tourist District A', tourists: 2341, status: 'safe', alerts: 0 },
    { name: 'Historical Center', tourists: 1876, status: 'caution', alerts: 1 },
    { name: 'Museum Quarter', tourists: 1543, status: 'safe', alerts: 0 },
    { name: 'Shopping District', tourists: 987, status: 'safe', alerts: 0 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Authorities Dashboard</h1>
                <p className="text-gray-600">Real-time monitoring and incident response system</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Tourists</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTourists.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">{stats.activeAlerts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Safety Score</p>
                <p className="text-2xl font-bold text-green-600">{stats.safetyScore}</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Incidents Today</p>
                <p className="text-2xl font-bold text-orange-600">{stats.incidentsToday}</p>
              </div>
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Monitoring Zones</p>
                <p className="text-2xl font-bold text-purple-600">{stats.monitoringZones}</p>
              </div>
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Response</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.responseTime}</p>
              </div>
              <Clock className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Alerts */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Alerts</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter('active')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activeFilter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Active
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {recentAlerts
                .filter(alert => activeFilter === 'all' || alert.status === activeFilter)
                .map(alert => (
                <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${
                          alert.type === 'emergency' ? 'bg-red-500' :
                          alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                        }`}></div>
                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.priority === 'high' ? 'bg-red-100 text-red-700' :
                          alert.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {alert.priority}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{alert.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {alert.status === 'active' ? (
                        <div className="flex items-center space-x-1 text-red-600">
                          <XCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Resolved</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monitoring Zones */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Monitoring Zones</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {monitoringZones.map((zone, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{zone.name}</h3>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      zone.status === 'safe' ? 'bg-green-100 text-green-700' :
                      zone.status === 'caution' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {zone.status}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{zone.tourists} tourists</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bell className="w-4 h-4" />
                        <span>{zone.alerts} alerts</span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Monitor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">AI Monitoring</h3>
              <p className="text-green-600 text-sm font-medium">Operational</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Geo-fencing</h3>
              <p className="text-green-600 text-sm font-medium">Active</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Anomaly Detection</h3>
              <p className="text-green-600 text-sm font-medium">Running</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Alert System</h3>
              <p className="text-green-600 text-sm font-medium">Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthoritiesDashboard;