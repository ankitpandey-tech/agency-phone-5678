const fs = require('fs');
let file = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

// handleNichePreset update
file = file.replace(/const handleNichePreset = \(niche: string\) => \{[\s\S]*?default:[\s\S]*?\};/, `const handleNichePreset = (niche: string) => {
    setCalculatorNiche(niche);
    switch(niche) {
      case 'hvac':
        setTicketValue(800);
        setEstimatedMissedCalls(25);
        setBookingConvPercent(60);
        break;
      case 'plumbing':
        setTicketValue(450);
        setEstimatedMissedCalls(35);
        setBookingConvPercent(65);
        break;
      case 'electrician':
        setTicketValue(600);
        setEstimatedMissedCalls(20);
        setBookingConvPercent(55);
        break;
      default:
        break;
    }
  };`);

// Update ROI calculator buttons
file = file.replace(/\[\s*\{\s*id:\s*'dental'[\s\S]*?\}\s*\]\.map\(\(preset\)/, `[
                    { id: 'hvac', label: 'HVAC & AC' },
                    { id: 'plumbing', label: 'Plumbing' },
                    { id: 'electrician', label: 'Electrician' }
                  ].map((preset)`);

// Update Interactive Demo Buttons
file = file.replace(/\[\s*'Medical Clinic',[\s\S]*?'Home Services'\s*\]\.map/, `[
                  'HVAC',
                  'Plumbing',
                  'Electrician'
                ].map`);

// Update the dynamic tabs section buttons
file = file.replace(/\[\s*\{\s*id:\s*'clinics'[\s\S]*?\}\s*\]\.map\(\(tab\)/, `[
              { id: 'hvac', label: 'HVAC' },
              { id: 'plumbing', label: 'Plumbing' },
              { id: 'electrician', label: 'Electrician' }
            ].map((tab)`);

// Update activeIndustryTab logic inside the Select in Demo button
file = file.replace(/activeIndustryTab === 'clinics' \? 'Medical Clinic' :[\s\S]*?'Home Services'\s*\)/, `activeIndustryTab === 'hvac' ? 'HVAC' :
                    activeIndustryTab === 'plumbing' ? 'Plumbing' : 'Electrician'
                  )`);

fs.writeFileSync('src/components/HomeView.tsx', file);
