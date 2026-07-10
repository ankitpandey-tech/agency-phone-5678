const fs = require('fs');
let file = fs.readFileSync('src/components/DemoBookingView.tsx', 'utf8');

file = file.replace(/<option value="EHR System">Dental\/Medical EHR Database<\/option>/, '');
file = file.replace(/<option value="ServiceTitan">ServiceTitan \/ Housecall Pro \(Home Techs\)<\/option>/, '<option value="ServiceTitan">ServiceTitan / Housecall Pro</option>\n                        <option value="Jobber">Jobber / FieldEdge</option>');

fs.writeFileSync('src/components/DemoBookingView.tsx', file);
