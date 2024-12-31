import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Share2, X, Home } from 'lucide-react';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';

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

  const handleFormValidation = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      return true;
    } else {
      setErrors(formErrors);
      return false;
    }
  };

  const handleFormSubmit = () => {
    if (handleFormValidation()) {
      onSubmit(contactInfo);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit();
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
              className={`mt-1 w-full p-3 rounded-lg border text-gray-900 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-dustup-quote focus:border-dustup-quote`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              required
              value={contactInfo.email}
              onChange={(e) => {
                setContactInfo(prev => ({...prev, email: e.target.value}));
                setErrors(prev => ({...prev, email: ''}));
              }}
              className={`mt-1 w-full p-3 rounded-lg border text-gray-900 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-dustup-quote focus:border-dustup-quote`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone *</label>
            <input
              type="tel"
              required
              value={contactInfo.phone}
              onChange={(e) => {
                setContactInfo(prev => ({...prev, phone: e.target.value}));
                setErrors(prev => ({...prev, phone: ''}));
              }}
              className={`mt-1 w-full p-3 rounded-lg border text-gray-900 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-dustup-quote focus:border-dustup-quote`}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              value={contactInfo.company}
              onChange={(e) => setContactInfo(prev => ({...prev, company: e.target.value}))}
              className="mt-1 w-full p-3 rounded-lg border text-gray-900 border-gray-300 focus:ring-2 focus:ring-dustup-quote focus:border-dustup-quote"
              placeholder="Enter your company name"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-dustup-quote text-white font-semibold py-3 px-6 rounded-lg hover:bg-dustup-quote-hover transition-colors duration-200"
          >
            Continue to Calculator
          </button>
        </form>
      </div>
    </div>
  );
};


// Success Message Component
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
          className="bg-dustup-quote text-white font-semibold py-2 px-6 rounded-lg hover:bg-dustup-quote-hover transition-colors duration-200"
          type="button"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Quote Calculator Component
const QuoteCalculator = ({ metrics, setMetrics, conditions, setConditions, contactInfo, setPdf }) => {
  const [exportStatus, setExportStatus] = useState({ type: null, message: null });

  const generatePDF = (quoteData, contactInfo) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('DUSTUP Quote', 20, 20);
    
    // Contact Info Section
    doc.setFontSize(12);
    doc.text('Contact Information:', 20, 40);
    doc.text(`Name: ${contactInfo.name}`, 30, 50);
    doc.text(`Email: ${contactInfo.email}`, 30, 60);
    doc.text(`Phone: ${contactInfo.phone}`, 30, 70);
    doc.text(`Company: ${contactInfo.company || 'N/A'}`, 30, 80);
    
    // Quote Details Section
    doc.text('Quote Details:', 20, 100);
    doc.text(`Facility Size: ${metrics.length}ft x ${metrics.width}ft`, 30, 110);
    doc.text(`Rafter Height: ${metrics.rafterHeight}ft`, 30, 120);
    doc.text(`Total Area: ${quoteData.cubicArea.toFixed(0)} cubic ft`, 30, 130);
    doc.text(`Estimated Duration: ${quoteData.estimatedDays} days`, 30, 140);
    doc.text(`Labor Cost: $${quoteData.laborCost.toFixed(2)}`, 30, 150);

    if (quoteData.liftRentalCost > 0) {
      doc.text(`Lift Rental: $${quoteData.liftRentalCost.toFixed(2)}`, 30, 160);
      doc.text(`Delivery Cost: $${quoteData.deliveryCost.toFixed(2)}`, 30, 170);
    }

    doc.text(`Total Quote: $${quoteData.total.toFixed(2)}`, 30, 190);
    
    return doc;
  };

  const calculateQuote = () => {
    const length = parseFloat(metrics.length);
    const width = parseFloat(metrics.width);
    const rafterHeight = parseFloat(metrics.rafterHeight);

    if (isNaN(length) || isNaN(width) || isNaN(rafterHeight)) {
      return {
        estimatedDays: 0,
        laborCost: 0,
        liftRentalCost: 0,
        deliveryCost: 0,
        srCost: 0,
        total: 0,
        cubicArea: 0
      };
    }

    const baseArea = length * width;
    const cubicArea = baseArea * rafterHeight;
    
    let productionRate = conditions.duringOperation ? 400 : 540;
    let estimatedDays = Math.ceil(baseArea / productionRate);
    
    let laborCost = estimatedDays * 8 * 120;
    let liftRentalCost = 0;
    let deliveryCost = 0;

    if (!conditions.noLiftNeeded) {
      if (estimatedDays <= 5) {
        liftRentalCost = 120 * estimatedDays;
      } else if (estimatedDays <= 20) {
        liftRentalCost = 340 * Math.ceil(estimatedDays / 5);
      } else {
        liftRentalCost = 950 * Math.ceil(estimatedDays / 20);
      }

      if (conditions.standardDelivery) {
        deliveryCost = 300;
      } else if (conditions.customDelivery) {
        deliveryCost = parseFloat(metrics.customDeliveryCost) || 0;
      }
    }

    if (conditions.poorLiftAccess) laborCost *= 1.15;
    if (conditions.afterHours) laborCost *= 1.25;

    const srCost = parseFloat(metrics.srCost) || 0;
    const total = laborCost + liftRentalCost + deliveryCost + srCost;

    return {
      estimatedDays,
      laborCost,
      liftRentalCost,
      deliveryCost,
      srCost,
      total,
      cubicArea
    };
  };

  const handleGeneratePdf = () => {
    const quoteData = calculateQuote();
    const pdf = generatePDF(quoteData, contactInfo);
    setPdf(pdf);
  };

  const quote = calculateQuote();

  return (
    <div className="space-y-6 bg-white text-gray-900 p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-bold">Quote Calculator</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="font-semibold">Facility Metrics</h2>
          
          <div className="space-y-2">
            <label className="block text-sm">
              Facility Length (ft)
              <input
                type="number"
                value={metrics.length}
                onChange={(e) => setMetrics(prev => ({...prev, length: e.target.value}))}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>

            <label className="block text-sm">
              Facility Width (ft)
              <input
                type="number"
                value={metrics.width}
                onChange={(e) => setMetrics(prev => ({...prev, width: e.target.value}))}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>

            <label className="block text-sm">
              Rafter Height (ft)
              <input
                type="number"
                value={metrics.rafterHeight}
                onChange={(e) => setMetrics(prev => ({...prev, rafterHeight: e.target.value}))}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold">Conditions</h2>
          
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={conditions.noLiftNeeded}
                onChange={() => setConditions(prev => ({...prev, noLiftNeeded: !prev.noLiftNeeded}))}
                className="rounded border-gray-300"
              />
              <span className="text-sm">No Lift Required</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={conditions.poorLiftAccess}
                onChange={() => setConditions(prev => ({...prev, poorLiftAccess: !prev.poorLiftAccess}))}
                className="rounded border-gray-300"
              />
              <span className="text-sm">Poor Lift Access</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={conditions.duringOperation}
                onChange={() => {
                  setConditions(prev => ({
                    ...prev,
                    duringOperation: !prev.duringOperation,
                    afterHours: prev.duringOperation
                  }));
                }}
                className="rounded border-gray-300"
              />
              <span className="text-sm">During Operation Hours</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={conditions.afterHours}
                onChange={() => {
                  setConditions(prev => ({
                    ...prev,
                    afterHours: !prev.afterHours,
                    duringOperation: prev.afterHours
                  }));
                }}
                className="rounded border-gray-300"
              />
              <span className="text-sm">After Hours</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Quote Summary</h2>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p>Total Area: {quote.cubicArea.toFixed(0)} cubic ft</p>
              <p>Estimated Duration: {quote.estimatedDays} days</p>
              <p>Labor Cost: ${quote.laborCost.toFixed(2)}</p>
            </div>
            <div>
              {!conditions.noLiftNeeded && (
                <>
                  <p>Lift Rental: ${quote.liftRentalCost.toFixed(2)}</p>
                  <p>Delivery Cost: ${quote.deliveryCost.toFixed(2)}</p>
                </>
              )}
              <p className="text-lg font-bold text-green-600 mt-2">
                Total Quote: ${quote.total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={handleGeneratePdf}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <Share2 className="w-5 h-5" />
          Generate PDF
        </button>
      </div>

      {exportStatus.message && (
        <div className={`mt-4 p-4 rounded-lg ${
          exportStatus.type === 'success' ? 'bg-green-100 text-green-700' :
          exportStatus.type === 'error' ? 'bg-red-100 text-red-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {exportStatus.message}
        </div>
      )}
    </div>
  );
};

QuoteCalculator.propTypes = {
  metrics: PropTypes.object.isRequired,
  setMetrics: PropTypes.func.isRequired,
  conditions: PropTypes.object.isRequired,
  setConditions: PropTypes.func.isRequired,
  contactInfo: PropTypes.object.isRequired,
  setPdf: PropTypes.func.isRequired
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

  const [pdf, setPdf] = useState(null);

  const handleContactSubmit = (contactInfo) => {
    console.log('Contact form submitted:', contactInfo); // Debug log
    setUserContact(contactInfo);
    setShowContactForm(false);
  };

  const handleSubmitQuote = async () => {
    try {
      if (!pdf) {
        throw new Error('PDF not generated');
      }

      const pdfBuffer = pdf.output('arraybuffer');

      const response = await fetch(`${API_URL}/api/submit-quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactInfo: userContact,
          quoteData: calculateQuote(),
          pdfBuffer: Array.from(new Uint8Array(pdfBuffer))
        })
      });

      if (!response.ok) throw new Error('Failed to submit quote');
      
      setShowSuccess(true);
      pdf.save('DUSTUP_Quote.pdf'); // Optional local copy
    } catch (error) {
      console.error('Error:', error);
      setExportStatus({ type: 'error', message: 'Failed to submit quote' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-2xl mx-auto">
        {showContactForm && (
          <ContactFormModal 
            onSubmit={handleContactSubmit}
            onClose={() => navigate('/')}
          />
        )}
        
        {!showContactForm && !showSuccess && userContact && (
          <QuoteCalculator
            metrics={metrics}
            setMetrics={setMetrics}
            conditions={conditions}
            setConditions={setConditions}
            onSubmitQuote={handleSubmitQuote}
            contactInfo={userContact}
            setPdf={setPdf}
          />
        )}

        {showSuccess && (
          <SuccessMessage onClose={() => setShowSuccess(false)} />
        )}
        
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
