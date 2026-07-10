const fs = require('fs');
let file = fs.readFileSync('server.ts', 'utf8');

// Replace BUSINESS_DATA
file = file.replace(/const BUSINESS_DATA: Record<string, \{ name: string; hours: string; location: string; services: string\[\] \}> = \{[\s\S]*?\};/, `const BUSINESS_DATA: Record<string, { name: string; hours: string; location: string; services: string[] }> = {
  "HVAC": {
    name: "Arctic Breeze HVAC",
    hours: "Mon-Sun: 24/7 Emergency Service",
    location: "452 HVAC Parkway, Suite A, Austin, TX",
    services: ["Emergency AC Repair", "Seasonal Tune-Up", "Furnace Installation", "Duct Cleaning"]
  },
  "Plumbing": {
    name: "Apex Plumbing Bros",
    hours: "Mon-Sun: 24/7 Emergency Service",
    location: "102 Pipe Avenue, Seattle, WA",
    services: ["Emergency Leak Repair", "Drain Cleaning", "Water Heater Installation", "Pipe Inspection"]
  },
  "Electrician": {
    name: "VoltGuard Electrical",
    hours: "Mon-Sun: 24/7 Emergency Service",
    location: "159 Spark Blvd, Miami, FL",
    services: ["Emergency Outage Repair", "Panel Upgrade", "Rewiring Quote", "Lighting Installation"]
  }
};`);

// Replace default industry
file = file.replace(/const industrySelected = industry \|\| "Medical Clinic";/, 'const industrySelected = industry || "HVAC";');
file = file.replace(/const business = BUSINESS_DATA\[industrySelected\] \|\| BUSINESS_DATA\["Medical Clinic"\];/, 'const business = BUSINESS_DATA[industrySelected] || BUSINESS_DATA["HVAC"];');

fs.writeFileSync('server.ts', file);
