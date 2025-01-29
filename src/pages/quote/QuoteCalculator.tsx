
import React from 'react';

interface QuoteCalculatorProps {
  metrics: {
    length: string;
    width: string;
    rafterHeight: string;
    customDeliveryCost?: string;
  };
  setMetrics: (metrics: any) => void;
  conditions: {
    noLiftNeeded: boolean;
    poorLiftAccess: boolean;
    duringOperation: boolean;
    afterHours: boolean;
    standardDelivery: boolean;
    customDelivery: boolean;
    selfDelivery: boolean;
  };
  setConditions: (conditions: any) => void;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    message?: string;
  };
}

interface QuoteCalculation {
  estimatedDays: number;
  laborCost: number;
  liftRentalCost: number;
  deliveryCost: number;
  total: number;
  cubicArea: number;
}

const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ metrics, setMetrics, conditions, setConditions }) => {
  const calculateQuote = (): QuoteCalculation => {
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
        deliveryCost = 150;
      } else if (conditions.customDelivery) {
        deliveryCost = parseFloat(metrics.customDeliveryCost || '') || 0;
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

  return (
    <div className="quote-calculator">
      <div className="quote-calculator__form">
        <h2>Quote Calculator</h2>
        <form>
          <div className="form-group">
            <label>Length (m)</label>
            <input
              type="number"
              value={metrics.length}
              onChange={(e) => setMetrics({ ...metrics, length: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Width (m)</label>
            <input
              type="number"
              value={metrics.width}
              onChange={(e) => setMetrics({ ...metrics, width: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Rafter Height (m)</label>
            <input
              type="number"
              value={metrics.rafterHeight}
              onChange={(e) => setMetrics({ ...metrics, rafterHeight: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={conditions.noLiftNeeded}
                onChange={(e) => setConditions({ ...conditions, noLiftNeeded: e.target.checked })}
              />
              No Lift Needed
            </label>
            <label>
              <input
                type="checkbox"
                checked={conditions.poorLiftAccess}
                onChange={(e) => setConditions({ ...conditions, poorLiftAccess: e.target.checked })}
              />
              Poor Lift Access
            </label>
            <label>
              <input
                type="checkbox"
                checked={conditions.duringOperation}
                onChange={(e) => setConditions({ ...conditions, duringOperation: e.target.checked })}
              />
              During Operation
            </label>
            <label>
              <input
                type="checkbox"
                checked={conditions.afterHours}
                onChange={(e) => setConditions({ ...conditions, afterHours: e.target.checked })}
              />
              After Hours
            </label>
          </div>
        </form>
        <div className="quote-result">
          {calculateQuote().total > 0 && (
            <div>
              <h3>Quote Summary</h3>
              <p>Estimated Days: {calculateQuote().estimatedDays}</p>
              <p>Labor Cost: ${calculateQuote().laborCost.toFixed(2)}</p>
              <p>Lift Rental: ${calculateQuote().liftRentalCost.toFixed(2)}</p>
              <p>Delivery Cost: ${calculateQuote().deliveryCost.toFixed(2)}</p>
              <p>Total: ${calculateQuote().total.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;