# WebMakers End-to-End Submission Flow Diagram

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PUBLIC WEBSITE (Frontend)                            │
│                      http://localhost:8080 (dev)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────┐      ┌──────────────────────────┐            │
│  │   Contact Form           │      │  Project Planner Form    │            │
│  │ (src/routes/contact)     │      │ (describe-your-idea)     │            │
│  │                          │      │                          │            │
│  │ • Name (required)        │      │ • Business Name          │            │
│  │ • Phone (required)       │      │ • Industry               │            │
│  │ • Email (optional)       │      │ • Project Type (12+)     │            │
│  │ • Business Name          │      │ • Features (checkboxes)  │            │
│  │ • Website Type           │      │ • Design Style           │            │
│  │ • Budget Range           │      │ • Budget Level           │            │
│  │ • Message                │      │ • Timeline               │            │
│  │                          │      │ • Vision & Goals         │            │
│  └──────────────┬───────────┘      └──────────────┬──────────┘            │
│                 │                                 │                        │
│                 └──────────────────┬──────────────┘                        │
│                                    ↓                                       │
│                    adminApi.submitPublic({                                 │
│                        lead: { ... },                                      │
│                        message: { ... }                                    │
│                    })                                                      │
│                                    │                                       │
└────────────────────────────────────┼───────────────────────────────────────┘
                                     │
                                     │ HTTP POST
                                     │
                                     ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                        BACKEND API (Server)                                  │
│                   http://localhost:4000 (dev)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                     POST /api/public/submissions                             │
│                   (backend/src/server.js:209)                               │
│                                                                              │
│  1. Validate Request                                                         │
│     └─ publicSubmissionSchema (Zod)                                         │
│                                                                              │
│  2. Start Database Transaction                                              │
│     ├─ INSERT INTO leads (...)                                              │
│     │  └─ client_name, business, phone, email, service_type,               │
│     │     package_interest, budget, source, status, follow_up,             │
│     │     last_message, notes, created_at                                   │
│     │                                                                       │
│     └─ INSERT INTO messages (...)                                           │
│        └─ sender_name, phone, email, subject, body, channel,               │
│           status, created_at                                                │
│                                                                              │
│  3. Commit Transaction (Atomicity)                                          │
│                                                                              │
│  4. Return Response (201 Created)                                            │
│     └─ { lead: {...}, message: {...} }                                     │
│                                                                              │
└────────────────────────────────────┬───────────────────────────────────────┘
                                     │
                                     ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                     DATABASE (PostgreSQL)                                    │
│                  postgres://...@localhost:5433                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────┐   ┌─────────────────────────────┐       │
│  │      leads table             │   │    messages table           │       │
│  ├──────────────────────────────┤   ├─────────────────────────────┤       │
│  │ id (UUID)                    │   │ id (UUID)                   │       │
│  │ client_name                  │   │ sender_name                 │       │
│  │ business                     │   │ email                       │       │
│  │ phone                        │   │ subject                     │       │
│  │ email                        │   │ body                        │       │
│  │ service_type                 │   │ channel                     │       │
│  │ package_interest             │   │ status                      │       │
│  │ budget                       │   │ created_at                  │       │
│  │ source                       │   │ updated_at                  │       │
│  │ status (New|Hot|...)         │   │                             │       │
│  │ follow_up                    │   │ ✅ Records from:            │       │
│  │ last_message                 │   │ - Contact Form              │       │
│  │ notes (JSONB)                │   │ - Project Planner           │       │
│  │ created_at                   │   └─────────────────────────────┘       │
│  │ updated_at                   │                                          │
│  │                              │                                          │
│  │ ✅ Records from:             │                                          │
│  │ - Contact Form               │                                          │
│  │ - Project Planner            │                                          │
│  │ - Admin Manual Entry         │                                          │
│  └──────────────────────────────┘                                          │
│                                                                              │
│  ✅ Migrations: backend/migrations/001_init.sql                             │
│  ✅ Schema validated and created on startup                                 │
│                                                                              │
└────────────────────────────────────┬───────────────────────────────────────┘
                                     │
                                     │ Admin queries
                                     │
                                     ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ADMIN DASHBOARD (Frontend)                              │
