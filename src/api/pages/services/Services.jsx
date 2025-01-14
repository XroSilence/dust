import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function Services() {
  const navigate = useNavigate();
  const services = [
    {
      title: "Industrial Cleaning",
      description: "Comprehensive cleaning solutions for industrial facilities",
      features: ["Equipment Cleaning", "Facility Maintenance", "Safety Compliance"],
      price: "Custom Quote"
    },
    {
      title: "Overhead Cleaning",
      description: "Specialized cleaning for hard-to-reach overhead areas",
      features: ["Dust Removal", "Contamination Prevention", "Regular Maintenance"],
      price: "Custom Quote"
    },
    {
      title: "Emergency Services",
      description: "24/7 response for urgent cleaning needs",
      features: ["Rapid Response", "Critical Situation Handling", "Immediate Solutions"],
      price: "Custom Quote"
    }
  ];

  return (
    <div className="w-screen min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-16">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
              <p className="text-slate-300 mb-6">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="text-slate-400">• {feature}</li>
                ))}
              </ul>
              <div className="mt-auto">
                <button 
                  onClick={() => navigate('/quote')}
                  className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-400 hover:shadow-[0_0_15px] hover:shadow-blue-500 transition-all duration-300"
                >
                  Get Quote
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Need a Custom Solution?</h2>
          <p className="text-slate-300 mb-8">Contact us to discuss your specific requirements</p>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-green-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-400 hover:shadow-[0_0_15px] hover:shadow-green-500 transition-all duration-300"
          >
            Contact Us
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 hover:shadow-[0_0_15px] hover:shadow-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}