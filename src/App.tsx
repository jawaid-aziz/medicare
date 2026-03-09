import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  HeartPulse,
  Menu,
  Star,
  Check,
  Users,
  CalendarCheck,
  FileText,
  Clock,
  LayoutGrid,
  Search,
  QrCode,
  ChevronRight,
  Twitter,
  Linkedin,
  Facebook,
  ShieldCheck,
  Building2,
  TrendingUp,
  MapPin,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: "500+", label: "Clinics Onboarded", icon: Building2 },
  { value: "1M+", label: "Appointments Managed", icon: CalendarCheck },
  { value: "99.9%", label: "Uptime Guaranteed", icon: TrendingUp },
  { value: "50+", label: "Cities Served", icon: MapPin },
];

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
];

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
];

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
];

const TESTIMONIALS = [
  {
    avatar: "https://i.pravatar.cc/80?img=1",
    name: "Dr. Aisha Khan",
    role: "Head of Internal Medicine, Aga Khan Clinic",
    quote:
      "MediCare transformed how our department operates. The QR-enabled lab reports mean patients call us less — they simply scan and view their results. Brilliant.",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=5",
    name: "Mr. Tariq Mehmood",
    role: "Clinic Administrator, City Health Center",
    quote:
      "Onboarding took under an hour. Our receptionists loved the appointment forms and the ability to update patient times on the fly without any restrictions.",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=12",
    name: "Dr. Sara Nawaz",
    role: "Cardiologist, Shifa Medical Complex",
    quote:
      "Department-wise filtering is a game changer. I only see my patients, my lab orders. No noise. MediCare keeps me focused on what actually matters.",
  },
];

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
];

