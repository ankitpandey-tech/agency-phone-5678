export type PageMode = 'home' | 'solutions' | 'case-studies' | 'about' | 'contact' | 'book-demo' | 'demo' | 'privacy-policy' | 'terms' | 'cookies' | 'refund-policy' | 'data';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface ExtractedLead {
  customerName: string | null;
  customerPhone: string | null;
  appointmentSlot: string | null;
  serviceRequested: string | null;
  isBookingConfirmed: boolean;
}

export interface BusinessConfig {
  name: string;
  industry: string;
  hours: string;
  location: string;
  services: string[];
  problems: string[];
  solutions: string[];
  demoPrompt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
