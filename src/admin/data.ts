export type LeadStatus = "New" | "Contacted" | "Hot" | "Closed" | "Rejected";
export type FollowUpStatus = "Today" | "Tomorrow" | "This week" | "Waiting" | "Done";

export type Lead = {
  id: string;
  name: string;
  business: string;
  phone: string;
  email: string;
  serviceType: string;
  packageInterest: string;
  budget: string;
  source: string;
  status: LeadStatus;
  followUp: FollowUpStatus;
  lastMessage: string;
  notes: string[];
  createdAt: string;
};

export type ServiceCategory = {
  name: string;
  status: "Live" | "Draft";
  inquiries: number;
  image: string;
  cta: string;
  description: string;
};

export type PricingPackage = {
  name: string;
  price: string;
  audience: string;
  features: string[];
  addons: string[];
  recommended: boolean;
  offer: string;
};

export type Message = {
  id: string;
  name: string;
  subject: string;
  channel: string;
  status: "Unread" | "Replied" | "Needs follow-up";
  received: string;
};

export type MediaAsset = {
  name: string;
  type: "Image" | "Logo" | "Banner" | "Icon" | "Screenshot";
  usage: string;
  size: string;
  url: string;
};

export type AdminUser = {
  name: string;
  email: string;
  role: "Super admin" | "Editor";
  status: "Active" | "Invited";
  lastActive: string;
};

export const dashboardMetrics = [
  { label: "Total leads", value: "248", change: "+18.4%", tone: "blue" },
  { label: "New inquiries", value: "37", change: "+9 this week", tone: "red" },
  { label: "Package requests", value: "82", change: "Business leads 41%", tone: "green" },
  { label: "Contact submissions", value: "126", change: "72% WhatsApp", tone: "navy" },
];

export const monthlyPerformance = [
  { month: "Nov", views: 3800, leads: 34, conversions: 11 },
  { month: "Dec", views: 4200, leads: 42, conversions: 14 },
  { month: "Jan", views: 5100, leads: 58, conversions: 20 },
  { month: "Feb", views: 5900, leads: 63, conversions: 24 },
  { month: "Mar", views: 7200, leads: 77, conversions: 29 },
  { month: "Apr", views: 8400, leads: 93, conversions: 37 },
  { month: "May", views: 9100, leads: 106, conversions: 42 },
];

export const trafficSources = [
  { name: "Google", value: 44 },
  { name: "WhatsApp", value: 26 },
  { name: "Social", value: 18 },
  { name: "Direct", value: 12 },
];

export const popularServices = [
  { name: "E-commerce", leads: 54, conversion: "18%" },
  { name: "Real Estate", leads: 41, conversion: "22%" },
  { name: "Restaurants", leads: 38, conversion: "16%" },
  { name: "Schools", leads: 27, conversion: "13%" },
  { name: "Clinics", leads: 24, conversion: "15%" },
];

