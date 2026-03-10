import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
  HeartPulse,
  Menu,
  Star,
  Check,
  Users,
  CalendarCheck,
  Clock,
  LayoutGrid,
  Search,
  QrCode,
  ChevronRight,
  ShieldCheck,
  Building2,
  TrendingUp,
  MapPin,
  ArrowRight,
} from "lucide-react"
import { Toaster } from "sonner"
import { toast } from "sonner"

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Features", href: "#Features" },
  { label: "How It Works", href: "#How It Works" },
  { label: "Pricing", href: "#Pricing" },
  { label: "FAQ", href: "#FAQ" },
  { label: "Contact", href: "#Contact Us" },
]

const STATS = [
  { value: "50+", label: "Clinics Onboarded", icon: Building2 },
  { value: "100K+", label: "Appointments Managed", icon: CalendarCheck },
  { value: "99.9%", label: "Uptime Guaranteed", icon: TrendingUp },
  { value: "15+", label: "Cities Served", icon: MapPin },
]

const FEATURES = [
  {
    icon: Users,
    title: "Multi-Role Access",
    desc: "Assign receptionists and doctors each with secure, role-based access — every team member sees exactly what they need.",
  },
  {
    icon: CalendarCheck,
    title: "Smart Appointment Booking",
    desc: "Receptionists create detailed appointment forms while doctors see only their department's queue in real time.",
  },
  {
    icon: Search,
    title: "Patient History & Search",
    desc: "Instantly retrieve full appointment history. Search by name, date, or department across your entire patient database.",
  },
  {
    icon: QrCode,
    title: "PDF Prescriptions & Lab Reports",
    desc: "Generate prescription and lab PDFs with embedded QR codes so patients can access their reports anytime, no app needed.",
  },
  {
    icon: Clock,
    title: "Flexible Time Tracking",
    desc: "Update patient time-in and time-out at any point, regardless of appointment status — full control, always.",
  },
  {
    icon: LayoutGrid,
    title: "Department-Wise Workflow",
    desc: "Organized by department — each doctor sees only their relevant appointments and lab orders for a focused experience.",
  },
]

const STEPS = [
  {
    num: "01",
    title: "Purchase & Onboard",
    desc: "Buy MediCare and receive your admin credentials instantly via email. Zero waiting, zero setup calls required.",
  },
  {
    num: "02",
    title: "Set Up Your Clinic",
    desc: "Add doctors, receptionists, and departments in minutes using our intuitive admin dashboard.",
  },
  {
    num: "03",
    title: "Go Live",
    desc: "Start booking appointments, managing labs, and generating professional PDF reports from day one.",
  },
]

