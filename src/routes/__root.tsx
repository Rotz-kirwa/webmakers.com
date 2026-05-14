import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

import appCss from "../styles.css?url";

const brandIconUrl = "https://i.pinimg.com/736x/81/40/98/8140989107d15a1f470898d319e2e112.jpg";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "WebMakers — Premium Websites for Every Business" },
      {
        name: "description",
        content:
          "WebMakers builds premium websites, e-commerce stores, booking systems, dashboards, and business platforms that help brands look professional and get more clients.",
      },
      { name: "keywords", content: "website design, web development, e-commerce, booking system, business website, website builder, professional website, Kenya website, SEO services, digital marketing" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { name: "author", content: "WebMakers" },
      { name: "themeColor", content: "#1d4ed8" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { property: "og:title", content: "WebMakers — Premium Websites for Every Business" },
      {
        property: "og:description",
        content:
          "Professional website design, admin dashboards, lead capture, payments, bookings, SEO, and digital systems for serious businesses.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://webmakers.com" },
      { property: "og:site_name", content: "WebMakers" },
      { property: "og:image", content: "https://webmakers.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "WebMakers — Premium Websites for Every Business" },
      {
        name: "twitter:description",
        content:
          "Premium websites and digital systems for businesses that want to look serious online.",
      },
      { name: "twitter:image", content: "https://webmakers.com/og-image.png" },
      { name: "format-detection", content: "telephone=no" },
      { property: "business:contact_data:street_address", content: "Kenya" },
      { property: "business:contact_data:locality", content: "Kenya" },
      { property: "business:contact_data:postal_code", content: "" },
      { property: "business:contact_data:country_name", content: "Kenya" },
    ],
    links: [
      { rel: "canonical", href: "https://webmakers.com" },
      { rel: "icon", href: brandIconUrl },
      { rel: "shortcut icon", href: brandIconUrl },
      { rel: "apple-touch-icon", href: brandIconUrl },
      { rel: "alternate", hrefLang: "en", href: "https://webmakers.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "WebMakers",
          url: "https://webmakers.com",
          logo: brandIconUrl,
          description: "Premium websites and digital systems for businesses that want to look serious online.",
          sameAs: [
            "https://facebook.com/webmakers",
            "https://instagram.com/webmakers",
            "https://twitter.com/webmakers",
            "https://linkedin.com/company/webmakers",
          ],
          contact: {
            "@type": "ContactPoint",
            telephone: "+254-747-096321",
            contactType: "Customer Service",
          },
          areaServed: "KE",
          priceRange: "KSh 15000 - 200000",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      {isAdminRoute ? null : <WhatsAppFloat />}
    </QueryClientProvider>
  );
}
