const fs = require('fs');

const replaceInFile = (file, replacements) => {
  let content = fs.readFileSync(file, 'utf8');
  for (const [search, replace] of replacements) {
    content = content.replace(search, replace);
  }
  fs.writeFileSync(file, content);
};

// HomeView.tsx Testimonials and bits
replaceInFile('src/components/HomeView.tsx', [
  [/Our veterinary hospital receives massive calls late at night. The AI takes everything in stride. It schedules wellness vet slots flawlessly on Saturday nights, and texts check-in preparation forms automatically. Absolute gamechanger!/g, "Our plumbing business receives massive emergency calls late at night. The AI takes everything in stride. It schedules dispatch slots flawlessly on Saturday nights, and texts arrival times automatically. Absolute gamechanger!"],
  [/Client leaves our medi-salon spa/g, "Client gets their AC fixed"],
  [/catalogs patient details/g, "catalogs customer details"],
  [/texts check-in preparation forms/g, "texts dispatch preparation forms"],
  [/patient or client/g, "customer"],
  [/patient visits/g, "field visits"],
  [/wellness visits or general physical slots/g, "emergency jobs or general maintenance slots"],
  [/urgent medical requests to on-call clinical teams/g, "urgent HVAC requests to on-call techs"],
  [/common pet clinic questions \(vaccination, pre-surgery prep rules\)/g, "common plumbing questions (leaks, clogs)"],
  [/books general vet checkups/g, "books general maintenance"],
  [/routes emergencies to emergency veterinary hospital staff/g, "routes emergencies to on-call plumbers"],
  [/answers salon lines instantly/g, "answers electrical lines instantly"],
  [/matching stylists to requested services \(blowout, classic skin therapies\)/g, "matching electricians to requested jobs"],
  [/classic skin therapies/g, "panel upgrades"],
  [/veterinary/g, "plumbing"],
  [/beauty/g, "electrician"],
  [/carwash/g, "roofing"],
  [/clinics/g, "hvac"],
  [/auto/g, "plumbing"]
]);

