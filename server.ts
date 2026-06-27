import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// JSON file booking storage
import fs from "fs";
const BOOKINGS_FILE = path.join(process.cwd(), "bookings.json");

interface Booking {
  id: string;
  source: "scheduling_form" | "ai_receptionist";
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  businessName?: string;
  website?: string;
  monthlyCalls?: string;
  integrationSystem?: string;
  voiceVoiceType?: string;
  selectedDay?: string;
  selectedHour?: string;
  serviceRequested?: string;
  appointmentSlot?: string;
  industry?: string;
}

function loadBookings(): Booking[] {
  try {
    if (fs.existsSync(BOOKINGS_FILE)) {
      const data = fs.readFileSync(BOOKINGS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading bookings.json:", error);
  }
  return [];
}

function saveBooking(booking: Omit<Booking, "id" | "createdAt">): Booking {
  const bookings = loadBookings();
  const newBooking: Booking = {
    ...booking,
    id: "bk_" + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString()
  };
  bookings.push(newBooking);
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing bookings.json:", error);
  }
  return newBooking;
}

// API Endpoints for Bookings Management
app.get("/api/bookings", (req, res) => {
  const bookings = loadBookings();
  // Sort by createdAt desc
  bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  res.json({ success: true, bookings });
});

app.post("/api/bookings", (req, res) => {
  const bookingData = req.body;
  if (!bookingData.name || !bookingData.phone) {
    return res.status(400).json({ success: false, error: "Name and Phone are required." });
  }
  const newBooking = saveBooking({
    source: bookingData.source || "scheduling_form",
    name: bookingData.name,
    phone: bookingData.phone,
    email: bookingData.email,
    businessName: bookingData.businessName,
    website: bookingData.website,
    monthlyCalls: bookingData.monthlyCalls,
    integrationSystem: bookingData.integrationSystem,
    voiceVoiceType: bookingData.voiceVoiceType,
    selectedDay: bookingData.selectedDay,
    selectedHour: bookingData.selectedHour,
    serviceRequested: bookingData.serviceRequested,
    appointmentSlot: bookingData.appointmentSlot,
    industry: bookingData.industry
  });
  res.json({ success: true, booking: newBooking });
});

app.post("/api/bookings/clear", (req, res) => {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2), "utf-8");
    res.json({ success: true, message: "All bookings cleared successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Lazy-initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. Using mock fallback mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Multi-Industry Mock Business Data for FAQs
const BUSINESS_DATA: Record<string, { name: string; hours: string; location: string; services: string[] }> = {
  "Medical Clinic": {
    name: "Apex Family Medicine",
    hours: "Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM",
    location: "452 Health Parkway, Suite A, Austin, TX",
    services: ["General Consultation", "Flu Shot & Immunizations", "Prescription Refill", "Physical Checkup"]
  },
  "Dental Clinic": {
    name: "Radiant Smile Dentistry",
    hours: "Mon-Thu: 7:00 AM - 5:00 PM, Fri: 8:00 AM - 3:00 PM",
    location: "102 Brush Avenue, Seattle, WA",
    services: ["General Cleaning & Checkup", "Teeth Whitening", "Cavity Filling", "Emergency Dental Assessment"]
  },
  "Veterinary Clinic": {
    name: "Paws & Claws Animal Hospital",
    hours: "Open 24/7 for Emergencies. Regular appointments: Mon-Sun: 8:00 AM - 8:00 PM",
    location: "888 Tailwag Blvd, Denver, CO",
    services: ["Pet Wellness Exam", "Core Vaccinations", "Dental Scale & Polish", "Tick & Flea Prevention Checks"]
  },
  "Beauty Salon": {
    name: "Luxe & Bloom Hair Concierge",
    hours: "Tue-Sat: 9:00 AM - 7:00 PM, Sun: 10:00 AM - 4:00 PM",
    location: "73 Chic Boulevard, Beverly Hills, CA",
    services: ["Signature Haircut & Style", "Organic Facial Therapy", "Luxury Manicure & Pedicure", "Balayage Color Treat"]
  },
  "Auto Repair": {
    name: "Precision Torque Motors",
    hours: "Mon-Fri: 7:30 AM - 6:00 PM, Sat: 8:00 AM - 1:00 PM",
    location: "1208 Gearbox Lane, Charlotte, NC",
    services: ["Full Synthetic Oil Change", "Brake Pad Replacement", "Diagnostic Code Scan", "Tire Rotation & Balance"]
  },
  "Car Wash": {
    name: "TurboFlow Laser Wash",
    hours: "Mon-Sun: 7:00 AM - 9:00 PM",
    location: "303 Splash Circle, Tampa, FL",
    services: ["Ceramic Express Wash", "Interior & Exterior Detailing", "Clay Bar & Hand Wax", "Undercarriage Guard"]
  },
  "Home Services": {
    name: "ProShield Plumbers & Sparkies",
    hours: "24/7 Emergency Dispatch. Normal bookings: Mon-Sat: 7:00 AM - 7:00 PM",
    location: "Regional Coverage, Atlanta, GA",
    services: ["Emergency Clog Clearing", "AC Maintenance Tune-up", "Smart Thermostat Setup", "Water Heater Repair"]
  }
};

// API Check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", keyAvailable: !!process.env.GEMINI_API_KEY });
});

// AI Receptionist Simulation API endpoint
app.post("/api/receptionist/chat", async (req, res) => {
  const { messages, industry } = req.body;
  const industrySelected = industry || "Medical Clinic";
  const business = BUSINESS_DATA[industrySelected] || BUSINESS_DATA["Medical Clinic"];

  // Format messages for Gemini API
  // Convert standard { role: 'user' | 'assistant', text: string } to Gemini structure
  const formattedContents = messages.map((m: any) => {
    return {
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text || m.content || "" }]
    };
  });

  const systemInstruction = `You are a highly efficient, friendly, and professional 24/7 AI Phone Receptionist named "VoiceDesk AI" for a local business named "${business.name}" (Industry: ${industrySelected}).
Our location is: ${business.location}.
Our working hours are: ${business.hours}.
We offer these key services: ${business.services.join(", ")}.

Your goals:
1. Greet callers warmly, answer their specific queries about our location, operational hours, or services, and behave like an elite receptionist.
2. Guide them to schedule an appointment. Always make booking sound easy.
3. If they would like to book or schedule, politely and naturally extract:
   - Their Full Name
   - Their Mobile Phone Number
   - Their Preferred Date & Time
4. Once they provide these details, verify them back to the caller in a helpful voice, and confirm that the appointment has been officially locked into the calendar.
5. Speak in brief, natural, verbal sentences. Do NOT use bullet points, list formatting, bolding, asterisks, or markdown symbols. Respond ONLY inside the structured JSON structure.

You MUST reply with a valid JSON object matching the following TypeScript schema:
{
  "reply": string,           // The spoken response to say back to the user. Keep it brief, spoken-style, and dynamic.
  "customerName": string | null,    // Extracted customer name if mentioned, otherwise keep null or previous value.
  "customerPhone": string | null,   // Extracted phone number if mentioned, otherwise keep null or previous value.
  "appointmentSlot": string | null, // Extracted requested date/time slot if mentioned, otherwise keep null or previous value.
  "serviceRequested": string | null, // Extracted service name if mentioned, otherwise keep null or previous value.
  "isBookingConfirmed": boolean      // Set to true ONLY if you have collected Name, Phone, and Slot, and have explicitly confirmed to the client that the booking is complete. Otherwise false.
}
`;

  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      // 10X smarter, context-aware local dialog fallback parser:
      // Loop across the whole conversational dialog trace to build up the context variables dynamically
      let currentName: string | null = null;
      let currentPhone: string | null = null;
      let currentSlot: string | null = null;
      let currentService: string | null = null;
      let isConfirmed = false;

      messages.forEach((msg: any) => {
        if (!msg || !msg.text) return;
        const textLower = msg.text.toLowerCase();

        // 1. Service Detection against business services
        business.services.forEach(serv => {
          if (textLower.includes(serv.toLowerCase()) || textLower.includes(serv.split(" ")[0].toLowerCase())) {
            currentService = serv;
          }
        });

        // 2. Name Extraction from greeting lines
        const nameMatch = msg.text.match(/(?:my name is|i am|this is|call me|name is)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i);
        if (nameMatch && nameMatch[1]) {
          const possibleName = nameMatch[1].trim();
          if (possibleName.split(/\s+/).length <= 3) {
            currentName = possibleName;
          }
        } else if (msg.role === "user" && !currentName) {
          // If the user just typed a short single/double word that isn't a conversational helper
          const words = msg.text.trim().split(/\s+/);
          if (words.length <= 2 && !/^(hello|hi|yes|no|sure|ok|okay|book|schedule|appointment|need|want)/i.test(words[0])) {
            currentName = msg.text.trim();
          }
        }

        // 3. Phone Number Extraction
        const phoneMatch = msg.text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{7,10}/);
        if (phoneMatch) {
          currentPhone = phoneMatch[0];
        }

        // 4. Preferred Slot extraction
        const slotMatch = msg.text.match(/(?:tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|next\s+[a-z]+|today|morning|afternoon|evening|\d{1,2}(?::\d{2})?\s*(?:am|pm|o'clock))/i);
        if (slotMatch) {
          currentSlot = slotMatch[0].charAt(0).toUpperCase() + slotMatch[0].slice(1);
        }
      });

      // Handle the conversational responses based on the collected variables
      const lastMsg = messages[messages.length - 1]?.text || "";
      const lastMsgLower = lastMsg.toLowerCase();
      let replyText = "";

      if (!currentService && lastMsgLower.includes("service")) {
        currentService = business.services[0];
      }

      if (currentName && currentPhone && currentSlot) {
        isConfirmed = true;
        replyText = `Excellent! I have officially locked ${currentName} in for ${currentSlot} for ${currentService || business.services[0]} at our ${business.name} branch. A confirmation SMS is on its way to ${currentPhone}. We look forward to seeing you!`;
        
        // Auto-save reservation to lead portal
        saveBooking({
          source: "ai_receptionist",
          name: currentName,
          phone: currentPhone,
          serviceRequested: currentService || business.services[0],
          appointmentSlot: currentSlot,
          businessName: business.name,
          industry: industrySelected
        });
      } else if (!currentName) {
        // Find if user just greeted
        if (/^(hello|hi|hey|greetings)/i.test(lastMsgLower)) {
          replyText = `Hello! Thank you for dialling ${business.name}. I'm your virtual dispatcher. Would you like to schedule an appointment for ${business.services[0]} or another service today?`;
        } else {
          replyText = `I'd love to lock that in for you! Could you please share your name so I can create the booking record?`;
        }
      } else if (!currentPhone) {
        replyText = `Nice to meet you, ${currentName}! What is the best mobile phone number to text your booking receipt and reservation mapping to?`;
      } else if (!currentSlot) {
        replyText = `Great, I've got your cell number: ${currentPhone}. What date and preferred time slot would work best for your visit?`;
      } else {
        replyText = `Perfect, got it. Could you confirm what specific service you're scheduling? We offer: ${business.services.join(", ")}.`;
      }

      return res.json({
        reply: replyText,
        customerName: currentName,
        customerPhone: currentPhone,
        appointmentSlot: currentSlot,
        serviceRequested: currentService || business.services[0],
        isBookingConfirmed: isConfirmed,
        isMocked: true
      });
    }

    const ai = getGeminiClient();
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const textOutput = result.text;
    if (!textOutput) {
      throw new Error("Empty response from Gemini API");
    }

    const parsedResponse = JSON.parse(textOutput.trim());
    
    // Auto-save reservation to lead portal if confirmed by Gemini
    if (parsedResponse.isBookingConfirmed) {
      saveBooking({
        source: "ai_receptionist",
        name: parsedResponse.customerName || "Valued Caller",
        phone: parsedResponse.customerPhone || "N/A",
        serviceRequested: parsedResponse.serviceRequested || business.services[0],
        appointmentSlot: parsedResponse.appointmentSlot || "N/A",
        businessName: business.name,
        industry: industrySelected
      });
    }

    return res.json({
      ...parsedResponse,
      isMocked: false
    });

  } catch (error: any) {
    console.error("AI Receptionist endpoint error:", error);
    // Fallback response inside the clean structure
    return res.status(200).json({
      reply: `Certainly, thanks for calling ${business.name}. I am here to assist you. Could you share your name and what service you'd like to reserve?`,
      customerName: null,
      customerPhone: null,
      appointmentSlot: null,
      serviceRequested: null,
      isBookingConfirmed: false,
      error: error.message
    });
  }
});

// Configure Vite or Static files serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode serving static files...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VoiceDeskAI backend running securely at http://localhost:${PORT}`);
  });
}

setupServer();
