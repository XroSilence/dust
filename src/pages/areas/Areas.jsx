import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Areas() {
  const navigate = useNavigate();
  const areas = [
    {
      title: "Industrial Facilities",
      description: "Factories, warehouses, and manufacturing plants",
      features: ["24/7 Operation Compatible", "Safety Standards Compliant", "Custom Scheduling"]
    },
    {
      title: "Food Processing",
      description: "FDA compliant cleaning for food processing facilities",
      features: ["Sanitation Standards", "Contamination Prevention", "Regular Inspections"]
    },
    {
      title: "Distribution Centers",
      description: "Large-scale cleaning for logistics facilities",
      features: ["High Bay Cleaning", "Loading Dock Areas", "Storage Solutions"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-16">Areas We Serve</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area) => (
            <div key={area.title} className="bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-4">{area.title}</h2>
              <p className="text-slate-300 mb-6">{area.description}</p>
              <ul className="space-y-2">
                {area.features.map((feature) => (
                  <li key={feature} className="text-slate-400">• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Have a Different Facility?</h2>
          <p className="text-slate-300 mb-8">We adapt our services to meet your specific needs</p>
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