import type {
  AdminUser,
  Lead,
  MediaAsset,
  Message,
  PricingPackage,
  ServiceCategory,
} from "@/admin/data";

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

type PublicSubmission = {
  lead: Omit<Lead, "id" | "createdAt"> & { name: string };
  message: {
    name: string;
    phone?: string;
    email?: string;
    subject: string;
    body: string;
    channel: string;
    status?: Message["status"];
  };
};

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const payload = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) {
    throw new Error(payload.error ?? "Request failed");
  }

  return payload;
}

export const adminApi = {
  baseUrl: apiBaseUrl,
  login(email: string, password: string) {
    return apiRequest<{ admin: { id: string; name: string; email: string; role: string } }>(
      "/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      },
    );
  },
  logout() {
    return apiRequest<{ ok: true }>("/api/auth/logout", { method: "POST" });
  },
  me() {
    return apiRequest<{ admin: { id: string; name: string; email: string; role: string } }>(
      "/api/auth/me",
    );
  },
  submitPublic(payload: PublicSubmission) {
    return apiRequest<{ lead: Lead; message: Message }>("/api/public/submissions", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  dashboard() {
    return apiRequest<{
      metrics: Array<{ label: string; value: string; change: string; tone: string }>;
    }>("/api/admin/dashboard");
  },
  leads() {
    return apiRequest<{ leads: Lead[] }>("/api/admin/leads");
  },
  createLead(lead: Omit<Lead, "id" | "createdAt"> & { name: string }) {
    return apiRequest<{ lead: Lead }>("/api/admin/leads", {
      method: "POST",
      body: JSON.stringify(lead),
    });
  },
  updateLead(id: string, payload: Partial<Pick<Lead, "status" | "followUp" | "notes">>) {
    return apiRequest<{ lead: Lead }>(`/api/admin/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
  messages() {
    return apiRequest<{ messages: Message[] }>("/api/admin/messages");
  },
  updateMessage(id: string, status: Message["status"]) {
    return apiRequest<{ message: Message }>(`/api/admin/messages/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
  services() {
    return apiRequest<{ services: Array<ServiceCategory & { id: string }> }>("/api/admin/services");
  },
  createService(service: Omit<ServiceCategory, "inquiries">) {
    return apiRequest<{ service: ServiceCategory & { id: string } }>("/api/admin/services", {
      method: "POST",
      body: JSON.stringify({
        name: service.name,
        description: service.description,
        cta: service.cta,
        image: service.image,
        status: service.status,
      }),
    });
  },
  updateService(id: string, payload: Partial<ServiceCategory>) {
    return apiRequest<{ service: ServiceCategory & { id: string } }>(`/api/admin/services/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...payload,
        image: payload.image,
      }),
    });
  },
  deleteService(id: string) {
    return apiRequest<{ ok: true }>(`/api/admin/services/${id}`, { method: "DELETE" });
  },
  packages() {
    return apiRequest<{ packages: Array<PricingPackage & { id: string }> }>("/api/admin/packages");
  },
  updatePackage(id: string, payload: Partial<PricingPackage>) {
    return apiRequest<{ package: PricingPackage & { id: string } }>(`/api/admin/packages/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
  content() {
    return apiRequest<{
      sections: Array<{
        id: string;
        page: string;
        section: string;
        status: string;
        owner: string;
        updated: string;
        title?: string | null;
        body?: string | null;
        cta?: string | null;
      }>;
    }>("/api/admin/content");
  },
  updateContent(
    id: string,
    payload: { status?: string; title?: string; body?: string; cta?: string },
  ) {
    return apiRequest<{ section: { id: string; status: string; updated: string } }>(
      `/api/admin/content/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
    );
  },
  media() {
    return apiRequest<{ assets: Array<MediaAsset & { id: string }> }>("/api/admin/media");
  },
  createMedia(asset: MediaAsset) {
    return apiRequest<{ asset: MediaAsset & { id: string } }>("/api/admin/media", {
      method: "POST",
      body: JSON.stringify(asset),
    });
  },
  activity() {
    return apiRequest<{ activity: string[] }>("/api/admin/activity");
  },
  users() {
    return apiRequest<{ users: AdminUser[] }>("/api/admin/users");
  },
};
