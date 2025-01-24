  /// <reference types="vite/client" />

export const API_URL = import.meta.env.PROD 
    ? 'https://dustup.online'  // Production backend URL
    : 'http://localhost:5000'; // Development backend URL
  
export interface makeRequest {
    endpoint: string;
    options: RequestInit;
    method?: string; 
    body?: any;
}

export interface MakeRequest extends RequestInit {
    headers?: Record<string, string>;
    endpoint: string;
    method?: string;
}
