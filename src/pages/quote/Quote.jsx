import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { Calculator, Share2, FileDown, X, Home } from 'lucide-react';
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

          {/* Add other form fields similarly */}
          
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

// PDF Generation Function
const generatePDF = (quoteData, contactInfo) => {
  const doc = new jsPDF();
  
  // Set PDF styling to match website theme
  doc.setFillColor(30, 41, 59); // slate-800 as background
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  doc.setTextColor(255, 255, 255); // white text

  // Add animated logo with wind effect
  const logoSVG = `
    <svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
      <style>
        .logo-text { fill: white; font-size: 32px; font-weight: bold; }
        .tagline { fill: white; font-size: 14px; }
        @keyframes windRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(180deg); }
        }
        .wind-icon {
          animation: windRotate 0.5s ease-in-out;
          transform-origin: center;
        }
      </style>
      <g class="wind-icon">
        <path d="M20,30 L35,20 M35,20 L50,30" stroke="white" stroke-width="2" />
      </g>
      <text x="60" y="35" class="logo-text">DUSTUP</text>
      <text x="60" y="50" class="tagline">We Take Dust Down</text>
    </svg>
  `;
  
  // Convert SVG to data URL and add to PDF
  const svgData = 'data:image/svg+xml;base64,' + btoa(logoSVG);
  doc.addImage(svgData, 'SVG', 20, 10, 160, 40);

  // Add decorative line under logo
  doc.setDrawColor(59, 130, 246); // dustup-quote color
  doc.setLineWidth(0.5);
  doc.line(20, 55, 190, 55);

  // Add quote content
  // ... rest of the PDF content generation ...

  return doc;
};

// Email Sending Function
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
    
    const mailtoSuccess = await new Promise(resolve => {
      const initialTime = Date.now();
      const checkFocus = () => {
        if (document.hasFocus()) {
          resolve(Date.now() - initialTime < 1000);
        } else {
          setTimeout(checkFocus, 100);
        }
      };
      setTimeout(checkFocus, 100);
    });

    if (!mailtoSuccess) {
      throw new Error('Email client may not have opened correctly');
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Quote Calculator Component
const QuoteCalculator = ({ metrics, setMetrics, conditions, setConditions, onSubmitQuote, contactInfo }) => {
  const [exportStatus, setExportStatus] = useState({ type: null, message: null });

  const handleExport = async (format) => {
    setExportStatus({ type: 'loading', message: 'Processing...' });
    try {
      const quoteData = calculateQuote();
      const formattedQuoteData = formatQuoteData(quoteData, metrics, conditions);
      const pdf = generatePDF(formattedQuoteData, contactInfo);
      
      if (format === 'email') {
        await sendQuoteEmail(pdf, contactInfo);
        setExportStatus({ 
          type: 'success', 
          message: 'Email client opened successfully! If you don\'t see it, please check your email settings.' 
        });
      } else if (format === 'pdf') {
        pdf.save(`${contactInfo.name}-quote.pdf`);
        setExportStatus({ 
          type: 'success', 
          message: 'PDF exported successfully!' 
        });
      }
      
      onSubmitQuote(format);
    } catch (error) {
      let errorMessage = 'An error occurred. ';
      if (error.message.includes('email client')) {
        errorMessage += 'Try copying your default email client URL to your browser settings.';
      } else {
        errorMessage += 'Please try again or contact support.';
      }
      setExportStatus({ type: 'error', message: errorMessage });
    } finally {
      setTimeout(() => setExportStatus({ type: null, message: null }), 5000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Your existing calculator form fields */}
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <button 
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2 px-4 py-2 bg-dustup-quote text-white rounded hover:bg-dustup-quote-hover transition-all duration-300"
            type="button"
            disabled={exportStatus.type === 'loading'}
          >
            <FileDown className={`w-4 h-4 ${exportStatus.type === 'loading' ? 'animate-rotate-wind' : ''}`} />
            {exportStatus.type === 'loading' ? 'Processing...' : 'Export PDF'}
          </button>
          <button 
            onClick={() => handleExport('email')}
            className="flex items-center gap-2 px-4 py-2 bg-dustup-areas text-white rounded hover:bg-dustup-areas-hover transition-all duration-300"
            type="button"
            disabled={exportStatus.type === 'loading'}
          >
            <Share2 className={`w-4 h-4 ${exportStatus.type === 'loading' ? 'animate-rotate-wind' : ''}`} />
            {exportStatus.type === 'loading' ? 'Processing...' : 'Send Email'}
          </button>
        </div>
        
        {exportStatus.message && (
          <div className={`p-4 rounded-lg transition-all duration-300 ${
            exportStatus.type === 'success' ? 'bg-dustup-areas/20 text-dustup-areas' :
            exportStatus.type === 'error' ? 'bg-red-500/20 text-red-500' :
            'bg-slate-500/20 text-slate-300'
          }`}>
            {exportStatus.message}
          </div>
        )}
      </div>
    </div>
  );
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

  const handleSubmitQuote = async (action) => {
    try {
      if (action === 'email' || action === 'pdf') {
        // Handled in QuoteCalculator component
      } else {
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-2xl mx-auto">
        {showContactForm ? (
          <ContactFormModal 
            onSubmit={handleContactSubmit}
            onClose={() => navigate('/')}
          />
        ) : showSuccess ? (
          <SuccessMessage onClose={() => setShowSuccess(false)} />
        ) : (
          <div className="dustup-card dustup-card-inactive">
            <QuoteCalculator
              metrics={metrics}
              setMetrics={setMetrics}
              conditions={conditions}
              setConditions={setConditions}
              onSubmitQuote={handleSubmitQuote}
              contactInfo={userContact}
            />
          </div>
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