import React, { useState, useEffect } from 'react';
import {
  Shield, MapPin, Navigation, Camera, MessageCircle, Phone, AlertTriangle,
  Map, Users, Calendar, Star, Clock, Wifi, Battery, Signal, Menu,
  Search, Heart, Share2, Filter, ChevronLeft, ChevronRight, Play,
  Globe, Zap, Eye, Bell, Settings, User, Home, Compass, ScanLine
} from 'lucide-react';

const TouristAppPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentLocation, setCurrentLocation] = useState('Paris, France');
  const [safetyScore, setSafetyScore] = useState(86);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for tourist attractions
  const attractions = [
    {
      id: 1,
      name: "Eiffel Tower",
      distance: "0.5 km",
      rating: 4.8,
      category: "Monument",
      safetyScore: 95,
      crowdLevel: "High",
      image: "🗼",
      description: "Iconic iron lattice tower and symbol of Paris"
    },
    {
      id: 2,
      name: "Louvre Museum",
      distance: "1.2 km",
      rating: 4.9,
      category: "Museum",
      safetyScore: 92,
      crowdLevel: "Medium",
      image: "🏛️",
      description: "World's largest art museum"
    },
    {
      id: 3,
      name: "Notre-Dame Cathedral",
      distance: "0.8 km",
      rating: 4.7,
      category: "Historical",
      safetyScore: 88,
      crowdLevel: "Low",
      image: "⛪",
      description: "Medieval Catholic cathedral"
    }
  ];

  const emergencyContacts = [
    { name: "Police", number: "17", icon: Shield },
    { name: "Medical", number: "15", icon: Heart },
    { name: "Fire", number: "18", icon: AlertTriangle },
    { name: "Tourist Helpline", number: "+33 1 42 97 48 16", icon: Phone }
  ];

  const safetyAlerts = [
    {
      id: 1,
      type: "info",
      title: "High Tourist Area",
      message: "Be aware of pickpockets in crowded areas",
      location: "Near Eiffel Tower",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "warning",
      title: "Weather Alert",
      message: "Heavy rain expected this evening",
      location: "City-wide",
      time: "1 hour ago"
    }
  ];

  const renderPhoneHeader = () => (
    <div className="bg-black text-white px-4 py-1 flex items-center justify-between text-sm">
      <div className="flex items-center space-x-1">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
      </div>
      <div className="font-mono">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="flex items-center space-x-1">
        <Battery className="w-3 h-3" />
        <span>85%</span>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-4">
      {/* Location & Safety Score */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6" />
            <div>
              <h2 className="text-lg font-bold">{currentLocation}</h2>
              <p className="text-blue-200 text-sm">Current Location</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{safetyScore}</div>
            <div className="text-blue-200 text-sm">Safety Score</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span className="text-sm">AI Monitoring</span>
            </div>
            <div className="text-lg font-semibold mt-1">Active</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Geo-fence</span>
            </div>
            <div className="text-lg font-semibold mt-1">Enabled</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-red-500 text-white p-4 rounded-xl flex flex-col items-center space-y-2 hover:bg-red-600 transition-colors">
          <Bell className="w-6 h-6" />
          <span className="font-semibold">Panic Alert</span>
        </button>
        <button className="bg-green-500 text-white p-4 rounded-xl flex flex-col items-center space-y-2 hover:bg-green-600 transition-colors">
          <ScanLine className="w-6 h-6" />
          <span className="font-semibold">Scan QR ID</span>
        </button>
      </div>

      {/* Safety Alerts */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
          Safety Alerts
        </h3>
        <div className="space-y-3">
          {safetyAlerts.map(alert => (
            <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
              alert.type === 'warning' ? 'bg-amber-50 border-amber-500' : 'bg-blue-50 border-blue-500'
            }`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{alert.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>{alert.location}</span>
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
          <Phone className="w-5 h-5 mr-2 text-red-500" />
          Emergency Contacts
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {emergencyContacts.map((contact, index) => (
            <button
              key={index}
              className="bg-red-50 hover:bg-red-100 p-3 rounded-lg flex items-center space-x-3 transition-colors"
            >
              <contact.icon className="w-5 h-5 text-red-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-800 text-sm">{contact.name}</div>
                <div className="text-xs text-gray-600">{contact.number}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderExplore = () => (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search attractions..."
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="bg-white p-3 rounded-xl border border-gray-200">
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['All', 'Monument', 'Museum', 'Restaurant', 'Park', 'Shopping'].map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              category === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Attractions List */}
      <div className="space-y-4">
        {attractions.map(attraction => (
          <div key={attraction.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{attraction.image}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{attraction.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{attraction.description}</p>

                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{attraction.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Navigation className="w-4 h-4 text-blue-500" />
                          <span>{attraction.distance}</span>
                        </div>
                      </div>
                    </div>
                    <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">{attraction.safetyScore}% Safe</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-orange-600">{attraction.crowdLevel} crowd</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        Navigate
                      </button>
                      <button className="border border-gray-200 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Live Safety Map</h2>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">
            Heat Map
          </button>
          <button className="border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm">
            Satellite
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl h-80 relative overflow-hidden">
        {/* Mock map with safety zones */}
        <div className="absolute inset-0 p-4">
          <div className="relative w-full h-full">
            {/* Safe zones (green) */}
            <div className="absolute top-4 left-4 w-16 h-16 bg-green-400 rounded-full opacity-70 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="absolute top-20 right-8 w-12 h-12 bg-green-400 rounded-full opacity-70"></div>

            {/* Tourist attractions */}
            <div className="absolute top-16 left-20 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="absolute bottom-16 right-16 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>

            {/* Warning zones (amber) */}
            <div className="absolute bottom-8 left-12 w-10 h-10 bg-amber-400 rounded-full opacity-70 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>

            {/* Current location */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
              <div className="w-8 h-8 bg-blue-600 rounded-full opacity-20 absolute -top-2 -left-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Map Legend</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Safe Zone</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
            <span>Caution Area</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span>Tourist Attraction</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Alert Zone</span>
          </div>
        </div>
      </div>

      {/* Nearby Incidents */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <Eye className="w-4 h-4 mr-2" />
          Real-time Monitoring
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Anomaly Detection</span>
            <span className="text-green-600 font-medium">Active</span>
          </div>
          <div className="flex justify-between">
            <span>Crowd Density Analysis</span>
            <span className="text-green-600 font-medium">Normal</span>
          </div>
          <div className="flex justify-between">
            <span>Weather Monitoring</span>
            <span className="text-amber-600 font-medium">Rain Expected</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile App Container */}
      <div className="max-w-md mx-auto bg-white shadow-2xl">
        {/* Phone Header */}
        {renderPhoneHeader()}

        {/* App Header */}
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6" />
              <div>
                <h1 className="font-bold">Smart Tourist</h1>
                <p className="text-blue-200 text-sm">Stay Safe • Explore More</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 cursor-pointer" />
              <User className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 pb-20 min-h-screen bg-gray-50">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'explore' && renderExplore()}
          {activeTab === 'map' && renderMap()}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center py-3 px-4 ${
                activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs mt-1">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex flex-col items-center py-3 px-4 ${
                activeTab === 'explore' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Compass className="w-5 h-5" />
              <span className="text-xs mt-1">Explore</span>
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`flex flex-col items-center py-3 px-4 ${
                activeTab === 'map' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Map className="w-5 h-5" />
              <span className="text-xs mt-1">Safety Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Info Panel */}
      <div className="hidden lg:block fixed top-4 right-4 w-80 bg-white rounded-2xl shadow-2xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">App Features</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-800">Real-time Safety</h3>
              <p className="text-sm text-gray-600">AI-powered anomaly detection and geo-fencing alerts</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Map className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-800">Interactive Maps</h3>
              <p className="text-sm text-gray-600">Heat maps showing crowd density and safety zones</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Bell className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-800">Panic Alerts</h3>
              <p className="text-sm text-gray-600">Instant emergency notifications with location sharing</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Globe className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-800">Multi-language</h3>
              <p className="text-sm text-gray-600">Support for 10+ languages with local insights</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-blue-800">Smart Features</span>
          </div>
          <p className="text-sm text-blue-700">
            Blockchain-verified Digital ID • E2E Encryption • Privacy-first Design
          </p>
        </div>
      </div>
    </div>
  );
};

export default TouristAppPage;