export const leads: Lead[] = [
  {
    id: "WM-1048",
    name: "Mary Wanjiru",
    business: "GlowCare Clinic",
    phone: "+254 712 440 912",
    email: "mary@glowcare.co.ke",
    serviceType: "Clinics & Healthcare",
    packageInterest: "Business Website",
    budget: "KSh 30,000 - 50,000",
    source: "Project planner",
    status: "Hot",
    followUp: "Today",
    lastMessage: "Needs appointment booking, doctor profiles, and Google Maps.",
    notes: ["Prefers launch within two weeks.", "Ask for clinic photos and services list."],
    createdAt: "May 13, 2026",
  },
  {
    id: "WM-1047",
    name: "Brian Otieno",
    business: "Nairobi Auto Hub",
    phone: "+254 798 201 443",
    email: "brian@autohub.co.ke",
    serviceType: "Car Dealers",
    packageInterest: "Premium Website",
    budget: "KSh 50,000+",
    source: "Homepage CTA",
    status: "Contacted",
    followUp: "Tomorrow",
    lastMessage: "Vehicle listings, WhatsApp inquiries, and test drive requests.",
    notes: ["Wants finance inquiry forms.", "Potential add-on: CRM integration."],
    createdAt: "May 12, 2026",
  },
  {
    id: "WM-1046",
    name: "Aisha Noor",
    business: "Safari Nest Tours",
    phone: "+254 733 880 155",
    email: "hello@safarinest.com",
    serviceType: "Tours & Travel",
    packageInterest: "Premium Website",
    budget: "KSh 50,000+",
    source: "Contact form",
    status: "New",
    followUp: "Today",
    lastMessage: "Safari packages, itinerary pages, and inquiry flow.",
    notes: ["Send package examples.", "Likely needs image gallery management."],
    createdAt: "May 12, 2026",
  },
  {
    id: "WM-1045",
    name: "Kevin Maina",
    business: "Maina Eats",
    phone: "+254 700 119 608",
    email: "kevin@mainaeats.co.ke",
    serviceType: "Restaurants & Cafes",
    packageInterest: "Starter Website",
    budget: "KSh 15,000 - 30,000",
    source: "WhatsApp float",
    status: "Closed",
    followUp: "Done",
    lastMessage: "Simple menu, WhatsApp ordering, location, and opening hours.",
    notes: ["Deposit received.", "Collect menu and food images."],
    createdAt: "May 10, 2026",
  },
  {
    id: "WM-1044",
    name: "Victor Kimani",
    business: "Smart Estate Kenya",
    phone: "+254 711 549 202",
    email: "victor@smartestate.ke",
    serviceType: "Real Estate",
    packageInterest: "Enterprise Website",
    budget: "Enterprise: KSh 100,000 - 200,000",
    source: "Project planner",
    status: "Hot",
    followUp: "This week",
    lastMessage: "Needs property listings, agents, maps, analytics, and admin controls.",
    notes: ["Schedule strategy call.", "Ask about listing import workflow."],
    createdAt: "May 9, 2026",
  },
  {
    id: "WM-1043",
    name: "Faith Achieng",
    business: "BrightPath Academy",
    phone: "+254 745 390 711",
    email: "admin@brightpath.ac.ke",
    serviceType: "Schools & Training",
    packageInterest: "Business Website",
    budget: "KSh 30,000 - 50,000",
    source: "Contact form",
    status: "Contacted",
    followUp: "Waiting",
    lastMessage: "Admissions, course listings, announcements, and parent trust sections.",
    notes: ["Waiting for board approval.", "Offer content checklist."],
    createdAt: "May 8, 2026",
  },
];

export const serviceCategories: ServiceCategory[] = [
  {
    name: "Restaurants & Cafes",
    status: "Live",
    inquiries: 38,
    image: "Restaurant food gallery",
    cta: "Get my restaurant website",
    description: "Menus, reservations, WhatsApp ordering, food galleries, and local trust.",
  },
  {
    name: "Real Estate",
    status: "Live",
    inquiries: 41,
    image: "Property listing showcase",
    cta: "Get my real estate website",
    description: "Listings, maps, property galleries, virtual tours, and buyer inquiries.",
  },
  {
    name: "E-commerce",
    status: "Live",
    inquiries: 54,
    image: "Online store checkout",
    cta: "Get my online store",
    description: "Product catalogs, checkout, payments, inventory, and sales reporting.",
  },
  {
    name: "Tours & Travel",
    status: "Live",
    inquiries: 31,
    image: "Safari destination banner",
    cta: "Get my travel website",
    description: "Packages, destinations, itineraries, booking prompts, and trip inquiries.",
  },
  {
    name: "Schools & Training",
    status: "Live",
    inquiries: 27,
    image: "Student admissions page",
    cta: "Get my school website",
    description: "Admissions, course pages, announcements, galleries, and institution trust.",
  },
  {
    name: "Clinics & Healthcare",
    status: "Live",
    inquiries: 24,
    image: "Healthcare appointment page",
    cta: "Get my clinic website",
    description: "Appointments, doctor profiles, services, maps, and patient support.",
  },
  {
    name: "Salons & Beauty",
    status: "Live",
    inquiries: 22,
    image: "Beauty booking gallery",
    cta: "Get my beauty website",
    description: "Service menus, booking flows, galleries, testimonials, and WhatsApp support.",
  },
  {
    name: "Car Dealers",
    status: "Live",
    inquiries: 19,
    image: "Vehicle inventory page",
    cta: "Get my car dealership website",
    description: "Vehicle listings, financing prompts, test drives, and buyer lead forms.",
  },
];

