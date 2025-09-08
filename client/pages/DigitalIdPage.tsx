import React, { useState } from 'react';
import { Shield, User, Calendar, Phone, MapPin, Clock, FileText, CheckCircle, AlertCircle, Download, Share2 } from 'lucide-react';

const DigitalIdPage = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [formData, setFormData] = useState({
    fullName: '',
    nationality: '',
    passportNumber: '',
    email: '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    destination: '',
    checkIn: '',
    checkOut: '',
    accommodation: '',
    itinerary: ''
  });

  const [generatedId, setGeneratedId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateDigitalId = () => {
    setIsGenerating(true);

    // Simulate ID generation process
    setTimeout(() => {
      const id = {
        idNumber: `STS-${Date.now().toString().slice(-8)}`,
        qrCode: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#f0f8ff"/><text x="50" y="50" text-anchor="middle" dy=".3em" font-family="monospace" font-size="8">QR-${Date.now().toString().slice(-6)}</text></svg>`)}`,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'active',
        blockchain: `0x${Math.random().toString(16).substr(2, 40)}`,
        ...formData
      };
      setGeneratedId(id);
      setIsGenerating(false);
      setActiveTab('view');
    }, 2000);
  };

  const isFormValid = () => {
    return formData.fullName && formData.nationality && formData.passportNumber &&
           formData.email && formData.phone && formData.emergencyContact &&
           formData.destination && formData.checkIn && formData.checkOut;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Digital ID Generation</h1>
                <p className="text-gray-600">Issue time-bound tourist IDs with KYC, itinerary and emergency contacts on blockchain</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                New • Northeast ready
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-lg mb-6">
          <button
            onClick={() => setActiveTab('generate')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'generate'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Generate ID
          </button>
          <button
            onClick={() => setActiveTab('view')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'view'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            View Digital ID
          </button>
        </div>

        {/* Generate ID Tab */}
        {activeTab === 'generate' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tourist Information & KYC</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Personal Details
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                    <select
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select nationality</option>
                      <option value="USA">United States</option>
                      <option value="GBR">United Kingdom</option>
                      <option value="CAN">Canada</option>
                      <option value="AUS">Australia</option>
                      <option value="DEU">Germany</option>
                      <option value="FRA">France</option>
                      <option value="JPN">Japan</option>
                      <option value="IND">India</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
                    <input
                      type="text"
                      name="passportNumber"
                      value={formData.passportNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter passport number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Emergency & Travel Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency & Travel Info
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Emergency contact name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Phone</label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Emergency contact phone"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Travel destination"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Accommodation</label>
                    <input
                      type="text"
                      name="accommodation"
                      value={formData.accommodation}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Hotel/accommodation name"
                    />
                  </div>
                </div>
              </div>

              {/* Itinerary */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Travel Itinerary</label>
                <textarea
                  name="itinerary"
                  value={formData.itinerary}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of planned activities and locations..."
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={generateDigitalId}
                disabled={!isFormValid() || isGenerating}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Digital ID...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Generate Digital ID
                  </>
                )}
              </button>
            </div>

            {/* Features Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Features</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">E2E Encryption</p>
                      <p className="text-sm text-gray-600">Military-grade encryption for data protection</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Blockchain Verified</p>
                      <p className="text-sm text-gray-600">Tamper-proof records on blockchain</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Time-bound Validity</p>
                      <p className="text-sm text-gray-600">Automatic expiry based on travel dates</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Multi-language Support</p>
                      <p className="text-sm text-gray-600">Available in 10+ languages</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Safety Score: 86</h3>
                <p className="text-blue-100 mb-4">Your region has high safety ratings</p>
                <div className="w-full bg-blue-500 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Digital ID Tab */}
        {activeTab === 'view' && generatedId && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Digital ID Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Shield className="w-8 h-8" />
                  <div>
                    <h2 className="text-lg font-bold">Smart Tourist ID</h2>
                    <p className="text-blue-200 text-sm">Blockchain Verified</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-200">ID Number</p>
                  <p className="font-mono font-bold">{generatedId.idNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-blue-200 text-sm mb-1">Full Name</p>
                  <p className="font-semibold">{generatedId.fullName}</p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-1">Nationality</p>
                  <p className="font-semibold">{generatedId.nationality}</p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-1">Destination</p>
                  <p className="font-semibold">{generatedId.destination}</p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-1">Valid Until</p>
                  <p className="font-semibold">{generatedId.validUntil}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-blue-500">
                <div className="bg-white p-2 rounded-lg">
                  <img src={generatedId.qrCode} alt="QR Code" className="w-16 h-16" />
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Active</span>
                  </div>
                  <p className="text-xs text-blue-200 font-mono">
                    {generatedId.blockchain.slice(0, 20)}...
                  </p>
                </div>
              </div>
            </div>

            {/* ID Details & Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Emergency Contacts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{generatedId.emergencyContact}</p>
                      <p className="text-sm text-gray-600">{generatedId.emergencyPhone}</p>
                    </div>
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Local Emergency</p>
                      <p className="text-sm text-gray-600">112 (EU)</p>
                    </div>
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Travel Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Accommodation</p>
                      <p className="text-sm text-gray-600">{generatedId.accommodation || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Stay Duration</p>
                      <p className="text-sm text-gray-600">{generatedId.checkIn} to {generatedId.checkOut}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Itinerary</p>
                      <p className="text-sm text-gray-600">{generatedId.itinerary || 'No itinerary provided'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
                <button className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No ID Generated State */}
        {activeTab === 'view' && !generatedId && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Digital ID Generated</h3>
            <p className="text-gray-600 mb-6">Generate your digital tourist ID to view it here</p>
            <button
              onClick={() => setActiveTab('generate')}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Generate ID Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalIdPage;