// Configuration for API base URL
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://amrish-portfoliobackend.onrender.com' 
  : ''; //

// helper function to get full API URL
export function getApiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
} 