export type EventCategory =
  | "Tech"
  | "Business"
  | "Music"
  | "Sports"
  | "Education"
  | "Culture";

export type TicketType = {
  name: string;
  label: string;
  price: string;
  quantity: number;
  popular?: boolean;
  features: string[];
};

export type AgendaItem = {
  day: string;
  time: string;
  title: string;
  description: string;
  active?: boolean;
};

export type EventSpeaker = {
  name: string;
  role: string;
  image: string;
};

export type EventCoordinates = {
  latitude: number;
  longitude: number;
};

export type EventItem = {
  id: string;
  title: string;
  category: EventCategory;
  visibility: "Public" | "Invite Only" | "Private Link";
  date: string;
  time: string;
  startDate: string;
  endDate: string;
  venue: string;
  location: string;
  coordinates: EventCoordinates;
  price: string;
  image: string;
  featured?: boolean;
  organizer: string;
  eventType: "Conference" | "Festival" | "Workshop" | "Sports" | "Expo" | "Culture";
  description: string;
  longDescription: string;
  tickets: TicketType[];
  agenda: AgendaItem[];
  speakers: EventSpeaker[];
};

export const categories: EventCategory[] = [
  "Tech",
  "Business",
  "Music",
  "Sports",
  "Education",
  "Culture",
];

export const stats = [
  { label: "Tickets Sold", value: "12k+" },
  { label: "Events Hosted", value: "320+" },
  { label: "Cities", value: "48" },
  { label: "Organizer Satisfaction", value: "98%" },
];

export const ticketTypes = [
  {
    name: "Regular Pass",
    label: "Standard Access",
    price: "UGX 50,000",
    popular: false,
    features: ["Main stage access", "Lunch included", "Expo access"],
  },
  {
    name: "VIP Pass",
    label: "All-Inclusive",
    price: "UGX 150,000",
    popular: true,
    features: ["Front row seating", "Private lounge access", "Networking dinner"],
  },
  {
    name: "Team Pass",
    label: "Corporate",
    price: "UGX 400,000",
    popular: false,
    features: ["Up to 10 attendees", "Full team access", "Expo booth credit"],
  },
];

export const agenda = [
  {
    day: "Day 1 • Oct 12",
    time: "09:00 AM",
    title: "Opening Keynote",
    description: "The future of digital sovereignty in Africa.",
    active: true,
  },
  {
    day: "Day 2 • Oct 13",
    time: "11:30 AM",
    title: "AI For Good Workshop",
    description: "Practical implementation of AI for local business and communities.",
    active: false,
  },
  {
    day: "Day 3 • Oct 14",
    time: "07:00 PM",
    title: "Closing & Networking",
    description: "Startup pitch finals, awards, and executive networking dinner.",
    active: false,
  },
];

export const speakers = [
  {
    name: "Jane Doe",
    role: "CTO at FutureScale",
    image: "/images/speakers/speaker-1.png",
  },
  {
    name: "David Okello",
    role: "Founder, NileCloud",
    image: "/images/speakers/speaker-2.png",
  },
];

export const events: EventItem[] = [
  {
    id: "africa-tech-innovation-summit-2026",
    title: "Africa Tech Innovation Summit 2026",
    category: "Tech",
    visibility: "Public",
    date: "Oct 12–14, 2026",
    time: "9:00 AM",
    startDate: "2026-10-12T09:00",
    endDate: "2026-10-14T18:00",
    venue: "Speke Resort Munyonyo",
    location: "Kampala, Uganda",
    coordinates: { latitude: 0.2422, longitude: 32.6237 },
    price: "UGX 50,000",
    image: "/images/events/tech-summit.png",
    featured: true,
    organizer: "TechNext Labs",
    eventType: "Conference",
    description:
      "A premium gathering for founders, investors, developers, and digital transformation leaders shaping Africa’s technology future.",
    longDescription:
      "Join founders, investors, developers, business leaders, and innovators for a premium experience focused on technology, networking, practical workshops, and Africa’s digital future.",
    tickets: [
      {
        name: "Regular Pass",
        label: "Standard Access",
        price: "UGX 50,000",
        quantity: 500,
        features: ["Main stage access", "Lunch included", "Expo access"],
      },
      {
        name: "VIP Pass",
        label: "All-Inclusive",
        price: "UGX 150,000",
        quantity: 150,
        popular: true,
        features: [
          "Front row seating",
          "Private lounge access",
          "Networking dinner",
        ],
      },
      {
        name: "Team Pass",
        label: "Corporate",
        price: "UGX 400,000",
        quantity: 80,
        features: ["Up to 10 attendees", "Full team access", "Expo booth credit"],
      },
    ],
    agenda: [
      {
        day: "Day 1 • Oct 12",
        time: "09:00 AM",
        title: "Opening Keynote",
        description: "The future of digital sovereignty in Africa.",
        active: true,
      },
      {
        day: "Day 2 • Oct 13",
        time: "11:30 AM",
        title: "AI For Good Workshop",
        description:
          "Practical implementation of AI for local business and communities.",
      },
      {
        day: "Day 3 • Oct 14",
        time: "07:00 PM",
        title: "Closing & Networking",
        description:
          "Startup pitch finals, awards, and executive networking dinner.",
      },
    ],
    speakers: [
      {
        name: "Jane Doe",
        role: "CTO at FutureScale",
        image: "/images/speakers/speaker-1.png",
      },
      {
        name: "David Okello",
        role: "Founder, NileCloud",
        image: "/images/speakers/speaker-2.png",
      },
    ],
  },

  {
    id: "future-of-saas-summit",
    title: "Future of SaaS Summit",
    category: "Business",
    visibility: "Public",
    date: "Sep 5, 2026",
    time: "10:00 AM",
    startDate: "2026-09-05T10:00",
    endDate: "2026-09-05T17:00",
    venue: "Innovation Village",
    location: "Kampala, Uganda",
    coordinates: { latitude: 0.3346, longitude: 32.5812 },
    price: "UGX 120,000",
    image: "/images/events/saas-summit.png",
    organizer: "GrowthStack Africa",
    eventType: "Conference",
    description:
      "Exploring SaaS growth, subscriptions, automation, and modern digital business models.",
    longDescription:
      "A focused business summit for founders, operators, and product teams building scalable subscription businesses across Africa.",
    tickets: [
      {
        name: "Founder Pass",
        label: "General Access",
        price: "UGX 120,000",
        quantity: 250,
        popular: true,
        features: ["Main sessions", "Founder networking", "Startup showcase"],
      },
      {
        name: "Executive Pass",
        label: "Premium Access",
        price: "UGX 250,000",
        quantity: 80,
        features: ["VIP seating", "Investor roundtable", "Private lunch"],
      },
    ],
    agenda: [
      {
        day: "Sep 5",
        time: "10:00 AM",
        title: "Building SaaS for African Markets",
        description: "Product, pricing, and distribution lessons.",
        active: true,
      },
      {
        day: "Sep 5",
        time: "01:30 PM",
        title: "Subscription Growth Panel",
        description: "A practical discussion on retention and recurring revenue.",
      },
      {
        day: "Sep 5",
        time: "04:00 PM",
        title: "Founder Networking",
        description: "Meet operators, investors, and ecosystem partners.",
      },
    ],
    speakers: [
      {
        name: "Martha Kintu",
        role: "Product Lead, CloudFlow",
        image: "/images/speakers/speaker-1.png",
      },
      {
        name: "Brian Mugisha",
        role: "Founder, SaaSBridge",
        image: "/images/speakers/speaker-2.png",
      },
    ],
  },

  {
    id: "neon-echoes-festival",
    title: "Neon Echoes Festival",
    category: "Music",
    visibility: "Public",
    date: "Aug 24, 2026",
    time: "6:00 PM",
    startDate: "2026-08-24T18:00",
    endDate: "2026-08-25T02:00",
    venue: "Lugogo Cricket Oval",
    location: "Kampala, Uganda",
    coordinates: { latitude: 0.3307, longitude: 32.6154 },
    price: "UGX 80,000",
    image: "/images/events/music-festival.png",
    organizer: "Neon Sound Collective",
    eventType: "Festival",
    description:
      "A high-energy music festival featuring live performances, DJs, and immersive stage experiences.",
    longDescription:
      "Experience a night of Afro-fusion, electronic music, live bands, food vendors, and immersive lighting designed for a premium festival atmosphere.",
    tickets: [
      {
        name: "General Entry",
        label: "Standard Access",
        price: "UGX 80,000",
        quantity: 1500,
        popular: true,
        features: ["Festival access", "Food court access", "Main stage access"],
      },
      {
        name: "Backstage Pass",
        label: "Premium Access",
        price: "UGX 220,000",
        quantity: 200,
        features: ["Backstage lounge", "Fast entry", "Artist meet and greet"],
      },
    ],
    agenda: [
      {
        day: "Aug 24",
        time: "06:00 PM",
        title: "Gates Open",
        description: "Food vendors, art installations, and opening DJs.",
        active: true,
      },
      {
        day: "Aug 24",
        time: "09:00 PM",
        title: "Headline Performances",
        description: "Main stage performances from top regional artists.",
      },
      {
        day: "Aug 25",
        time: "12:30 AM",
        title: "Neon DJ Sessions",
        description: "Late-night electronic and afro-tech sets.",
      },
    ],
    speakers: [
      {
        name: "DJ Nova",
        role: "Headline DJ",
        image: "/images/speakers/speaker-1.png",
      },
      {
        name: "Amani Soul",
        role: "Live Performer",
        image: "/images/speakers/speaker-2.png",
      },
    ],
  },

  {
    id: "contemporary-arts-week",
    title: "Contemporary Arts Week",
    category: "Culture",
    visibility: "Public",
    date: "Oct 15, 2026",
    time: "11:00 AM",
    startDate: "2026-10-15T11:00",
    endDate: "2026-10-15T18:00",
    venue: "Nommo Gallery",
    location: "Kampala, Uganda",
    coordinates: { latitude: 0.3168, longitude: 32.5822 },
    price: "Free",
    image: "/images/events/art-week.png",
    organizer: "Kampala Creative Circle",
    eventType: "Culture",
    description:
      "A curated exhibition showcasing modern African art, installations, and creative expression.",
    longDescription:
      "A cultural showcase bringing together painters, digital artists, sculptors, collectors, and creative entrepreneurs.",
    tickets: [
      {
        name: "Free Entry",
        label: "Public Access",
        price: "Free",
        quantity: 400,
        popular: true,
        features: ["Gallery access", "Artist talks", "Exhibition guide"],
      },
    ],
    agenda: [
      {
        day: "Oct 15",
        time: "11:00 AM",
        title: "Gallery Opening",
        description: "Opening remarks and guided exhibition walkthrough.",
        active: true,
      },
      {
        day: "Oct 15",
        time: "02:00 PM",
        title: "Artist Conversation",
        description: "Panel discussion on contemporary African expression.",
      },
    ],
    speakers: [
      {
        name: "Sarah Namukasa",
        role: "Curator",
        image: "/images/speakers/speaker-1.png",
      },
      {
        name: "Joel Mutebi",
        role: "Visual Artist",
        image: "/images/speakers/speaker-2.png",
      },
    ],
  },

  {
    id: "city-football-cup-finals",
    title: "City Football Cup Finals",
    category: "Sports",
    visibility: "Public",
    date: "Nov 2, 2026",
    time: "7:00 PM",
    startDate: "2026-11-02T19:00",
    endDate: "2026-11-02T22:00",
    venue: "Mandela National Stadium",
    location: "Kampala, Uganda",
    coordinates: { latitude: 0.3474, longitude: 32.6597 },
    price: "UGX 45,000",
    image: "/images/events/football.png",
    organizer: "City Sports League",
    eventType: "Sports",
    description:
      "The ultimate football showdown featuring top teams battling for the championship title.",
    longDescription:
      "A high-stakes final match experience with fan zones, live commentary, food courts, and post-match celebrations.",
    tickets: [
      {
        name: "Standard Seat",
        label: "Regular",
        price: "UGX 45,000",
        quantity: 10000,
        popular: true,
        features: ["Stadium access", "Standard seating", "Fan zone access"],
      },
      {
        name: "VIP Stand",
        label: "Premium",
        price: "UGX 150,000",
        quantity: 600,
        features: ["VIP seating", "Hospitality access", "Priority entry"],
      },
    ],
    agenda: [
      {
        day: "Nov 2",
        time: "05:00 PM",
        title: "Fan Zone Opens",
        description: "Music, food vendors, and pre-match entertainment.",
        active: true,
      },
      {
        day: "Nov 2",
        time: "07:00 PM",
        title: "Kickoff",
        description: "Final match begins.",
      },
      {
        day: "Nov 2",
        time: "09:30 PM",
        title: "Award Ceremony",
        description: "Trophy presentation and closing celebration.",
      },
    ],
    speakers: [
      {
        name: "Patrick Ssenyange",
        role: "Match Host",
        image: "/images/speakers/speaker-1.png",
      },
    ],
  },

  {
    id: "ai-ethics-workshop",
    title: "AI & Ethics Workshop",
    category: "Education",
    visibility: "Public",
    date: "Dec 10, 2026",
    time: "9:30 AM",
    startDate: "2026-12-10T09:30",
    endDate: "2026-12-10T16:30",
    venue: "Makerere University",
    location: "Kampala, Uganda",
    coordinates: { latitude: 0.3355, longitude: 32.5689 },
    price: "UGX 120,000",
    image: "/images/events/ai-workshop.png",
    organizer: "Ethical AI Uganda",
    eventType: "Workshop",
    description:
      "A deep dive into ethical AI, governance, and real-world applications in African markets.",
    longDescription:
      "A practical workshop for developers, researchers, policymakers, and business leaders interested in responsible AI adoption.",
    tickets: [
      {
        name: "Workshop Pass",
        label: "Full Day",
        price: "UGX 120,000",
        quantity: 120,
        popular: true,
        features: ["Workshop materials", "Certificate", "Lunch included"],
      },
      {
        name: "Student Pass",
        label: "Discounted",
        price: "UGX 50,000",
        quantity: 80,
        features: ["Workshop access", "Certificate", "Learning resources"],
      },
    ],
    agenda: [
      {
        day: "Dec 10",
        time: "09:30 AM",
        title: "Responsible AI Foundations",
        description: "Core ethical principles and policy frameworks.",
        active: true,
      },
      {
        day: "Dec 10",
        time: "01:00 PM",
        title: "Bias, Safety & Governance",
        description: "Hands-on group exercises and case studies.",
      },
      {
        day: "Dec 10",
        time: "03:30 PM",
        title: "Implementation Clinic",
        description: "Applying ethical AI checks to real product workflows.",
      },
    ],
    speakers: [
      {
        name: "Dr. Annet Nsubuga",
        role: "AI Policy Researcher",
        image: "/images/speakers/speaker-1.png",
      },
      {
        name: "Michael Ocen",
        role: "Machine Learning Engineer",
        image: "/images/speakers/speaker-2.png",
      },
    ],
  },

  {
    id: "electronic-night-sessions",
    title: "Electronic Night Sessions",
    category: "Music",
    visibility: "Public",
    date: "Aug 30, 2026",
    time: "10:00 PM",
    startDate: "2026-08-30T22:00",
    endDate: "2026-08-31T04:00",
    venue: "The Alchemist Bar",
    location: "Kampala, Uganda",
    coordinates: { latitude: 0.3163, longitude: 32.5889 },
    price: "UGX 35,000",
    image: "/images/events/electronic.png",
    organizer: "Bassline Kampala",
    eventType: "Festival",
    description:
      "Late-night DJ sessions featuring electronic, house, and afro-tech beats.",
    longDescription:
      "A night-focused music experience designed for electronic music lovers, with curated DJ sets and immersive visuals.",
    tickets: [
      {
        name: "Entry Pass",
        label: "Standard",
        price: "UGX 35,000",
        quantity: 600,
        popular: true,
        features: ["Club access", "DJ sets", "Visual experience"],
      },
      {
        name: "Lounge Pass",
        label: "Premium",
        price: "UGX 100,000",
        quantity: 100,
        features: ["Reserved lounge", "Fast entry", "Welcome drink"],
      },
    ],
    agenda: [
      {
        day: "Aug 30",
        time: "10:00 PM",
        title: "Opening Set",
        description: "Warm-up electronic and afro-house session.",
        active: true,
      },
      {
        day: "Aug 31",
        time: "12:00 AM",
        title: "Main DJ Set",
        description: "Headline performance with immersive lighting.",
      },
      {
        day: "Aug 31",
        time: "03:00 AM",
        title: "After Hours Session",
        description: "Deep house closing set.",
      },
    ],
    speakers: [
      {
        name: "KLA Pulse",
        role: "Electronic DJ",
        image: "/images/speakers/speaker-1.png",
      },
      {
        name: "Maya Drift",
        role: "Afro-Tech Producer",
        image: "/images/speakers/speaker-2.png",
      },
    ],
  },

  {
    id: "startup-pitch-night",
    title: "Startup Pitch Night Kampala",
    category: "Business",
    visibility: "Public",
    date: "Sep 18, 2026",
    time: "5:00 PM",
    startDate: "2026-09-18T17:00",
    endDate: "2026-09-18T21:00",
    venue: "Outbox Hub",
    location: "Kampala, Uganda",
    coordinates: { latitude: 0.3136, longitude: 32.5811 },
    price: "UGX 20,000",
    image: "/images/events/pitch.png",
    organizer: "Founders Network UG",
    eventType: "Conference",
    description:
      "Watch emerging startups pitch to investors and compete for funding opportunities.",
    longDescription:
      "A startup showcase connecting founders, investors, mentors, and ecosystem builders through pitch sessions and networking.",
    tickets: [
      {
        name: "Audience Pass",
        label: "Standard",
        price: "UGX 20,000",
        quantity: 250,
        popular: true,
        features: ["Pitch access", "Networking", "Refreshments"],
      },
      {
        name: "Founder Pass",
        label: "Pitch Access",
        price: "UGX 75,000",
        quantity: 40,
        features: ["Pitch slot", "Mentor feedback", "Investor networking"],
      },
    ],
    agenda: [
      {
        day: "Sep 18",
        time: "05:00 PM",
        title: "Founder Mixer",
        description: "Networking before pitch sessions begin.",
        active: true,
      },
      {
        day: "Sep 18",
        time: "06:00 PM",
        title: "Startup Pitches",
        description: "Selected founders pitch to the investor panel.",
      },
      {
        day: "Sep 18",
        time: "08:30 PM",
        title: "Awards & Networking",
        description: "Winner announcement and closing networking.",
      },
    ],
    speakers: [
      {
        name: "Linda Atim",
        role: "Investor, Growth Angels",
        image: "/images/speakers/speaker-1.png",
      },
      {
        name: "James Kiggundu",
        role: "Startup Mentor",
        image: "/images/speakers/speaker-2.png",
      },
    ],
  },

  {
    id: "fitness-wellness-expo",
    title: "Fitness & Wellness Expo",
    category: "Culture",
    visibility: "Public",
    date: "Nov 20, 2026",
    time: "8:00 AM",
    startDate: "2026-11-20T08:00",
    endDate: "2026-11-20T17:00",
    venue: "Kololo Independence Grounds",
    location: "Kampala, Uganda",
    coordinates: { latitude: 0.3319, longitude: 32.5947 },
    price: "UGX 25,000",
    image: "/images/events/wellness.png",
    organizer: "WellLife Uganda",
    eventType: "Expo",
    description:
      "Health, fitness, and lifestyle brands showcasing products, workouts, and nutrition plans.",
    longDescription:
      "A full-day expo for fitness lovers, wellness brands, nutrition experts, gyms, and healthy lifestyle communities.",
    tickets: [
      {
        name: "Expo Pass",
        label: "General",
        price: "UGX 25,000",
        quantity: 800,
        popular: true,
        features: ["Expo access", "Workout sessions", "Brand booths"],
      },
      {
        name: "Fitness Pro Pass",
        label: "Premium",
        price: "UGX 90,000",
        quantity: 150,
        features: ["Trainer sessions", "Nutrition clinic", "VIP wellness kit"],
      },
    ],
    agenda: [
      {
        day: "Nov 20",
        time: "08:00 AM",
        title: "Morning Fitness Bootcamp",
        description: "Outdoor group training with professional coaches.",
        active: true,
      },
      {
        day: "Nov 20",
        time: "11:00 AM",
        title: "Nutrition & Lifestyle Talks",
        description: "Expert-led wellness discussions.",
      },
      {
        day: "Nov 20",
        time: "03:00 PM",
        title: "Brand Showcase",
        description: "Product demos from wellness and lifestyle brands.",
      },
    ],
    speakers: [
      {
        name: "Coach Daniel",
        role: "Fitness Coach",
        image: "/images/speakers/speaker-1.png",
      },
      {
        name: "Rachel Auma",
        role: "Nutrition Specialist",
        image: "/images/speakers/speaker-2.png",
      },
    ],
  },

  {
    id: "developer-hackathon",
    title: "Kampala Developer Hackathon",
    category: "Tech",
    visibility: "Public",
    date: "Oct 28, 2026",
    time: "8:00 AM",
    startDate: "2026-10-28T08:00",
    endDate: "2026-10-30T18:00",
    venue: "Innovation Village",
    location: "Kampala, Uganda",
    coordinates: { latitude: 0.3346, longitude: 32.5812 },
    price: "Free",
    image: "/images/events/hackathon.png",
    organizer: "DevHub Kampala",
    eventType: "Workshop",
    description:
      "48-hour coding marathon where developers build innovative solutions and compete for prizes.",
    longDescription:
      "A hands-on hackathon for software developers, designers, and product thinkers building solutions for local business and community challenges.",
    tickets: [
      {
        name: "Builder Pass",
        label: "Participant",
        price: "Free",
        quantity: 300,
        popular: true,
        features: ["Hackathon access", "Mentor support", "Meals included"],
      },
      {
        name: "Mentor Pass",
        label: "Community",
        price: "Free",
        quantity: 60,
        features: ["Mentor access", "Judging session", "Networking"],
      },
    ],
    agenda: [
      {
        day: "Day 1 • Oct 28",
        time: "08:00 AM",
        title: "Check-in & Team Formation",
        description: "Registration, challenge briefing, and team matching.",
        active: true,
      },
      {
        day: "Day 2 • Oct 29",
        time: "10:00 AM",
        title: "Build Sprint",
        description: "Focused product development with mentor checkpoints.",
      },
      {
        day: "Day 3 • Oct 30",
        time: "03:00 PM",
        title: "Demo Day",
        description: "Final presentations, judging, and prize ceremony.",
      },
    ],
    speakers: [
      {
        name: "Albert Watbin",
        role: "Software Engineer & Mentor",
        image: "/images/speakers/speaker-1.png",
      },
      {
        name: "Doreen Akello",
        role: "Product Designer",
        image: "/images/speakers/speaker-2.png",
      },
    ],
  },
];