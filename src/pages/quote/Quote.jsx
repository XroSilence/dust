import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Share2, FileDown, X, Home } from 'lucide-react';
import jsPDF from 'jspdf';
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
  const calculateQuote = () => {
    const baseArea = (metrics.length * metrics.width);
    const cubicArea = baseArea * metrics.rafterHeight;
    
    let productionRate = conditions.duringOperation ? 400 : 540;
    let estimatedDays = Math.ceil(baseArea / productionRate);
    
    // Labor calculation
    let laborCost = estimatedDays * 8 * 120;
    
    // Equipment costs
    let liftRentalCost = 0;
    let deliveryCost = 0;

    if (!conditions.noLiftNeeded) {
      // Calculate rental cost based on days
      if (estimatedDays <= 5) {
        liftRentalCost = 120 * estimatedDays;
      } else if (estimatedDays <= 20) {
        liftRentalCost = 340 * Math.ceil(estimatedDays / 5);
      } else {
        liftRentalCost = 950 * Math.ceil(estimatedDays / 20);
      }

      // Delivery costs
      if (conditions.standardDelivery) {
        deliveryCost = 300;
      } else if (conditions.customDelivery) {
        deliveryCost = parseFloat(metrics.customDeliveryCost) || 0;
      }
    }

    if (conditions.poorLiftAccess) laborCost *= 1.15;
    if (conditions.afterHours) laborCost *= 1.25;

    const srCost = parseFloat(metrics.specialRequest) || 0;
    return {
      estimatedDays,
      laborCost,
      liftRentalCost,
      deliveryCost,
      total: laborCost + liftRentalCost + deliveryCost,
      cubicArea
    };
  };

  // Add the quote calculation result
  const quote = calculateQuote();

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
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="font-semibold">Facility Metrics</h2>
          <div className="space-y-2">
            {/* Your existing facility metric inputs */}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold">Conditions</h2>
          <div className="space-y-2">
            {/* Your existing conditions inputs */}
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
              {quote.srCost > 0 && (
                <p>Special Requests: ${quote.srCost.toFixed(2)}</p>
              )}
              <p className="text-lg font-bold text-green-600 mt-2">
                Total Quote: ${quote.total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
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
    specialRequest: ''
   
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

  const handleQuoteSubmit = async () => {
    try {
      // Generate PDF with both contact and quote data
      const generatePDF = (quoteData, contactInfo) => {
        const doc = new jsPDF();
        
        // Set PDF styling
        doc.setFillColor(30, 41, 59);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
        doc.setTextColor(255, 255, 255);
      
        // Add logo
        const logoSVG = `
          <svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
            <style>
              .logo-text { fill: white; font-size: 32px; font-weight: bold; }
              .tagline { fill: white; font-size: 14px; }
            </style>
            <text x="60" y="35" class="logo-text">DUSTUP</text>
            <text x="60" y="50" class="tagline">We Take Dust Down</text>
          </svg>
        `;
        
        const svgData = 'data:image/svg+xml;base64,' + btoa(logoSVG);
        doc.addImage(svgData, 'SVG', 20, 10, 160, 40);
      
        // Add contact information
        doc.setFontSize(14);
        doc.text(`Contact: ${contactInfo.name}`, 20, 70);
        doc.text(`Email: ${contactInfo.email}`, 20, 80);
        doc.text(`Phone: ${contactInfo.phone}`, 20, 90);
        doc.text(`Company: ${contactInfo.company}`, 20, 100);
      
        // Add quote details
        doc.text('Quote Details', 20, 120);
        // Add your quote calculation details here
        
        return doc;
      };
      
      // Send email with PDF
      const sendQuoteEmail = async (pdf, contactInfo) => {
        try {
          const emailSubject = `${contactInfo.name}'s Quote Request`;
          const emailBody = `
            <div style="
              background-color: rgb(30, 41, 59);
              color: white;
              padding: 20px;
              font-family: Arial, sans-serif;
              border-radius: 8px;
            ">
              <h1 style="color: #3B82F6; margin-bottom: 20px;">DUSTUP LTD</h1>
              <p>We Take Dust Down</p>
              <hr style="border-color: #3B82F6; margin: 20px 0;" />
              <p>Quote request from ${contactInfo.name}</p>
              <p>Company: ${contactInfo.company}</p>
              <p>Contact: ${contactInfo.email}</p>
              <p style="color: #69E515; margin-top: 20px;">Please find the detailed quote attached.</p>
            </div>
          `;
          
          const pdfBase64 = pdf.output('datauristring');
          const mailtoLink = `mailto:Dustup_Official@pm.me?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}&attachment=${encodeURIComponent(pdfBase64)}`;
          
          window.location.href = mailtoLink;
          return true;
        } catch (error) {
          console.error('Error sending email:', error);
          throw error;
        }
      };

      // Call the functions to generate PDF and send email
      const pdf = generatePDF(metrics, userContact);
      await sendQuoteEmail(pdf, userContact);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error generating quote:', error);
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
          <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow">
            <QuoteCalculator
              metrics={metrics}
              setMetrics={setMetrics}
              conditions={conditions}
              setConditions={setConditions}
              onSubmitQuote={handleQuoteSubmit}
              contactInfo={userContact}
            />
          </div>
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