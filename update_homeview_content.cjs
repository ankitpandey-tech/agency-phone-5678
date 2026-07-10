const fs = require('fs');
let file = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

// Replace getIndustryTabContent
file = file.replace(/const getIndustryTabContent = \(\) => \{[\s\S]*?return \{[\s\S]*?\};[\s\S]*?\};/, `const getIndustryTabContent = () => {
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

fs.writeFileSync('src/components/HomeView.tsx', file);
