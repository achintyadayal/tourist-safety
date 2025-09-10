import React, { useState } from 'react';
import {
  Shield, Lock, Globe, Clock, CheckCircle, Star, ArrowRight,
  Smartphone, Key, Users, Zap, Eye, FileText, Phone, MapPin,
  Play, ChevronDown, ChevronRight
} from 'lucide-react';

const DigitalIdLanding = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const features = [
    {
      icon: Lock,
      title: "Blockchain Security",
      description: "Military-grade encryption with tamper-proof blockchain verification ensures your data stays secure and authentic."
    },
    {
      icon: Clock,
      title: "Time-bound Validity",
      description: "Smart contracts automatically manage ID expiration based on your travel dates, ensuring optimal security."
    },
    {
      icon: Globe,
      title: "Global Recognition",
      description: "Accepted by authorities worldwide with multi-language support and international compliance standards."
    },
    {
      icon: Smartphone,
      title: "Instant Access",
      description: "QR code generation for quick verification by authorities, hotels, and emergency services anywhere."
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Enhanced Safety",
      description: "Authorities can instantly access your emergency contacts and medical information in crisis situations."
    },
    {
      icon: Zap,
      title: "Faster Processing",
      description: "Skip long verification queues with instant digital identity confirmation at checkpoints."
    },
    {
      icon: Eye,
      title: "Privacy Protected",
      description: "You control what information is shared and with whom, maintaining complete privacy control."
    },
    {
      icon: Users,
      title: "Family Friendly",
      description: "Link family members' IDs together for group travel management and emergency coordination."
    }
  ];

  const steps = [
    {
      step: 1,
      title: "Complete KYC Verification",
      description: "Provide your personal details, passport information, and emergency contacts through our secure form."
    },
    {
      step: 2,
      title: "Add Travel Information",
      description: "Enter your destination, accommodation details, and planned itinerary for enhanced safety monitoring."
    },
    {
      step: 3,
      title: "Blockchain Generation",
      description: "Our system creates your encrypted digital ID and stores it securely on the blockchain network."
    },
    {
      step: 4,
      title: "Instant Verification",
      description: "Receive your QR code and digital wallet for immediate use with authorities and service providers."
    }
  ];

  const faqs = [
    {
      question: "How secure is my personal information?",
      answer: "Your data is protected with military-grade E2E encryption and stored on blockchain for tamper-proof security. Only you control access permissions."
    },
    {
      question: "Which countries accept the Digital Tourist ID?",
      answer: "Our Digital ID is recognized by tourism authorities in over 50 countries and growing, with partnerships expanding globally."
    },
    {
      question: "How long does the ID remain valid?",
      answer: "Your Digital ID automatically expires based on your travel dates but can be extended or renewed as needed for future trips."
    },
    {
      question: "Can I update my information after creation?",
      answer: "Yes, you can update emergency contacts and travel information. Critical identity details require re-verification for security."
    },
    {
      question: "What if I lose my phone?",
      answer: "Your Digital ID is backed up on blockchain. You can recover it using your secure backup codes and verify your identity."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Tourist from Canada",
      rating: 5,
      text: "The Digital ID saved me hours at checkpoints during my Europe trip. Authorities verified my information instantly!"
    },
    {
      name: "Marco Rodriguez",
      location: "Business Traveler",
      rating: 5,
      text: "As someone who travels frequently, this is a game-changer. Secure, fast, and accepted everywhere I go."
    },
    {
      name: "Lisa Chen",
      location: "Family Traveler",
      rating: 5,
      text: "Being able to link my family's IDs together gave me peace of mind. Emergency services had all our information instantly."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
                  New • Blockchain Verified
                </span>
              </div>

              <h1 className="text-5xl font-bold leading-tight mb-6">
                Your Digital Tourist Identity,
                <span className="text-blue-200"> Secured by Blockchain</span>
              </h1>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Issue time-bound tourist IDs with KYC verification, emergency contacts, and travel itinerary.
                All secured with military-grade encryption and blockchain technology for global recognition.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Generate Digital ID
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-8 mt-12 text-blue-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Blockchain Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Globally Accepted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Privacy First</span>
                </div>
              </div>
            </div>

            {/* Digital ID Preview */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-6 h-6" />
                      <div>
                        <h3 className="font-bold">Smart Tourist ID</h3>
                        <p className="text-blue-200 text-sm">Blockchain Verified</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-200 text-sm">ID Number</p>
                      <p className="font-mono font-bold">STS-24681357</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-blue-200 text-sm">Full Name</p>
                      <p className="font-semibold">John Smith</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Nationality</p>
                      <p className="font-semibold">United States</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Destination</p>
                      <p className="font-semibold">Paris, France</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Valid Until</p>
                      <p className="font-semibold">Oct 15, 2024</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-blue-400">
                    <div className="bg-white p-2 rounded">
                      <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-mono">QR</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-300" />
                        <span className="text-sm">Active</span>
                      </div>
                      <p className="text-xs text-blue-200 font-mono">0x1234...abcd</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                ✓ Verified
              </div>
              <div className="absolute -bottom-4 -left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                🔒 Encrypted
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Digital Tourist ID?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge technology to provide the most secure, efficient, and user-friendly
              digital identity solution for modern travelers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get your blockchain-verified Digital Tourist ID in just 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-400 mx-auto mt-6 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Benefits for Travelers
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of travel with enhanced safety, speed, and convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Travelers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users say about their Digital ID experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about Digital Tourist ID
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  {expandedFaq === index ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Your Digital Tourist ID?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of smart travelers who trust blockchain technology for secure,
            convenient digital identity verification.
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center">
              <Shield className="w-5 h-5 mr-2" />
              Generate Your Digital ID
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-blue-100">
            <div>
              <div className="text-3xl font-bold text-white mb-2">256-bit</div>
              <div>Encryption Security</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div>Countries Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div>Global Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalIdLanding;