export interface ContactInfo {
    name: string;
    email: string;
    phone: string;
    company?: string;
    message?: string;
  }
  
  export interface QuoteMetrics {
    length: string;
    width: string;
    rafterHeight: string;
    specialRequest?: string;
    srCost?: string;
    customDeliveryCost?: string;
  }
  
  export interface QuoteConditions {
    noLiftNeeded: boolean;
    poorLiftAccess: boolean;
    duringOperation: boolean;
    afterHours: boolean;
    standardDelivery: boolean;
    customDelivery: boolean;
    selfDelivery: boolean;
  }
  
  export interface QuoteCalculation {
    estimatedDays: number;
    laborCost: number;
    liftRentalCost: number;
    deliveryCost: number;
    total: number;
    cubicArea: number;
  }