import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Home } from 'lucide-react';
import api from '../../../../backend/src/config/axiosConfig';
import ContactFormModal from '../../components/ContactFormModal';
import QuoteCalculator from './QuoteCalculator';

interface Metrics {
  length: string;
  width: string;
  rafterHeight: string;
  specialRequest?: string;
}

interface Conditions {
  noLiftNeeded: boolean;
  poorLiftAccess: boolean;
  duringOperation: boolean;
  afterHours: boolean;
  standardDelivery: boolean;
  customDelivery: boolean;
  selfDelivery: boolean;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
}

interface QuoteCalculation {
  estimatedDays: number;
  laborCost: number;
  liftRentalCost: number;
  deliveryCost: number;
  total: number;
  cubicArea: number;
}

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

const Quote: React.FC = () => {
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userContact, setUserContact] = useState<ContactInfo | null>(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [metrics, setMetrics] = useState<Metrics>({
    length: '',
    width: '',
    rafterHeight: '',
  });

  const [conditions, setConditions] = useState<Conditions>({
    noLiftNeeded: false,
    poorLiftAccess: false,
    duringOperation: true,
    afterHours: false,
    standardDelivery: true,
    customDelivery: false,
    selfDelivery: false
  });

  // Load any existing quote data when component mounts
  useEffect(() => {
    const loadExistingQuote = async () => {
      try {
        const response = await api.get('/quote');
        if (response.data) {
          setMetrics(response.data.metrics);
          setConditions(response.data.conditions);
          setUserContact(response.data.contactInfo);
          setShowContactForm(false);
          // ... set other states as needed
        }
      } catch (error) {
        console.error('Error loading quote:', error);
      }
    };

    loadExistingQuote();
  }, []);

  const handleContactSubmit = async (contactInfo: ContactInfo) => {
    try {
      setUserContact(contactInfo);
      setShowContactForm(false);
      // Store contact info in session/localStorage if needed
      localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
    } catch (error) {
      console.error('Error saving contact info:', error);
    }
  };

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptchaLoad`;
    script.async = true;
    script.defer = true;

    // Define callback when reCAPTCHA is loaded
    window.onRecaptchaLoad = () => {
      window.grecaptcha.render('recaptcha', {
        sitekey: 'YOUR_RECAPTCHA_SITE_KEY',
        callback: (response: string) => {
          setCaptchaVerified(true);
        }
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      delete window.onRecaptchaLoad;
    };
  }, []);

  const calculateQuote = (): QuoteCalculation => {
    // Reuse the calculation logic from QuoteCalculator component
    const length = parseFloat(metrics.length);
    const width = parseFloat(metrics.width);
    const rafterHeight = parseFloat(metrics.rafterHeight);

    if (isNaN(length) || isNaN(width) || isNaN(rafterHeight)) {
      return {
        estimatedDays: 0,
        laborCost: 0,
        liftRentalCost: 0,
        deliveryCost: 0,
        total: 0,
        cubicArea: 0
      };
    }

    const baseArea = length * width;
    const cubicArea = baseArea * rafterHeight;
    const productionRate = conditions.duringOperation ? 400 : 540;
    const estimatedDays = Math.ceil(baseArea / productionRate);
    let laborCost = estimatedDays * 8 * 120;
    let liftRentalCost = 0;
    let deliveryCost = 0;

    if (conditions.poorLiftAccess) laborCost *= 1.15;
    if (conditions.afterHours) laborCost *= 1.25;

    const total = laborCost + liftRentalCost + deliveryCost;

    return { estimatedDays, laborCost, liftRentalCost, deliveryCost, total, cubicArea };
  };

  const handleSubmitQuote = async () => {
    if (!userContact || !captchaVerified) return;

    try {
      const quoteData = {
        contactInfo: userContact,
        quoteData: {
          metrics,
          conditions,
          calculation: calculateQuote()
        }
      };

      const response = await api.post('/api/quote', quoteData);

      if (response.status === 200) {
        setShowSuccess(true);
        // Clear stored data
        localStorage.removeItem('contactInfo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Load saved contact info on mount
  useEffect(() => {
    const savedContact = localStorage.getItem('contactInfo');
    if (savedContact) {
      setUserContact(JSON.parse(savedContact));
      setShowContactForm(false);
    }
  }, []);

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
          <>
            <QuoteCalculator
              metrics={metrics}
              setMetrics={setMetrics}
              conditions={conditions}
              setConditions={setConditions}
              contactInfo={userContact}
            />
            <div className="mt-4 text-center">
              <div id="recaptcha" className="mb-4"></div>
              <button
                onClick={handleSubmitQuote}
                disabled={!captchaVerified}
                className={`bg-primary-green text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 mr-4 ${
                  !captchaVerified ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
                }`}
              >
                <Share2 className="inline mr-2" size={16} /> Submit Quote
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-dustup-quote text-primary-green font-semibold py-2 px-6 rounded-lg hover:bg-dustup-quote-hover transition-colors duration-200"
                type="button"
              >
                <Home className="inline mr-2" size={16} /> Return Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quote;
