const fs = require('fs');
let file = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

// Update activeIndustryTab state
file = file.replace(/const \[activeIndustryTab, setActiveIndustryTab\] = useState\('clinics'\);/, "const [activeIndustryTab, setActiveIndustryTab] = useState('hvac');");

// Update calculatorNiche state default
file = file.replace(/const \[calculatorNiche, setCalculatorNiche\] = useState\('medical'\);/, "const [calculatorNiche, setCalculatorNiche] = useState('hvac');");

// Update demoIndustry state default
file = file.replace(/const \[demoIndustry, setDemoIndustry\] = useState<string>\('Medical Clinic'\);/, "const [demoIndustry, setDemoIndustry] = useState<string>('HVAC');");

// Update handleDemoIndustryChange
file = file.replace(/switch\(ind\) \{[\s\S]*?default:[\s\S]*?\}/, `switch(ind) {
      case 'HVAC':
        bizName = 'Arctic Breeze HVAC';
        welcomeText = "Thanks for calling Arctic Breeze HVAC. This is your virtual receptionist. Are you looking to schedule emergency AC repair or standard maintenance?";
        break;
      case 'Plumbing':
        bizName = 'Apex Plumbing Bros';
        welcomeText = "Hello! Apex Plumbing Bros dispatch here. I can assist with emergency leaks, drain cleaning, or quotes. How can I help you today?";
        break;
      case 'Electrician':
        bizName = 'VoltGuard Electrical';
        welcomeText = "VoltGuard Electrical dispatch. Need to book a service technician, report a power outage, or get a rewiring quote? Let me know!";
        break;
      default:
        bizName = 'NeviqAI Client';
        welcomeText = "Hi, welcome to our business. How can I help you with your services today?";
    }`);

// Update getIndustryContent
file = file.replace(/const getIndustryContent = \(\) => \{[\s\S]*?return \{[\s\S]*?\};[\s\S]*?\};/, `const getIndustryContent = () => {
    switch(activeIndustryTab) {
      case 'hvac':
        return {
          title: "HVAC & Air Conditioning Repair",
          subtitle: "Emergency AC routing, seasonal tune-ups, and instant dispatch.",
          problem: "During summer heatwaves, techs were missing $800 emergency AC repair calls because they were busy on a roof or under a house.",
          solution: "NeviqAI instantly captures the caller's address, determines if it's a no-cooling emergency, and books a service window directly on your dispatch calendar.",
          stat: "92% increase in emergency job capture",
          logoText: "Arctic Breeze HVAC"
        };
      case 'plumbing':
        return {
          title: "Plumbing Services & Emergencies",
          subtitle: "Leak triage, drain cleaning, and automatic territory filtering.",
          problem: "Customers panicking about active leaks hung up when sent to voicemail, costing the company thousands in water damage mitigation jobs.",
          solution: "NeviqAI advises the customer to shut off the water main, logs their exact address, checks your service radius, and immediately dispatches an on-call plumber.",
          stat: "+3x emergency dispatch rate",
          logoText: "Apex Plumbing Bros"
        };
      case 'electrician':
        return {
          title: "Electrical Contractors",
          subtitle: "Safe triage for outages, quote scheduling, and wiring projects.",
          problem: "Master electricians were wasting 15 hours a week answering calls for jobs outside their scope or residential area.",
          solution: "NeviqAI pre-qualifies electrical leads, provides safety instructions for power failures, and secures estimates for major commercial quotes automatically.",
          stat: "15+ hours saved per week per tech",
          logoText: "VoltGuard Electrical"
        };
      default:
        return {
          title: "HVAC & Air Conditioning Repair",
          subtitle: "Emergency AC routing, seasonal tune-ups, and instant dispatch.",
          problem: "During summer heatwaves, techs were missing $800 emergency AC repair calls because they were busy on a roof or under a house.",
          solution: "NeviqAI instantly captures the caller's address, determines if it's a no-cooling emergency, and books a service window directly on your dispatch calendar.",
          stat: "92% increase in emergency job capture",
          logoText: "Arctic Breeze HVAC"
        };
    }
  };`);

// Write back to file
fs.writeFileSync('src/components/HomeView.tsx', file);
