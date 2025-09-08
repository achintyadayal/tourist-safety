import React, { useState } from 'react';
import {
  Bell, AlertTriangle, Info, CheckCircle, Clock, MapPin, Filter, Search
} from 'lucide-react';

const Alerts = () => {
  const [filterType, setFilterType] = useState('all');

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Crowd Density Alert',
      message: 'Unusually high tourist concentration detected in the area. Please exercise caution.',
      location: 'Eiffel Tower, Paris',
      time: '2 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'info',
      title: 'Weather Update',
      message: 'Light rain expected in the next 2 hours. Plan indoor activities.',
      location: 'City-wide, Paris',
      time: '15 minutes ago',
      status: 'active'
    },
    {
      id: 3,
      type: 'emergency',
      title: 'Route Deviation Detected',
      message: 'You have moved outside your planned itinerary area.',
      location: 'Montmartre District',
      time: '1 hour ago',
      status: 'resolved'
    },
    {
      id: 4,
      type: 'info',
      title: 'Geo-fence Entry',
      message: 'Welcome to a monitored tourist area. Enhanced safety features are now active.',
      location: 'Louvre Museum Area',
      time: '3 hours ago',
      status: 'resolved'
    },
    {
      id: 5,
      type: 'warning',
      title: 'Security Advisory',
      message: 'Increased security presence due to local event. No immediate concern.',
      location: 'Champs-Élysées',
      time: '5 hours ago',
      status: 'resolved'
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'emergency':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'emergency':
        return 'border-l-red-500 bg-red-50';
      case 'warning':
        return 'border-l-amber-500 bg-amber-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  const filteredAlerts = filterType === 'all'
    ? alerts
    : alerts.filter(alert => alert.status === filterType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                <Bell className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
                <p className="text-gray-600">Real-time safety notifications and updates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Alerts
              </button>
              <button
                onClick={() => setFilterType('active')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'active'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterType('resolved')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'resolved'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Resolved
              </button>
            </div>

            <div className="text-sm text-gray-600">
              {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map(alert => (
              <div
                key={alert.id}
                className={`bg-white rounded-xl shadow-lg border-l-4 ${getAlertColor(alert.type)} p-6`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getAlertIcon(alert.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {alert.title}
                        </h3>
                        <p className="text-gray-700 mb-3">
                          {alert.message}
                        </p>

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

                      <div className="flex items-center space-x-2 ml-4">
                        {alert.status === 'active' ? (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                            Active
                          </span>
                        ) : (
                          <div className="flex items-center space-x-1 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Resolved</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Alerts Found</h3>
              <p className="text-gray-600">
                {filterType === 'all'
                  ? 'You have no alerts at this time.'
                  : `No ${filterType} alerts found.`
                }
              </p>
            </div>
          )}
        </div>

        {/* Alert Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Alert Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {alerts.filter(a => a.type === 'emergency').length}
              </div>
              <div className="text-sm text-red-700 font-medium">Emergency</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">
                {alerts.filter(a => a.type === 'warning').length}
              </div>
              <div className="text-sm text-amber-700 font-medium">Warning</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {alerts.filter(a => a.type === 'info').length}
              </div>
              <div className="text-sm text-blue-700 font-medium">Information</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;