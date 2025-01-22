import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Share2, X, Home } from 'lucide-react';
import axios from '../../utils/axiosConfig.ts';
import ContactFormModal from './ContactFormModal';

   
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

  const onCaptchaChange = (value) => {
    if (!value || value.length < 5) {
      console.error('Invalid captcha value');
      return false;
    }
    return true;
  };

  const handleContactSubmit = (contactInfo) => {
    console.log('Contact form submitted:', contactInfo); // Debug log
    setUserContact(contactInfo);
    setShowContactForm(false);
  };

  const QuoteCalculator = ({ metrics, setMetrics, conditions, setConditions, contactInfo }) => {
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
          deliveryCost = 150; // Standard delivery cost
        } else if (conditions.customDelivery) {
          deliveryCost = parseFloat(metrics.customDeliveryCost) || 0;
        }
      }

      if (conditions.poorLiftAccess) laborCost *= 1.15;
      if (conditions.afterHours) laborCost *= 1.25;

      const total = laborCost + liftRentalCost + deliveryCost;

      return {
        estimatedDays,
        laborCost,
        liftRentalCost,
        deliveryCost,
        total,
        cubicArea
      };
    };

    const [exportStatus, setExportStatus] = useState({ type: '', message: '' });

    const handleSubmitQuote = async () => {
      try {
        const response = await axios.post('/quote', {
          contactInfo,
          quoteData: calculateQuote(),
        });

        if (response.status !== 200) throw new Error('Failed to submit quote');

        setExportStatus({ type: 'success', message: 'Quote submitted successfully!' });
      } catch (error) {
        console.error('Error:', error);
        setExportStatus({ type: 'error', message: 'Failed to submit quote' });
      }
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
                  onChange={(e) => setMetrics(prev => ({ ...prev, length: e.target.value }))}
                  className="w-full mt-1 p-2 border rounded"
                />
              </label>

              <label className="block text-sm">
                Facility Width (ft)
                <input
                  type="number"
                  value={metrics.width}
                  onChange={(e) => setMetrics(prev => ({ ...prev, width: e.target.value }))}
                  className="w-full mt-1 p-2 border rounded"
                />
              </label>

              <label className="block text-sm">
                Rafter Height (ft)
                <input
                  type="number"
                  value={metrics.rafterHeight}
                  onChange={(e) => setMetrics(prev => ({ ...prev, rafterHeight: e.target.value }))}
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
                  onChange={() => setConditions(prev => ({ ...prev, noLiftNeeded: !prev.noLiftNeeded }))}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">No Lift Required</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={conditions.poorLiftAccess}
                  onChange={() => setConditions(prev => ({ ...prev, poorLiftAccess: !prev.poorLiftAccess }))}
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
                <p>Lift Rental Cost: ${quote.liftRentalCost.toFixed(2)}</p>
                <p>Delivery Cost: ${quote.deliveryCost.toFixed(2)}</p>
                <p className="text-lg font-bold text-green-600 mt-2">
                  Total Quote: ${quote.total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmitQuote}>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <Share2 className="w-5 h-5" />
            Submit Quote
          </button>
        </form>
        {exportStatus.message && (
          <p className={`mt-4 ${exportStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {exportStatus.message}
          </p>
        )}
      </div>
    );
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
              <p className="text-gray-600 mb-6">
                Great, we will review the details and be in touch soon!
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-dustup-quote text-primary-green font-semibold py-2 px-6 rounded-lg hover:bg-dustup-quote-hover transition-colors duration-200"
                type="button"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