export const pricingPackages: PricingPackage[] = [
  {
    name: "Starter Website",
    price: "KSh 15,000",
    audience: "New businesses, small service providers, side hustles, and simple profiles.",
    features: ["1-3 pages", "Mobile responsive", "WhatsApp button", "Basic SEO"],
    addons: ["Google Maps", "Social links"],
    recommended: false,
    offer: "Starter launch",
  },
  {
    name: "Business Website",
    price: "KSh 30,000",
    audience: "Growing local brands that need more pages, trust, and better conversion.",
    features: ["4-7 pages", "Service pages", "Contact form", "Testimonials", "SEO setup"],
    addons: ["Gallery", "Basic admin updates"],
    recommended: true,
    offer: "Best value",
  },
  {
    name: "Premium Website",
    price: "KSh 50,000+",
    audience: "Businesses needing bookings, payments, catalogs, dashboards, or lead workflows.",
    features: ["E-commerce or catalog", "Booking system", "Admin dashboard", "Analytics"],
    addons: ["M-Pesa", "Blog", "Advanced SEO"],
    recommended: false,
    offer: "Pro build",
  },
  {
    name: "Enterprise Website",
    price: "KSh 100,000+",
    audience: "Companies that need automation, AI, user roles, integrations, and scale.",
    features: ["Custom UI/UX", "Role-based admin", "CRM/API integrations", "Security hardening"],
    addons: ["AI chatbot", "SMS", "Cloud deployment"],
    recommended: false,
    offer: "Strategy call",
  },
];

export const messages: Message[] = [
  {
    id: "MSG-771",
    name: "Daniel M.",
    subject: "Can you redesign our logistics website?",
    channel: "Contact form",
    status: "Unread",
    received: "8 min ago",
  },
  {
    id: "MSG-770",
    name: "Ruth K.",
    subject: "Need quotation for salon booking website",
    channel: "WhatsApp",
    status: "Needs follow-up",
    received: "42 min ago",
  },
  {
    id: "MSG-769",
    name: "Peter O.",
    subject: "E-commerce plus M-Pesa integration",
    channel: "Project planner",
    status: "Replied",
    received: "Yesterday",
  },
];

export const mediaAssets: MediaAsset[] = [
  {
    name: "restaurant-hero.jpg",
    type: "Image",
    usage: "Restaurants category",
    size: "384 KB",
    url: "https://i.pinimg.com/1200x/b7/50/9c/b7509c01c7585e2723c07a47d55487f1.jpg",
  },
  {
    name: "realestate-listings.jpg",
    type: "Image",
    usage: "Real estate category",
    size: "296 KB",
    url: "https://i.pinimg.com/736x/95/e7/f9/95e7f939e62dfa8cb48ed536dc87fdc9.jpg",
  },
  {
    name: "webmakers-logo.svg",
    type: "Logo",
    usage: "Header and footer",
    size: "12 KB",
    url: "logo",
  },
  {
    name: "admin-dashboard-shot.png",
    type: "Screenshot",
    usage: "Premium package proof",
    size: "512 KB",
    url: "dashboard",
  },
];

export const contentSections = [
  { page: "Homepage", section: "Hero", status: "Live", owner: "Super admin", updated: "Today" },
  {
    page: "Homepage",
    section: "Website categories",
    status: "Live",
    owner: "Editor",
    updated: "May 12",
  },
  {
    page: "Homepage",
    section: "Packages",
    status: "Live",
    owner: "Super admin",
    updated: "May 11",
  },
  {
    page: "Homepage",
    section: "Testimonials",
    status: "Review",
    owner: "Editor",
    updated: "May 10",
  },
  {
    page: "SEO",
    section: "Meta titles and descriptions",
    status: "Draft",
    owner: "Super admin",
    updated: "May 9",
  },
  {
    page: "Blog",
    section: "Small business website guide",
    status: "Draft",
    owner: "Editor",
    updated: "May 8",
  },
];

export const adminUsers: AdminUser[] = [
  {
    name: "WebMakers Owner",
    email: "owner@webmakers.com",
    role: "Super admin",
    status: "Active",
    lastActive: "Now",
  },
  {
    name: "Content Editor",
    email: "editor@webmakers.com",
    role: "Editor",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    name: "Sales Assistant",
    email: "sales@webmakers.com",
    role: "Editor",
    status: "Invited",
    lastActive: "Pending",
  },
];

export const activityLogs = [
  "Mary Wanjiru marked as Hot",
  "Business Website package price reviewed",
  "Restaurant category CTA edited",
  "New media uploaded for salons",
  "Contact message exported to CSV",
];
