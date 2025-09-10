import React, { useState, useEffect } from 'react';
import {
  Shield, Eye, AlertTriangle, MapPin, Users, Clock, TrendingUp, Search,
  FileText, Zap, Globe, CheckCircle, BarChart3, Radio, HeartHandshake,
  ArrowRight, Play, Award, Building2, Camera, Smartphone, Database,
  Activity, Target, Lock, RefreshCw, MessageSquare, Star
} from 'lucide-react';

const AuthoritiesLandingPage = () => {
  const [activeTab, setActiveTab] = useState('tourism');
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

    return () => observer.disconnect();
  }, []);

  const heroStats = [
    { number: "78%", label: "Faster Case Resolution", icon: Clock },
    { number: "92%", label: "Reduced Missing Person Cases", icon: Users },
    { number: "24/7", label: "Real-time Monitoring", icon: Eye },
    { number: "150+", label: "Partner Authorities", icon: Building2 }
  ];

  const dashboardFeatures = [
    {
      icon: MapPin,
      title: "Tourist Heat Maps",
      description: "Real-time visualizations of tourist clusters and movement patterns across your jurisdiction",
      benefit: "Optimize resource allocation and predict crowd management needs"
    },
    {
      icon: AlertTriangle,
      title: "Risk Zone Alerts",
      description: "Automated alerts for high-risk areas with historical incident data and predictive analytics",
      benefit: "Proactive safety measures and incident prevention"
    },
    {
      icon: Database,
      title: "Digital ID Access",
      description: "Instant access to verified tourist information, emergency contacts, and medical details",
      benefit: "Critical information at your fingertips during emergencies"
    },
    {
      icon: FileText,
      title: "Automated E-FIR",
      description: "Automatic generation of Electronic First Information Reports for missing person cases",
      benefit: "Reduce paperwork and accelerate case processing by 78%"
    }
  ];

  const authorityTypes = [
    {
      id: 'tourism',
      name: 'Tourism Department',
      icon: MapPin,
      color: 'from-green-500 to-emerald-600',
      features: [
        { icon: BarChart3, title: "Tourist Analytics", desc: "Track visitor patterns, popular destinations, and seasonal trends" },
        { icon: TrendingUp, title: "Revenue Insights", desc: "Monitor tourism revenue impact and economic indicators" },
        { icon: HeartHandshake, title: "Safety Reputation", desc: "Maintain destination safety ratings and tourist satisfaction" },
        { icon: Globe, title: "Destination Marketing", desc: "Use safety data to boost destination credibility" }
      ]
    },
    {
      id: 'police',
      name: 'Police Department',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
      features: [
        { icon: Radio, title: "Emergency Response", desc: "Instant access to tourist location and emergency contacts" },
        { icon: Search, title: "Missing Person Cases", desc: "Track last known locations and automated case generation" },
        { icon: Activity, title: "Incident Tracking", desc: "Monitor tourist-related incidents and crime patterns" },
        { icon: Target, title: "Resource Deployment", desc: "Strategic deployment based on tourist density data" }
      ]
    }
  ];

  const testimonials = [
    {
      name: "Deputy Commissioner Sarah Chen",
      role: "Tourism Board, Singapore",
      image: "/api/placeholder/60/60",
      quote: "The platform reduced our missing tourist cases by 85% and improved our emergency response time dramatically.",
      rating: 5
    },
    {
      name: "Inspector General Raj Patel",
      role: "Mumbai Police Department",
      image: "/api/placeholder/60/60",
      quote: "Real-time tourist tracking has revolutionized how we handle tourist safety. The automated E-FIR system is a game-changer.",
      rating: 5
    },
    {
      name: "Director Maria Santos",
      role: "Barcelona Tourism Authority",
      image: "/api/placeholder/60/60",
      quote: "Tourist confidence has increased significantly since we joined the platform. Our safety reputation has never been better.",
      rating: 5
    }
  ];

  const caseStudies = [
    {
      location: "Goa Tourism Police",
      challenge: "High volume of tourist incidents during peak season",
      solution: "Implemented real-time monitoring and predictive analytics",
      results: ["67% reduction in response time", "43% fewer missing person cases", "89% tourist satisfaction increase"],
      color: "from-orange-500 to-red-500"
    },
    {
      location: "Kerala Tourism Board",
      challenge: "Difficulty tracking tourists across multiple districts",
      solution: "Centralized digital ID system with inter-district coordination",
      results: ["Unified tracking system", "Real-time location sharing", "Improved inter-agency coordination"],
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative px-4 py-8">
        {/* Hero Section */}
        <div id="section-hero" className={`text-center mb-16 transition-all duration-1000 ${isVisible['section-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg border border-blue-100">
            <Award className="w-5 h-5 mr-2 text-blue-600" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trusted by 150+ Government Authorities Worldwide
            </span>
          </div>

          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent leading-tight">
            Secure Your Tourism.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Protect Your Citizens.
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join the world's most advanced digital tourist identification platform.
            Get real-time insights, automated emergency response, and enhanced tourist safety management.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transform text-lg">
              <Shield className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
              Join the Platform
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group bg-white/90 backdrop-blur-sm text-gray-700 px-10 py-5 rounded-2xl font-semibold hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl border border-gray-200 text-lg">
              <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
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

        {/* Authority Types */}
        <div id="section-authorities" className={`mb-20 transition-all duration-1000 delay-300 ${isVisible['section-authorities'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Built for Every Authority
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored dashboards and features for different types of government authorities
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200">
              {authorityTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === type.id
                      ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <type.icon className="w-5 h-5 mr-3" />
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/50">
            {authorityTypes.map((type) => (
              <div
                key={type.id}
                className={`transition-all duration-500 ${activeTab === type.id ? 'block' : 'hidden'}`}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {type.features.map((feature, i) => (
                    <div key={i} className="group flex items-start space-x-6 p-6 rounded-2xl hover:bg-gray-50/80 transition-all duration-300">
                      <div className={`w-14 h-14 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Features */}
        <div id="section-dashboard" className={`mb-20 transition-all duration-1000 delay-400 ${isVisible['section-dashboard'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Powerful Dashboard Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to monitor, manage, and protect tourists in your jurisdiction
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {dashboardFeatures.map((feature, i) => (
              <div key={i} className="group bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-102 border border-white/50">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-18 h-18 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full">
                      Premium Feature
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">{feature.description}</p>

                <div className="border-l-4 border-blue-500 bg-blue-50/80 p-4 rounded-r-xl">
                  <div className="text-sm text-blue-600 font-semibold mb-1">Impact</div>
                  <div className="text-gray-700 font-medium">{feature.benefit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div id="section-case-studies" className={`mb-20 transition-all duration-1000 delay-500 ${isVisible['section-case-studies'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how authorities are transforming tourist safety and management
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {caseStudies.map((study, i) => (
              <div key={i} className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-102 border border-white/50">
                <div className={`h-4 bg-gradient-to-r ${study.color}`}></div>
                <div className="p-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{study.location}</h3>

                  <div className="mb-6">
                    <div className="text-sm font-semibold text-red-600 mb-2">Challenge</div>
                    <p className="text-gray-600">{study.challenge}</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-semibold text-blue-600 mb-2">Solution</div>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-green-600 mb-3">Results</div>
                    <div className="space-y-2">
                      {study.results.map((result, j) => (
                        <div key={j} className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div id="section-testimonials" className={`mb-20 transition-all duration-1000 delay-600 ${isVisible['section-testimonials'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              What Authorities Say
            </h2>
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
                  <div className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
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
        <div id="section-final-cta" className={`text-center bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-16 shadow-2xl transition-all duration-1000 delay-700 ${isVisible['section-final-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-white mb-8">
            Ready to Transform Tourist Safety?
          </h2>
          <p className="text-blue-200 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the digital revolution in tourist management. Enhance safety, reduce response times,
            and build trust with visitors from around the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group bg-white text-slate-900 px-12 py-6 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transform text-lg">
              <Shield className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
              Start Free Trial
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group border-2 border-white text-white px-12 py-6 rounded-2xl font-bold hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center justify-center text-lg">
              <MessageSquare className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Schedule Demo
            </button>
          </div>

          <div className="mt-12 text-blue-200 text-sm">
            ✓ 30-day free trial • ✓ No setup fees • ✓ 24/7 support • ✓ Full training included
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthoritiesLandingPage;