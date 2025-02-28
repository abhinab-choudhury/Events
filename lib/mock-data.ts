"use client";

export type EventType = {
  eventId: string;
  title: string;
  banner_image: File;
  description: string;
  date_range: {
    from: Date;
    to: Date;
  };
  time: string;
  approx_audience_count: number;
  location: string;
  mode: "offline" | "online" | "hybrid";
  agenda: string[];
  external_links: {
    title: string;
    link: string;
  }[];
  online_join_link: string;
  social_links: {
    twitter?: string;
    instagram?: string;
    website?: string;
    linkedin?: string;
    youtube?: string;
  };
  require_approval: boolean;
  unsplash_image: string;
};

const mockEvents: EventType[] = [
  {
    eventId: "1",
    title: "Annual Tech Conference 2025",
    banner_image: new File([""], "tech-conference.jpg", { type: "image/jpeg" }), // Mock File object
    description: `
  **Join us for the biggest tech conference of the year!**
  
  Featuring keynotes from industry leaders, hands-on workshops, and exclusive networking opportunities. Our 3-day event brings together:
  
  - 50+ expert speakers
  - 25 interactive workshops
  - 10 specialized tracks
  - Exclusive product launches
  
  *Early bird registration now open with 25% discount!*
      `.trim(),
    date_range: {
      from: new Date("2025-04-15"),
      to: new Date("2025-04-17"),
    },
    time: "9:00 AM - 6:00 PM",
    approx_audience_count: 1500,
    location: "https://maps.google.com/?q=Moscone+Center+San+Francisco",
    mode: "hybrid",
    agenda: [
      "Opening Keynote: The Future of AI",
      "Workshop: Building with React 19",
      "Panel Discussion: Cybersecurity Trends",
      "Networking Lunch",
      "Closing Remarks and Awards",
    ],
    external_links: [
      {
        title: "Speaker Profiles",
        link: "https://techconf2025.example.com/speakers",
      },
      {
        title: "Schedule",
        link: "https://techconf2025.example.com/schedule",
      },
    ],
    online_join_link: "https://zoom.us/j/123456789",
    social_links: {
      twitter: "https://twitter.com/techconf2025",
      linkedin: "https://linkedin.com/company/techconf2025",
      website: "https://techconf2025.example.com",
      instagram: "https://instagram.com/techconf2025",
      youtube: "https://youtube.com/c/techconf2025",
    },
    require_approval: true,
    unsplash_image: "img.jpg",
  },
  {
    eventId: "2",
    title: "Product Design Workshop",
    banner_image: new File([""], "design-workshop.jpg", { type: "image/jpeg" }),
    description: `
  **Transform your design thinking in one intensive day!**
  
  This hands-on workshop focuses on *modern product design methodologies* with industry experts guiding you through:
  
  1. User-centered design principles
  2. Rapid prototyping techniques 
  3. Design systems implementation
  4. User testing best practices
  
  > "The most practical design workshop I've ever attended" — Previous Participant
  
  **Limited to 50 seats!**
      `.trim(),
    date_range: {
      from: new Date("2025-03-10"),
      to: new Date("2025-03-10"),
    },
    time: "10:00 AM - 3:00 PM",
    approx_audience_count: 50,
    location: "https://maps.google.com/?q=Design+Studio+NYC",
    mode: "offline",
    agenda: [
      "Introduction to Design Thinking",
      "User Research Techniques",
      "Prototyping Methods",
      "User Testing Workshop",
    ],
    external_links: [
      {
        title: "Materials List",
        link: "https://designworkshop.example.com/materials",
      },
      {
        title: "Preparation Guide",
        link: "https://designworkshop.example.com/prep",
      },
    ],
    online_join_link: "https://designworkshop.example.com/virtual-option",
    social_links: {
      website: "https://designworkshop.example.com",
      instagram: "https://instagram.com/designworkshop",
      twitter: "https://twitter.com/designworkshop",
    },
    require_approval: false,
    unsplash_image: "img4.jpeg",
  },
  {
    eventId: "3",
    title: "Virtual Marketing Summit",
    banner_image: new File([""], "marketing-summit.jpg", {
      type: "image/jpeg",
    }),
    description: `
  **Revolutionize your marketing strategy for 2025!**
  
  Our virtual summit brings together *marketing innovators* from global brands to share:
  
  * **AI-driven customer engagement** tactics
  * **Content marketing** strategies that convert
  * **Social media algorithms** demystified
  * **Analytics** for actionable insights
  
  Join 800+ marketers for live sessions, Q&As, and networking opportunities. 
  
  **Bonus:** *All attendees receive our 2025 Digital Marketing Trends Report ($299 value)*
      `.trim(),
    date_range: {
      from: new Date("2025-05-20"),
      to: new Date("2025-05-21"),
    },
    time: "11:00 AM - 4:00 PM",
    approx_audience_count: 800,
    location: "https://maps.google.com/?q=Virtual+Event",
    mode: "online",
    agenda: [
      "SEO in 2025: What's Changed",
      "Social Media Strategy Masterclass",
      "Content Marketing Deep Dive",
      "Analytics and Measurement",
      "Q&A with Marketing Influencers",
    ],
    external_links: [
      {
        title: "Speaker Bios",
        link: "https://marketingsummit.example.com/speakers",
      },
      {
        title: "Resources",
        link: "https://marketingsummit.example.com/resources",
      },
    ],
    online_join_link: "https://hopin.to/events/marketing-summit-2025",
    social_links: {
      twitter: "https://twitter.com/marketsummit",
      linkedin: "https://linkedin.com/company/marketing-summit",
      website: "https://marketingsummit.example.com",
      youtube: "https://youtube.com/c/marketsummit",
    },
    require_approval: false,
    unsplash_image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  },
  {
    eventId: "4",
    title: "Data Science Bootcamp",
    banner_image: new File([""], "data-science.jpg", { type: "image/jpeg" }),
    description: `
  **Master Data Science in One Intensive Day!**
  
  Our bootcamp delivers a *comprehensive introduction* to data science fundamentals:
  
  1. Python & pandas for data manipulation
  2. Statistical analysis techniques 
  3. Machine learning model deployment
  4. Real-world project implementation
  
  \`\`\`python
  # You'll learn to write code like this
  import pandas as pd
  from sklearn.model_selection import train_test_split
  \`\`\`
  
  **Perfect for analysts, developers, and curious professionals!**
      `.trim(),
    date_range: {
      from: new Date("2025-06-05"),
      to: new Date("2025-06-05"),
    },
    time: "8:30 AM - 5:30 PM",
    approx_audience_count: 100,
    location: "https://maps.google.com/?q=Tech+Hub+Boston",
    mode: "hybrid",
    agenda: [
      "Python for Data Analysis",
      "Statistical Methods Overview",
      "Machine Learning Fundamentals",
      "Hands-on Project Work",
      "Career Opportunities in Data Science",
    ],
    external_links: [
      {
        title: "Pre-requisites",
        link: "https://datasciencebootcamp.example.com/prerequisites",
      },
      {
        title: "Installation Guide",
        link: "https://datasciencebootcamp.example.com/setup",
      },
    ],
    online_join_link:
      "https://teams.microsoft.com/l/meetup-join/data-science-bootcamp",
    social_links: {
      linkedin: "https://linkedin.com/company/data-science-bootcamp",
      website: "https://datasciencebootcamp.example.com",
      youtube: "https://youtube.com/c/datasciencebootcamp",
      twitter: "https://twitter.com/datascienceboot",
    },
    require_approval: true,
    unsplash_image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    eventId: "5",
    title: "Startup Pitch Night",
    banner_image: new File([""], "startup-pitch.jpg", { type: "image/jpeg" }),
    description: `
  **Witness the Future of Innovation!**
  
  Our electric pitch night showcases *10 breakthrough startups* competing for:
  
  - $50,000 in seed funding
  - Mentorship from leading VCs
  - Technology partnership opportunities
  - Media exposure package
  
  ### Event Highlights
  * 5-minute pitch presentations
  * Live audience Q&A
  * Expert investor panel feedback
  * Premium networking reception with founders
  
  *Your next investment opportunity awaits!*
      `.trim(),
    date_range: {
      from: new Date("2025-03-25"),
      to: new Date("2025-03-25"),
    },
    time: "6:00 PM - 9:00 PM",
    approx_audience_count: 250,
    location: "https://maps.google.com/?q=Innovation+Center+Austin",
    mode: "offline",
    agenda: [
      "Welcome and Introduction",
      "5-Minute Pitches from 10 Startups",
      "Q&A with Judges",
      "Networking Reception",
      "Winner Announcement",
    ],
    external_links: [
      {
        title: "Participating Startups",
        link: "https://pitchnight.example.com/startups",
      },
      {
        title: "Judging Criteria",
        link: "https://pitchnight.example.com/criteria",
      },
    ],
    online_join_link: "https://pitchnight.example.com/livestream",
    social_links: {
      twitter: "https://twitter.com/startuppitchnight",
      linkedin: "https://linkedin.com/company/startup-pitch-night",
      instagram: "https://instagram.com/startuppitchnight",
      website: "https://pitchnight.example.com",
    },
    require_approval: false,
    unsplash_image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    eventId: "6",
    title: "Healthcare Innovation Forum",
    banner_image: new File([""], "healthcare-innovation.jpg", {
      type: "image/jpeg",
    }),
    description: `
  **Transforming Patient Care Through Technology**
  
  The premier gathering for *healthcare innovators, technologists, and providers* featuring:
  
  * **Keynote:** The Role of AI in Diagnostics
  * **Panel:** Patient Data Security Challenges
  * **Workshop:** Regulatory Navigation for Health Tech
  * **Showcase:** Breakthrough Medical Devices
  
  **CME Credits Available:** Earn up to 18 continuing education credits across 3 days.
  
  *Early registration discount ends March 15th!*
      `.trim(),
    date_range: {
      from: new Date("2025-07-10"),
      to: new Date("2025-07-12"),
    },
    time: "8:00 AM - 5:00 PM",
    approx_audience_count: 600,
    location: "https://maps.google.com/?q=Medical+Center+Chicago",
    mode: "hybrid",
    agenda: [
      "Telemedicine: Lessons from the Pandemic",
      "AI in Medical Diagnostics",
      "Patient Data Privacy and Security",
      "Regulatory Challenges in Health Tech",
      "Future of Remote Patient Monitoring",
    ],
    external_links: [
      {
        title: "Research Papers",
        link: "https://healthinnovation.example.com/papers",
      },
      {
        title: "CME Credits Information",
        link: "https://healthinnovation.example.com/cme",
      },
    ],
    online_join_link: "https://webex.com/healthinnovation2025",
    social_links: {
      twitter: "https://twitter.com/healthinnovforum",
      linkedin: "https://linkedin.com/company/health-innovation-forum",
      website: "https://healthinnovation.example.com",
      youtube: "https://youtube.com/c/healthinnovation",
    },
    require_approval: true,
    unsplash_image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    eventId: "7",
    title: "Web3 Developer Conference",
    banner_image: new File([""], "web3-conference.jpg", { type: "image/jpeg" }),
    description: `
  **Build the Decentralized Future**
  
  The essential conference for *blockchain developers and Web3 pioneers* featuring:
  
  ## Technical Tracks
  - Smart contract development & security
  - DeFi protocol architecture
  - NFT platforms & marketplaces
  - Layer 2 scaling solutions
  
  ## Hands-on Workshops
  - Solidity best practices
  - Zero-knowledge proofs
  - Cross-chain interoperability
  
  **All attendees receive $500 in cloud credits and exclusive NFT!**
      `.trim(),
    date_range: {
      from: new Date("2025-04-28"),
      to: new Date("2025-04-30"),
    },
    time: "9:00 AM - 6:30 PM",
    approx_audience_count: 1200,
    location: "https://maps.google.com/?q=Crypto+Center+Miami",
    mode: "hybrid",
    agenda: [
      "Ethereum Development Update",
      "Smart Contract Security Practices",
      "Building Decentralized Finance Apps",
      "NFT Platforms and Standards",
      "Scaling Solutions Workshop",
    ],
    external_links: [
      {
        title: "Code Repository",
        link: "https://github.com/web3devcon2025",
      },
      {
        title: "Documentation",
        link: "https://web3devcon.example.com/docs",
      },
    ],
    online_join_link: "https://gather.town/web3devcon2025",
    social_links: {
      twitter: "https://twitter.com/web3devcon",
      linkedin: "https://linkedin.com/company/web3devcon",
      website: "https://web3devcon.example.com",
      youtube: "https://youtube.com/c/web3devcon",
      instagram: "https://instagram.com/web3devcon",
    },
    require_approval: true,
    unsplash_image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
  },
  {
    eventId: "8",
    title: "Creative Writing Workshop",
    banner_image: new File([""], "writing-workshop.jpg", {
      type: "image/jpeg",
    }),
    description: `
  **Unlock Your Literary Potential**
  
  Join our intimate workshop designed for *writers at all stages of their journey*:
  
  > "Writing is not a matter of time, but a matter of space. If you can find the space, time will find you." — Workshop Leader
  
  ### What You'll Experience
  * Guided writing exercises
  * Personalized feedback sessions
  * Craft discussions on plot, character, and dialogue
  * Publishing insights from industry professionals
  
  **Each participant will complete one polished short story by workshop end.**
      `.trim(),
    date_range: {
      from: new Date("2025-05-15"),
      to: new Date("2025-05-15"),
    },
    time: "1:00 PM - 4:00 PM",
    approx_audience_count: 30,
    location: "https://maps.google.com/?q=Community+Library+Portland",
    mode: "offline",
    agenda: [
      "Character Development Exercises",
      "Plot Structure and Pacing",
      "Dialogue Writing Techniques",
      "Peer Review Session",
      "Publishing Pathways Discussion",
    ],
    external_links: [
      {
        title: "Reading List",
        link: "https://writingworkshop.example.com/reading-list",
      },
      {
        title: "Instructor Profiles",
        link: "https://writingworkshop.example.com/instructors",
      },
    ],
    online_join_link: "https://writingworkshop.example.com/virtual-option",
    social_links: {
      instagram: "https://instagram.com/creativewritingworkshop",
      website: "https://writingworkshop.example.com",
      twitter: "https://twitter.com/writeworkshop",
      youtube: "https://youtube.com/c/creativewritingworkshop",
    },
    require_approval: false,
    unsplash_image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
  },
  {
    eventId: "9",
    title: "Renewable Energy Symposium",
    banner_image: new File([""], "renewable-energy.jpg", {
      type: "image/jpeg",
    }),
    description: `
  **Accelerating the Global Energy Transition**
  
  The definitive forum for *climate solutions and renewable energy innovation* featuring:
  
  - **Policy Track:** International climate agreements and implementation
  - **Technology Track:** Breakthrough energy storage and generation
  - **Finance Track:** Climate investment and sustainable funding models
  - **Industry Track:** Corporate sustainability case studies
  
  *Includes carbon-neutral event certification and virtual attendance options for reduced emissions.*
      `.trim(),
    date_range: {
      from: new Date("2025-08-15"),
      to: new Date("2025-08-17"),
    },
    time: "9:00 AM - 5:00 PM",
    approx_audience_count: 750,
    location: "https://maps.google.com/?q=Convention+Center+Copenhagen",
    mode: "hybrid",
    agenda: [
      "Global Energy Transition Progress",
      "Solar and Wind Technology Advances",
      "Energy Storage Innovations",
      "Policy and Regulatory Frameworks",
      "Green Hydrogen Applications",
      "Climate Finance Panel",
    ],
    external_links: [
      {
        title: "White Papers",
        link: "https://renewablesymposium.example.com/papers",
      },
      {
        title: "Exhibitor Information",
        link: "https://renewablesymposium.example.com/exhibitors",
      },
    ],
    online_join_link: "https://vfairs.com/renewable-energy-symposium-2025",
    social_links: {
      twitter: "https://twitter.com/renewablesymp",
      linkedin: "https://linkedin.com/company/renewable-energy-symposium",
      website: "https://renewablesymposium.example.com",
      youtube: "https://youtube.com/c/renewablesymposium",
      instagram: "https://instagram.com/renewablesymposium",
    },
    require_approval: true,
    unsplash_image: "img3.jpg",
  },
  {
    eventId: "10",
    title: "Mobile App Design Sprint",
    banner_image: new File([""], "mobile-design-sprint.jpg", {
      type: "image/jpeg",
    }),
    description: `
  **From Concept to Prototype in 48 Hours**
  
  An *intensive collaborative experience* for designers, developers and product teams:
  
  1. **Day 1: Define & Design**
     - Problem definition workshops
     - User journey mapping
     - Interface sketching
     - Design system implementation
  
  2. **Day 2: Build & Test**
     - Rapid prototyping in Figma
     - User testing sessions
     - Iteration cycles
     - Final presentations
  
  *Teams leave with validated prototypes ready for development!*
      `.trim(),
    date_range: {
      from: new Date("2025-03-18"),
      to: new Date("2025-03-19"),
    },
    time: "9:00 AM - 7:00 PM",
    approx_audience_count: 60,
    location: "https://maps.google.com/?q=Innovation+Hub+Seattle",
    mode: "offline",
    agenda: [
      "Design Challenge Introduction",
      "User Persona Development",
      "Rapid Ideation and Sketching",
      "Prototype Building with Figma",
      "User Testing and Iteration",
      "Final Presentations",
    ],
    external_links: [
      {
        title: "Design Resources",
        link: "https://designsprint.example.com/resources",
      },
      {
        title: "Team Registration",
        link: "https://designsprint.example.com/register",
      },
    ],
    online_join_link: "https://designsprint.example.com/virtual-participation",
    social_links: {
      twitter: "https://twitter.com/mobiledesignsprint",
      instagram: "https://instagram.com/mobiledesignsprint",
      website: "https://designsprint.example.com",
      linkedin: "https://linkedin.com/company/mobile-design-sprint",
      youtube: "https://youtube.com/c/mobiledesignsprint",
    },
    require_approval: false,
    unsplash_image: "img2.jpg",
  },
];

export { mockEvents };
