import React, { useState, useEffect } from 'react';
import {
  Shield, MapPin, AlertTriangle, Users, Star, Download, Smartphone,
  Heart, Clock, Globe, Zap, Eye, Lock, ArrowRight, Play, CheckCircle,
  Wifi, Camera, MessageSquare, Phone, Navigation, Award, TrendingUp,
  Building2, Plane, Car, Hotel, Coffee, Mountain, Compass, Route,
  Battery, Signal, Share2, UserCheck, Settings, Bell, Search, Map
} from 'lucide-react';

const TouristAppLanding = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="section-"]').forEach((el) => {
      observer.observe(el);
    });

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const heroStats = [
    { number: "4.9★", label: "App Store Rating", icon: Star },
    { number: "500K+", label: "Active Travelers", icon: Users },
    { number: "180+", label: "Countries Covered", icon: Globe },
    { number: "99.9%", label: "Safety Success Rate", icon: Shield }
  ];

  const coreFeatures = [
    {
      icon: TrendingUp,
      title: "Tourist Safety Score",
      subtitle: "AI-Powered Risk Assessment",
      description: "Get personalized safety scores based on your travel patterns, destination risk levels, and real-time conditions",
      detail: "Our advanced AI analyzes over 50 safety factors including crime rates, natural disasters, political stability, and your specific travel behavior to give you a comprehensive safety score from 1-100.",
      color: "from-green-400 to-emerald-500",
      benefits: ["Personalized risk assessment", "Real-time score updates", "Travel pattern analysis", "Area-specific insights"]
    },
    {
      icon: MapPin,
      title: "Smart Geo-Fencing",
      subtitle: "Proactive Safety Alerts",
      description: "Receive instant notifications when entering high-risk zones, restricted areas, or potentially dangerous locations",
      detail: "Advanced geo-fencing technology monitors your location and sends immediate alerts with safety recommendations, alternative routes, and emergency contacts when you approach risky areas.",
      color: "from-orange-400 to-red-500",
      benefits: ["Real-time zone monitoring", "Instant safety alerts", "Alternative route suggestions", "Restricted area warnings"]
    },
    {
      icon: AlertTriangle,
      title: "Emergency Panic Button",
      subtitle: "Instant Help When Needed",
      description: "One-tap emergency assistance with live location sharing to police, emergency services, and your trusted contacts",
      detail: "The panic button instantly connects you with the nearest police unit, shares your exact location with emergency contacts, and can even trigger silent alerts for discreet help requests.",
      color: "from-red-400 to-pink-500",
      benefits: ["One-tap emergency activation", "Live location sharing", "Silent alert options", "Multi-channel notifications"]
    },
    {
      icon: Eye,
      title: "Family Tracking",
      subtitle: "Stay Connected & Safe",
      description: "Optional real-time location sharing with family members and trusted contacts for peace of mind during travels",
      detail: "Choose who can see your location and when. Perfect for solo travelers, families with children, or group trips where staying connected is essential for safety.",
      color: "from-blue-400 to-purple-500",
      benefits: ["Privacy-controlled sharing", "Family group tracking", "Check-in reminders", "Safe arrival notifications"]
    }
  ];

  const appScreens = [
    {
      screen: "Safety Dashboard",
      description: "View your current safety score, nearby alerts, and quick access to emergency features",
      color: "from-green-500 to-emerald-600"
    },
    {
      screen: "Zone Alerts",
      description: "Real-time notifications about area risks, restrictions, and safety recommendations",
      color: "from-orange-500 to-red-500"
    },
    {
      screen: "Emergency Panel",
      description: "Quick access to panic button, emergency contacts, and location sharing controls",
      color: "from-red-500 to-pink-500"
    },
    {
      screen: "Family Connect",
      description: "Manage location sharing, view family member locations, and set up check-in schedules",
      color: "from-blue-500 to-purple-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Solo Traveler from New York",
      image: "/api/placeholder/60/60",
      quote: "The panic button saved me when I got lost in Bangkok at night. Police found me within 10 minutes!",
      rating: 5,
      verified: true
    },
    {
      name: "Michael Chen",
      location: "Family Traveler from Singapore",
      image: "/api/placeholder/60/60",
      quote: "Being able to track my teenage kids while exploring Rome gave me such peace of mind. The geo-fencing alerts are incredibly helpful.",
      rating: 5,
      verified: true
    },
    {
      name: "Emma Rodriguez",
      location: "Adventure Traveler from Madrid",
      image: "/api/placeholder/60/60",
      quote: "The safety score helped me avoid dangerous areas in several countries. It's like having a local safety expert with you everywhere.",
      rating: 5,
      verified: true
    }
  ];

  const safetyFeatures = [
    { icon: Shield, title: "256-bit Encryption", description: "Military-grade security for all your data" },
    { icon: Lock, title: "Privacy First", description: "You control what data is shared and with whom" },
    { icon: Eye, title: "Offline Mode", description: "Core safety features work without internet" },
    { icon: Battery, title: "Low Power Mode", description: "Optimized for extended battery life while traveling" }
  ];

  const integrations = [
    { name: "Google Maps", icon: Map, color: "text-green-600" },
    { name: "Emergency Services", icon: Phone, color: "text-red-600" },
    { name: "Hotels & Booking", icon: Hotel, color: "text-blue-600" },
    { name: "Transportation", icon: Car, color: "text-purple-600" },
    { name: "Travel Insurance", icon: Shield, color: "text-orange-600" },
    { name: "Embassy Services", icon: Building2, color: "text-indigo-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative px-4 py-8">
        {/* Hero Section */}
        <div id="section-hero" className={`text-center mb-16 transition-all duration-1000 ${isVisible['section-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg border border-blue-100">
            <Award className="w-5 h-5 mr-2 text-blue-600" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              #1 Travel Safety App • Featured by Google Play & App Store
            </span>
          </div>

          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            Travel Fearlessly.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Stay Protected.
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            The ultimate travel safety companion with AI-powered risk assessment,
            real-time alerts, and emergency features that keep you safe wherever you explore.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transform text-lg">
              <Download className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Download Free
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group bg-white/90 backdrop-blur-sm text-gray-700 px-10 py-5 rounded-2xl font-semibold hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl border border-gray-200 text-lg">
              <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
          </div>

          <div className="flex justify-center space-x-4">
            <div className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg hover:scale-105 transition-transform cursor-pointer">
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <div className="text-black text-xs font-bold">▶</div>
              </div>
              <div className="text-left">
                <div className="text-xs">GET IT ON</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </div>

            <div className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg hover:scale-105 transition-transform cursor-pointer">
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <div className="text-black text-xs font-bold">🍎</div>
              </div>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div id="section-stats" className={`mb-20 transition-all duration-1000 delay-200 ${isVisible['section-stats'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {heroStats.map((stat, i) => (
              <div key={i} className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-white/50">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Features Section */}
        <div id="section-features" className={`mb-20 transition-all duration-1000 delay-300 ${isVisible['section-features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Your Travel Safety Toolkit
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI and real-time technology working together to keep you safe on every adventure
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Details */}
            <div className="space-y-8">
              {coreFeatures.map((feature, i) => (
                <div
                  key={i}
                  className={`group p-8 rounded-3xl cursor-pointer transition-all duration-500 ${
                    activeFeature === i
                      ? 'bg-white/90 backdrop-blur-sm shadow-2xl scale-105 border-l-4 border-blue-500'
                      : 'bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl hover:bg-white/80'
                  }`}
                  onClick={() => setActiveFeature(i)}
                >
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-blue-600 font-semibold text-sm mb-3">{feature.subtitle}</p>
                      <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>

                      {activeFeature === i && (
                        <div className="space-y-4 animate-pulse">
                          <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl">
                            {feature.detail}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {feature.benefits.map((benefit, j) => (
                              <div key={j} className="flex items-center text-green-700 text-sm">
                                <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                {benefit}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* App Screens Mockup */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-500">9:41 AM</div>
                  </div>

                  <div className={`text-center p-8 rounded-xl bg-gradient-to-br ${coreFeatures[activeFeature].color} text-white transition-all duration-500`}>
                    {React.createElement(coreFeatures[activeFeature].icon, { className: "w-16 h-16 mx-auto mb-4" })}
                    <h4 className="text-xl font-bold mb-2">{appScreens[activeFeature].screen}</h4>
                    <p className="text-sm opacity-90">{appScreens[activeFeature].description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {coreFeatures.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveFeature(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeFeature === i ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <MapPin className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Safety Features */}
        <div id="section-safety" className={`mb-20 transition-all duration-1000 delay-400 ${isVisible['section-safety'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Built for Privacy & Security
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your safety and privacy are our top priorities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, i) => (
              <div key={i} className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-white/50">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div id="section-integrations" className={`mb-20 transition-all duration-1000 delay-500 ${isVisible['section-integrations'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Seamlessly Connected
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Integrates with your favorite travel services and emergency systems
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {integrations.map((integration, i) => (
              <div key={i} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50">
                <integration.icon className={`w-10 h-10 mx-auto mb-3 ${integration.color}`} />
                <div className="text-sm font-semibold text-gray-700">{integration.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div id="section-testimonials" className={`mb-20 transition-all duration-1000 delay-600 ${isVisible['section-testimonials'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Travelers Love Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real travelers who stayed safe with our app
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50">
            <div className="text-center">
              <div className="mb-8">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl text-gray-700 font-medium mb-6 max-w-4xl mx-auto leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <div className="flex items-center space-x-2">
                    <div className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</div>
                    {testimonials[currentTestimonial].verified && (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <div className="text-gray-600">{testimonials[currentTestimonial].location}</div>
                </div>
              </div>

              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === currentTestimonial ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div id="section-final-cta" className={`text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-16 shadow-2xl transition-all duration-1000 delay-700 ${isVisible['section-final-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <Smartphone className="w-20 h-20 text-white mx-auto mb-6 animate-bounce" />
            <h2 className="text-5xl font-bold text-white mb-8">
              Your Next Adventure Awaits
            </h2>
            <p className="text-blue-100 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
              Join millions of travelers who explore the world fearlessly with our AI-powered safety companion.
              Download now and get premium features free for 30 days!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="group bg-white text-blue-600 px-12 py-6 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transform text-lg">
              <Download className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Download Free Now
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group border-2 border-white text-white px-12 py-6 rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center text-lg">
              <Share2 className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Share with Friends
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white/90 text-sm">
            <div className="flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Free to Download
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              30-Day Premium Trial
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Works Offline
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristAppLanding;