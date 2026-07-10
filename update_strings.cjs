const fs = require('fs');

const replaceInFile = (file, replacements) => {
  let content = fs.readFileSync(file, 'utf8');
  for (const [search, replace] of replacements) {
    content = content.replace(search, replace);
  }
  fs.writeFileSync(file, content);
};

// CaseStudiesView.tsx
replaceInFile('src/components/CaseStudiesView.tsx', [
  [/Arctic Breeze HVAC and Wellness Clinic/g, "Arctic Breeze HVAC"],
  [/Our clinical secretaries/g, "Our dispatchers"],
  [/in-office patient check-ins/g, "field dispatches"],
  [/high-frequency wellness visits/g, "high-priority emergency calls"]
]);

// DemoView.tsx
replaceInFile('src/components/DemoView.tsx', [
  [/or clinic intake forms/g, "or quote estimate forms"],
  [/Main Street & Clinics/g, "Main Street & Home Services"],
  [/local clinic or retail shop/g, "local home service or retail shop"]
]);

// HomeView.tsx
replaceInFile('src/components/HomeView.tsx', [
  [/boost clinic and shop reviews/g, "boost service reviews"],
  [/default clinics CRM/g, "default service CRM"],
  [/our clinic desk/g, "our dispatch desk"]
]);

