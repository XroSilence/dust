import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { Calculator, Share2, FileDown, X, Home } from 'lucide-react';
import PropTypes from 'prop-types'; // Add PropTypes import

// Contact Form Modal Component
const ContactFormModal = ({ onSubmit, onClose }) => {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!contactInfo.name.trim()) newErrors.name = 'Name is required';
    if (!validateEmail(contactInfo.email)) newErrors.email = 'Valid email is required';
    if (!validatePhone(contactInfo.phone)) newErrors.phone = 'Valid phone number is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      onSubmit(contactInfo);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          type="button"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name *</label>
            <input
              type="text"
              required
              value={contactInfo.name}
              onChange={(e) => {
                setContactInfo(prev => ({...prev, name: e.target.value}));
                setErrors(prev => ({...prev, name: ''}));
              }}
              className={`mt-1 w-full p-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Other form fields remain the same */}
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Continue to Calculator
          </button>
        </form>
      </div>
    </div>
  );
};

// Add PropTypes validation
ContactFormModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

// Success Message Component with PropTypes
const SuccessMessage = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Quote Submitted!</h2>
        <p className="text-gray-600 mb-6">
          Great, we will review the details and be in touch within 48 hours at the latest.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          type="button"
        >
          Close
        </button>
      </div>
    </div>
  );
};

SuccessMessage.propTypes = {
  onClose: PropTypes.func.isRequired
};

// Quote Calculator Component
const QuoteCalculator = ({ metrics, setMetrics, conditions, setConditions, onSubmitQuote }) => {
  const handleDeliveryChange = (type) => {
    setConditions(prev => ({
      ...prev,
      standardDelivery: type === 'standard',
      customDelivery: type === 'custom',
      selfDelivery: type === 'self'
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-bold">Quote Calculator</h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onSubmitQuote('export')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            type="button"
          >
            <FileDown className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => onSubmitQuote('print')}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            type="button"
          >
            <Share2 className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>
      
      {/* Calculator form fields */}
      {/* Add your existing calculator form fields here */}
    </div>
  );
};

QuoteCalculator.propTypes = {
  metrics: PropTypes.object.isRequired,
  setMetrics: PropTypes.func.isRequired,
  conditions: PropTypes.object.isRequired,
  setConditions: PropTypes.func.isRequired,
  onSubmitQuote: PropTypes.func.isRequired
};

// Main Quote Component
export default function Quote() {
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userContact, setUserContact] = useState(null);
  const [metrics, setMetrics] = useState({
    length: '',
    width: '',
    rafterRuns: '',
    rafterHeight: '',
    specialRequest: '',
    srCost: '',
    customDeliveryCost: ''
  });

  const [conditions, setConditions] = useState({
    noLiftNeeded: false,
    poorLiftAccess: false,
    duringOperation: true,
    afterHours: false,
    standardDelivery: true,
    customDelivery: false,
    selfDelivery: false
  });

  const handleContactSubmit = (contactInfo) => {
    setUserContact(contactInfo);
    setShowContactForm(false);
  };

  const handleSubmitQuote = async (action) => {
    // Implementation of quote submission
    try {
      // Your quote submission logic here
      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting quote:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-2xl mx-auto">
        {showContactForm ? (
          <ContactFormModal 
            onSubmit={handleContactSubmit}
            onClose={() => navigate('/')}
          />
        ) : showSuccess ? (
          <SuccessMessage onClose={() => setShowSuccess(false)} />
        ) : (
          <div className="bg-white rounded-lg shadow p-8">
            <QuoteCalculator
              metrics={metrics}
              setMetrics={setMetrics}
              conditions={conditions}
              setConditions={setConditions}
              onSubmitQuote={handleSubmitQuote}
            />
          </div>
        )}
        
        {/* Back to Home button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200"
            type="button"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}