const PLANS = [
  {
    name: "Starter",
    monthly: 49,
    annual: 39,
    desc: "Perfect for small, single-location practices.",
    features: [
      "1 clinic location",
      "Up to 3 doctors",
      "2 receptionists",
      "Appointment management",
      "Patient history search",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    monthly: 99,
    annual: 79,
    desc: "Everything growing clinics need, all in one plan.",
    features: [
      "3 clinic locations",
      "Unlimited doctors",
      "Unlimited receptionists",
      "PDF prescriptions & lab reports",
      "QR code patient access",
      "Department-wise workflows",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: null,
    annual: null,
    desc: "Custom solutions for large hospital networks.",
    features: [
      "Unlimited locations",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantees",
      "On-site onboarding",
      "24/7 support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const TESTIMONIALS = [
  {
    avatar: "https://i.pravatar.cc/80?img=1",
    name: "Dr. Ralph Feiness",
    role: "Head of Internal Medicine, Aga Khan Clinic",
    quote:
      "MediCare transformed how our department operates. The QR-enabled lab reports mean patients call us less — they simply scan and view their results. Brilliant.",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=5",
    name: "Dr. Aisha Khan",
    role: "Clinic Administrator, City Health Center",
    quote:
      "Onboarding took under an hour. Our receptionists loved the appointment forms and the ability to update patient times on the fly without any restrictions.",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=12",
    name: "Dr. Cooper Fens",
    role: "Cardiologist, Stevens Medical Complex",
    quote:
      "Department-wise filtering is a game changer. I only see my patients, my lab orders. No noise. MediCare keeps me focused on what actually matters.",
  },
]

const FAQS = [
  {
    q: "How does the onboarding process work?",
    a: "Once you purchase MediCare, we instantly provision your admin account and send credentials to your registered email. From there you can log in and start adding departments, doctors, and receptionists within minutes — no calls, no waiting.",
  },
  {
    q: "Can multiple doctors use the system simultaneously?",
    a: "Absolutely. MediCare is built for concurrent multi-user access. Each doctor logs in with their own credentials and sees only their department's appointments and lab orders in real time.",
  },
  {
    q: "How does the QR code on lab reports work?",
    a: "When a doctor generates a PDF lab report or prescription, we embed a unique QR code linking to a secure hosted version of that report. Patients simply scan the QR code with any smartphone camera to view their report — no app download required.",
  },
  {
    q: "Can receptionists and doctors use the system at the same time?",
    a: "Yes. Receptionists and doctors have separate dashboards with role-specific views. Receptionists manage appointments and patient intake; doctors see their queue and generate reports — all simultaneously without conflicts.",
  },
  {
    q: "Is patient data secure?",
    a: "MediCare is built with security as a foundation. All data is encrypted in transit and at rest. We follow HIPAA-aligned best practices for data handling, access control, and audit logging to protect sensitive patient information.",
  },
  {
    q: "Can I update appointment times after the patient has been seen?",
    a: "Yes. Our flexible time tracking feature lets receptionists update patient time-in and time-out at any point, regardless of the appointment's current status — giving you full control over your records.",
  },
]

const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "How It Works", "FAQ"],
  Company: ["Contact Us", "Product Stats", "Testimonials"],
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#E2E8F0] bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DC2626]">
            <HeartPulse className="h-5 w-5 text-white" />
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#7F1D1D]">
            MediCare
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-[#64748B] transition-colors hover:text-[#7F1D1D]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center md:flex">
          <a href="#Contact Us">
            <Button className="cursor-pointer bg-[#DC2626] px-5 text-sm font-semibold text-white hover:bg-red-700">
              Get Started
            </Button>
          </a>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="rounded-lg p-2 hover:bg-[#F8FAFC] md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-[#7F1D1D]" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-white">
            <div className="mt-8 flex flex-col gap-6">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-[#7F1D1D]"
                >
                  {l.label}
                </a>
              ))}
              <Separator />
              <Button className="w-full bg-[#DC2626] text-white">
                Get Started
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="overflow-hidden bg-[#F8FAFC] pt-24 pb-16" id="hero">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div className="fade-section translate-y-4 opacity-0 transition-all duration-700">
            <Badge className="mb-6 border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold tracking-wide text-[#DC2626] uppercase">
              Clinic & Lab Management SaaS
            </Badge>
            <h1 className="mb-6 font-['Plus_Jakarta_Sans'] text-5xl leading-tight font-extrabold text-[#7F1D1D] lg:text-6xl">
              Manage Every Appointment.{" "}
              <span className="text-[#DC2626]">Every Lab.</span> Every Patient.
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-[#64748B]">
              MediCare is the all-in-one SaaS platform built for clinics and
              hospitals. Streamline bookings, generate QR-linked lab reports,
              and empower every role — from receptionist to specialist — with
              tools they'll actually use.
            </p>
            <div className="mb-10 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="cursor-pointer bg-[#DC2626] px-8 py-3 text-base font-bold text-white shadow-lg shadow-red-200 hover:bg-red-700"
              >
                Request a Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#7F1D1D] px-8 py-3 text-base font-bold text-[#7F1D1D] hover:bg-[#7F1D1D] hover:text-white"
              >
                View Features
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              {["HIPAA Ready", "Multi-Clinic", "PDF Reports", "QR Access"].map(
                (t) => (
                  <Badge
                    key={t}
                    className="border border-[#E2E8F0] bg-white px-3 py-1 font-medium text-[#7F1D1D] shadow-sm"
                  >
                    <ShieldCheck className="mr-1 inline h-3 w-3 text-[#DC2626]" />
                    {t}
                  </Badge>
                )
              )}
            </div>
          </div>

          {/* Image */}
          <div className="fade-section translate-y-4 opacity-0 transition-all delay-200 duration-700">
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-linear-to-br from-red-100 to-slate-100" />
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80"
                alt="Doctor at a modern clinic reception desk"
                className="h-120 w-full rounded-2xl object-cover shadow-2xl"
              />
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-[#E2E8F0] bg-white px-5 py-4 shadow-xl">
                <p className="mb-1 text-xs font-medium text-[#64748B]">
                  Today's Appointments
                </p>
                <p className="text-3xl font-extrabold text-[#7F1D1D]">142</p>
                <p className="mt-1 text-xs font-semibold text-[#DC2626]">
                  ↑ 12% vs yesterday
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsBar() {
  return (
    <section id="Product Stats" className="bg-[#7F1D1D] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="mb-3 flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DC2626]/20">
                  <Icon className="h-5 w-5 text-[#DC2626]" />
                </div>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-4xl font-extrabold text-white">
                {value}
              </p>
              <p className="mt-1 text-sm font-medium text-[#64748B]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="Features" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fade-section mb-16 translate-y-4 text-center opacity-0 transition-all duration-700">
          <Badge className="mb-4 border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold tracking-wide text-[#DC2626] uppercase">
            Features
          </Badge>
          <h2 className="mb-4 font-['Plus_Jakarta_Sans'] text-4xl font-extrabold text-[#7F1D1D]">
            Everything Your Clinic Needs
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#64748B]">
            From front desk to specialist, MediCare gives every role in your
            clinic the tools they need to deliver exceptional patient care.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <Card
              key={title}
              className="fade-section translate-y-4 border border-[#E2E8F0] bg-white opacity-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader className="pb-3">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                  <Icon className="h-6 w-6 text-[#DC2626]" />
                </div>
                <CardTitle className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#7F1D1D]">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-[#64748B]">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="How It Works" className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fade-section mb-16 translate-y-4 text-center opacity-0 transition-all duration-700">
          <Badge className="mb-4 border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold tracking-wide text-[#DC2626] uppercase">
            Process
          </Badge>
          <h2 className="mb-4 font-['Plus_Jakarta_Sans'] text-4xl font-extrabold text-[#7F1D1D]">
            Up and Running in Minutes
          </h2>
          <p className="mx-auto max-w-xl text-lg text-[#64748B]">
            No lengthy setup, no IT team required. MediCare gets your clinic
            operational the same day you sign up.
          </p>
        </div>

        <div className="fade-section relative mb-16 grid translate-y-4 gap-8 opacity-0 transition-all duration-700 md:grid-cols-3">
          {/* Connector line (desktop) */}
          <div className="absolute top-10 right-[20%] left-[20%] hidden h-px border-t-2 border-dashed border-[#DC2626]/40 md:block" />

          {STEPS.map(({ num, title, desc }) => (
            <div key={num} className="flex flex-col items-center text-center">
              <div className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#DC2626] shadow-lg shadow-red-200">
                <span className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-white">
                  {num}
                </span>
              </div>
              <h3 className="mb-2 font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#7F1D1D]">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-[#64748B]">{desc}</p>
            </div>
          ))}
        </div>

        <div className="fade-section translate-y-4 opacity-0 transition-all duration-700">
          <img
            src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=80"
            alt="Clinic team discussing patient management workflow"
            className="h-72 w-full rounded-2xl object-cover shadow-xl md:h-96"
          />
        </div>
      </div>
    </section>
  )
}

function DeepDives() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:px-8">
        {/* Row 1 */}
        <div className="fade-section grid translate-y-4 items-center gap-16 opacity-0 transition-all duration-700 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
              alt="Doctor reviewing lab results on a tablet"
              className="h-96 w-full rounded-2xl object-cover shadow-xl"
            />
          </div>
          <div className="order-1 lg:order-2">
            <Badge className="mb-4 border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold tracking-wide text-[#DC2626] uppercase">
              Lab Reports
            </Badge>
            <h2 className="mb-5 font-['Plus_Jakarta_Sans'] text-3xl font-extrabold text-[#7F1D1D]">
              QR-Enabled Lab Reports & Prescriptions
            </h2>
            <p className="mb-6 leading-relaxed text-[#64748B]">
              When a doctor generates a PDF prescription or lab report in
              MediCare, the system automatically embeds a unique QR code.
              Patients scan it with any smartphone camera and instantly access
              their securely hosted report — no app download, no login, no
              friction. One scan is all it takes to put health information in
              the patient's hands.
            </p>
            <a
              href="#features"
              className="inline-flex items-center gap-1 font-semibold text-[#DC2626] transition-all hover:gap-2"
            >
              Learn More <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Row 2 */}
        <div className="fade-section grid translate-y-4 items-center gap-16 opacity-0 transition-all duration-700 lg:grid-cols-2">
          <div>
            <Badge className="mb-4 border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold tracking-wide text-[#DC2626] uppercase">
              Appointments
            </Badge>
            <h2 className="mb-5 font-['Plus_Jakarta_Sans'] text-3xl font-extrabold text-[#7F1D1D]">
              Effortless Appointment Management
            </h2>
            <p className="mb-6 leading-relaxed text-[#64748B]">
              Receptionists create rich appointment forms capturing all relevant
              patient details — from symptoms to insurance. Real-time status
              updates flow to the doctor's dashboard automatically, and time-in
              / time-out can be updated at any point in the workflow, giving
              your front desk complete flexibility without ever disrupting
              clinical operations.
            </p>
            <a
              href="#features"
              className="inline-flex items-center gap-1 font-semibold text-[#DC2626] transition-all hover:gap-2"
            >
              Learn More <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80"
              alt="Receptionist managing appointments on a computer"
              className="h-96 w-full rounded-2xl object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="Pricing" className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fade-section mb-12 translate-y-4 text-center opacity-0 transition-all duration-700">
          <Badge className="mb-4 border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold tracking-wide text-[#DC2626] uppercase">
            Pricing
          </Badge>
          <h2 className="mb-4 font-['Plus_Jakarta_Sans'] text-4xl font-extrabold text-[#7F1D1D]">
            Simple, Transparent Pricing
          </h2>
          <p className="mb-8 text-lg text-[#64748B]">
            No hidden fees. No per-patient charges. Just one plan for your whole
            clinic.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 rounded-full border border-[#E2E8F0] bg-white px-4 py-2 shadow-sm">
            <span
              className={`text-sm font-medium transition-colors ${!annual ? "text-[#7F1D1D]" : "text-[#64748B]"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative h-6 w-12 rounded-full transition-all duration-300 ${annual ? "bg-[#DC2626]" : "bg-[#E2E8F0]"}`}
              aria-label="Toggle annual billing"
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${annual ? "left-7" : "left-1"}`}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors ${annual ? "text-[#7F1D1D]" : "text-[#64748B]"}`}
            >
              Annual{" "}
              <span className="text-xs font-bold text-[#DC2626]">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="fade-section grid translate-y-4 gap-6 opacity-0 transition-all duration-700 md:grid-cols-3">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`relative border-2 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                plan.popular
                  ? "border-[#DC2626] shadow-lg shadow-red-100"
                  : "border-[#E2E8F0]"
              }`}
            >
              <CardHeader className="pb-4">
                <CardTitle
                  className={`font-['Plus_Jakarta_Sans'] text-xl font-bold ${plan.popular ? "text-[#DC2626]" : "text-[#7F1D1D]"}`}
                >
                  {plan.name}
                </CardTitle>
                <p className="text-sm text-[#64748B]">{plan.desc}</p>
                <div className="mt-4">
                  {plan.monthly ? (
                    <>
                      <span className="text-5xl font-extrabold text-[#7F1D1D]">
                        ${annual ? plan.annual : plan.monthly}
                      </span>
                      <span className="text-sm text-[#64748B]">/mo</span>
                    </>
                  ) : (
                    <span className="text-4xl font-extrabold text-[#7F1D1D]">
                      Custom
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50">
                      <Check className="h-3 w-3 text-[#DC2626]" />
                    </div>
                    <span className="text-sm text-[#7F1D1D]">{f}</span>
                  </div>
                ))}
                <div className="pt-4">
                  <Button
                    className={`w-full font-bold ${
                      plan.popular
                        ? "bg-[#DC2626] text-white hover:bg-red-700"
                        : "border-2 border-[#7F1D1D] bg-white text-[#7F1D1D] hover:bg-[#7F1D1D] hover:text-white"
                    }`}
                    variant={plan.popular ? "default" : "default"}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="Testimonials" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fade-section mb-16 translate-y-4 text-center opacity-0 transition-all duration-700">
          <Badge className="mb-4 border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold tracking-wide text-[#DC2626] uppercase">
            Testimonials
          </Badge>
          <h2 className="mb-4 font-['Plus_Jakarta_Sans'] text-4xl font-extrabold text-[#7F1D1D]">
            Trusted by Clinic Administrators
          </h2>
          <p className="text-lg text-[#64748B]">
            Real feedback from real clinics across the country.
          </p>
        </div>
        <div className="fade-section grid translate-y-4 gap-6 opacity-0 transition-all duration-700 md:grid-cols-3">
          {TESTIMONIALS.map(({ avatar, name, role, quote }) => (
            <Card
              key={name}
              className="border border-[#E2E8F0] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-0">
                <div className="mb-4 flex gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#DC2626] text-[#DC2626]"
                      />
                    ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed text-[#7F1D1D] italic">
                  "{quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={avatar}
                    alt={name}
                    className="h-12 w-12 rounded-full border-2 border-[#E2E8F0] object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#7F1D1D]">{name}</p>
                    <p className="text-xs text-[#64748B]">{role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section id="FAQ" className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="fade-section mb-12 translate-y-4 text-center opacity-0 transition-all duration-700">
          <Badge className="mb-4 border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold tracking-wide text-[#DC2626] uppercase">
            FAQ
          </Badge>
          <h2 className="mb-4 font-['Plus_Jakarta_Sans'] text-4xl font-extrabold text-[#7F1D1D]">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#64748B]">
            Everything you need to know before getting started.
          </p>
        </div>
        <div className="fade-section translate-y-4 opacity-0 transition-all duration-700">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-[#E2E8F0] bg-white px-6 shadow-sm"
              >
                <AccordionTrigger className="py-5 text-left text-sm font-semibold text-[#7F1D1D] hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-[#64748B]">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      const data = {
        name: formData.get("name"),
        clinic: formData.get("clinic"),
        email: formData.get("email"),
        message: formData.get("message"),
        phone: formData.get("phone"),
      }

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error("Server error")
      }

      const result = await res.json()

      if (result.success) {
        toast.success("Request sent successfully", {
          description: "We'll contact you shortly.",
        })

        formRef.current?.reset()
      } else {
        throw new Error("Email failed")
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="Contact Us" className="bg-[#DC2626] py-24">
      <div className="fade-section max mx-auto w-5xl translate-y-4 px-4 opacity-0 transition-all duration-700 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mb-4 font-['Plus_Jakarta_Sans'] text-4xl font-extrabold text-white md:text-5xl">
            Ready to Modernize Your Clinic?
          </h2>
          <p className="text-lg text-red-200">
            Join hundreds of clinics already using MediCare. Fill out the form
            and our team will reach out shortly.
          </p>
        </div>

        {/* Card */}
        <div className="mx-auto max-w-2xl">
          <Card className="border-0 bg-white p-2 shadow-2xl shadow-red-900/30">
            <CardHeader>
              <CardTitle className="font-['Plus_Jakarta_Sans'] text-2xl text-[#7F1D1D]">
                Get in Touch
              </CardTitle>
              <CardDescription className="text-slate-500">
                Tell us about your clinic and we'll find the right plan for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-5 text-slate-800"
                ref={formRef}
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="font-medium text-slate-700"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Dr. Sarah Mitchell"
                      className="h-11 border-slate-200 focus-visible:ring-[#DC2626]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="clinic"
                      className="font-medium text-slate-700"
                    >
                      Clinic Name
                    </Label>
                    <Input
                      id="clinic"
                      name="clinic"
                      placeholder="City Health Clinic"
                      className="h-11 border-slate-200 focus-visible:ring-[#DC2626]"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="font-medium text-slate-700"
                    >
                      Work Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="sarah@cityclinic.com"
                      className="h-11 border-slate-200 focus-visible:ring-[#DC2626]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="font-medium text-slate-700"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="h-11 border-slate-200 focus-visible:ring-[#DC2626]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="font-medium text-slate-700"
                  >
                    How can we help?
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your clinic size, current systems, or any specific needs..."
                    className="min-h-25 resize-y border-slate-200 focus-visible:ring-[#DC2626]"
                  />
                </div>
                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 w-full cursor-pointer rounded-lg bg-[#DC2626] text-base font-semibold text-white hover:bg-[#b91c1c]"
                  >
                    {loading ? "Sending..." : "Get Started Today"}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DC2626]">
                <HeartPulse className="h-5 w-5 text-white" />
              </div>
              <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#7F1D1D]">
                MediCare
              </span>
            </a>
            <p className="text-sm leading-relaxed text-[#64748B]">
              The modern SaaS platform for clinic and lab management.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-6 text-sm font-semibold text-[#7F1D1D]">
                {group}
              </h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href={`#${l}`}
                      className="text-sm text-[#64748B] transition-colors hover:text-[#7F1D1D]"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-[#64748B]">
            © {new Date().getFullYear()} MediCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function App() {
  useEffect(() => {
    // Inject fonts
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap"
    document.head.appendChild(link)

    // Smooth scroll
    const style = document.createElement("style")
    style.textContent = `html { scroll-behavior: smooth; } body { font-family: 'Inter', sans-serif; }`
    document.head.appendChild(style)

    // IntersectionObserver for fade-in
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-4")
            entry.target.classList.add("opacity-100", "translate-y-0")
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll(".fade-section").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-[#F8FAFC] text-[#7F1D1D]">
      <Toaster position="bottom-left" richColors />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Features />
        <HowItWorks />
        <DeepDives />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
