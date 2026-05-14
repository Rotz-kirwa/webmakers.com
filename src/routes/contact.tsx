import { type ReactNode, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { adminApi } from "@/admin/api";

const websiteTypes = [
  "Business website",
  "E-commerce store",
  "Booking website",
  "Real estate website",
  "Restaurant website",
  "School or training website",
  "Portfolio website",
  "Not sure yet",
];

const budgetRanges = [
  "KSh 15,000 - 30,000",
  "KSh 30,000 - 50,000",
  "KSh 50,000+",
  "Enterprise: KSh 100,000 - 200,000",
  "I need guidance",
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact WebMakers - Get Your Website Project Started" },
      {
        name: "description",
        content:
          "Contact WebMakers today. Talk to our team about your business website, e-commerce store, booking system, SEO, or website redesign. Get a custom quote for your project.",
      },
      { name: "keywords", content: "contact WebMakers, website inquiry, web design quote, get website built, business website cost, website design consultation" },
      { property: "og:title", content: "Contact WebMakers - Website Design Inquiry" },
      {
        property: "og:description",
        content: "Share your project details and get a personalized website plan that fits your business goals and budget.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://webmakers.com/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://webmakers.com/contact" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact WebMakers",
          url: "https://webmakers.com/contact",
          description: "Contact form for website design and development inquiries",
          mainEntity: {
            "@type": "LocalBusiness",
            name: "WebMakers",
            telephone: "+254-747-096321",
            email: "hello@webmakers.com",
            areaServed: "KE",
          },
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    business: "",
    websiteType: websiteTypes[0],
    budget: budgetRanges[0],
    message: "",
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit() {
    const now = new Date();
    const business = form.business.trim() || "Unnamed business";
    const messageText = form.message.trim() || "No project details added.";

    setIsSubmitting(true);
    setSubmitError("");
    try {
      await adminApi.submitPublic({
        lead: {
          name: form.name.trim() || "Website visitor",
          business,
          phone: form.phone.trim(),
          email: form.email.trim() || "not provided",
          serviceType: form.websiteType,
          packageInterest: form.budget.includes("15,000")
            ? "Starter Website"
            : form.budget.includes("30,000")
              ? "Business Website"
              : form.budget.includes("100,000")
                ? "Enterprise Website"
                : "Premium Website",
          budget: form.budget,
          source: "Contact form",
          status: "New",
          followUp: "Today",
          lastMessage: messageText,
          notes: [`Submitted from public contact page on ${now.toLocaleString()}`],
        },
        message: {
          name: form.name.trim() || "Website visitor",
          phone: form.phone.trim(),
          email: form.email.trim(),
          subject: `${form.websiteType} inquiry from ${business}`,
          body: messageText,
          channel: "Contact form",
          status: "Unread",
        },
      });
      setSubmitted(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        business: "",
        websiteType: websiteTypes[0],
        budget: budgetRanges[0],
        message: "",
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not submit your project.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="absolute inset-0 grid-bg opacity-60" />
          <div className="container-x relative grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <div>
              <span className="eyebrow">Contact WebMakers</span>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">
                Tell Us What You Want Your Website To Do
              </h1>

              <form
                className="card-elevated mt-8 p-6 sm:p-8"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
              >
                <div>
                  <h2 className="text-2xl font-bold">Start Your Project</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fill this in and it will go directly to the WebMakers admin dashboard.
                  </p>
                </div>

                {submitted ? (
                  <div className="mt-5 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold leading-relaxed text-emerald-800">
                    Your project details have been received. The WebMakers team can now review them
                    in the admin dashboard.
                  </div>
                ) : null}
                {submitError ? (
                  <div className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-relaxed text-red-700">
                    {submitError}
                  </div>
                ) : null}

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Your name">
                    <Input
                      required
                      value={form.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      placeholder="algoking doe"
                      className="h-11 bg-white"
                    />
                  </Field>
                  <Field label="Phone number">
                    <Input
                      required
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      placeholder="+254..."
                      className="h-11 bg-white"
                    />
                  </Field>
                  <Field label="Email address">
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      placeholder="you@example.com"
                      className="h-11 bg-white"
                    />
                  </Field>
                  <Field label="Business name">
                    <Input
                      value={form.business}
                      onChange={(event) => updateField("business", event.target.value)}
                      placeholder="Your business"
                      className="h-11 bg-white"
                    />
                  </Field>
                  <Field label="Website type">
                    <select
                      value={form.websiteType}
                      onChange={(event) => updateField("websiteType", event.target.value)}
                      className="h-11 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {websiteTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Budget range">
                    <select
                      value={form.budget}
                      onChange={(event) => updateField("budget", event.target.value)}
                      className="h-11 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {budgetRanges.map((range) => (
                        <option key={range}>{range}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Project details" className="mt-4">
                  <Textarea
                    value={form.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    placeholder="Tell us what pages, features, or goals you have in mind."
                    className="min-h-32 resize-none bg-white"
                  />
                </Field>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 h-12 w-full rounded-xl text-base"
                >
                  {isSubmitting ? "Sending..." : "Send Project Details"}{" "}
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>

            <div className="self-center lg:pl-8 xl:pl-12">
              <p className="max-w-xl text-lg text-muted-foreground">
                Share a few details about your business and we will help you choose the right
                package, features, and launch plan.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <ContactCard icon={Phone} label="Call" value="+254 747 096321" />
                <ContactCard icon={Mail} label="Email" value="hello@webmakers.com" />
                <ContactCard icon={Clock} label="Response time" value="Within 1 minute" />
                <ContactCard icon={MapPin} label="Location" value="Nairobi, Kenya & remotely" />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:hello@webmakers.com" className="btn-ghost">
                  Email Us <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="container-x py-20">
          <div className="grid gap-6 md:grid-cols-3">
            <InfoPanel
              icon={CalendarCheck}
              title="Book a quick consult"
              text="We review your goals, recommend the right site type, and explain the fastest path to launch."
            />
            <InfoPanel
              icon={MessageCircle}
              title="Send content easily"
              text="Share your logo, photos, services, prices, and business details through the project form or email."
            />
            <InfoPanel
              icon={ArrowRight}
              title="Get a clear next step"
              text="You will know the package, timeline, and add-ons that make sense for your business."
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-navy">{label}</span>
      {children}
    </label>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white/75 p-4 shadow-soft backdrop-blur">
      <Icon className="h-5 w-5" style={{ color: "var(--royal)" }} />
      <p className="mt-3 text-xs font-bold uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold text-navy">{value}</p>
    </div>
  );
}

function InfoPanel({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Phone;
  title: string;
  text: string;
}) {
  return (
    <article className="card-elevated p-7">
      <span
        className="grid h-11 w-11 place-items-center rounded-xl text-white"
        style={{ background: "var(--gradient-royal)" }}
      >
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="mt-5 text-lg font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </article>
  );
}
