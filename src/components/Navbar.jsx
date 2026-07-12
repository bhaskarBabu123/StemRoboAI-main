import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Cpu, ArrowUpRight } from "lucide-react";
import logo from '../images/logo.jpg';

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  .font-body { font-family: 'Inter', sans-serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Products & Services", path: "/products-services" },
    { name: "News & Events", path: "/news-events" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <style>{FONT_STYLE}</style>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`font-body fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(11,17,48,0.08)]"
            : "bg-white/90 backdrop-blur-md"
        }`}
      >
        {/* hairline gradient accent along the top edge — reads as a circuit trace */}
        <div className="h-[2px] w-full bg-gradient-to-r from-[#12C7CF] via-[#F5730C] to-[#12C7CF]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group p-2">
             <img src={logo} alt="STEM RoboAI Logo" className=" rounded-full object-cover" width={60} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? "text-[#F5730C]"
                      : "text-[#0B1130]/70 hover:text-[#0B1130]"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeLink"
                      className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#F5730C] rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+919663131857"
                className="flex items-center gap-1.5 text-xs font-mono text-[#0B1130]/50 hover:text-[#F5730C] transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                +91 99005 06684
              </a>
              {/* <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="bg-[#F5730C] hover:bg-[#e5670a] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5"
              >
                Enroll now
                <ArrowUpRight className="h-3.5 w-3.5" />
              </motion.button> */}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-lg bg-[#0B1130]/5"
            >
              {isOpen ? (
                <X className="h-5 w-5 text-[#0B1130]" />
              ) : (
                <Menu className="h-5 w-5 text-[#0B1130]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t border-[#0B1130]/8 overflow-hidden"
            >
              <div className="px-4 py-5 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                        location.pathname === link.path
                          ? "text-[#F5730C] bg-[#F5730C]/8"
                          : "text-[#0B1130]/75 hover:text-[#0B1130] hover:bg-[#0B1130]/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-4 mt-4 border-t border-[#0B1130]/8 space-y-3">
                  <a
                    href="tel:+919663131857"
                    className="flex items-center gap-2.5 px-3 text-sm text-[#0B1130]/60 font-mono"
                  >
                    <Phone className="h-4 w-4 text-[#F5730C]" /> +91 99005 06684
                  </a>
                  {/* <button className="w-full bg-[#F5730C] text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-1.5">
                    Enroll now <ArrowUpRight className="h-3.5 w-3.5" />
                  </button> */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;