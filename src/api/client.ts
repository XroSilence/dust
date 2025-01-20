export interface ImportMeta {
  readonly env: {
    PROD: boolean;
    [key: string]: any;
  }
}

const API_URL = import.meta.env.PROD 
  ? '/api'  
  : 'http://localhost:3000/api';  // Development

export async function makeRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}