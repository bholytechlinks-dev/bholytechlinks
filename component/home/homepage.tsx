"use client";
import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  Award,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Search,
  Copy,
  Sparkles,
} from "lucide-react";
import { SERVICES_DATA } from "@/data";
import AddToast from "../heroui/AddToast";

const PRIMARY_PHONE = "+2349073495436";
const SECONDARY_PHONE = "+2349039899523";
const WA_PHONE_DIGITS = "2349073495436";

const createWaLink = (message: string) => {
  return `https://wa.me/${WA_PHONE_DIGITS}?text=${encodeURIComponent(message)}`;
};

const Homepage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Enquiry",
    message: "",
  });

  const handleCopy = (text: string, type: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedNumber(type);
      setTimeout(() => setCopiedNumber(null), 2500);
    }
  };

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { message, name, subject, email, phone } = formData;

    if (!message || !name || !subject || !email || !phone) {
      return AddToast("All field are required", "danger");
    }
    const request = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, name, subject, email, phone }),
    });
    const response = await request.json();
    if (response.success) {
      return AddToast(response.message as string, "success");
    } else {
      return AddToast(response.message as string, "danger");
    }

    // const formattedMessage = `Hello Bholytech-Links!\n\n*Name:* ${formData.name.trim()}\n*Subject:* ${formData.subject}\n*Message:* ${formData.message.trim()}`;
    // const waUrl = createWaLink(formattedMessage);
    // window.open(waUrl, "_blank");
  };

  // Filtered Services List
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((svc) => {
      const matchesCategory =
        activeCategory === "all" || svc.category === activeCategory;
      const matchesSearch = svc.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#d4af37] selection:text-slate-900">
      <nav className="bg-darkBlue sticky top-0 z-50 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#112544] to-darkBlue border border-[#d4af37]/40 flex items-center justify-center shadow-inner">
              <span className="text-lg font-black text-[#d4af37]">B</span>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wide text-white">
                BHOLYTECH<span className="text-[#d4af37]">-LINKS</span>
              </span>
              <p className="text-[10px] text-slate-400 -mt-1 tracking-wider uppercase font-semibold">
                Business Center
              </p>
            </div>
          </div>

          {/* CAC Badge & Quick Action */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/40 text-[#f3e5ab] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span className="tracking-wide">CAC: 7298958</span>
            </div>

            <a
              href={createWaLink(
                "Hello Bholytech-Links, I would like to inquire about your business services.",
              )}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-emerald-900/30 transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </nav>

      {}
      <section className="relative bg-darkBlue text-white overflow-hidden py-16 sm:py-24 border-b border-slate-800">
        {/* Decorative backdrop gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 text-[#d4af37] text-xs font-medium border border-[#d4af37]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Accredited Computer Sales & Cyber Services</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Bholytech-Links Business Center
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-[#d4af37]">
            swift and reliable...
          </p>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-1">
            Your verified partner for all tertiary institution registrations,
            academic research documentation, and premium printing solutions in
            Iree and beyond.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#services"
              className="px-6 py-3 rounded-xl bg-[#d4af37] hover:bg-[#c39f2f] text-darkBlue font-bold text-sm transition-all shadow-md active:scale-95"
            >
              Explore Our Services
            </a>
            <a
              href="#enquiry-form"
              className="px-6 py-3 rounded-xl bg-[#112544] hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
            >
              Send Custom Message
            </a>
          </div>
        </div>
      </section>

      {}
      <main
        id="services"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-darkBlue">
            Our Professional Services
          </h2>
          <p className="text-slate-500 text-sm">
            Select any service card below to initiate an instant, pre-filled
            WhatsApp consultation with our desk.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto pt-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-6" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g., NYSC, Transcript, Project)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 shadow-sm"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: "all", label: "All Services" },
            { id: "admissions", label: "Admissions & Portals" },
            { id: "academics", label: "Academic Writing & Assignments" },
            { id: "payments", label: "Payments, Transcripts & Printing" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === tab.id
                  ? "bg-darkBlue text-[#d4af37] shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto">
            <p className="text-slate-500 text-sm">
              No services match {searchQuery}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-3 text-xs font-bold text-[#d4af37] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredServices.map((svc) => {
              const IconComponent = svc.icon;
              return (
                <a
                  key={svc.id}
                  href={createWaLink(svc.message)}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#25D366] transition-all flex items-center justify-between overflow-hidden"
                >
                  {/* Left gold decorative indicator */}
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#d4af37] group-hover:bg-[#25D366] group-hover:w-1.5 transition-all" />

                  {/* Service Info */}
                  <div className="flex items-center gap-3.5 pr-2">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-darkBlue group-hover:text-[#25D366] group-hover:bg-emerald-50 flex items-center justify-center transition-colors shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm sm:text-base group-hover:text-darkBlue transition-colors leading-snug">
                        {svc.name}
                      </h4>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MessageCircle className="w-3 h-3 text-[#25D366]" />{" "}
                        Click for WhatsApp chat
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Action Button */}
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white flex items-center justify-center transition-all shrink-0 group-hover:scale-105 shadow-sm">
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {}

        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 my-16 shadow-sm">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                Official Verification
              </span>
              <h3 className="text-2xl font-black text-darkBlue">
                Registered & Accredited Cyber Center
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We operate with high professionalism, ensuring your
                registrations, transcripts, and financial clearance processes
                are handled securely and accurately.
              </p>

              <ul className="space-y-2.5 pt-1 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>
                    Registered under Companies and Allied Matters Act 2020
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Prompt and error-free portal submissions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>
                    Direct institutional support for Ospoly & polytechnic
                    students
                  </span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-5">
              <div className="bg-darkBlue text-white p-6 sm:p-8 rounded-xl border-t-4 border-[#d4af37] text-center shadow-md space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  Official CAC Registration
                </h4>
                <div className="text-xl font-extrabold text-[#f3e5ab] font-mono tracking-wider">
                  BN NO: 7298958
                </div>
                <p className="text-xs text-slate-400">
                  Federal Republic of Nigeria • CAMA 2020
                </p>
              </div>
            </div>
          </div>
        </section>

        {}
        <section
          id="enquiry-form"
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 max-w-3xl mx-auto shadow-sm"
        >
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-extrabold text-darkBlue">
              Enquiries & Feedback
            </h2>
            <p className="text-slate-500 text-sm">
              Do you have a custom request or want to leave a review? Fill out
              the form below to message us instantly on WhatsApp.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="userName"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Full Name
              </label>
              <input
                id="userName"
                type="text"
                required
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="Email"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="e.g. John@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="Phone"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                required={true}
                placeholder="e.g. +234"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="msgType"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Subject
              </label>
              <select
                id="msgType"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
              >
                <option value="General Enquiry">General Enquiry</option>
                <option value="Service Request">Service Request</option>
                <option value="Feedback / Review">Feedback / Review</option>
                <option value="Complaint">Complaint</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="userMessage"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Your Message
              </label>
              <textarea
                id="userMessage"
                rows={4}
                required
                placeholder="Type your message here..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Send via WhatsApp</span>
            </button>
          </form>
        </section>
      </main>

      <footer className="bg-darkBlue text-white pt-14 pb-8 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
            {/* Column 1 */}
            <div className="space-y-3">
              <h4 className="text-[#d4af37] font-bold text-base tracking-wide">
                BHOLYTECH-LINKS
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Computer Sales and Business Center.
                <br />
                Delivering fast, dependable digital solutions for students and
                professionals.
              </p>
            </div>

            {/* Column 2 */}
            <div className="space-y-3">
              <h4 className="text-[#d4af37] font-bold text-base tracking-wide">
                Contact Lines
              </h4>
              <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center justify-between max-w-xs">
                  <a
                    href={`tel:${PRIMARY_PHONE}`}
                    className="flex items-center gap-2 hover:text-[#d4af37] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#d4af37]" />
                    <span>+234 907 349 5436</span>
                  </a>
                  <button
                    onClick={() => handleCopy("+2349073495436", "p1")}
                    className="text-[11px] text-slate-400 hover:text-white"
                  >
                    {copiedNumber === "p1" ? (
                      "Copied"
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between max-w-xs">
                  <a
                    href={`tel:${SECONDARY_PHONE}`}
                    className="flex items-center gap-2 hover:text-[#d4af37] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#d4af37]" />
                    <span>+234 903 989 9523</span>
                  </a>
                  <button
                    onClick={() => handleCopy("+2349039899523", "p2")}
                    className="text-[11px] text-slate-400 hover:text-white"
                  >
                    {copiedNumber === "p2" ? (
                      "Copied"
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>

                <div>
                  <a
                    href={createWaLink(
                      "Hello Bholytech-Links, I am reaching out from your website.",
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[#25D366] hover:underline font-semibold pt-1"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-3">
              <h4 className="text-[#d4af37] font-bold text-base tracking-wide">
                Location & Socials
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>
                  Off Campus, Opposite Anglican Church, Ladoja, Iree, Osun State
                </span>
              </p>
              <div className="pt-1 space-y-1 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-400">
                    Facebook:
                  </span>
                  <span className="text-[#f3e5ab]">@Adeyemo Tope bholy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-400">
                    X (Twitter):
                  </span>
                  <span className="text-[#f3e5ab]">@bholy4christ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} BHOLYTECH-LINKS (BN: 7298958).
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={createWaLink(
            "Hello Bholytech-Links, I need quick assistance with your services.",
          )}
          target="_blank"
          rel="noreferrer"
          aria-label="Contact on WhatsApp"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
        </a>
      </div>
    </div>
  );
};
export default Homepage;
