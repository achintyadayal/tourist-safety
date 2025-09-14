import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  User, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle,
  ArrowLeft,
  QrCode,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DigitalIdData {
  // Personal Information
  fullName: string;
  nationality: string;
  passportNumber: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  
  // Travel Information
  destination: string;
  arrivalDate: string;
  departureDate: string;
  accommodation: string;
  travelPurpose: string;
  
  // Emergency Contacts
  emergencyContact1: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  emergencyContact2: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  
  // Medical Information
  medicalConditions: string;
  medications: string;
  bloodType: string;
  allergies: string;
}

const GenerateDigitalId = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedId, setGeneratedId] = useState<any>(null);
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  const [formData, setFormData] = useState<DigitalIdData>({
    fullName: user?.name || '',
    nationality: '',
    passportNumber: '',
    dateOfBirth: '',
    phoneNumber: user?.profile?.phoneNumber || '',
    email: user?.email || '',
    destination: '',
    arrivalDate: '',
    departureDate: '',
    accommodation: '',
    travelPurpose: '',
    emergencyContact1: {
      name: '',
      relationship: '',
      phone: '',
      email: ''
    },
    emergencyContact2: {
      name: '',
      relationship: '',
      phone: '',
      email: ''
    },
    medicalConditions: '',
    medications: '',
    bloodType: '',
    allergies: ''
  });

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof DigitalIdData],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const generateId = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/digital-id/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        setGeneratedId(result.data);
        setShowPreview(true);
        // Refresh the dashboard to show the new Digital ID
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 3000); // Redirect after 3 seconds
      } else {
        alert('Failed to generate Digital ID: ' + result.error);
      }
    } catch (error) {
      console.error('Error generating Digital ID:', error);
      alert('Failed to generate Digital ID. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const steps = [
    { number: 1, title: 'Personal Info', description: 'Basic personal details' },
    { number: 2, title: 'Travel Details', description: 'Trip information' },
    { number: 3, title: 'Emergency Contacts', description: 'Emergency information' },
    { number: 4, title: 'Medical Info', description: 'Health information' },
    { number: 5, title: 'Review & Generate', description: 'Final review' }
  ];

  if (showPreview && generatedId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => setShowPreview(false)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Form
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Your Digital Tourist ID</h1>
            <p className="text-gray-600 mt-2">Successfully generated and ready to use</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Digital ID Card */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6" />
                    <div>
                      <CardTitle className="text-white">Smart Tourist ID</CardTitle>
                      <CardDescription className="text-blue-200">Blockchain Verified</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-200 text-sm">ID Number</p>
                    <p className="font-mono font-bold text-white">{generatedId.id}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-500 text-sm">Full Name</p>
                    <p className="font-semibold">{generatedId.fullName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Nationality</p>
                    <p className="font-semibold">{generatedId.nationality}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Destination</p>
                    <p className="font-semibold">{generatedId.destination}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Valid Until</p>
                    <p className="font-semibold">{new Date(generatedId.validUntil).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="bg-gray-100 p-2 rounded">
                    <img src={generatedId.qrCode} alt="QR Code" className="w-12 h-12" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Active</span>
                    </div>
                    <p className="text-xs text-gray-500 font-mono">{generatedId.blockchainHash}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your Digital ID</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" onClick={() => window.print()}>
                    <Download className="w-4 h-4 mr-2" />
                    Download ID Card
                  </Button>
                  <Button variant="outline" className="w-full">
                    <QrCode className="w-4 h-4 mr-2" />
                    Save QR Code
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    View Full Details
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Blockchain Hash</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowSensitiveData(!showSensitiveData)}
                      >
                        {showSensitiveData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
                      {showSensitiveData ? generatedId.blockchainHash : '••••••••••••••••••••••••••••••••••••••••'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(generatedId.createdAt).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Generate Your Digital Tourist ID</h1>
          <p className="text-gray-600 mt-2">Create a secure, blockchain-verified digital identity for your trip</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.number 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.number}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs value={currentStep.toString()} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                {steps.map((step) => (
                  <TabsTrigger key={step.number} value={step.number.toString()}>
                    {step.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Step 1: Personal Information */}
              <TabsContent value="1" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      placeholder="e.g., United States"
                    />
                  </div>
                  <div>
                    <Label htmlFor="passportNumber">Passport Number *</Label>
                    <Input
                      id="passportNumber"
                      value={formData.passportNumber}
                      onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                      placeholder="Enter passport number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Step 2: Travel Details */}
              <TabsContent value="2" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="destination">Destination *</Label>
                    <Input
                      id="destination"
                      value={formData.destination}
                      onChange={(e) => handleInputChange('destination', e.target.value)}
                      placeholder="e.g., Paris, France"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accommodation">Accommodation</Label>
                    <Input
                      id="accommodation"
                      value={formData.accommodation}
                      onChange={(e) => handleInputChange('accommodation', e.target.value)}
                      placeholder="Hotel name or address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="arrivalDate">Arrival Date *</Label>
                    <Input
                      id="arrivalDate"
                      type="date"
                      value={formData.arrivalDate}
                      onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="departureDate">Departure Date *</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={(e) => handleInputChange('departureDate', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="travelPurpose">Travel Purpose</Label>
                    <Textarea
                      id="travelPurpose"
                      value={formData.travelPurpose}
                      onChange={(e) => handleInputChange('travelPurpose', e.target.value)}
                      placeholder="e.g., Tourism, Business, Family visit..."
                      rows={3}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Step 3: Emergency Contacts */}
              <TabsContent value="3" className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Primary Emergency Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergency1Name">Name *</Label>
                        <Input
                          id="emergency1Name"
                          value={formData.emergencyContact1.name}
                          onChange={(e) => handleInputChange('emergencyContact1.name', e.target.value)}
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergency1Relationship">Relationship *</Label>
                        <Input
                          id="emergency1Relationship"
                          value={formData.emergencyContact1.relationship}
                          onChange={(e) => handleInputChange('emergencyContact1.relationship', e.target.value)}
                          placeholder="e.g., Spouse, Parent, Sibling"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergency1Phone">Phone *</Label>
                        <Input
                          id="emergency1Phone"
                          value={formData.emergencyContact1.phone}
                          onChange={(e) => handleInputChange('emergencyContact1.phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergency1Email">Email</Label>
                        <Input
                          id="emergency1Email"
                          type="email"
                          value={formData.emergencyContact1.email}
                          onChange={(e) => handleInputChange('emergencyContact1.email', e.target.value)}
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Secondary Emergency Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergency2Name">Name</Label>
                        <Input
                          id="emergency2Name"
                          value={formData.emergencyContact2.name}
                          onChange={(e) => handleInputChange('emergencyContact2.name', e.target.value)}
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergency2Relationship">Relationship</Label>
                        <Input
                          id="emergency2Relationship"
                          value={formData.emergencyContact2.relationship}
                          onChange={(e) => handleInputChange('emergencyContact2.relationship', e.target.value)}
                          placeholder="e.g., Friend, Colleague"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergency2Phone">Phone</Label>
                        <Input
                          id="emergency2Phone"
                          value={formData.emergencyContact2.phone}
                          onChange={(e) => handleInputChange('emergencyContact2.phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergency2Email">Email</Label>
                        <Input
                          id="emergency2Email"
                          type="email"
                          value={formData.emergencyContact2.email}
                          onChange={(e) => handleInputChange('emergencyContact2.email', e.target.value)}
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Step 4: Medical Information */}
              <TabsContent value="4" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Input
                      id="bloodType"
                      value={formData.bloodType}
                      onChange={(e) => handleInputChange('bloodType', e.target.value)}
                      placeholder="e.g., O+, A-, B+, AB-"
                    />
                  </div>
                  <div>
                    <Label htmlFor="allergies">Allergies</Label>
                    <Input
                      id="allergies"
                      value={formData.allergies}
                      onChange={(e) => handleInputChange('allergies', e.target.value)}
                      placeholder="e.g., Peanuts, Shellfish, Penicillin"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="medicalConditions">Medical Conditions</Label>
                    <Textarea
                      id="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                      placeholder="Any medical conditions or ongoing treatments..."
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      value={formData.medications}
                      onChange={(e) => handleInputChange('medications', e.target.value)}
                      placeholder="List any medications you're currently taking..."
                      rows={3}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Step 5: Review & Generate */}
              <TabsContent value="5" className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Your Information</h3>
                  <p className="text-gray-600">Please review all information before generating your Digital ID</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><span className="font-medium">Name:</span> {formData.fullName}</p>
                      <p><span className="font-medium">Nationality:</span> {formData.nationality}</p>
                      <p><span className="font-medium">Passport:</span> {formData.passportNumber}</p>
                      <p><span className="font-medium">DOB:</span> {formData.dateOfBirth}</p>
                      <p><span className="font-medium">Phone:</span> {formData.phoneNumber}</p>
                      <p><span className="font-medium">Email:</span> {formData.email}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Travel Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><span className="font-medium">Destination:</span> {formData.destination}</p>
                      <p><span className="font-medium">Arrival:</span> {formData.arrivalDate}</p>
                      <p><span className="font-medium">Departure:</span> {formData.departureDate}</p>
                      <p><span className="font-medium">Accommodation:</span> {formData.accommodation || 'Not specified'}</p>
                      <p><span className="font-medium">Purpose:</span> {formData.travelPurpose || 'Not specified'}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center">
                  <Button
                    onClick={generateId}
                    disabled={isGenerating}
                    className="px-8 py-3 text-lg"
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
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                disabled={currentStep === 5}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenerateDigitalId;