│                     http://localhost:8080/admin                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ GET /api/admin/leads                                                │   │
│  │ ├─ Fetches all leads from database                                  │   │
│  │ └─ Displays in LeadTable component                                  │   │
│  │                                                                     │   │
│  │ ┌──────────────────────────────────────┐                            │   │
│  │ │ LEADS TABLE (LeadTable.tsx)          │                            │   │
│  │ ├──────────────────────────────────────┤                            │   │
│  │ │ ID    │ Name     │ Business │ Status │                            │   │
│  │ ├──────────────────────────────────────┤                            │   │
│  │ │WM-XXX │ John Doe │ ABC Co   │ New    │ ← From Contact Form        │   │
│  │ │WM-XXX │ Jane     │ XYZ Ltd  │ Hot    │ ← From Project Planner     │   │
│  │ │       │          │          │        │ ← From any source          │   │
│  │ │ [Edit Status] [Add Notes] [Mark Done]│                            │   │
│  │ └──────────────────────────────────────┘                            │   │
│  │                                                                     │   │
│  │ ACTIONS AVAILABLE:                                                 │   │
│  │ • Update Status (New → Contacted → Hot → Closed/Rejected)          │   │
│  │ • Set Follow-up (Today, Tomorrow, This week, Waiting, Done)        │   │
│  │ • Add/Edit Notes (JSONB array for tracking)                        │   │
│  │ • View Project Details & Vision                                    │   │
│  │ • Track Source (Contact Form vs Project Planner)                   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ GET /api/admin/messages                                             │   │
│  │ ├─ Fetches all messages from database                               │   │
│  │ └─ Displays in Messages section                                     │   │
│  │                                                                     │   │
│  │ ┌──────────────────────────────────────┐                            │   │
│  │ │ MESSAGES TABLE                       │                            │   │
│  │ ├──────────────────────────────────────┤                            │   │
│  │ │ From    │ Subject  │ Channel │Status │                            │   │
│  │ ├──────────────────────────────────────┤                            │   │
│  │ │ John    │ Website  │ Contact │Unread │ ← From Contact Form        │   │
│  │ │ Jane    │ E-com    │ Planner │Reply  │ ← From Project Planner     │   │
│  │ │         │ Inquiry  │Form     │eded   │                            │   │
│  │ │ [Mark: Unread] [Replied] [Follow-up]│                            │   │
│  │ └──────────────────────────────────────┘                            │   │
│  │                                                                     │   │
│  │ ACTIONS AVAILABLE:                                                 │   │
│  │ • Update Status (Unread → Replied → Needs follow-up)               │   │
│  │ • View Full Message Body & Sender Info                             │   │
│  │ • Filter by Channel (Contact Form vs Project Planner)              │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  DASHBOARD METRICS:                                                         │
│  ✅ Total Leads (count from leads table)                                   │
│  ✅ New Inquiries (status = 'New')                                         │
│  ✅ Package Requests (package_interest IS NOT NULL)                        │
│  ✅ Contact Submissions (count from messages table)                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Examples

### Example 1: Contact Form Submission

```
User fills contact form with:
├─ Name: "Mary Wanjiru"
├─ Phone: "+254 712 440 912"
├─ Email: "mary@clinic.ke"
├─ Business: "GlowCare Clinic"
├─ Website Type: "Clinics & Healthcare"
├─ Budget: "KSh 30,000 - 50,000"
└─ Message: "Need appointment booking and doctor profiles"

↓ Submission

adminApi.submitPublic({
  lead: {
    name: "Mary Wanjiru",
    business: "GlowCare Clinic",
    phone: "+254 712 440 912",
    email: "mary@clinic.ke",
    serviceType: "Clinics & Healthcare",
    packageInterest: "Business Website",
    budget: "KSh 30,000 - 50,000",
    source: "Contact form",
    status: "New",
    followUp: "Today",
    lastMessage: "Need appointment booking and doctor profiles",
    notes: ["Submitted from public contact page on May 14, 2026 10:30:45"]
  },
  message: {
    name: "Mary Wanjiru",
    phone: "+254 712 440 912",
    email: "mary@clinic.ke",
    subject: "Clinics & Healthcare inquiry from GlowCare Clinic",
    body: "Need appointment booking and doctor profiles",
    channel: "Contact form",
    status: "Unread"
  }
})

↓ POST /api/public/submissions (Rate limited: 30/15min)

↓ Database Transaction:
  INSERT INTO leads (...)
  INSERT INTO messages (...)

↓ Response: 201 Created

↓ Admin sees in Leads table:
  WM-1234 | Mary Wanjiru | GlowCare Clinic | New | Contact Form
  
  Can now:
  - Update Status to "Hot"
  - Set Follow-up to "Today"
  - Add Notes: "Call to confirm requirements"
  - See that she needs appointment booking
```

### Example 2: Project Planner Submission

