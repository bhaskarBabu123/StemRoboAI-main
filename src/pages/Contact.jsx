import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Briefcase,
} from "lucide-react";
import Hero from "../components/Hero";

/* ------------------------------------------------------------------ */
/*  Shared design tokens — mirrors Programs / News & Events / Careers  */
/* ------------------------------------------------------------------ */

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  .font-body { font-family: 'Inter', sans-serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
  .blueprint-frame { position: relative; }
  .blueprint-frame::before, .blueprint-frame::after {
    content: ''; position: absolute; width: 28px; height: 28px; border-color: #F5730C; z-index: 10;
  }
  .blueprint-frame::before { top: -10px; left: -10px; border-top: 3px solid; border-left: 3px solid; }
  .blueprint-frame::after { bottom: -10px; right: -10px; border-bottom: 3px solid; border-right: 3px solid; }
`;

const Eyebrow = ({ children, dark = false }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="h-2 w-2 rounded-full bg-[#F5730C]" />
    <span
      className={`font-mono text-xs tracking-[0.25em] uppercase ${
        dark ? "text-white/60" : "text-[#0B1130]/50"
      }`}
    >
      {children}
    </span>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const contactInfo = [
  {
    icon: Phone,
    title: "Phone Number",
    details: ["+91 9900506684"],
  },
  {
    icon: Mail,
    title: "Email Addresses",
    details: ["info@stemroboai.com", "stemroboaiblr@gmail.com"],
  },
  {
    icon: MapPin,
    title: "Office Address",
    details: ["Ashwathnagar", "RMV 2nd Stage", "Bangalore, India"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday – Friday: 9:00 AM – 6:00 PM", "Saturday: 9:00 AM – 2:00 PM"],
  },
];

const whyUs = [
  {
    title: "Quick Response",
    description: "We respond to all inquiries within 24 hours.",
  },
  {
    title: "Expert Consultation",
    description: "Free consultation to understand your needs.",
  },
  {
    title: "Customized Solutions",
    description: "Tailored programs for your specific requirements.",
  },
];

const faqs = [
  {
    q: "How soon will I hear back?",
    a: "Within 24 hours on business days. Urgent inquiries are best handled by calling us directly.",
  },
  {
    q: "Can I request a school visit or demo?",
    a: "Yes — mention it in your message with your preferred dates and we'll coordinate a visit or a virtual walkthrough.",
  },
  {
    q: "I'm applying for a role — is this the right form?",
    a: "Yes. Select an inquiry type, mention the role you're applying for in your message, and our hiring team will follow up.",
  },
  {
    q: "Do you work with schools outside Bangalore?",
    a: "We do — our curriculum and training programs are delivered across India, both in person and remotely.",
  },
];

const subjectOptions = [
  "STEM Lab Setup",
  "Teacher Training",
  "Curriculum Development",
  "Partnership Inquiry",
  "Product Information",
  "Careers Inquiry",
  "Other",
];

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

const Contact = () => {
  const location = useLocation();
  const roleFromCareers = location.state?.role;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: roleFromCareers ? "Careers Inquiry" : "",
    message: roleFromCareers ? `I'd like to apply for the ${roleFromCareers} role.\n\n` : "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    if (location.state?.subject && !roleFromCareers) {
      setFormData((prev) => ({ ...prev, subject: "Careers Inquiry" }));
    }
  }, [location.state, roleFromCareers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_email: "stemroboaiblr@gmail.com",
      };

      await emailjs.send(
        "service_stemroboai", // Replace with your EmailJS service ID
        "template_contact", // Replace with your EmailJS template ID
        templateParams,
        "your_emailjs_user_id" // Replace with your EmailJS public/user ID
      );

      setShowSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-[#0B1130]/12 bg-[#F7F8FC] text-[#0B1130] placeholder-[#0B1130]/35 focus:border-[#F5730C] focus:ring focus:ring-[#F5730C]/15 outline-none transition-colors duration-200";
  const labelClasses = "block text-sm font-medium text-[#0B1130]/70 mb-2";

  return (
    <div className="bg-[#F7F8FC]">
      <style>{FONT_STYLE}</style>
      <div className="font-body">
        <Hero
          title="Contact Us"
          subtitle="Get in touch to discuss how we can bring STEM education to your school — or join the team building it."
          showButtons={false}
          isSmall={true}
        />

        {/* Quick facts strip */}
        <section className="py-14 border-b border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { label: "Avg. response time", value: "<24 hr" },
                { label: "Consultation cost", value: "Free" },
                { label: "Office location", value: "Bengaluru" },
                { label: "Reach across", value: "India" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl sm:text-4xl font-semibold text-[#0B1130]">
                    {s.value}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-wide text-[#0B1130]/45 mt-1.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CONTACT INFO CARDS                                            */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-14"
            >
              <Eyebrow>Get in touch</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                Reach us directly
              </h2>
              <p className="mt-5 text-lg text-[#0B1130]/60 leading-relaxed">
                Ready to bring innovative STEM education to your school? We're
                here to help you get started.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-[#0B1130]/10 bg-white p-7 hover:border-[#0B1130]/25 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-[#0B1130] flex items-center justify-center mb-6">
                    <info.icon className="h-5 w-5 text-[#F5730C]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#0B1130] mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((d) => (
                      <p key={d} className="text-sm text-[#0B1130]/60">
                        {d}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FORM + MAP / INFO                                             */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36 bg-white border-y border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 rounded-3xl border border-[#0B1130]/10 bg-[#F7F8FC] p-8 sm:p-10"
              >
                <Eyebrow>Send a message</Eyebrow>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#0B1130] mb-2">
                  Tell us what you need
                </h3>
                <p className="text-[#0B1130]/55 mb-8">
                  Fill in the form below and our team will get back to you.
                </p>

                {roleFromCareers && (
                  <div className="flex items-center gap-2.5 rounded-xl border border-[#F5730C]/25 bg-[#F5730C]/5 px-4 py-3 mb-6">
                    <Briefcase className="h-4 w-4 text-[#F5730C] shrink-0" />
                    <span className="text-sm text-[#0B1130]/70">
                      Applying for: <span className="font-semibold text-[#0B1130]">{roleFromCareers}</span>
                    </span>
                  </div>
                )}

                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -12, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-3 rounded-xl border border-[#12C7CF]/25 bg-[#12C7CF]/10 px-4 py-3.5 mb-6 overflow-hidden"
                    >
                      <CheckCircle className="h-5 w-5 text-[#0e9ba1] shrink-0" />
                      <span className="text-sm text-[#0B1130]/75">
                        Message sent successfully! We'll get back to you soon.
                      </span>
                    </motion.div>
                  )}
                  {showError && (
                    <motion.div
                      initial={{ opacity: 0, y: -12, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 mb-6 overflow-hidden"
                    >
                      <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                      <span className="text-sm text-red-700">
                        There was an error sending your message. Please try again.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClasses}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className={labelClasses}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={inputClasses}
                        placeholder="Enter your phone"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className={labelClasses}>
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                      >
                        <option value="">Select a subject</option>
                        {subjectOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClasses}>
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={inputClasses}
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      isLoading
                        ? "bg-[#0B1130]/30 cursor-not-allowed text-white"
                        : "bg-[#F5730C] hover:bg-[#e5670a] text-white"
                    }`}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>

              {/* Map + supporting info */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2 space-y-6"
              >
                <div className="blueprint-frame rounded-2xl overflow-hidden border border-[#0B1130]/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.6936508924693!2d77.5536486147706!3d13.010408090812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d5d1b8a7c3d%3A0x1b8a7c3d1b8a7c3d!2sRMV%202nd%20Stage%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1643723200000!5m2!1sen!2sin"
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="STEM RoboAI Location"
                  />
                </div>

                <div className="rounded-2xl border border-[#0B1130]/10 bg-[#F7F8FC] p-7">
                  <div className="flex items-center gap-2 mb-5">
                    <ShieldCheck className="h-4 w-4 text-[#F5730C]" />
                    <h4 className="font-display text-lg font-semibold text-[#0B1130]">
                      Why choose us
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {whyUs.map((w) => (
                      <div key={w.title} className="flex items-start gap-3">
                        <CheckCircle className="h-4.5 w-4.5 text-[#12C7CF] mt-0.5 shrink-0" />
                        <div>
                          <h5 className="font-semibold text-[#0B1130] text-sm">{w.title}</h5>
                          <p className="text-[#0B1130]/55 text-sm">{w.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative rounded-2xl bg-[#0B1130] p-7 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div className="relative">
                    <h4 className="font-display text-lg font-semibold text-white mb-1.5">
                      Need immediate assistance?
                    </h4>
                    <p className="text-white/55 text-sm mb-4">
                      For urgent inquiries, call us directly.
                    </p>
                    <a
                      href="tel:+919663131857"
                      className="inline-flex items-center gap-2 bg-[#F5730C] hover:bg-[#e5670a] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300"
                    >
                      <Phone className="h-4 w-4" />
                      +91 9900506684
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FAQ                                                           */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <Eyebrow>Questions</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                Frequently asked
              </h2>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={f.q} className="rounded-xl border border-[#0B1130]/10 overflow-hidden bg-white">
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                    >
                      <span className="font-medium text-[#0B1130]">{f.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[#0B1130]/40 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-6"
                        >
                          <p className="pb-5 text-sm text-[#0B1130]/60 leading-relaxed">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CTA                                                           */}
        {/* ============================================================ */}
        <section className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl bg-[#0B1130] px-8 py-16 sm:px-16 sm:py-20 overflow-hidden text-center"
            >
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative max-w-2xl mx-auto">
                <div className="h-14 w-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-7">
                  <MessageCircle className="h-6 w-6 text-[#F5730C]" />
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-5 leading-tight">
                  Prefer to talk it through?
                </h2>
                <p className="text-white/60 mb-9 text-lg">
                  Skip the form — call us directly and we'll walk you through
                  the right program or role on the spot.
                </p>
                <a
                  href="tel:+919663131857"
                  className="inline-flex items-center gap-2 bg-[#F5730C] hover:bg-[#e5670a] text-white px-9 py-4 rounded-full font-medium transition-colors duration-300"
                >
                  <Sparkles className="h-4 w-4" />
                  Call +91 9663131857
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;