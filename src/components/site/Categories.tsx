import {
  UtensilsCrossed,
  Building2,
  ShoppingBag,
  Plane,
  GraduationCap,
  Stethoscope,
  Scissors,
  Car,
  Truck,
  HardHat,
  Hotel,
  PartyPopper,
  Church,
  Scale,
  Dumbbell,
  Sparkles,
  Camera,
  Rocket,
  Landmark,
  User,
} from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import realestate from "@/assets/showcase-realestate.jpg";
import fashion from "@/assets/showcase-fashion.jpg";
import salon from "@/assets/showcase-salon.jpg";
import heroMockup from "@/assets/hero-mockup.jpg";

type Cat = {
  icon: LucideIcon;
  name: string;
  headline?: string;
  desc: string;
  tone: string;
  img: string;
  tags: string[];
  capabilityBadge?: string;
  supportBadge?: string;
  urgencyLine?: string;
  bestFor?: string[];
  ctaLabel?: string;
};

const restaurantImg = "https://i.pinimg.com/1200x/b7/50/9c/b7509c01c7585e2723c07a47d55487f1.jpg";
const realEstateImg = "https://i.pinimg.com/736x/95/e7/f9/95e7f939e62dfa8cb48ed536dc87fdc9.jpg";
const onlineStoreImg = "https://i.pinimg.com/736x/ff/0d/e2/ff0de26c8e4c56481730c912ad4fb5d5.jpg";
const travelImg = "https://i.pinimg.com/1200x/20/e8/a8/20e8a87e596d07d3ce8677ffce503e29.jpg";
const schoolImg = "https://i.pinimg.com/736x/d1/ed/ee/d1edee28a71e310529d23886e973d4f2.jpg";
const clinicImg = "https://i.pinimg.com/1200x/47/a5/40/47a54046a8a0bf77b047d4189313297b.jpg";
const carDealerImg = "https://i.pinimg.com/1200x/e3/18/e4/e318e4fe20562da9050850de10c04524.jpg";
const logisticsImg = "https://i.pinimg.com/1200x/7d/84/34/7d843416297fc4f27708c0e5e8b2f669.jpg";
const constructionImg = "https://i.pinimg.com/736x/ce/4e/58/ce4e58cf1d90c10f35399ded24b5433c.jpg";
const hotelsAirbnbImg = "https://i.pinimg.com/1200x/aa/44/46/aa4446a717686d7e3aff9b08e9cc13e5.jpg";
const eventPlannersImg = "https://i.pinimg.com/1200x/84/95/a0/8495a06439a9675dd066b414c424f4e0.jpg";
const churchesMinistriesImg =
  "https://i.pinimg.com/1200x/e0/20/8b/e0208b678dd6f96bdac1662eaa6c9310.jpg";
const lawFirmsImg = "https://i.pinimg.com/736x/9c/17/6e/9c176eb4232aac4fd1194b5af2b0ab05.jpg";
const gymsFitnessImg = "https://i.pinimg.com/736x/e1/9b/17/e19b17af92c41ffc925d5446cc788566.jpg";
const photographyStudiosImg =
  "https://i.pinimg.com/1200x/22/a5/2c/22a52c865b6eea01163dc9505bcfc4a4.jpg";
const startupsTechImg = "https://i.pinimg.com/736x/a2/a5/a2/a2a5a2bbb0b888b51aaff7fb04fd153e.jpg";
const loansFinanceImg = "https://i.pinimg.com/736x/65/fe/94/65fe949a4f5ea56fe5052b525a0db16a.jpg";
const personalPortfolioImg =
  "https://i.pinimg.com/1200x/2e/ef/db/2eefdb30fef275e3a51400d9c4f30b1f.jpg";
const cleaningServicesImg =
  "https://i.pinimg.com/1200x/34/d9/00/34d9007ebc67a04d76a55fa78ba92ae6.jpg";

const cats: Cat[] = [
  {
    icon: UtensilsCrossed,
    name: "Restaurants & Cafes",
    headline: "Turn Hungry Visitors Into Paying Customers",
    desc: "Modern restaurant websites designed to increase orders, boost reservations, showcase your food, and make customers choose you first.",
    tone: "#ef3525",
    img: restaurantImg,
    tags: ["Online Orders", "Table Reservations", "WhatsApp Orders"],
    capabilityBadge: "Restaurant Growth System",
    supportBadge: "Built to Sell Food Fast",
    urgencyLine:
      "Most customers check your business online before placing an order or visiting. If your restaurant has no strong online presence, they choose your competitor instead.",
    ctaLabel: "Get my restaurant website",
  },
  {
    icon: Building2,
    name: "Real Estate",
    headline: "Sell Properties Faster With A Website That Builds Trust Instantly",
    desc: "Premium real estate websites that showcase properties beautifully, generate qualified leads, and help buyers trust your brand before they contact you.",
    tone: "#1d4ed8",
    img: realEstateImg,
    tags: ["Property Listings", "WhatsApp Inquiries", "Virtual Tours"],
    capabilityBadge: "Real Estate Lead Machine",
    supportBadge: "Built to Generate Buyers",
    urgencyLine:
      "Most property buyers judge credibility online before making inquiries. A weak online presence silently pushes clients toward competitors with more professional websites.",
    ctaLabel: "Get my real estate website",
  },
  {
    icon: ShoppingBag,
    name: "Online Stores",
    headline: "Turn Your Store Into A 24/7 Sales Machine",
    desc: "Fast, modern e-commerce websites built to attract customers, increase conversions, and make shopping smooth across every device.",
    tone: "#1d4ed8",
    img: onlineStoreImg,
    tags: ["Online Payments", "Smart Checkout", "Inventory Ready"],
    capabilityBadge: "E-Commerce Sales System",
    supportBadge: "Built to Sell Products Fast",
    urgencyLine:
      "Most customers compare businesses online before buying. If your competitors have a better shopping experience, they win the customer before you even get a chance.",
    bestFor: [
      "Electronics",
      "Phones",
      "Laptops",
      "Clothing",
      "Shoes",
      "Beauty products",
      "Home goods",
      "Furniture",
      "Jewelry",
      "Watches",
      "Groceries",
      "Baby products",
      "Pet supplies",
      "Sports gear",
      "Auto parts",
      "Books",
      "Digital products",
      "Gift shops",
    ],
    ctaLabel: "Get my online store",
  },
  {
    icon: Plane,
    name: "Tours & Travel",
    headline: "Turn Travel Dreams Into Booked Adventures",
    desc: "Stunning travel websites that showcase destinations beautifully, increase bookings, and make travelers trust your brand instantly.",
    tone: "#1d4ed8",
    img: travelImg,
    tags: ["Online Bookings", "Safari Packages", "WhatsApp Inquiries"],
    capabilityBadge: "Travel Booking Experience",
    supportBadge: "Built to Drive Bookings",
    urgencyLine:
      "Travelers book with agencies that feel trustworthy, professional, and exciting online. A weak website silently pushes potential customers toward competitors.",
    bestFor: [
      "Travel agencies",
      "Tours & safaris",
      "Study abroad agencies",
      "Visa consultants",
      "Hotel booking",
      "Adventure tours",
      "Honeymoon packages",
      "Airport transfers",
      "Destination guides",
    ],
    ctaLabel: "Get my travel website",
  },
  {
    icon: GraduationCap,
    name: "Schools & Training",
    headline: "Build Trust, Increase Admissions & Modernize Your Institution Online",
    desc: "Professional education websites that help schools and training institutions attract students, simplify admissions, and build credibility online.",
    tone: "#1d4ed8",
    img: schoolImg,
    tags: ["Online Admissions", "Student Portals", "Course Listings"],
    capabilityBadge: "Education Growth Platform",
    supportBadge: "Built for Student Enrollment",
    urgencyLine:
      "Parents and students often judge the quality of an institution by its online presence before making inquiries or applications. A weak website reduces trust instantly.",
    bestFor: [
      "Primary schools",
      "High schools",
      "Colleges",
      "Universities",
      "Training centers",
      "TVET institutions",
      "Online courses",
      "Language schools",
      "Driving schools",
    ],
    ctaLabel: "Get my school website",
  },
  {
    icon: Stethoscope,
    name: "Clinics & Healthcare",
    headline: "Build Patient Trust Before They Even Walk Through Your Doors",
    desc: "Modern healthcare websites that help clinics and medical providers attract patients, simplify appointment booking, and build credibility online.",
    tone: "#ef3525",
    img: clinicImg,
    tags: ["Appointment Booking", "Doctor Profiles", "Patient Support"],
    capabilityBadge: "Patient Trust Platform",
    supportBadge: "Built for Healthcare Growth",
    urgencyLine:
      "Patients often decide whether to trust a clinic based on its online presence before making appointments. A weak website can silently drive them to another provider.",
    bestFor: [
      "Clinics",
      "Hospitals",
      "Dental practices",
      "Pharmacies",
      "Laboratories",
      "Therapy centers",
      "Specialist doctors",
      "Wellness centers",
      "Online consultations",
    ],
    ctaLabel: "Get my clinic website",
  },
  {
    icon: Scissors,
    name: "Salons & Beauty",
    headline: "Turn Beauty Into Bookings With A Stunning Online Presence",
    desc: "Elegant beauty, salon, and spa websites that attract clients, increase bookings, and make your brand stand out instantly online.",
    tone: "#ef3525",
    img: salon,
    tags: ["Online Bookings", "Service Galleries", "WhatsApp Support"],
    capabilityBadge: "Beauty Booking Experience",
    supportBadge: "Built to Attract Clients",
    urgencyLine:
      "Most beauty clients check your online presence before booking. If your brand doesn't look premium online, they'll choose a competitor that does.",
    bestFor: [
      "Hair salons",
      "Beauty spas",
      "Nail studios",
      "Barbershops",
      "Makeup artists",
      "Massage therapy",
      "Skincare clinics",
      "Lash studios",
      "Beauty brands",
    ],
    ctaLabel: "Get my beauty website",
  },
  {
    icon: Car,
    name: "Car Dealers",
    headline: "Sell More Cars With A Website Built To Attract Serious Buyers",
    desc: "Powerful car dealership websites that showcase vehicles professionally, generate quality leads, and help customers trust your business instantly.",
    tone: "#0f172a",
    img: carDealerImg,
    tags: ["Vehicle Listings", "Test Drive Booking", "WhatsApp Inquiries"],
    capabilityBadge: "Automotive Sales Platform",
    supportBadge: "Built to Sell Vehicles",
    urgencyLine:
      "Car buyers judge trust and professionalism online before visiting a dealership. A weak website can make even great vehicles look less credible.",
    bestFor: [
      "Car dealerships",
      "Used car sellers",
      "Luxury car dealers",
      "Import dealers",
      "Car yards",
      "Auto brokers",
      "Bike dealers",
      "Fleet sales",
      "Vehicle financing",
    ],
    ctaLabel: "Get my car dealership website",
  },
  {
    icon: Truck,
    name: "Logistics & Courier Services",
    headline: "Logistics & Courier",
    desc: "Perfect for bus companies, parcel delivery, goods transport, and courier services operating across Kenya.",
    tone: "#1d4ed8",
    img: logisticsImg,
    tags: ["Route Booking", "Parcel Tracking", "Delivery Quotes"],
    capabilityBadge: "Transport Growth Platform",
    supportBadge: "Built for Courier Trust",
    urgencyLine:
      "Move faster. Reach more customers. Run your transport business professionally online.",
    bestFor: [
      "Bus companies",
      "Parcel delivery services",
      "Courier businesses",
      "Goods transport companies",
      "Moving & relocation",
      "Fleet transport",
      "Same-day delivery",
    ],
    ctaLabel: "Get a modern transport website that builds trust & brings more customers",
  },
  {
    icon: HardHat,
    name: "Construction & Engineering",
    headline: "Construction & Engineering",
    desc: "Perfect for contractors, engineers, interior designers, and construction businesses that want to attract serious clients.",
    tone: "#ef3525",
    img: constructionImg,
    tags: ["Project Portfolio", "Service Quotes", "Client Testimonials"],
    capabilityBadge: "Construction Trust Platform",
    supportBadge: "Built to Win Bigger Deals",
    urgencyLine: "Build stronger trust online before you build on the ground.",
    bestFor: [
      "Construction companies",
      "Building contractors",
      "Interior design companies",
      "Engineering firms",
      "Road construction",
      "Real estate developers",
      "Hardware suppliers",
    ],
    ctaLabel: "Showcase your projects professionally & win bigger construction deals",
  },
  {
    icon: Hotel,
    name: "Hotels & Airbnb",
    headline: "Turn Online Visitors Into Paying Guests With A Modern Booking Website",
    desc: "Perfect for hotels, lodges, Airbnbs, apartments, and vacation stays that want more direct bookings.",
    tone: "#1d4ed8",
    img: hotelsAirbnbImg,
    tags: ["Room Showcases", "Pricing", "Reservations"],
    capabilityBadge: "Booking Trust Platform",
    supportBadge: "Built to Increase Reservations",
    urgencyLine:
      "A modern website helps customers view rooms, pricing, amenities, location, availability, and make reservations easily from anywhere.",
    bestFor: [
      "Hotels",
      "Airbnb businesses",
      "Apartments & vacation rentals",
      "Lodges & resorts",
      "BnBs & guest houses",
      "Short-stay rental businesses",
      "Holiday homes",
    ],
    ctaLabel: "Get a booking website that makes guests trust & reserve faster",
  },
  {
    icon: PartyPopper,
    name: "Event Planners",
    headline: "Turn Beautiful Events Into More Booked Clients",
    desc: "Perfect for event planners, wedding planners, decorators, and event companies that want more inquiries and a premium online presence.",
    tone: "#ef3525",
    img: eventPlannersImg,
    tags: ["Event Galleries", "Packages", "Inquiries"],
    capabilityBadge: "Event Booking Experience",
    supportBadge: "Built to Win Clients",
    urgencyLine:
      "A modern website helps clients view your event style, packages, past work, testimonials, pricing guidance, and send inquiries easily from anywhere.",
    bestFor: [
      "Event planners",
      "Wedding planners",
      "Decor companies",
      "Corporate event teams",
      "Birthday planners",
      "Bridal shower planners",
      "Catering & event vendors",
      "Sound & lighting teams",
      "Venue stylists",
    ],
    ctaLabel: "Get an event website that makes clients trust & book faster",
  },
  {
    icon: Church,
    name: "Churches & Ministries",
    headline: "Reach Souls Beyond The Church Walls With A Powerful Online Presence",
    desc: "Perfect for churches and ministries that want to share sermons, events, livestreams, and connect with more people online.",
    tone: "#1d4ed8",
    img: churchesMinistriesImg,
    tags: ["Sermons", "Livestreams", "Giving"],
    capabilityBadge: "Ministry Connection Platform",
    supportBadge: "Built to Reach More People",
    urgencyLine:
      "A professional website helps members access sermons, livestreams, event updates, prayer requests, donation options, and ministry information from anywhere.",
    bestFor: [
      "Churches",
      "Ministries",
      "Gospel organizations",
      "Youth ministries",
      "Christian foundations",
      "Prayer & outreach ministries",
      "Faith-based communities",
    ],
    ctaLabel: "Build a ministry website that inspires, connects & reaches more people",
  },
  {
    icon: Scale,
    name: "Law Firms & Legal Services",
    headline: "Build Trust And Professional Authority Before The First Consultation",
    desc: "Perfect for advocates, attorneys, and legal consultants who want a strong professional online presence.",
    tone: "#0c2340",
    img: lawFirmsImg,
    tags: ["Practice Areas", "Consultations", "Legal Trust"],
    capabilityBadge: "Legal Authority Platform",
    supportBadge: "Built to Attract Serious Clients",
    urgencyLine:
      "A modern website helps clients learn about your services, legal expertise, consultation process, and contact your firm with confidence.",
    bestFor: [
      "Law firms",
      "Advocates & attorneys",
      "Corporate legal consultants",
      "Immigration lawyers",
      "Property & land lawyers",
      "Family law firms",
      "Legal advisory businesses",
    ],
    ctaLabel: "Establish your legal brand online & attract high-value clients",
  },
  {
    icon: Dumbbell,
    name: "Gyms & Fitness",
    headline: "Turn Motivation Into Memberships With A Powerful Fitness Website",
    desc: "Perfect for gyms, trainers, and fitness brands that want more members and stronger online visibility.",
    tone: "#1d4ed8",
    img: gymsFitnessImg,
    tags: ["Memberships", "Schedules", "Session Booking"],
    capabilityBadge: "Fitness Growth Platform",
    supportBadge: "Built for Membership Signups",
    urgencyLine:
      "A professional website helps clients view training programs, memberships, schedules, transformations, and book sessions easily.",
    bestFor: [
      "Gyms & fitness centers",
      "Personal trainers",
      "Wellness & fitness brands",
      "CrossFit studios",
      "Yoga & aerobics studios",
      "Body transformation coaches",
      "Sports training centers",
    ],
    ctaLabel: "Grow your fitness brand & get more membership signups online",
  },
  {
    icon: Sparkles,
    name: "Cleaning Services",
    headline: "Make Your Cleaning Business Look As Professional As The Work You Deliver",
    desc: "Perfect for cleaning, fumigation, laundry, and janitorial businesses that want more bookings and a trusted online presence.",
    tone: "#1d4ed8",
    img: cleaningServicesImg,
    tags: ["Service Booking", "Pricing", "Quick Quotes"],
    capabilityBadge: "Cleaning Service Platform",
    supportBadge: "Built to Win Local Clients",
    urgencyLine:
      "A professional website helps clients book services, view pricing, explore past work, and contact your team quickly and easily.",
    bestFor: [
      "Home cleaning services",
      "Office cleaning companies",
      "Fumigation businesses",
      "Laundry & dry cleaning services",
      "Carpet & sofa cleaning",
      "Post-construction cleaning",
      "Janitorial service providers",
    ],
    ctaLabel: "Get more cleaning clients with a professional service website",
  },
  {
    icon: Camera,
    name: "Photography & Creative Studios",
    headline: "Let Your Work Speak Before You Say A Word",
    desc: "Perfect for photographers, videographers, and creative brands that want to showcase their portfolio professionally.",
    tone: "#475569",
    img: photographyStudiosImg,
    tags: ["Portfolios", "Session Booking", "Packages"],
    capabilityBadge: "Creative Portfolio Platform",
    supportBadge: "Built to Attract Premium Clients",
    urgencyLine:
      "A modern website helps clients explore portfolios, book sessions, view packages, and trust your brand before reaching out.",
    bestFor: [
      "Photography studios",
      "Videographers",
      "Wedding photographers",
      "Content creators",
      "Creative media agencies",
      "Event coverage teams",
      "Photo & video production brands",
    ],
    ctaLabel: "Showcase your creative work & attract more premium clients online",
  },
  {
    icon: Rocket,
    name: "Startups & Tech Businesses",
    headline: "Launch Professionally. Build Credibility. Grow Faster Online.",
    desc: "Perfect for startups and growing brands that need a modern website to attract customers, partners, and investors.",
    tone: "#1d4ed8",
    img: startupsTechImg,
    tags: ["Product Pages", "Investor Trust", "Lead Capture"],
    capabilityBadge: "Startup Growth Platform",
    supportBadge: "Built for Launch & Scale",
    urgencyLine:
      "A modern website helps you present your idea clearly, build investor and customer trust, showcase products or services, and create a strong digital presence from day one.",
    bestFor: [
      "Tech startups",
      "SaaS businesses",
      "Fintech companies",
      "AI & automation startups",
      "Digital platforms",
      "Innovative small businesses",
      "Growing brands & agencies",
    ],
    ctaLabel: "Launch your startup with a website built for growth & visibility",
  },
  {
    icon: Landmark,
    name: "Loans & Finance",
    headline: "Build Financial Trust Online And Turn Visitors Into Loyal Clients",
    desc: "Perfect for SACCOs, loan providers, fintech, and financial businesses that want a secure and professional online presence.",
    tone: "#1d4ed8",
    img: loansFinanceImg,
    tags: ["Loan Applications", "Calculators", "Client Support"],
    capabilityBadge: "Financial Trust Platform",
    supportBadge: "Built to Attract Clients",
    urgencyLine:
      "A professional website helps customers learn about your services, apply for loans, calculate repayments, access support, and trust your brand before making financial decisions.",
    bestFor: [
      "Loan companies",
      "SACCOs",
      "Microfinance businesses",
      "Fintech startups",
      "Insurance agencies",
      "Investment companies",
      "Credit service providers",
    ],
    ctaLabel: "Grow your financial brand with a trusted modern website",
  },
  {
    icon: User,
    name: "Personal Portfolio",
    headline: "Your Skills Deserve More Than Just A Social Media Profile",
    desc: "Perfect for freelancers, developers, creatives, and professionals who want to showcase their work and personal brand online.",
    tone: "#1e293b",
    img: personalPortfolioImg,
    tags: ["Portfolio", "Case Studies", "Personal Brand"],
    capabilityBadge: "Personal Brand Platform",
    supportBadge: "Built to Open Doors",
    urgencyLine:
      "A modern portfolio website helps you stand out, build credibility, attract opportunities, and present your personal brand with confidence.",
    bestFor: [
      "Software developers",
      "Graphic designers",
      "Freelancers",
      "UI/UX designers",
      "Content creators",
      "Photographers",
      "Students & professionals",
    ],
    ctaLabel: "Build a portfolio that opens doors to opportunities & clients",
  },
];

const customizationNotes: Record<string, string> = {
  "Restaurants & Cafes":
    "We create restaurant websites that do more than look beautiful. From online ordering and table reservations to WhatsApp follow-ups and irresistible food galleries, every section is designed to increase orders, fill tables, and bring customers back.",
  "Real Estate":
    "We build high-converting real estate websites designed to attract serious buyers, present listings professionally, and increase inquiries through property galleries, search filters, map integration, booking prompts, and instant WhatsApp communication.",
  "Online Stores":
    "We create powerful e-commerce websites that help businesses sell more products online through smart product displays, smooth checkout experiences, secure payment integrations, WhatsApp orders, inventory-ready layouts, and customer-friendly shopping flows.",
  "Tours & Travel":
    "We build modern travel websites that inspire confidence and excitement through immersive destination galleries, booking systems, itinerary showcases, safari packages, customer reviews, WhatsApp integration, and seamless inquiry flows that turn visitors into paying travelers.",
  "Schools & Training":
    "We design premium school and training websites that showcase programs professionally, simplify admissions, improve parent and student communication, support course pages, announcements, galleries, inquiry systems, and help institutions build trust instantly.",
  "Clinics & Healthcare":
    "We build premium healthcare websites that make clinics appear professional, trustworthy, and accessible through appointment booking, service showcases, doctor profiles, WhatsApp support, online consultation prompts, patient communication, and mobile-friendly experiences.",
  "Salons & Beauty":
    "We design premium salon and spa websites that showcase services beautifully, simplify online bookings, build customer trust, display service menus, galleries, testimonials, packages, and WhatsApp prompts, creating a luxurious digital experience that reflects your brand.",
  "Car Dealers":
    "We create automotive platforms with advanced vehicle listings, image galleries, pricing, specs, financing inquiry systems, test drive booking, WhatsApp integration, and effortless browsing that helps dealerships attract serious buyers and close more deals.",
  "Logistics & Courier Services":
    "For transport companies, parcel delivery services, bus booking companies, and courier businesses that move people, goods, and packages across Kenya. A professional website helps customers track services, view routes, book deliveries, check pricing, and contact your business easily from anywhere.",
  "Construction & Engineering":
    "For construction firms, contractors, engineers, interior designers, and real estate development companies that want to showcase projects professionally and win bigger clients. A strong website helps display completed projects, services, company credibility, quotations, and client testimonials so customers trust your work before even calling.",
  "Hotels & Airbnb":
    "For hotels, Airbnbs, apartments, lodges, resorts, and vacation stays that want more bookings and a professional online presence. We build room showcases, pricing sections, amenity highlights, location details, availability prompts, galleries, and reservation flows that help guests trust your stay and book faster.",
  "Event Planners":
    "For event planners, wedding planners, decorators, corporate event teams, and event vendors that want more serious inquiries and a professional online presence. We create package pages, event galleries, service bundles, inquiry forms, testimonials, pricing prompts, and mood-driven visuals that make your planning feel premium.",
  "Churches & Ministries":
    "For churches, ministries, gospel organizations, and faith-based communities that want to reach more people and strengthen their online presence. We customize sermon libraries, livestream sections, event calendars, prayer request forms, giving links, ministry pages, announcements, and newcomer information that keeps your community connected.",
  "Law Firms & Legal Services":
    "For advocates, law firms, legal consultants, and corporate legal services that want to build credibility and attract serious clients professionally. We design practice-area pages, consultation prompts, lawyer profiles, legal expertise sections, credibility blocks, and clear contact paths that help clients act with confidence.",
  "Gyms & Fitness":
    "For gyms, fitness trainers, wellness centers, and fitness brands that want to attract more members and build a strong online presence. We build training program pages, trainer profiles, class schedules, membership packages, transformation galleries, booking prompts, and offer sections that turn interest into signups.",
  "Cleaning Services":
    "For cleaning companies, fumigation services, laundry businesses, and home or office cleaning professionals that want to attract more customers and look trustworthy online. We customize quote requests, package pages, service areas, trust badges, before-and-after images, pricing prompts, and booking flows that make hiring you feel easy.",
  "Photography & Creative Studios":
    "For photographers, videographers, creative studios, and media brands that want to showcase their work professionally and attract more clients. We create visual portfolios, package pages, booking forms, galleries, testimonials, production service pages, and elegant layouts that let your work sell before you speak.",
  "Startups & Tech Businesses":
    "For startups, SaaS businesses, innovative brands, and growing companies that want to launch professionally and scale faster online. We shape landing pages with product benefits, feature sections, sign-up flows, pricing, demos, partner credibility, and investor-ready messaging that make the product feel real.",
  "Loans & Finance":
    "For SACCOs, loan providers, fintech companies, insurance agencies, and financial service businesses that want to build trust and attract more clients online. We build product pages, application flows, repayment calculator prompts, lead forms, eligibility steps, client support paths, trust sections, and clear calls to action for serious finance inquiries.",
  "Personal Portfolio":
    "For developers, designers, creatives, freelancers, and professionals who want to showcase their skills, experience, and work professionally online. We customize a sharp personal brand site with portfolio galleries, case studies, achievements, services, contact prompts, and a story that makes you memorable.",
};

export function Categories() {
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({});

  return (
    <section id="categories" className="bg-[#f7f1e8] py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Website categories</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">A website built for your industry</h2>
          <p className="mt-3 text-muted-foreground">
            Pick the type of website that fits your business. We tailor the design, features, and
            content to match.
          </p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {cats.map((c) => {
            const isExpanded = Boolean(openCards[c.name]);
            const detailsId = `category-details-${c.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "")}`;

            return (
              <article
                key={c.name}
                className="group border border-[#d8cab8] bg-[#fffdfa] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-card sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-[#eadcca] pb-4">
                  <div>
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#ef3525]">
                      Website category
                    </p>
                    <h3 className="mt-1 text-xl font-black leading-tight text-navy">{c.name}</h3>
                  </div>
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white shadow-soft"
                    style={{
                      background: `linear-gradient(135deg, ${c.tone}, color-mix(in oklab, ${c.tone} 70%, #0f172a))`,
                    }}
                  >
                    <c.icon className="h-4 w-4" />
                  </span>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#efe5d7]">
                  <img
                    src={c.img}
                    alt={`${c.name} website category`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#fffaf1]/95 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#8a5a20] shadow-soft"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="rounded-full bg-[#222] px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.16em] text-white shadow-soft">
                      Custom
                    </span>
                  </div>
                </div>
                <div className="px-1 pb-2 pt-7">
                  <p className="text-lg font-black leading-snug text-navy">
                    {c.headline ?? c.name}
                  </p>
                  <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                  <button
                    type="button"
                    aria-controls={detailsId}
                    aria-expanded={isExpanded}
                    onClick={() =>
                      setOpenCards((current) => ({
                        ...current,
                        [c.name]: !current[c.name],
                      }))
                    }
                    className="mt-5 inline-flex items-center gap-2 border border-[#d8cab8] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-navy shadow-soft transition hover:-translate-y-0.5 hover:border-navy"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                    <span aria-hidden="true">{isExpanded ? "↑" : "↓"}</span>
                  </button>
                  {isExpanded ? (
                    <div
                      id={detailsId}
                      className="relative mt-5 overflow-hidden border px-5 py-5 shadow-soft"
                      style={{
                        borderColor: `color-mix(in oklab, ${c.tone} 28%, #d8cab8)`,
                        background: `linear-gradient(135deg, color-mix(in oklab, ${c.tone} 13%, white), #fff8ee 58%, white)`,
                      }}
                    >
                      <div
                        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-20 blur-2xl"
                        style={{ background: c.tone }}
                      />
                      <div className="relative flex flex-wrap items-center gap-2">
                        <span
                          className="inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-white shadow-soft"
                          style={{ background: c.tone }}
                        >
                          {c.capabilityBadge ?? "Capability buildout"}
                        </span>
                        <span className="rounded-full bg-white/85 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#8a5a20] shadow-soft">
                          {c.supportBadge ?? "Remarkable finish"}
                        </span>
                      </div>
                      <p className="relative mt-4 text-sm font-medium leading-relaxed text-[#3f2c1b]">
                        {customizationNotes[c.name]}
                      </p>
                      {c.urgencyLine ? (
                        <p className="relative mt-4 border-l-4 border-current bg-white/70 px-4 py-3 text-sm font-black leading-relaxed text-[#3f2c1b]">
                          {c.urgencyLine}
                        </p>
                      ) : null}
                      {c.bestFor ? (
                        <div className="relative mt-4">
                          <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#8a5a20]">
                            Best for
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {c.bestFor.map((item) => (
                              <span
                                key={`${c.name}-${item}`}
                                className="rounded-full border border-white/80 bg-white/75 px-3 py-1 text-xs font-bold text-navy shadow-soft"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                      <div className="relative mt-4 flex flex-wrap gap-2">
                        {c.tags.map((tag) => (
                          <span
                            key={`${c.name}-${tag}-feature`}
                            className="rounded-full border border-white/80 bg-white/75 px-3 py-1 text-xs font-bold text-navy shadow-soft"
                          >
                            {tag}
                          </span>
                        ))}
                        <span className="rounded-full border border-white/80 bg-white/75 px-3 py-1 text-xs font-bold text-navy shadow-soft">
                          Easy updates
                        </span>
                      </div>
                    </div>
                  ) : null}
                  <a
                    href="/describe-your-idea"
                    className="mt-5 inline-flex items-center gap-2 bg-navy px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-royal"
                  >
                    {c.ctaLabel ?? "Request this website"} <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
