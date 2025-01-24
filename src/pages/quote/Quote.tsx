import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Home } from 'lucide-react';
import api from '../../utils/axiosConfig';
import ContactFormModal from './ContactFormModal';
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

const Quote: React.FC = () => {
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userContact, setUserContact] = useState<ContactInfo | null>(null);
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

  const handleContactSubmit = (contactInfo: ContactInfo) => {
    console.log('Contact form submitted:', contactInfo); // Debug log
    setUserContact(contactInfo);
    setShowContactForm(false);
  };

  const [captchaVerified, setCaptchaVerified] = useState(false);

  useEffect(() => {
    const verifyCaptcha = async () => {
      try {
        const response = await api.get('/api/captcha');
        if (response.data.success) {
          setCaptchaVerified(true);
        } else {
          throw new Error('Captcha verification failed');
        }
      } catch (error) {
        console.error('Error verifying captcha:', error);
        // Handle error (show error message to user)
      }
    };

    verifyCaptcha();
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
    if (!userContact) return;

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
      } else {
        throw new Error('Failed to submit quote');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error (show error message to user)
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
          <>
            <QuoteCalculator
              metrics={metrics}
              setMetrics={setMetrics}
              conditions={conditions}
              setConditions={setConditions}
              contactInfo={userContact}
            />
            <div className="mt-4 text-center">
              {captchaVerified ? (
                <button
                  onClick={handleSubmitQuote}
                  className="bg-primary-green text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-200 mr-4"
                >
                  <Share2 className="inline mr-2" size={16} /> Submit Quote
                </button>
              ) : (
                <div className="text-gray-400">Please complete the reCAPTCHA to submit</div>
              )}
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
