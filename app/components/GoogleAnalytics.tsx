"use client";

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-KPX62GPVQ2';

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

// Helper function to track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Helper function to track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Helper function to track user interactions
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('click', 'button', `${buttonName} - ${location}`);
};

// Helper function to track form submissions
export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submit', 'form', formName, success ? 1 : 0);
}; 