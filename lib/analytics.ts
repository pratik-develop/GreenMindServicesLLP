// Google Analytics 4 Configuration
export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || ''

// Event tracking functions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters)
  }
}

export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    })
  }
}

// Custom event types
export const AnalyticsEvents = {
  // Contact form
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_SUCCESS: 'contact_form_success',
  CONTACT_FORM_ERROR: 'contact_form_error',
  
  // Lead magnets
  LEAD_MAGNET_DOWNLOAD: 'lead_magnet_download',
  NEWSLETTER_SUBSCRIBE: 'newsletter_subscribe',
  
  // Assessment tools
  ESG_ASSESSMENT_START: 'esg_assessment_start',
  ESG_ASSESSMENT_COMPLETE: 'esg_assessment_complete',
  COMPLIANCE_CHECKLIST_START: 'compliance_checklist_start',
  COMPLIANCE_CHECKLIST_COMPLETE: 'compliance_checklist_complete',
  
  // Service pages
  SERVICE_PAGE_VIEW: 'service_page_view',
  SERVICE_CTA_CLICK: 'service_cta_click',
  
  // Projects
  PROJECT_PAGE_VIEW: 'project_page_view',
  PROJECT_DETAILS_VIEW: 'project_details_view',
  
  // Resources
  RESOURCE_DOWNLOAD: 'resource_download',
  WEBINAR_REGISTER: 'webinar_register',
  
  // Navigation
  NAV_LINK_CLICK: 'nav_link_click',
  FOOTER_LINK_CLICK: 'footer_link_click',
}
