const fs = require('fs');
let file = fs.readFileSync('src/components/SolutionsView.tsx', 'utf8');
file = file.replace(/type IndustryKey = [^;]+;/, "type IndustryKey = 'hvac' | 'plumbing' | 'electrician';");
file = file.replace(/const industries: Record<IndustryKey, IndustrySolution> = \{[\s\S]*?\};/, `const industries: Record<IndustryKey, IndustrySolution> = {
    hvac: {
      title: "HVAC & AC Repair",
      icon: Activity,
      tagline: "Instantly capture emergency AC and heating requests, 24/7.",
      problems: [
        "Losing high-value emergency AC repair jobs after hours",
        "Technicians interrupted by phone calls while on the job",
        "Difficulty scheduling routine maintenance during busy seasons"
      ],
      solutions: [
        "Intelligent emergency routing for extreme temperatures",
        "Automated booking for seasonal AC tune-ups",
        "Seamless dispatch integration without interrupting field work"
      ],
      demoFlow: {
        caller: "\\"My AC just broke and it's 95 degrees in my house, do you have someone available today?\\"",
        aiResponse: "\\"I understand that's an emergency. I can dispatch an emergency HVAC tech to you between 2 PM and 4 PM today. May I have your full address?\\"",
        systemAction: "Logs emergency priority and updates dispatch schedule.",
        outcomeSMS: "\\"Hi, your emergency HVAC tech is scheduled between 2-4 PM today. Track arrival here: neviqai.ai/track/hvac\\""
      },
      benefits: [
        { title: "Capture Emergencies", desc: "Never miss a high-ticket emergency repair because no one answered the phone." },
        { title: "Automate Maintenance", desc: "Easily schedule recurring seasonal maintenance appointments." },
        { title: "Field Efficiency", desc: "Let your techs focus on the job, not on taking calls." }
      ]
    },
    plumbing: {
      title: "Plumbing Services",
      icon: Droplets,
      tagline: "Stop leaks from turning into missed opportunities.",
      problems: [
        "Unanswered calls during critical leak emergencies",
        "Wasted time on non-serviceable areas",
        "Struggle to manage routine vs. emergency scheduling"
      ],
      solutions: [
        "Instant emergency intake for active leaks and flooding",
        "Automatic zip code filtering for serviceable areas",
        "Smart calendar scheduling for non-emergency plumbing issues"
      ],
      demoFlow: {
        caller: "\\"I have a pipe bursting in my basement, I need a plumber now!\\"",
        aiResponse: "\\"Please turn off your main water valve immediately if you can. I am dispatching our emergency plumber to your location. What is your address?\\"",
        systemAction: "Creates high-priority dispatch ticket and notifies on-call plumber.",
        outcomeSMS: "\\"Your emergency plumber is en route. Expected arrival in 30 minutes. Status: neviqai.ai/track/plumb\\""
      },
      benefits: [
        { title: "Emergency Triage", desc: "Quickly assess and route urgent plumbing disasters to the right tech." },
        { title: "Smart Routing", desc: "Qualify leads based on location and service type before booking." },
        { title: "24/7 Reliability", desc: "Be the plumber that always answers, day or night." }
      ]
    },
    electrician: {
      title: "Electrical Contractors",
      icon: Sparkles,
      tagline: "Powering up your dispatch with automated receptionist services.",
      problems: [
        "Missing lucrative commercial or residential rewiring quotes",
        "Safety concerns with unanswered power outage calls",
        "Balancing quotes vs. actual repair dispatching"
      ],
      solutions: [
        "Intelligently books quotes for major electrical work",
        "Provides basic safety instructions for urgent electrical faults",
        "Automates follow-ups for pending estimate approvals"
      ],
      demoFlow: {
        caller: "\\"Half the power in my house just went out and the breaker won't reset.\\"",
        aiResponse: "\\"I can help with that. Please avoid touching the panel. We can have a certified electrician out this afternoon. Can I get your address?\\"",
        systemAction: "Books residential electrical diagnostic appointment.",
        outcomeSMS: "\\"Your electrician is scheduled for this afternoon. Safety tips while you wait: neviqai.ai/safe/elec\\""
      },
      benefits: [
        { title: "Secure More Quotes", desc: "Ensure every potential lead gets scheduled for an estimate." },
        { title: "Safety First", desc: "Provide immediate, safe responses to electrical emergencies." },
        { title: "Professional Image", desc: "Sound like a massive enterprise operation with a polished AI voice." }
      ]
    }
  };`);
file = file.replace(/const \[activeTab, setActiveTab\] = useState<IndustryKey>\('[^']+'\);/, "const [activeTab, setActiveTab] = useState<IndustryKey>('hvac');");
fs.writeFileSync('src/components/SolutionsView.tsx', file);
