# MediCare — Clinic & Lab Management SaaS Landing Page

The official marketing website for **MediCare**, a modern SaaS platform designed for **clinics, hospitals, and medical centers** to manage appointments, patients, lab reports, and internal workflows.

This repository contains the **public-facing landing page** used to present the MediCare platform, explain its features, showcase pricing, and collect demo requests from potential customers.

The landing page focuses on **clear product communication, conversion-focused design, and responsive user experience** suitable for healthcare SaaS marketing.

---

# 🌐 About MediCare

**MediCare** is a cloud-based SaaS platform that helps clinics and hospitals manage:

* patient appointments
* doctor workflows
* lab reports and prescriptions
* multi-role access control
* department-based operations

The platform is designed to simplify clinic operations while maintaining **secure access to sensitive patient data**.

One of its core capabilities is the ability to generate **PDF prescriptions and lab reports with embedded QR codes**, allowing patients to instantly access their reports without installing an application.

---

# 🚀 Landing Page Features

The landing page showcases the MediCare platform and helps convert visitors into customers.

### Product Presentation

* SaaS-style hero section
* feature showcase
* dashboard workflow explanations
* visual product highlights

### Marketing Sections

* platform capabilities
* step-by-step onboarding process
* pricing plans
* customer testimonials

### Lead Generation

* contact form for demo requests
* API-based form submission
* real-time success notifications

### UI & Experience

* fully responsive layout
* mobile navigation drawer
* smooth scrolling
* animated section transitions

---

# 🧠 Platform Capabilities Highlighted

The landing page communicates the primary features of the MediCare system.

### Multi-Role Access

Receptionists, doctors, and administrators each receive **role-based dashboards** with only the information they need.

### Smart Appointment Booking

Receptionists can create detailed appointment records while doctors see **live department queues**.

### Patient History Search

Search across the entire patient database by **name, department, or date**.

### QR-Linked Reports

PDF prescriptions and lab reports automatically include a **secure QR code** for instant patient access.

### Flexible Time Tracking

Receptionists can update patient **time-in and time-out records** at any stage of the appointment workflow.

### Department-Based Workflows

Each department operates independently, ensuring doctors only see **relevant appointments and lab orders**.

---

# 🛠 Tech Stack

The landing page is built with a modern React ecosystem.

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### UI System

* shadcn/ui
* Lucide React Icons
* Sonner (toast notifications)

### Other

* IntersectionObserver animations
* responsive design patterns
* API integration for contact form

---

# 📂 Project Structure

```
src
 ├ components
 │   └ ui                # shadcn UI components
 │
 ├ App.tsx               # Main landing page
 ├ main.tsx              # React entry point
 │
public
 └ assets                # icons, images, favicon

index.html
```

---

# ⚙️ Local Development

Clone the repository:

```
git clone https://github.com/yourusername/medicare-landing-page.git
```

Move into the project directory:

```
cd medicare-landing-page
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

The project will start at:

```
http://localhost:5173
```

---

# 📬 Contact / Demo Request API

The landing page includes a **contact form** where clinics can request a demo.

The form sends a request to:

```
POST /api/send-email
```

Example request payload:

```json
{
  "name": "Dr. Sarah Mitchell",
  "clinic": "City Health Clinic",
  "email": "sarah@cityclinic.com",
  "phone": "+1 555 000 0000",
  "message": "Interested in seeing how MediCare can help our clinic."
}
```

Expected response:

```json
{
  "success": true
}
```

On success:

* a toast notification appears
* the form resets automatically

---

# 🎯 Purpose of This Repository

This repository contains **only the public marketing interface** of the MediCare platform.

Its responsibilities include:

* presenting the product
* explaining platform features
* communicating pricing
* collecting demo leads

The **actual SaaS dashboard application** is maintained in a separate private repository.

---

# 🔐 Commercial Product Notice

**MediCare is a commercial SaaS product.**

The code in this repository represents the **official landing page** used to promote the platform.

Unauthorized reproduction, resale, or redistribution of the MediCare branding or platform is not permitted.

---

# 📄 License

© 2026 MediCare. All rights reserved.
