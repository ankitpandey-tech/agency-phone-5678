const fs = require('fs');
let file = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

file = file.replace(/const \[activeIndustryTab, setActiveIndustryTab\] = useState<'clinics' \| 'veterinary' \| 'beauty' \| 'auto' \| 'carwash' \| 'home-services'>\('hvac'\);/, "const [activeIndustryTab, setActiveIndustryTab] = useState<string>('hvac');");

fs.writeFileSync('src/components/HomeView.tsx', file);
