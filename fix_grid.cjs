const fs = require('fs');
let file = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

const oldGrid = `            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Building className="w-5 h-5 text-slate-400" />
              <span className="text-sm">HVAC Services</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Users className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Vet Care</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Scissors className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Electricians</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Wrench className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Electrical Contractorss</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Sparkles className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Plumbing Services</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Building className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Plumbing</span>
            </div>`;

const newGrid = `            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Building className="w-5 h-5 text-slate-400" />
              <span className="text-sm">HVAC Repair</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Users className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Plumbing Services</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Scissors className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Electricians</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Wrench className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Appliance Repair</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Sparkles className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Roofing Experts</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Building className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Home Contractors</span>
            </div>`;

file = file.replace(oldGrid, newGrid);

// Fix a "plumbing" typo on mx-plumbing
file = file.replace(/mx-plumbing/g, "mx-auto");

fs.writeFileSync('src/components/HomeView.tsx', file);
