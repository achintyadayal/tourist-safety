import React, { useState, useEffect } from 'react';
import {
  Shield, Lock, Globe, Clock, CheckCircle, Star, Play, Zap, Eye, Users,
  ArrowRight, Smartphone, Award, HeartHandshake, MapPin, FileCheck
} from 'lucide-react';

const AppFeaturesPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState({});

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

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Lock,
      title: "Blockchain Security",
      description: "Military-grade encryption with tamper-proof blockchain verification.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Clock,
      title: "Time-bound Validity",
      description: "Smart contracts automatically manage ID expiration based on travel dates.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Globe,
      title: "Global Recognition",
      description: "Accepted by authorities worldwide with multilingual support.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Shield,
      title: "Instant Access",
      description: "QR code for quick verification by authorities, hotels, and emergency services.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const benefits = [
    {
      icon: HeartHandshake,
      title: "Enhanced Safety",
      description: "Authorities can access your emergency contacts and medical info instantly.",
      stat: "99.9%",
      statLabel: "Success Rate"
    },
    {
      icon: Zap,
      title: "Faster Processing",
      description: "Skip long verification queues with instant ID confirmation.",
      stat: "3 sec",
      statLabel: "Avg. Verification"
    },
    {
      icon: Eye,
      title: "Privacy Protected",
      description: "You control what information is shared and with whom.",
      stat: "256-bit",
      statLabel: "Encryption"
    },
    {
      icon: Users,
      title: "Family Friendly",
      description: "Link family members' IDs together for group travel management.",
      stat: "8 members",
      statLabel: "Max Family Size"
    }
  ];

  const steps = [
    {
      step: 1,
      title: "Complete KYC Verification",
      description: "Provide your personal details and emergency contacts.",
      icon: FileCheck,
      duration: "2-3 mins"
    },
    {
      step: 2,
      title: "Add Travel Information",
      description: "Enter destination, accommodation, and itinerary.",
      icon: MapPin,
      duration: "1-2 mins"
    },
    {
      step: 3,
      title: "Blockchain Generation",
      description: "System creates your encrypted digital ID securely.",
      icon: Lock,
      duration: "30 secs"
    },
    {
      step: 4,
      title: "Instant Verification",
      description: "Receive your QR code and digital wallet for immediate use.",
      icon: Smartphone,
      duration: "Instant"
    }
  ];

  const stats = [
    { number: "500K+", label: "Active Users", icon: Users },
    { number: "150+", label: "Countries", icon: Globe },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "4.9/5", label: "Rating", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative px-4 py-8">
        {/* Hero Section */}
        <div id="section-hero" className={`text-center mb-16 transition-all duration-1000 ${isVisible['section-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-blue-600 font-medium mb-6 shadow-lg border border-blue-100">
            <Award className="w-4 h-4 mr-2" />
            Trusted by 500K+ Travelers Worldwide
          </div>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Your Digital Tourist ID
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Issue time-bound IDs with KYC, emergency contacts, and travel itinerary.
            Secured with blockchain for global recognition and instant verification.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transform">
              <Shield className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Get Your ID Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl border border-gray-200">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div id="section-stats" className={`mb-16 transition-all duration-1000 delay-200 ${isVisible['section-stats'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div id="section-features" className={`mb-16 transition-all duration-1000 delay-300 ${isVisible['section-features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Built with cutting-edge technology to ensure your safety and convenience while traveling
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-white/50">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div id="section-steps" className={`mb-16 transition-all duration-1000 delay-400 ${isVisible['section-steps'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get your digital tourist ID in just 4 simple steps
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`group flex items-start space-x-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${currentStep === step.step ? 'border-l-4 border-blue-500 bg-blue-50/80' : 'hover:scale-102'}`}
                onClick={() => setCurrentStep(step.step)}
              >
                <div className={`relative flex-shrink-0 transition-all duration-300 ${currentStep === step.step ? 'scale-110' : 'group-hover:scale-105'}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${currentStep === step.step ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg' : 'bg-gradient-to-br from-gray-400 to-gray-500'}`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    <span className="text-sm text-blue-600 font-medium bg-blue-100 px-3 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>

                <ArrowRight className={`w-6 h-6 text-gray-400 transition-all duration-300 ${currentStep === step.step ? 'text-blue-500 translate-x-1' : 'group-hover:translate-x-1'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div id="section-benefits" className={`mb-16 transition-all duration-1000 delay-500 ${isVisible['section-benefits'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the future of travel identification with unmatched security and convenience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-white/50">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{benefit.stat}</div>
                    <div className="text-sm text-gray-500">{benefit.statLabel}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div id="section-cta" className={`text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl transition-all duration-1000 delay-600 ${isVisible['section-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Travel Securely?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust their identity verification to our secure blockchain platform
          </p>
          <button className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center mx-auto shadow-xl hover:shadow-2xl hover:scale-105 transform">
            <Shield className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Create Your Digital ID
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppFeaturesPage;