import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Boxes,
  ChevronRight,
  Eye,
  EyeOff,
  FileText,
  GalleryHorizontalEnd,
  Home,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  MessageSquare,
  PackageCheck,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Upload,
  Users,
} from "lucide-react";

import {
  ConversionChart,
  PerformanceChart,
  TrafficSourcesChart,
} from "@/admin/components/AdminCharts";
import {
  EmptyPreview,
  MetricCard,
  SectionCard,
  StatusBadge,
} from "@/admin/components/AdminPrimitives";
import { LeadTable } from "@/admin/components/LeadTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Logo } from "@/components/site/Logo";
import { Toaster } from "@/components/ui/sonner";
import { adminApi } from "@/admin/api";
import {
  activityLogs,
  adminUsers,
  contentSections,
  dashboardMetrics,
  leads,
  mediaAssets,
  messages,
  popularServices,
  pricingPackages,
  serviceCategories,
} from "@/admin/data";
import { cn } from "@/lib/utils";
import type { Lead, MediaAsset, Message, PricingPackage, ServiceCategory } from "@/admin/data";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "leads", label: "Leads", icon: Users },
  { id: "services", label: "Services", icon: Boxes },
  { id: "pricing", label: "Pricing", icon: PackageCheck },
  { id: "content", label: "Content", icon: FileText },
  { id: "media", label: "Media", icon: GalleryHorizontalEnd },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "security", label: "Security", icon: LockKeyhole },
] as const;

type SectionId = (typeof navItems)[number]["id"];
type AdminSession = { id: string; name: string; email: string; role: string };
type StoredServiceCategory = ServiceCategory & { id?: string };
type StoredPricingPackage = PricingPackage & { id?: string };
type StoredContentSection = (typeof contentSections)[number] & {
  id?: string;
  title?: string | null;
  body?: string | null;
  cta?: string | null;
};
type StoredMediaAsset = MediaAsset & { id?: string };

const metricIcons = [Users, Bell, PackageCheck, MessageSquare];
const adminDefaultEmail = "eliudkirwa451@gmail.com";
const adminIconUrl =
  "https://i.pinimg.com/736x/a5/04/f4/a504f4ad40f48fb0d974d4c2bad25b68.jpg?v=admin";
const defaultHeroDraft = {
  title: "Your Business Should Be Working Online 24/7",
  body: "Do not let customers find your competitors first. WebMakers builds websites that make your business visible, trusted, and ready to receive bookings, orders, inquiries, and payments from anywhere.",
  cta: "Get a Website That Works 24/7",
};

const loginDecorIcons = [
  "https://cdn-icons-png.flaticon.com/128/1087/1087815.png",
  "https://cdn-icons-png.flaticon.com/128/4257/4257731.png",
  "https://cdn-icons-png.flaticon.com/128/14150/14150577.png",
];

const loginDecorPlacements = [
  { top: "7%", left: "7%", size: "3.4rem", rotate: "-12deg", opacity: 0.2, icon: 0 },
  { top: "4%", left: "18%", size: "2rem", rotate: "24deg", opacity: 0.11, icon: 2 },
  { top: "16%", left: "25%", size: "2.5rem", rotate: "10deg", opacity: 0.16, icon: 1 },
  { top: "22%", left: "2%", size: "2.1rem", rotate: "-28deg", opacity: 0.12, icon: 1 },
  { top: "9%", right: "10%", size: "3.1rem", rotate: "14deg", opacity: 0.2, icon: 2 },
  { top: "5%", right: "28%", size: "2.2rem", rotate: "-20deg", opacity: 0.12, icon: 0 },
  { top: "19%", right: "3%", size: "2.3rem", rotate: "26deg", opacity: 0.13, icon: 1 },
  { top: "29%", left: "11%", size: "2.4rem", rotate: "18deg", opacity: 0.14, icon: 2 },
  { top: "34%", left: "24%", size: "1.9rem", rotate: "-8deg", opacity: 0.1, icon: 0 },
  { top: "31%", right: "18%", size: "2.7rem", rotate: "-16deg", opacity: 0.15, icon: 0 },
  { top: "36%", right: "31%", size: "1.8rem", rotate: "18deg", opacity: 0.09, icon: 2 },
  { top: "46%", left: "4%", size: "3rem", rotate: "7deg", opacity: 0.18, icon: 1 },
  { top: "58%", left: "13%", size: "2rem", rotate: "-18deg", opacity: 0.12, icon: 0 },
  { top: "52%", left: "29%", size: "1.7rem", rotate: "30deg", opacity: 0.08, icon: 2 },
  { top: "48%", right: "5%", size: "3.5rem", rotate: "-10deg", opacity: 0.18, icon: 2 },
  { top: "57%", right: "16%", size: "2rem", rotate: "22deg", opacity: 0.12, icon: 1 },
  { top: "45%", right: "28%", size: "1.8rem", rotate: "-26deg", opacity: 0.09, icon: 0 },
  { bottom: "27%", left: "17%", size: "2.6rem", rotate: "-18deg", opacity: 0.14, icon: 0 },
  { bottom: "31%", left: "3%", size: "2.2rem", rotate: "18deg", opacity: 0.12, icon: 2 },
  { bottom: "35%", left: "32%", size: "1.8rem", rotate: "-16deg", opacity: 0.08, icon: 1 },
  { bottom: "23%", right: "20%", size: "2.5rem", rotate: "12deg", opacity: 0.15, icon: 1 },
  { bottom: "32%", right: "4%", size: "2.4rem", rotate: "-18deg", opacity: 0.13, icon: 0 },
  { bottom: "35%", right: "33%", size: "1.7rem", rotate: "12deg", opacity: 0.08, icon: 2 },
  { bottom: "10%", left: "9%", size: "3.2rem", rotate: "16deg", opacity: 0.18, icon: 2 },
  { bottom: "3%", left: "22%", size: "2rem", rotate: "-20deg", opacity: 0.11, icon: 1 },
  { bottom: "8%", right: "9%", size: "3rem", rotate: "-12deg", opacity: 0.18, icon: 0 },
  { bottom: "4%", right: "24%", size: "2rem", rotate: "20deg", opacity: 0.11, icon: 2 },
  { bottom: "6%", left: "43%", size: "2.3rem", rotate: "9deg", opacity: 0.13, icon: 1 },
  { top: "13%", left: "45%", size: "1.6rem", rotate: "-14deg", opacity: 0.07, icon: 0 },
  { top: "17%", right: "45%", size: "1.7rem", rotate: "14deg", opacity: 0.07, icon: 1 },
  { bottom: "16%", left: "48%", size: "1.6rem", rotate: "-24deg", opacity: 0.07, icon: 2 },
];

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "WebMakers Admin Dashboard" },
      {
        name: "description",
        content:
          "Admin dashboard concept for managing WebMakers leads, services, pricing, content, media, messages, analytics, and security.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
    links: [
      { rel: "icon", href: adminIconUrl, type: "image/jpeg" },
      { rel: "shortcut icon", href: adminIconUrl, type: "image/jpeg" },
      { rel: "apple-touch-icon", href: adminIconUrl },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
      },
    ],
  }),
  component: AdminRoute,
});

function AdminRoute() {
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [admin, setAdmin] = useState<AdminSession | null>(null);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  useEffect(() => {
    let alive = true;
    adminApi
      .me()
      .then(({ admin: currentAdmin }) => {
        if (alive) setAdmin(currentAdmin);
      })
      .catch(() => {
        if (alive) setAdmin(null);
      })
      .finally(() => {
        if (alive) setHasCheckedSession(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  function handleLogin(nextAdmin: AdminSession) {
    setAdmin(nextAdmin);
    toast.success("Signed in to WebMakers Admin");
  }

  async function handleLogout() {
    await adminApi.logout().catch(() => null);
    setAdmin(null);
    setActiveSection("overview");
    toast.success("Logged out securely");
  }

  if (!hasCheckedSession) {
    return null;
  }

  if (!admin) {
    return (
      <>
        <AdminLogin onLogin={handleLogin} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <div className="grid lg:grid-cols-[17rem_1fr]">
        <AdminSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onLogout={handleLogout}
        />
        <div className="min-w-0 pb-24 lg:pb-0">
          <AdminTopbar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            onLogout={handleLogout}
          />
          <main className="mx-auto w-full max-w-[94rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
            {activeSection === "overview" ? (
              <OverviewSection setActiveSection={setActiveSection} />
            ) : null}
            {activeSection === "leads" ? <LeadsSection /> : null}
            {activeSection === "services" ? <ServicesSection /> : null}
            {activeSection === "pricing" ? <PricingSection /> : null}
            {activeSection === "content" ? <ContentSection /> : null}
            {activeSection === "media" ? <MediaSection /> : null}
            {activeSection === "messages" ? <MessagesSection /> : null}
            {activeSection === "analytics" ? <AnalyticsSection /> : null}
            {activeSection === "security" ? <SecuritySection /> : null}
          </main>
        </div>
      </div>
      <MobileNav activeSection={activeSection} setActiveSection={setActiveSection} />
      <Toaster position="top-right" richColors />
    </div>
  );
}

function AdminLogin({ onLogin }: { onLogin: (admin: AdminSession) => void }) {
  const [email, setEmail] = useState(adminDefaultEmail);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    setIsSubmitting(true);
    try {
      const response = await adminApi.login(email.trim(), password);
      onLogin(response.admin);
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Invalid admin email or password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#f8fafc_0%,#eff6ff_42%,#fff1f2_100%)] px-4 py-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {loginDecorPlacements.map((placement, index) => (
          <img
            key={`${placement.icon}-${index}`}
            src={loginDecorIcons[placement.icon]}
            alt=""
            className="absolute hidden select-none sm:block"
            style={{
              top: placement.top,
              right: placement.right,
              bottom: placement.bottom,
              left: placement.left,
              width: placement.size,
              height: placement.size,
              opacity: placement.opacity,
              transform: `rotate(${placement.rotate})`,
            }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/44 blur-3xl" />
      </div>
      <section className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden border border-slate-200 bg-white text-slate-950 shadow-[0_28px_80px_-38px_rgba(15,23,42,0.65)]"
        >
          <div className="h-2 bg-[linear-gradient(90deg,#1d4ed8,#ef3525,#07111f)]" />
          <div className="p-6 sm:p-8">
            <div className="flex justify-center">
              <Logo />
            </div>

            <div className="mt-8 text-center">
              <span className="inline-flex items-center gap-2 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-slate-600">
                <LockKeyhole className="h-3.5 w-3.5 text-royal" />
                Admin login
              </span>
              <h1 className="mt-5 text-3xl font-black text-slate-950">Welcome back</h1>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                Sign in to manage leads, content, pricing, messages, and website performance.
              </p>
            </div>

            <div className="mt-8 grid gap-4">
              <label className="block">
                <span className="mb-2 block text-sm font-black text-slate-800">Email address</span>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-12 rounded-md border-slate-200 bg-white"
                  placeholder="admin email"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-black text-slate-800">Password</span>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-12 rounded-md border-slate-200 bg-white pr-12"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                    aria-label={showPassword ? "Hide admin password" : "Show admin password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>
            </div>

            {loginError ? (
              <p className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {loginError}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 h-12 w-full rounded-md bg-[linear-gradient(135deg,#1d4ed8,#07111f)] font-black text-white hover:brightness-110"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>

            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              {["Leads", "Content", "Analytics"].map((item, index) => (
                <div
                  key={item}
                  className={cn(
                    "border px-2 py-2 text-xs font-black",
                    index === 0 && "border-blue-200 bg-blue-50 text-blue-700",
                    index === 1 && "border-red-200 bg-red-50 text-red-700",
                    index === 2 && "border-slate-200 bg-slate-50 text-slate-700",
                  )}
                >
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-5 text-center text-xs font-semibold leading-relaxed text-slate-400">
              Private WebMakers workspace
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

function AdminSidebar({
  activeSection,
  setActiveSection,
  onLogout,
}: {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  onLogout: () => void;
}) {
  return (
    <aside className="sticky top-0 hidden h-screen border-r border-slate-200 bg-white lg:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-200 px-5 py-5">
          <Logo />
          <p className="mt-2 pl-14 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Admin Console
          </p>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-bold transition",
                activeSection === item.id
                  ? "bg-slate-950 text-white shadow-soft"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="m-4 border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            Secure route
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Protected by the WebMakers backend session and role-based admin API.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={onLogout}
            className="mt-4 w-full rounded-md bg-white text-slate-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}

function AdminTopbar({
  activeSection,
  setActiveSection,
  onLogout,
}: {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  onLogout: () => void;
}) {
  const active = navItems.find((item) => item.id === activeSection) ?? navItems[0];
  const [searchTerm, setSearchTerm] = useState("");

  function runSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      toast.info("Type something to search first");
      return;
    }

    const matchedSection = navItems.find(
      (item) => item.label.toLowerCase().includes(query) || item.id.includes(query),
    );
    if (matchedSection) {
      setActiveSection(matchedSection.id);
      toast.success(`Opened ${matchedSection.label}`);
      return;
    }
    toast.info(`No section matched "${searchTerm}"`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/92 backdrop-blur">
      <div className="flex min-h-16 flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Home className="h-3.5 w-3.5" />
            Admin
            <ChevronRight className="h-3.5 w-3.5" />
            {active.label}
          </div>
          <h1 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">{active.label}</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <form className="relative" onSubmit={runSearch}>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-10 w-full rounded-md bg-slate-50 pl-9 sm:w-72"
              placeholder="Search leads, content, media..."
            />
          </form>
          <select
            value={activeSection}
            onChange={(event) => setActiveSection(event.target.value as SectionId)}
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 lg:hidden"
          >
            {navItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <Button
            type="button"
            onClick={() => {
              setActiveSection("leads");
              toast.info("Open the Add lead button to create a new inquiry");
            }}
            className="rounded-md bg-slate-950 text-white hover:bg-royal"
          >
            <Plus className="h-4 w-4" />
            Quick add
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onLogout}
            className="rounded-md bg-white text-slate-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
          <Avatar className="hidden h-10 w-10 border border-slate-200 sm:flex">
            <AvatarFallback className="bg-slate-100 text-sm font-black text-slate-700">
              WM
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

function MobileNav({
  activeSection,
  setActiveSection,
}: {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
}) {
  const visibleItems = navItems.slice(0, 5);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white lg:hidden">
      <div className="grid grid-cols-5">
        {visibleItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveSection(item.id)}
            className={cn(
              "flex min-h-16 flex-col items-center justify-center gap-1 text-[0.68rem] font-bold",
              activeSection === item.id ? "text-royal" : "text-slate-500",
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function OverviewSection({ setActiveSection }: { setActiveSection: (section: SectionId) => void }) {
  const [metrics, setMetrics] = useState(dashboardMetrics);
  const [recentMessages, setRecentMessages] = useState(messages);

  useEffect(() => {
    adminApi
      .dashboard()
      .then((response) => setMetrics(response.metrics))
      .catch(() => toast.error("Could not load live dashboard metrics"));
    adminApi
      .messages()
      .then((response) => setRecentMessages(response.messages.slice(0, 4)))
      .catch(() => null);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} {...metric} icon={metricIcons[index]} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <SectionCard
          title="Monthly performance"
          description="Page views, leads, and conversion movement for the WebMakers funnel."
        >
          <PerformanceChart />
        </SectionCard>
        <SectionCard
          title="Quick actions"
          description="Common admin tasks for day-to-day website management."
        >
          <div className="grid gap-3">
            {[
              ["Review new leads", "leads"],
              ["Edit packages", "pricing"],
              ["Upload service image", "media"],
              ["Update homepage hero", "content"],
            ].map(([label, section]) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveSection(section as SectionId)}
                className="flex items-center justify-between border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-black text-slate-800 transition hover:border-royal hover:bg-white"
              >
                {label}
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>
            ))}
          </div>
          <Separator className="my-5" />
          <ActivityFeed />
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <SectionCard title="Recent messages" className="xl:col-span-2">
          <div className="grid gap-3">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className="flex flex-col gap-3 border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-black text-slate-950">{message.subject}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {message.name} via {message.channel} · {message.received}
                  </p>
                </div>
                <StatusBadge value={message.status} />
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Conversion statistics">
          <div className="space-y-5">
            <StatProgress label="Lead conversion rate" value={39} />
            <StatProgress label="WhatsApp CTA clicks" value={72} />
            <StatProgress label="Planner completion" value={61} />
            <StatProgress label="Contact reply rate" value={88} />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function LeadsSection() {
  const [status, setStatus] = useState("All");
  const [service, setService] = useState("All");
  const [search, setSearch] = useState("");
  const [leadRows, setLeadRows] = useState<Lead[]>(leads);

  useEffect(() => {
    adminApi
      .leads()
      .then((response) => setLeadRows(response.leads))
      .catch(() => toast.error("Could not load leads from the backend"));
  }, []);

  const filteredLeads = useMemo(
    () =>
      leadRows.filter((lead) => {
        const haystack = [
          lead.name,
          lead.business,
          lead.phone,
          lead.email,
          lead.serviceType,
          lead.packageInterest,
          lead.lastMessage,
        ]
          .join(" ")
          .toLowerCase();
        const matchesSearch = haystack.includes(search.trim().toLowerCase());
        const matchesStatus = status === "All" || lead.status === status;
        const matchesService = service === "All" || lead.serviceType === service;
        return matchesSearch && matchesStatus && matchesService;
      }),
    [leadRows, search, service, status],
  );

  async function addLead(lead: Lead) {
    try {
      const { id: _id, createdAt: _createdAt, ...payload } = lead;
      const response = await adminApi.createLead(payload);
      setLeadRows((current) => [response.lead, ...current]);
      toast.success(`Lead added for ${response.lead.business}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create lead");
    }
  }

  async function updateLead(
    id: string,
    payload: Partial<Pick<Lead, "status" | "followUp" | "notes">>,
  ) {
    try {
      const response = await adminApi.updateLead(id, payload);
      setLeadRows((current) => current.map((lead) => (lead.id === id ? response.lead : lead)));
      toast.success("Lead updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update lead");
    }
  }

  return (
    <div className="space-y-6">
      <SectionCard
        title="Leads & inquiries management"
        description="View client details, filter by service or package, track status, and keep follow-up notes visible."
      >
        <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="rounded-md"
            placeholder="Search by client, business, phone, or email"
          />
          <FilterSelect
            value={service}
            onChange={setService}
            options={["All", ...serviceCategories.map((item) => item.name)]}
          />
          <FilterSelect
            value={status}
            onChange={setStatus}
            options={["All", "New", "Contacted", "Hot", "Closed", "Rejected"]}
          />
          <LeadDialog onAddLead={addLead} />
        </div>
        <LeadTable leads={filteredLeads} onUpdateLead={updateLead} />
      </SectionCard>
    </div>
  );
}

function ServicesSection() {
  const [categories, setCategories] = useState<StoredServiceCategory[]>(serviceCategories);
  const [search, setSearch] = useState("");
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    cta: "",
  });

  const filteredCategories = categories.filter((category) =>
    [category.name, category.description, category.cta]
      .join(" ")
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );

  useEffect(() => {
    adminApi
      .services()
      .then((response) => setCategories(response.services))
      .catch(() => toast.error("Could not load service categories"));
  }, []);

  async function addCategory() {
    if (!newCategory.name.trim()) {
      toast.error("Add a category name first");
      return;
    }
    try {
      const response = await adminApi.createService({
        name: newCategory.name.trim(),
        status: "Draft",
        image: "New service image",
        cta: newCategory.cta.trim() || "Start this project",
        description: newCategory.description.trim() || "New website service category.",
      });
      setCategories((current) => [response.service, ...current]);
      setNewCategory({ name: "", description: "", cta: "" });
      setNewCategoryOpen(false);
      toast.success("Service category added as draft");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not add category");
    }
  }

  async function editCategory(categoryToEdit: StoredServiceCategory) {
    const nextStatus = categoryToEdit.status === "Live" ? "Draft" : "Live";
    if (!categoryToEdit.id) {
      setCategories((current) =>
        current.map((category) =>
          category.name === categoryToEdit.name ? { ...category, status: nextStatus } : category,
        ),
      );
      toast.success("Service publishing status updated");
      return;
    }
    try {
      const response = await adminApi.updateService(categoryToEdit.id, { status: nextStatus });
      setCategories((current) =>
        current.map((category) =>
          category.id === categoryToEdit.id ? response.service : category,
        ),
      );
      toast.success("Service publishing status updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update service");
    }
  }

  async function replaceCategoryImage(categoryToEdit: StoredServiceCategory) {
    const image = `Updated image · ${new Date().toLocaleTimeString()}`;
    if (!categoryToEdit.id) {
      setCategories((current) =>
        current.map((category) =>
          category.name === categoryToEdit.name ? { ...category, image } : category,
        ),
      );
      toast.success(`Image placeholder updated for ${categoryToEdit.name}`);
      return;
    }
    try {
      const response = await adminApi.updateService(categoryToEdit.id, { image });
      setCategories((current) =>
        current.map((category) =>
          category.id === categoryToEdit.id ? response.service : category,
        ),
      );
      toast.success(`Image placeholder updated for ${categoryToEdit.name}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update service image");
    }
  }

  async function editCategoryCopy(categoryToEdit: StoredServiceCategory) {
    const description = window.prompt("Edit service description", categoryToEdit.description);
    if (description === null) return;
    const cta = window.prompt("Edit service CTA", categoryToEdit.cta);
    if (cta === null) return;
    const payload = {
      description: description.trim() || categoryToEdit.description,
      cta: cta.trim() || categoryToEdit.cta,
    };
    if (!categoryToEdit.id) {
      setCategories((current) =>
        current.map((category) =>
          category.name === categoryToEdit.name ? { ...category, ...payload } : category,
        ),
      );
      toast.success(`Updated ${categoryToEdit.name}`);
      return;
    }
    try {
      const response = await adminApi.updateService(categoryToEdit.id, payload);
      setCategories((current) =>
        current.map((category) =>
          category.id === categoryToEdit.id ? response.service : category,
        ),
      );
      toast.success(`Updated ${categoryToEdit.name}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update service copy");
    }
  }

  async function deleteCategory(categoryToDelete: StoredServiceCategory) {
    if (!window.confirm(`Delete ${categoryToDelete.name}?`)) return;
    if (!categoryToDelete.id) {
      setCategories((current) =>
        current.filter((category) => category.name !== categoryToDelete.name),
      );
      toast.success(`${categoryToDelete.name} deleted`);
      return;
    }
    try {
      await adminApi.deleteService(categoryToDelete.id);
      setCategories((current) => current.filter((category) => category.id !== categoryToDelete.id));
      toast.success(`${categoryToDelete.name} deleted`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete service");
    }
  }

  return (
    <SectionCard
      title="Website services management"
      description="Manage industries, descriptions, service images, CTAs, and publishing status."
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="max-w-md rounded-md"
          placeholder="Search service categories"
        />
        <Dialog open={newCategoryOpen} onOpenChange={setNewCategoryOpen}>
          <DialogTrigger asChild>
            <Button type="button" className="w-fit rounded-md bg-slate-950 hover:bg-royal">
              <Plus className="h-4 w-4" />
              Add category
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-md">
            <DialogHeader>
              <DialogTitle>Add website category</DialogTitle>
              <DialogDescription>
                Create a draft service category for the public website.
              </DialogDescription>
            </DialogHeader>
            <Input
              value={newCategory.name}
              onChange={(event) =>
                setNewCategory((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Category name"
              className="rounded-md"
            />
            <Textarea
              value={newCategory.description}
              onChange={(event) =>
                setNewCategory((current) => ({ ...current, description: event.target.value }))
              }
              placeholder="Short description"
              className="min-h-24 rounded-md"
            />
            <Input
              value={newCategory.cta}
              onChange={(event) =>
                setNewCategory((current) => ({ ...current, cta: event.target.value }))
              }
              placeholder="CTA label"
              className="rounded-md"
            />
            <Button
              type="button"
              onClick={addCategory}
              className="rounded-md bg-slate-950 hover:bg-royal"
            >
              Save category
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredCategories.map((category) => (
          <article key={category.name} className="border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-slate-950">{category.name}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  {category.inquiries} inquiries
                </p>
              </div>
              <StatusBadge value={category.status} />
            </div>
            <div className="mt-4 flex min-h-24 items-center justify-center bg-[linear-gradient(135deg,#eff6ff,#fff1f2)] px-4 text-center text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              {category.image}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{category.description}</p>
            <p className="mt-3 text-xs font-black text-royal">{category.cta}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => editCategory(category)}
                className="rounded-md"
              >
                {category.status === "Live" ? "Unpublish" : "Publish"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => replaceCategoryImage(category)}
                className="rounded-md"
              >
                Replace image
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => editCategoryCopy(category)}
                className="rounded-md"
              >
                Edit copy
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => deleteCategory(category)}
                className="rounded-md text-red-700 hover:text-red-800"
              >
                Delete
              </Button>
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}

function PricingSection() {
  const [packages, setPackages] = useState<StoredPricingPackage[]>(pricingPackages);
  const [editingPackage, setEditingPackage] = useState<StoredPricingPackage | null>(null);
  const [draftPackage, setDraftPackage] = useState<StoredPricingPackage | null>(null);

  useEffect(() => {
    adminApi
      .packages()
      .then((response) => setPackages(response.packages))
      .catch(() => toast.error("Could not load pricing packages"));
  }, []);

  async function toggleRecommended(planToHighlight: StoredPricingPackage) {
    if (!planToHighlight.id) {
      setPackages((current) =>
        current.map((plan) => ({ ...plan, recommended: plan.name === planToHighlight.name })),
      );
      toast.success(`${planToHighlight.name} is now highlighted as recommended`);
      return;
    }
    try {
      const updates = await Promise.all(
        packages
          .filter((plan) => plan.id)
          .map((plan) =>
            adminApi.updatePackage(plan.id!, {
              recommended: plan.id === planToHighlight.id,
            }),
          ),
      );
      setPackages((current) =>
        current.map(
          (plan) => updates.find((update) => update.package.id === plan.id)?.package ?? plan,
        ),
      );
      toast.success(`${planToHighlight.name} is now highlighted as recommended`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update recommendation");
    }
  }

  function openPackageEditor(plan: StoredPricingPackage) {
    setEditingPackage(plan);
    setDraftPackage({ ...plan });
  }

  async function savePackage() {
    if (!draftPackage) return;
    try {
      if (!draftPackage.id) {
        setPackages((current) =>
          current.map((plan) => (plan.name === editingPackage?.name ? draftPackage : plan)),
        );
      } else {
        const response = await adminApi.updatePackage(draftPackage.id, draftPackage);
        setPackages((current) =>
          current.map((plan) => (plan.id === draftPackage.id ? response.package : plan)),
        );
      }
      setEditingPackage(null);
      setDraftPackage(null);
      toast.success("Package updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update package");
    }
  }

  return (
    <SectionCard
      title="Pricing packages management"
      description="Edit names, pricing, audiences, features, add-ons, offers, and recommended package highlighting."
    >
      <div className="grid gap-4 xl:grid-cols-4">
        {packages.map((plan) => (
          <article
            key={plan.name}
            className={cn(
              "border bg-white p-5",
              plan.recommended ? "border-red-300 ring-2 ring-red-100" : "border-slate-200",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-black text-slate-950">{plan.name}</p>
                <p className="mt-1 text-2xl font-black text-royal">{plan.price}</p>
              </div>
              <Switch
                checked={plan.recommended}
                onCheckedChange={() => toggleRecommended(plan)}
                aria-label={`Toggle recommended state for ${plan.name}`}
              />
            </div>
            <p className="mt-4 min-h-20 text-sm leading-relaxed text-slate-600">{plan.audience}</p>
            <div className="mt-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                Features
              </p>
              <ul className="mt-2 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm font-semibold text-slate-700">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {plan.addons.map((addon) => (
                <span
                  key={addon}
                  className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600"
                >
                  {addon}
                </span>
              ))}
            </div>
            <Button
              type="button"
              onClick={() => openPackageEditor(plan)}
              className="mt-5 w-full rounded-md bg-slate-950 hover:bg-royal"
            >
              Edit package
            </Button>
          </article>
        ))}
      </div>
      <Dialog
        open={Boolean(editingPackage)}
        onOpenChange={(open) => !open && setEditingPackage(null)}
      >
        <DialogContent className="max-w-xl rounded-md">
          <DialogHeader>
            <DialogTitle>Edit package</DialogTitle>
            <DialogDescription>
              Update package name, price, offer label, and audience.
            </DialogDescription>
          </DialogHeader>
          {draftPackage ? (
            <div className="grid gap-4">
              <Input
                value={draftPackage.name}
                onChange={(event) =>
                  setDraftPackage((current) =>
                    current ? { ...current, name: event.target.value } : current,
                  )
                }
                className="rounded-md"
              />
              <Input
                value={draftPackage.price}
                onChange={(event) =>
                  setDraftPackage((current) =>
                    current ? { ...current, price: event.target.value } : current,
                  )
                }
                className="rounded-md"
              />
              <Input
                value={draftPackage.offer}
                onChange={(event) =>
                  setDraftPackage((current) =>
                    current ? { ...current, offer: event.target.value } : current,
                  )
                }
                className="rounded-md"
              />
              <Textarea
                value={draftPackage.audience}
                onChange={(event) =>
                  setDraftPackage((current) =>
                    current ? { ...current, audience: event.target.value } : current,
                  )
                }
                className="min-h-28 rounded-md"
              />
              <Button
                type="button"
                onClick={savePackage}
                className="rounded-md bg-slate-950 hover:bg-royal"
              >
                Save package
              </Button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </SectionCard>
  );
}

function ContentSection() {
  const [sections, setSections] = useState<StoredContentSection[]>(contentSections);
  const [heroDraft, setHeroDraft] = useState(defaultHeroDraft);

  useEffect(() => {
    adminApi
      .content()
      .then((response) => {
        setSections(response.sections);
        const hero = response.sections.find((section) => section.section === "Hero");
        if (hero) {
          setHeroDraft({
            title: hero.title ?? defaultHeroDraft.title,
            body: hero.body ?? defaultHeroDraft.body,
            cta: hero.cta ?? defaultHeroDraft.cta,
          });
        }
      })
      .catch(() => toast.error("Could not load content sections"));
  }, []);

  async function toggleContentStatus(sectionToUpdate: StoredContentSection) {
    const nextStatus = sectionToUpdate.status === "Live" ? "Draft" : "Live";
    if (!sectionToUpdate.id) {
      setSections((current) =>
        current.map((item) =>
          item.section === sectionToUpdate.section
            ? { ...item, status: nextStatus, updated: "Just now" }
            : item,
        ),
      );
      toast.success("Content status updated");
      return;
    }
    try {
      const response = await adminApi.updateContent(sectionToUpdate.id, { status: nextStatus });
      setSections((current) =>
        current.map((item) =>
          item.id === sectionToUpdate.id ? { ...item, ...response.section } : item,
        ),
      );
      toast.success("Content status updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update content");
    }
  }

  async function saveHeroDraft() {
    const hero = sections.find((item) => item.section === "Hero");
    if (!hero?.id) {
      setSections((current) =>
        current.map((item) =>
          item.section === "Hero"
            ? { ...item, status: "Review", updated: "Just now", ...heroDraft }
            : item,
        ),
      );
      toast.success("Homepage hero draft saved");
      return;
    }
    try {
      const response = await adminApi.updateContent(hero.id, { ...heroDraft, status: "Review" });
      setSections((current) =>
        current.map((item) =>
          item.id === hero.id ? { ...item, ...response.section, ...heroDraft } : item,
        ),
      );
      toast.success("Homepage hero draft saved");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save hero draft");
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
      <SectionCard
        title="Content management"
        description="Edit homepage sections, hero text, CTA buttons, testimonials, FAQs, blog posts, and SEO metadata."
      >
        <div className="grid gap-3">
          {sections.map((item) => (
            <div
              key={`${item.page}-${item.section}`}
              className="grid gap-3 border border-slate-200 p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center"
            >
              <div>
                <p className="font-black text-slate-950">{item.section}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {item.page} · Updated {item.updated} · {item.owner}
                </p>
              </div>
              <StatusBadge value={item.status} />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => toggleContentStatus(item)}
                className="w-fit rounded-md"
              >
                {item.status === "Live" ? "Move to draft" : "Mark live"}
              </Button>
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Homepage hero editor">
        <div className="space-y-4">
          <Input
            value={heroDraft.title}
            onChange={(event) =>
              setHeroDraft((current) => ({ ...current, title: event.target.value }))
            }
            className="rounded-md"
          />
          <Textarea
            value={heroDraft.body}
            onChange={(event) =>
              setHeroDraft((current) => ({ ...current, body: event.target.value }))
            }
            className="min-h-32 rounded-md"
          />
          <Input
            value={heroDraft.cta}
            onChange={(event) =>
              setHeroDraft((current) => ({ ...current, cta: event.target.value }))
            }
            className="rounded-md"
          />
          <Button
            type="button"
            onClick={saveHeroDraft}
            className="w-full rounded-md bg-slate-950 hover:bg-royal"
          >
            Save draft
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}

function MediaSection() {
  const [assets, setAssets] = useState<StoredMediaAsset[]>(mediaAssets);
  const [search, setSearch] = useState("");
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const filteredAssets = assets.filter((asset) =>
    [asset.name, asset.type, asset.usage]
      .join(" ")
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );

  useEffect(() => {
    adminApi
      .media()
      .then((response) => setAssets(response.assets))
      .catch(() => toast.error("Could not load media library"));
  }, []);

  async function handleUpload(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    try {
      const response = await adminApi.createMedia({
        name: file.name,
        type: file.type.includes("image") ? "Image" : "Screenshot",
        usage: "Uploaded from admin",
        size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
        url: "uploaded",
      });
      setAssets((current) => [response.asset, ...current]);
      toast.success(`${file.name} uploaded to media library`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not upload media");
    }
  }

  function replaceAsset(name: string) {
    setAssets((current) =>
      current.map((asset) =>
        asset.name === name
          ? { ...asset, usage: `${asset.usage} · replaced ${new Date().toLocaleTimeString()}` }
          : asset,
      ),
    );
    toast.success(`${name} marked as replaced`);
  }

  return (
    <SectionCard
      title="Media library"
      description="Upload, replace, and manage logos, banners, icons, service images, and project screenshots."
    >
      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto]">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="rounded-md"
          placeholder="Search media by filename, type, or usage"
        />
        <input
          ref={uploadInputRef}
          type="file"
          className="hidden"
          onChange={(event) => handleUpload(event.target.files)}
        />
        <Button
          type="button"
          onClick={() => uploadInputRef.current?.click()}
          className="rounded-md bg-slate-950 hover:bg-royal"
        >
          <Upload className="h-4 w-4" />
          Upload media
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredAssets.map((asset) => (
          <article key={asset.name} className="border border-slate-200 bg-white p-4">
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-100">
              {asset.url.startsWith("http") ? (
                <img src={asset.url} alt="" className="h-full w-full object-cover" />
              ) : (
                <GalleryHorizontalEnd className="h-10 w-10 text-slate-400" />
              )}
            </div>
            <p className="mt-4 font-black text-slate-950">{asset.name}</p>
            <p className="mt-1 text-sm text-slate-500">
              {asset.type} · {asset.size}
            </p>
            <p className="mt-2 text-xs font-semibold text-slate-500">{asset.usage}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => replaceAsset(asset.name)}
              className="mt-4 w-full rounded-md"
            >
              Replace
            </Button>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}

function MessagesSection() {
  const [messageRows, setMessageRows] = useState<Message[]>(messages);
  const [search, setSearch] = useState("");
  const [replyStatus, setReplyStatus] = useState("All statuses");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    adminApi
      .messages()
      .then((response) => setMessageRows(response.messages))
      .catch(() => toast.error("Could not load messages from the backend"));
  }, []);

  const filteredMessages = messageRows.filter((message) => {
    const matchesSearch = [message.name, message.subject, message.channel]
      .join(" ")
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesStatus = replyStatus === "All statuses" || message.status === replyStatus;
    return matchesSearch && matchesStatus;
  });

  function exportContacts() {
    const csv = [
      ["ID", "Name", "Subject", "Channel", "Status", "Received"],
      ...filteredMessages.map((message) => [
        message.id,
        message.name,
        message.subject,
        message.channel,
        message.status,
        message.received,
      ]),
    ]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "webmakers-contacts.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("Contacts exported");
  }

  async function markMessageReplied(message: Message) {
    try {
      const response = await adminApi.updateMessage(message.id, "Replied");
      setMessageRows((current) =>
        current.map((item) => (item.id === message.id ? response.message : item)),
      );
      setSelectedMessage(null);
      toast.success("Message marked as replied");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update message");
    }
  }

  return (
    <SectionCard
      title="Messages & contact forms"
      description="View submitted messages, search/filter contacts, track reply status, and export contacts."
    >
      <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="rounded-md"
          placeholder="Search messages"
        />
        <FilterSelect
          value={replyStatus}
          onChange={setReplyStatus}
          options={["All statuses", "Unread", "Replied", "Needs follow-up"]}
        />
        <Button type="button" variant="outline" onClick={exportContacts} className="rounded-md">
          Export contacts
        </Button>
      </div>
      <div className="grid gap-3">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className="grid gap-3 border border-slate-200 p-4 lg:grid-cols-[1fr_auto_auto] lg:items-center"
          >
            <div>
              <p className="font-black text-slate-950">{message.subject}</p>
              <p className="mt-1 text-sm text-slate-500">
                {message.name} · {message.channel} · {message.received}
              </p>
            </div>
            <StatusBadge value={message.status} />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSelectedMessage(message)}
              className="w-fit rounded-md"
            >
              Open
            </Button>
          </div>
        ))}
      </div>
      <Dialog
        open={Boolean(selectedMessage)}
        onOpenChange={(open) => !open && setSelectedMessage(null)}
      >
        <DialogContent className="rounded-md">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription>
              {selectedMessage?.name} · {selectedMessage?.channel} · {selectedMessage?.received}
            </DialogDescription>
          </DialogHeader>
          <p className="border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
            This message is ready for reply tracking. Connect email or CRM APIs here for production
            replies.
          </p>
          {selectedMessage ? (
            <Button
              type="button"
              onClick={() => markMessageReplied(selectedMessage)}
              className="rounded-md bg-slate-950 hover:bg-royal"
            >
              Mark as replied
            </Button>
          ) : null}
        </DialogContent>
      </Dialog>
    </SectionCard>
  );
}

function AnalyticsSection() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <SectionCard
        title="Analytics"
        description="Track page views, conversion rate, popular services, package requests, traffic sources, and monthly growth."
      >
        <PerformanceChart />
      </SectionCard>
      <SectionCard title="Traffic sources">
        <TrafficSourcesChart />
      </SectionCard>
      <SectionCard title="Conversion growth">
        <ConversionChart />
      </SectionCard>
      <SectionCard title="Popular services">
        <div className="grid gap-3">
          {popularServices.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between gap-4 border border-slate-200 px-4 py-3"
            >
              <div>
                <p className="font-black text-slate-950">{service.name}</p>
                <p className="text-sm text-slate-500">{service.leads} leads</p>
              </div>
              <span className="text-sm font-black text-emerald-700">{service.conversion}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function SecuritySection() {
  const [users, setUsers] = useState(adminUsers);
  const [controls, setControls] = useState([
    ["Password protection", true] as const,
    ["Secure admin routes", true] as const,
    ["Two-factor authentication", false] as const,
    ["Activity log retention", true] as const,
  ]);

  useEffect(() => {
    adminApi
      .users()
      .then((response) => setUsers(response.users))
      .catch(() => toast.error("Could not load admin users"));
  }, []);

  function toggleControl(label: string) {
    setControls((current) =>
      current.map(([itemLabel, enabled]) =>
        itemLabel === label ? ([itemLabel, !enabled] as const) : ([itemLabel, enabled] as const),
      ),
    );
    toast.success(`${label} updated`);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_24rem]">
      <SectionCard
        title="Admin users & role-based access"
        description="Manage super admin and editor users, route protection, and access status."
      >
        <div className="grid gap-3">
          {users.map((user) => (
            <div
              key={user.email}
              className="grid gap-3 border border-slate-200 p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-slate-100 font-black text-slate-700">
                    {user.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-black text-slate-950">{user.name}</p>
                  <p className="text-sm text-slate-500">
                    {user.email} · {user.lastActive}
                  </p>
                </div>
              </div>
              <span className="text-sm font-black text-slate-700">{user.role}</span>
              <StatusBadge value={user.status} />
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Security controls">
        <div className="space-y-4">
          {controls.map(([label, enabled]) => (
            <div
              key={String(label)}
              className="flex items-center justify-between gap-4 border border-slate-200 px-4 py-3"
            >
              <span className="text-sm font-bold text-slate-700">{label}</span>
              <Switch
                checked={Boolean(enabled)}
                onCheckedChange={() => toggleControl(label)}
                aria-label={`Toggle ${label}`}
              />
            </div>
          ))}
        </div>
        <EmptyPreview
          title="Backend auth active"
          text="Admin routes use signed HTTP-only cookies, role checks, rate limits, and database-backed activity logs."
        />
      </SectionCard>
    </div>
  );
}

function ActivityFeed() {
  const [items, setItems] = useState(activityLogs);

  useEffect(() => {
    adminApi
      .activity()
      .then((response) => setItems(response.activity.length ? response.activity : activityLogs))
      .catch(() => null);
  }, []);

  return (
    <div>
      <p className="text-sm font-black text-slate-950">Activity log</p>
      <div className="mt-3 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm text-slate-600">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-royal" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatProgress({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="font-bold text-slate-700">{label}</span>
        <span className="font-black text-slate-950">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function LeadDialog({ onAddLead }: { onAddLead: (lead: Lead) => Promise<void> | void }) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    packageInterest: pricingPackages[1].name,
    status: "New" as Lead["status"],
    note: "",
  });

  function updateField<K extends keyof typeof form>(field: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSave() {
    if (!form.name.trim() || !form.business.trim() || !form.phone.trim()) {
      toast.error("Add at least the client name, business, and phone");
      return;
    }

    setIsSaving(true);
    try {
      await onAddLead({
        id: `WM-${Date.now().toString().slice(-5)}`,
        name: form.name.trim(),
        business: form.business.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || "not provided",
        serviceType: serviceCategories[0].name,
        packageInterest: form.packageInterest,
        budget: "Needs review",
        source: "Manual admin entry",
        status: form.status,
        followUp: "Today",
        lastMessage: form.note.trim() || "Manual lead added from the admin dashboard.",
        notes: [form.note.trim() || "No note added yet."],
        createdAt: "Today",
      });
      setForm({
        name: "",
        business: "",
        phone: "",
        email: "",
        packageInterest: pricingPackages[1].name,
        status: "New",
        note: "",
      });
      setOpen(false);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="rounded-md bg-slate-950 hover:bg-royal">
          <Plus className="h-4 w-4" />
          Add lead
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl rounded-md">
        <DialogHeader>
          <DialogTitle>Add lead note</DialogTitle>
          <DialogDescription>
            Capture a new inquiry manually or add a note after a phone/WhatsApp conversation.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Client name"
            className="rounded-md"
          />
          <Input
            value={form.business}
            onChange={(event) => updateField("business", event.target.value)}
            placeholder="Business name"
            className="rounded-md"
          />
          <Input
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="Phone"
            className="rounded-md"
          />
          <Input
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="Email"
            className="rounded-md"
          />
          <FilterSelect
            value={form.packageInterest}
            onChange={(value) => updateField("packageInterest", value)}
            options={pricingPackages.map((plan) => plan.name)}
          />
          <FilterSelect
            value={form.status}
            onChange={(value) => updateField("status", value as Lead["status"])}
            options={["New", "Contacted", "Hot", "Closed", "Rejected"]}
          />
          <Textarea
            value={form.note}
            onChange={(event) => updateField("note", event.target.value)}
            placeholder="Lead notes and follow-up details"
            className="min-h-28 rounded-md sm:col-span-2"
          />
        </div>
        <Button
          type="button"
          onClick={handleSave}
          className="rounded-md bg-slate-950 hover:bg-royal"
        >
          {isSaving ? "Saving..." : "Save lead"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
