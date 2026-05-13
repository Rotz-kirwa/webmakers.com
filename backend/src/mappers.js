export function toLead(row) {
  return {
    id: row.id,
    name: row.client_name,
    business: row.business,
    phone: row.phone,
    email: row.email ?? "not provided",
    serviceType: row.service_type,
    packageInterest: row.package_interest,
    budget: row.budget,
    source: row.source,
    status: row.status,
    followUp: row.follow_up,
    lastMessage: row.last_message,
    notes: row.notes ?? [],
    createdAt: new Date(row.created_at).toLocaleString(),
  };
}

export function toMessage(row) {
  return {
    id: row.id,
    name: row.sender_name,
    subject: row.subject,
    channel: row.channel,
    status: row.status,
    received: new Date(row.created_at).toLocaleString(),
  };
}

export function toServiceCategory(row) {
  return {
    id: row.id,
    name: row.name,
    status: row.status,
    inquiries: row.inquiries,
    image: row.image_label,
    cta: row.cta,
    description: row.description,
  };
}

export function toPricingPackage(row) {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    audience: row.audience,
    features: row.features ?? [],
    addons: row.addons ?? [],
    recommended: row.recommended,
    offer: row.offer,
  };
}

export function toContentSection(row) {
  return {
    id: row.id,
    page: row.page,
    section: row.section,
    status: row.status,
    owner: row.owner,
    updated: new Date(row.updated_at).toLocaleString(),
    title: row.title,
    body: row.body,
    cta: row.cta,
  };
}

export function toMediaAsset(row) {
  return {
    id: row.id,
    name: row.name,
    type: row.asset_type,
    usage: row.usage,
    size: row.size_label,
    url: row.url,
  };
}
