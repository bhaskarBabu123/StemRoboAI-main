import { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Linkedin,
  Instagram,
  Youtube,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from '../images/logo.jpg';

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  .font-body { font-family: 'Inter', sans-serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
`;

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  const expertise = ["Robotics & AI", "IoT Solutions", "Drone Technology", "AR/VR Labs", "3D Printing"];
  const quickLinks = [
    { label: "About Us", path: "/about" },
    { label: "Programs", path: "/programs" },
    { label: "Products & Services", path: "/products-services" },
    { label: "Careers", path: "/careers" },
    { label: "Contact Us", path: "/contact" },
  ];
  const socials = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="relative bg-[#0B1130] text-white overflow-hidden">
      <style>{FONT_STYLE}</style>
      <div className="font-body">
        {/* decorative circuit grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#12C7CF]/60 to-transparent" />

        {/* Newsletter band */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-7 py-8 sm:px-10 sm:py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div>
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#12C7CF] mb-2">
                Stay in the loop
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold leading-tight">
                Get lab updates, events and enrollment windows
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="flex w-full lg:w-auto gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.edu"
                className="flex-1 lg:w-72 bg-white/10 border border-white/15 rounded-full px-5 py-3.5 text-sm placeholder:text-white/35 focus:outline-none focus:border-[#F5730C] transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                className="shrink-0 bg-[#F5730C] hover:bg-[#e5670a] text-white h-[52px] w-[52px] rounded-full flex items-center justify-center transition-colors"
                aria-label="Subscribe"
              >
                <Send className="h-4.5 w-4.5" />
              </motion.button>
            </form>
          </motion.div>
          {submitted && (
            <p className="font-mono text-xs text-[#12C7CF] mt-3 text-center lg:text-left">
              Thanks — you're on the list.
            </p>
          )}
        </div>

        {/* Main grid */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* About */}
            <div>
              <Link to="/" className="flex items-center gap-2.5 group p-2">
                          <img src={logo} alt="STEM RoboAI Logo" className=" rounded-full object-cover" width={60} />
                         </Link>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Full-year robotics, AI, IoT and drone labs built into K-12
                classrooms — installed, staffed and kept running long after the
                pilot term.
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-[#F5730C] hover:bg-[#F5730C]/10 transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div>
              <h3 className="font-display font-semibold mb-5 text-sm tracking-wide uppercase text-white/80">
                Our Expertise
              </h3>
              <ul className="space-y-3 text-sm">
                {expertise.map((item) => (
                  <li key={item}>
                    <span className="text-white/50 hover:text-[#F5730C] transition-colors cursor-pointer flex items-center gap-2 group">
                      <span className="h-1 w-1 rounded-full bg-[#12C7CF] group-hover:bg-[#F5730C] transition-colors" />
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display font-semibold mb-5 text-sm tracking-wide uppercase text-white/80">
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/50 hover:text-[#F5730C] transition-colors inline-flex items-center gap-1.5 group"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-display font-semibold mb-5 text-sm tracking-wide uppercase text-white/80">
                Contact Info
              </h3>
              <div className="space-y-4 text-sm">
                <a href="tel:+919663131857" className="flex items-start gap-3 text-white/50 hover:text-[#F5730C] transition-colors">
                  <Phone className="h-4 w-4 text-[#F5730C] mt-0.5 shrink-0" />
                  +91 9900506684
                </a>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-[#F5730C] mt-0.5 shrink-0" />
                  <div className="text-white/50 space-y-0.5">
                    <a href="mailto:ceo@stemroboai.com" className="block hover:text-[#F5730C] transition-colors">
                      info@stemroboai.com
                    </a>
                    {/* <a href="mailto:stemroboaiblr@gmail.com" className="block hover:text-[#F5730C] transition-colors">
                      stemroboaiblr@gmail.com
                    </a> */}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-[#F5730C] mt-0.5 shrink-0" />
                  <div className="text-white/50 leading-relaxed">
                    Ashwathnagar, RMV 2nd Stage
                    <br />
                    Bangalore, India
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center sm:text-left">
              © 2026 STEM RoboAI. Shaping tomorrow's minds.
            </p>
            {/* <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-wide text-white/35">
              <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;