const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "How It Works", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["FAQ", "Documentation", "Contact", "Status"],
  Legal: ["Privacy Policy", "Terms of Service", "HIPAA Compliance"],
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/90 border-b border-[#E2E8F0] shadow-sm"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#DC2626] rounded-lg flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <span className="text-[#7F1D1D] font-bold text-xl font-['Plus_Jakarta_Sans']">
            MediCare
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[#64748B] hover:text-[#7F1D1D] text-sm font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-[#7F1D1D] font-medium text-sm"
          >
            Sign In
          </Button>
          <Button className="bg-[#DC2626] hover:bg-red-700 text-white font-semibold text-sm px-5">
            Get Started
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[#F8FAFC]"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-[#7F1D1D]" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-white">
            <div className="flex flex-col gap-6 mt-8">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-[#7F1D1D] font-medium text-base"
                >
                  {l.label}
                </a>
              ))}
              <Separator />
              <Button className="bg-[#DC2626] text-white w-full">
                Get Started
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-24 pb-16 bg-[#F8FAFC] overflow-hidden" id="hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="fade-section opacity-0 translate-y-4 transition-all duration-700">
            <Badge className="mb-6 bg-red-50 text-[#DC2626] border border-red-200 font-semibold px-3 py-1 text-xs uppercase tracking-wide">
              Clinic & Lab Management SaaS
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-[#7F1D1D] leading-tight font-['Plus_Jakarta_Sans'] mb-6">
              Manage Every Appointment.{" "}
              <span className="text-[#DC2626]">Every Lab.</span> Every Patient.
            </h1>
            <p className="text-[#64748B] text-lg leading-relaxed mb-8 max-w-lg">
              MediCare is the all-in-one SaaS platform built for clinics and
              hospitals. Streamline bookings, generate QR-linked lab reports, and
              empower every role — from receptionist to specialist — with tools
              they'll actually use.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                size="lg"
                className="bg-[#DC2626] hover:bg-red-700 text-white font-bold px-8 py-3 text-base shadow-lg shadow-red-200"
              >
                Request a Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#7F1D1D] text-[#7F1D1D] font-bold px-8 py-3 text-base hover:bg-[#7F1D1D] hover:text-white"
              >
                View Features
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              {["HIPAA Ready", "Multi-Clinic", "PDF Reports", "QR Access"].map(
                (t) => (
                  <Badge
                    key={t}
                    className="bg-white border border-[#E2E8F0] text-[#7F1D1D] font-medium px-3 py-1 shadow-sm"
                  >
                    <ShieldCheck className="w-3 h-3 mr-1 text-[#DC2626] inline" />
                    {t}
                  </Badge>
                )
              )}
            </div>
          </div>

          {/* Image */}
          <div className="fade-section opacity-0 translate-y-4 transition-all duration-700 delay-200">
            <div className="relative">
              <div className="absolute -inset-4 bg-linear-to-br from-red-100 to-slate-100 rounded-3xl -z-10" />
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80"
                alt="Doctor at a modern clinic reception desk"
                className="w-full h-120 object-cover rounded-2xl shadow-2xl"
              />
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 border border-[#E2E8F0]">
                <p className="text-xs text-[#64748B] font-medium mb-1">
                  Today's Appointments
                </p>
                <p className="text-3xl font-extrabold text-[#7F1D1D]">142</p>
                <p className="text-xs text-[#DC2626] font-semibold mt-1">
                  ↑ 12% vs yesterday
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="bg-[#7F1D1D] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 bg-[#DC2626]/20 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#DC2626]" />
                </div>
              </div>
              <p className="text-4xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
                {value}
              </p>
              <p className="text-[#64748B] text-sm mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-section opacity-0 translate-y-4 transition-all duration-700">
          <Badge className="mb-4 bg-red-50 text-[#DC2626] border border-red-200 font-semibold px-3 py-1 text-xs uppercase tracking-wide">
            Features
          </Badge>
          <h2 className="text-4xl font-extrabold text-[#7F1D1D] font-['Plus_Jakarta_Sans'] mb-4">
            Everything Your Clinic Needs
          </h2>
          <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
            From front desk to specialist, MediCare gives every role in your
            clinic the tools they need to deliver exceptional patient care.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <Card
              key={title}
              className="border border-[#E2E8F0] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 fade-section opacity-0 translate-y-4"
            >
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#DC2626]" />
                </div>
                <CardTitle className="text-[#7F1D1D] font-bold text-lg font-['Plus_Jakarta_Sans']">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#64748B] text-sm leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-section opacity-0 translate-y-4 transition-all duration-700">
          <Badge className="mb-4 bg-red-50 text-[#DC2626] border border-red-200 font-semibold px-3 py-1 text-xs uppercase tracking-wide">
            Process
          </Badge>
          <h2 className="text-4xl font-extrabold text-[#7F1D1D] font-['Plus_Jakarta_Sans'] mb-4">
            Up and Running in Minutes
          </h2>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            No lengthy setup, no IT team required. MediCare gets your clinic
            operational the same day you sign up.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8 mb-16 fade-section opacity-0 translate-y-4 transition-all duration-700">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px border-t-2 border-dashed border-[#DC2626]/40" />

          {STEPS.map(({ num, title, desc }) => (
            <div key={num} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#DC2626] flex items-center justify-center mb-5 shadow-lg shadow-red-200 relative z-10">
                <span className="text-white font-extrabold text-xl font-['Plus_Jakarta_Sans']">
                  {num}
                </span>
              </div>
              <h3 className="text-[#7F1D1D] font-bold text-lg font-['Plus_Jakarta_Sans'] mb-2">
                {title}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="fade-section opacity-0 translate-y-4 transition-all duration-700">
          <img
            src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=80"
            alt="Clinic team discussing patient management workflow"
            className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}

function DeepDives() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Row 1 */}
        <div className="grid lg:grid-cols-2 gap-16 items-center fade-section opacity-0 translate-y-4 transition-all duration-700">
          <div className="order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
              alt="Doctor reviewing lab results on a tablet"
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div className="order-1 lg:order-2">
            <Badge className="mb-4 bg-red-50 text-[#DC2626] border border-red-200 font-semibold px-3 py-1 text-xs uppercase tracking-wide">
              Lab Reports
            </Badge>
            <h2 className="text-3xl font-extrabold text-[#7F1D1D] font-['Plus_Jakarta_Sans'] mb-5">
              QR-Enabled Lab Reports & Prescriptions
            </h2>
            <p className="text-[#64748B] leading-relaxed mb-6">
              When a doctor generates a PDF prescription or lab report in
              MediCare, the system automatically embeds a unique QR code. Patients
              scan it with any smartphone camera and instantly access their
              securely hosted report — no app download, no login, no friction. One
              scan is all it takes to put health information in the patient's
              hands.
            </p>
            <a
              href="#features"
              className="inline-flex items-center text-[#DC2626] font-semibold hover:gap-2 gap-1 transition-all"
            >
              Learn More <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid lg:grid-cols-2 gap-16 items-center fade-section opacity-0 translate-y-4 transition-all duration-700">
          <div>
            <Badge className="mb-4 bg-red-50 text-[#DC2626] border border-red-200 font-semibold px-3 py-1 text-xs uppercase tracking-wide">
              Appointments
            </Badge>
            <h2 className="text-3xl font-extrabold text-[#7F1D1D] font-['Plus_Jakarta_Sans'] mb-5">
              Effortless Appointment Management
            </h2>
            <p className="text-[#64748B] leading-relaxed mb-6">
              Receptionists create rich appointment forms capturing all relevant
              patient details — from symptoms to insurance. Real-time status
              updates flow to the doctor's dashboard automatically, and time-in /
              time-out can be updated at any point in the workflow, giving your
              front desk complete flexibility without ever disrupting clinical
              operations.
            </p>
            <a
              href="#features"
              className="inline-flex items-center text-[#DC2626] font-semibold hover:gap-2 gap-1 transition-all"
            >
              Learn More <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80"
              alt="Receptionist managing appointments on a computer"
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-section opacity-0 translate-y-4 transition-all duration-700">
          <Badge className="mb-4 bg-red-50 text-[#DC2626] border border-red-200 font-semibold px-3 py-1 text-xs uppercase tracking-wide">
            Pricing
          </Badge>
          <h2 className="text-4xl font-extrabold text-[#7F1D1D] font-['Plus_Jakarta_Sans'] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-[#64748B] text-lg mb-8">
            No hidden fees. No per-patient charges. Just one plan for your whole
            clinic.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-full px-4 py-2 shadow-sm">
            <span
              className={`text-sm font-medium transition-colors ${!annual ? "text-[#7F1D1D]" : "text-[#64748B]"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`w-12 h-6 rounded-full transition-all duration-300 relative ${annual ? "bg-[#DC2626]" : "bg-[#E2E8F0]"}`}
              aria-label="Toggle annual billing"
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${annual ? "left-7" : "left-1"}`}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors ${annual ? "text-[#7F1D1D]" : "text-[#64748B]"}`}
            >
              Annual{" "}
              <span className="text-[#DC2626] font-bold text-xs">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 fade-section opacity-0 translate-y-4 transition-all duration-700">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`relative border-2 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
                plan.popular
                  ? "border-[#DC2626] shadow-lg shadow-red-100"
                  : "border-[#E2E8F0]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#DC2626] text-white font-bold px-4 py-1 text-xs">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle
                  className={`text-xl font-bold font-['Plus_Jakarta_Sans'] ${plan.popular ? "text-[#DC2626]" : "text-[#7F1D1D]"}`}
                >
                  {plan.name}
                </CardTitle>
                <p className="text-[#64748B] text-sm">{plan.desc}</p>
                <div className="mt-4">
                  {plan.monthly ? (
                    <>
                      <span className="text-5xl font-extrabold text-[#7F1D1D]">
                        ${annual ? plan.annual : plan.monthly}
                      </span>
                      <span className="text-[#64748B] text-sm">/mo</span>
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
                    <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#DC2626]" />
                    </div>
                    <span className="text-[#7F1D1D] text-sm">{f}</span>
                  </div>
                ))}
                <div className="pt-4">
                  <Button
                    className={`w-full font-bold ${
                      plan.popular
                        ? "bg-[#DC2626] hover:bg-red-700 text-white"
                        : "border-2 border-[#7F1D1D] text-[#7F1D1D] bg-white hover:bg-[#7F1D1D] hover:text-white"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
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
  );
}

function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-section opacity-0 translate-y-4 transition-all duration-700">
          <Badge className="mb-4 bg-red-50 text-[#DC2626] border border-red-200 font-semibold px-3 py-1 text-xs uppercase tracking-wide">
            Testimonials
          </Badge>
          <h2 className="text-4xl font-extrabold text-[#7F1D1D] font-['Plus_Jakarta_Sans'] mb-4">
            Trusted by Clinic Administrators
          </h2>
          <p className="text-[#64748B] text-lg">
            Real feedback from real clinics across the country.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 fade-section opacity-0 translate-y-4 transition-all duration-700">
          {TESTIMONIALS.map(({ avatar, name, role, quote }) => (
            <Card
              key={name}
              className="border border-[#E2E8F0] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 p-6"
            >
              <CardContent className="p-0">
                <div className="flex gap-1 mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-[#DC2626] fill-[#DC2626]"
                      />
                    ))}
                </div>
                <p className="text-[#7F1D1D] text-sm leading-relaxed mb-6 italic">
                  "{quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#E2E8F0]"
                  />
                  <div>
                    <p className="text-[#7F1D1D] font-bold text-sm">{name}</p>
                    <p className="text-[#64748B] text-xs">{role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-section opacity-0 translate-y-4 transition-all duration-700">
          <Badge className="mb-4 bg-red-50 text-[#DC2626] border border-red-200 font-semibold px-3 py-1 text-xs uppercase tracking-wide">
            FAQ
          </Badge>
          <h2 className="text-4xl font-extrabold text-[#7F1D1D] font-['Plus_Jakarta_Sans'] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#64748B] text-lg">
            Everything you need to know before getting started.
          </p>
        </div>
        <div className="fade-section opacity-0 translate-y-4 transition-all duration-700">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white border border-[#E2E8F0] rounded-xl px-6 shadow-sm"
              >
                <AccordionTrigger className="text-[#7F1D1D] font-semibold text-sm py-5 hover:no-underline text-left">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-[#64748B] text-sm leading-relaxed pb-5">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section id="contact" className="py-24 bg-[#DC2626]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-section opacity-0 translate-y-4 transition-all duration-700">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white font-['Plus_Jakarta_Sans'] mb-4">
          Ready to Modernize Your Clinic?
        </h2>
        <p className="text-red-200 text-lg mb-10">
          Join hundreds of clinics already using MediCare to deliver better
          patient care, every single day.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-[#7F1D1D] hover:bg-red-50 font-bold px-10 py-3 text-base shadow-lg"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#DC2626] font-bold px-10 py-3 text-base"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#7F1D1D] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#DC2626] rounded-lg flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl font-['Plus_Jakarta_Sans']">
                MediCare
              </span>
            </a>
            <p className="text-[#64748B] text-sm leading-relaxed">
              The modern SaaS platform for clinic and lab management.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white font-semibold text-sm mb-4">{group}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[#64748B] text-sm hover:text-white transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#64748B] text-sm">
            © {new Date().getFullYear()} MediCare. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[Twitter, Linkedin, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label={`Social link ${i}`}
                className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Icon className="w-4 h-4 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function App() {
  useEffect(() => {
    // Inject fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);

    // Smooth scroll
    const style = document.createElement("style");
    style.textContent = `html { scroll-behavior: smooth; } body { font-family: 'Inter', sans-serif; }`;
    document.head.appendChild(style);

    // IntersectionObserver for fade-in
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-4");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-section").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#F8FAFC] text-[#7F1D1D]">
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
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}

export default App;
