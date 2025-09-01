// Authentication utilities for checking user login status

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  profile_picture_url?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dubtitle.com/api';

// Check if user is authenticated
export const getUser = async (): Promise<User | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return null;
    }

    const responseJson = await response.json();
    return responseJson.body;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
};

// Check if user is authenticated (client-side)
export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getUser();
  return user !== null;
};

// Redirect to login with return URL
export const redirectToLogin = (returnUrl?: string) => {
  const loginUrl = `${API_BASE_URL}/login`;
  if (returnUrl) {
    window.location.href = `${loginUrl}?return_url=${encodeURIComponent(returnUrl)}`;
  } else {
    window.location.href = loginUrl;
  }
};