```
User completes multi-step project planner:
├─ Business Name: "Nairobi Auto Hub"
├─ Industry: "Automotive"
├─ Phone: "+254 798 201 443"
├─ Email: "brian@autohub.ke"
├─ Project Type: "Custom System"
├─ Selected Features: [M-Pesa, Admin Dashboard, Inventory Management]
├─ Design Style: "Corporate"
├─ Budget: "Enterprise"
├─ Timeline: "2-4 weeks"
└─ Vision: "Complete inventory & sales tracking for dealership"
   Goals: "Need real-time reports and online sales"

↓ Submission

adminApi.submitPublic({
  lead: {
    name: "Nairobi Auto Hub",
    business: "Nairobi Auto Hub",
    phone: "+254 798 201 443",
    email: "brian@autohub.ke",
    serviceType: "Custom System",
    packageInterest: "Enterprise",
    budget: "Enterprise",
    source: "Project planner",
    status: "New",
    followUp: "Today",
    lastMessage: "Complete inventory & sales tracking for dealership. Goals: Need real-time reports and online sales",
    notes: [
      "Industry: Automotive",
      "Features: M-Pesa Integration, Admin Dashboard, Inventory Management",
      "Style: Corporate. Timeline: 2-4 weeks. Submitted May 14, 2026 2:45:30 PM"
    ]
  },
  message: {
    name: "Nairobi Auto Hub",
    phone: "+254 798 201 443",
    email: "brian@autohub.ke",
    subject: "Custom System project planner submission",
    body: "Complete inventory & sales tracking for dealership\n\nGoals: Need real-time reports and online sales",
    channel: "Project planner",
    status: "Unread"
  }
})

↓ POST /api/public/submissions

↓ Database Transaction:
  INSERT INTO leads (...)
  INSERT INTO messages (...)

↓ Response: 201 Created

↓ Admin sees in Leads table:
  WM-5678 | Nairobi Auto Hub | Nairobi Auto Hub | New | Project Planner
  
  Can expand notes to see:
  - Industry: Automotive
  - Features: M-Pesa, Admin Dashboard, Inventory
  - Design: Corporate
  - Timeline: 2-4 weeks
  
  Can now:
  - Mark as "Hot" (enterprise opportunity)
  - Schedule "Strategy call"
  - Add note: "Discuss vehicle listing import process"
  - See full vision in lastMessage field
```

---

## Integration Checklist

### ✅ Frontend to Backend
- [x] Contact form calls `adminApi.submitPublic()`
- [x] Project planner calls `adminApi.submitPublic()`
- [x] Both use same `/api/public/submissions` endpoint
- [x] Request validation in backend with Zod
- [x] CORS configured for frontend origins
- [x] Rate limiting: 30 requests per 15 minutes

### ✅ Backend to Database
- [x] Database schema created (migrations: 001_init.sql)
- [x] leads table exists with all required columns
- [x] messages table exists with all required columns
- [x] Transaction ensures atomicity (both or nothing)
- [x] Timestamps auto-generated
- [x] Status enums validated

### ✅ Database to Admin
- [x] GET /api/admin/leads retrieves all leads
- [x] GET /api/admin/messages retrieves all messages
- [x] Admin dashboard displays Leads table
- [x] Admin dashboard displays Messages section
- [x] Can filter, sort, and manage submissions
- [x] Can update status and notes
- [x] Authentication required for admin queries

### ✅ Error Handling
- [x] Frontend: try-catch on form submissions
- [x] Frontend: success/error notifications
- [x] Backend: Zod schema validation
- [x] Backend: 400 errors for invalid data
- [x] Backend: 500 errors for server issues
- [x] Backend: transaction rollback on failure

---

## Endpoints Summary

| Endpoint | Method | Auth | Rate Limit | Purpose |
|----------|--------|------|-----------|---------|
| `/api/public/submissions` | POST | None | 30/15min | Public form submissions |
| `/api/admin/leads` | GET | Required | - | Get all leads |
| `/api/admin/leads/:id` | PATCH | Required | - | Update lead |
| `/api/admin/messages` | GET | Required | - | Get all messages |
| `/api/admin/messages/:id` | PATCH | Required | - | Update message status |

---

## Status: ✅ PRODUCTION READY

All submission flows are:
- ✅ Properly integrated
- ✅ Route to correct endpoints
- ✅ Store data in database
- ✅ Display in admin dashboard
- ✅ Have proper error handling
- ✅ Use secure authentication
- ✅ Rate-limited and CORS-protected
