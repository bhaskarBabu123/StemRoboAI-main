import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Cpu,
  Plane,
  Headset,
  Printer,
  Handshake,
  CheckCircle,
  Star,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Quote,
  Users,
  ShieldCheck,
  Clock,
  GraduationCap,
} from "lucide-react";
import Hero from "../components/Hero";
import { image19, image38, image6, image7 } from "../components/ImageList";

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

const products = [
  {
    icon: Building2,
    title: "STEM Skill Lab Setup",
    bestFor: "Schools starting from scratch",
    description:
      "Complete turnkey solutions for establishing state-of-the-art STEM laboratories with all necessary equipment, furniture, and technology infrastructure.",
    features: [
      "Lab design and space planning",
      "Equipment procurement and setup",
      "Safety protocols implementation",
      "Training and support",
      "Maintenance packages available",
    ],
    image: image19,
    pricing: "Custom Quote",
    popular: false,
  },
  {
    icon: Cpu,
    title: "AI & Robotics Kits",
    bestFor: "Classrooms adding hands-on hardware",
    description:
      "Comprehensive educational kits containing robots, sensors, programming tools, and curriculum materials for hands-on learning experiences.",
    features: [
      "Age-appropriate robot kits",
      "Programming software included",
      "Step-by-step learning guides",
      "Teacher training materials",
      "Technical support included",
    ],
    image: image38,
    pricing: "From ₹25,000",
    popular: true,
  },
  {
    icon: Plane,
    title: "Drone Training Modules",
    bestFor: "Aerospace & robotics electives",
    description:
      "Professional drone education programs including hardware, software, safety training, and certification preparation.",
    features: [
      "Educational drones included",
      "Flight simulation software",
      "Safety and regulations training",
      "Hands-on flying experience",
      "Certification pathway",
    ],
    image: "https://assets.skyfilabs.com/images/blog/drone-training-for-kids-in-delhi.webp",
    pricing: "From ₹45,000",
    popular: false,
  },
  {
    icon: Headset,
    title: "AR/VR Lab Installation",
    bestFor: "Immersive & design-led programs",
    description:
      "Complete virtual and augmented reality learning environments with headsets, computers, and educational content.",
    features: [
      "VR/AR hardware setup",
      "Educational content library",
      "Development tools access",
      "Teacher training program",
      "Ongoing content updates",
    ],
    image: "https://media.istockphoto.com/id/621694778/photo/browsing-a-virtual-world-in-virtual-reality-glasses.jpg?s=612x612&w=0&k=20&c=ldWr1yPeU0jij5HrTYmE_yvsREmt_4z-_TVZlxjr7oQ=",
    pricing: "From ₹75,000",
    popular: false,
  },
  {
    icon: Printer,
    title: "3D Printing Lab Setup",
    bestFor: "Design & manufacturing tracks",
    description:
      "3D printing facilities including printers, design software, materials, and comprehensive training programs.",
    features: [
      "Professional 3D printers",
      "Design software licenses",
      "Printing materials supply",
      "Safety equipment included",
      "Maintenance and support",
    ],
    image: "https://www.shutterstock.com/shutterstock/videos/3863461499/thumb/11.jpg?ip=x480",
    pricing: "From ₹35,000",
    popular: false,
  },
  {
    icon: Handshake,
    title: "School Partnership Programs",
    bestFor: "Long-term curriculum ownership",
    description:
      "Long-term partnerships providing ongoing STEM education support, teacher development, and curriculum updates.",
    features: [
      "Curriculum development",
      "Regular teacher training",
      "Student assessment tools",
      "Progress tracking system",
      "Annual program updates",
    ],
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=700",
    pricing: "Annual Plans",
    popular: true,
  },
];

const trustStats = [
  { label: "Partner schools", value: "150+" },
  { label: "Satisfaction rate", value: "98%" },
  { label: "Years delivering", value: "5+" },
  { label: "Avg. support response", value: "<24h" },
];

const serviceProcess = [
  { step: "01", title: "Consultation", description: "We assess your school's needs, space, and goals to design the perfect STEM solution." },
  { step: "02", title: "Proposal", description: "Receive a detailed proposal with equipment specifications, timeline, and pricing." },
  { step: "03", title: "Installation", description: "Our expert team handles complete setup, testing, and quality assurance." },
  { step: "04", title: "Training", description: "Comprehensive teacher training ensures successful program implementation." },
  { step: "05", title: "Support", description: "Ongoing technical support and maintenance keeps your programs running smoothly." },
];

const benefits = [
  { title: "Proven Results", description: "Over 150 schools have successfully implemented our programs with measurable student engagement improvements." },
  { title: "Complete Support", description: "From planning to implementation to ongoing support, we handle every aspect of your STEM transformation." },
  { title: "Expert Training", description: "Our certified trainers ensure your teachers are confident and capable of delivering exceptional STEM education." },
  { title: "Flexible Solutions", description: "Customizable packages that fit your budget, space, and educational goals perfectly." },
];

const faqs = [
  { q: "How is pricing determined for a full lab setup?", a: "Lab setups are quoted after a short consultation covering space, student count, and which tracks you want — pricing depends on equipment scope, not a flat rate." },
  { q: "How long does installation typically take?", a: "Kit-based programs (robotics, drones, 3D printing) are usually ready within 2–3 weeks. Full lab builds typically run 6–10 weeks depending on scope." },
  { q: "What happens after installation — is support included?", a: "Every package includes an onboarding training block for staff, plus a support window. Ongoing maintenance plans are available as an add-on for hardware-heavy setups." },
  { q: "Can a package be customized for our school's size or budget?", a: "Yes — most schools mix and match modules (e.g. Robotics kits plus a Partnership plan) rather than taking a fixed bundle. Your proposal reflects exactly what you select." },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

const ProductsServices = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-[#F7F8FC]">
      <style>{FONT_STYLE}</style>
      <div className="font-body">
        <Hero
          title="Products & Services"
          subtitle="Comprehensive STEM education solutions to transform your school into a modern learning environment."
          showButtons={false}
          isSmall={true}
        />

        {/* Trust strip */}
        <section className="py-14 border-b border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {trustStats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl sm:text-4xl font-semibold text-[#0B1130]">{s.value}</p>
                  <p className="font-mono text-xs uppercase tracking-wide text-[#0B1130]/45 mt-1.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* PRODUCTS GRID                                                 */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-16"
            >
              <Eyebrow>What we offer</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                Complete STEM solutions for modern schools
              </h2>
              <p className="mt-5 text-lg text-[#0B1130]/60 leading-relaxed">
                From individual kits to complete laboratory setups, we
                provide everything needed to bring cutting-edge STEM
                education to your students.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="relative bg-white rounded-2xl border border-[#0B1130]/8 overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-[#0B1130]/5"
                >
                  {product.popular && (
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-[#F5730C] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      <Star className="h-3 w-3" />
                      Popular
                    </div>
                  )}

                  <div className="relative h-48 overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1130]/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-wide text-white/80">
                      {product.bestFor}
                    </span>
                  </div>

                  <div className="p-7 lg:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-xl bg-[#0B1130] flex items-center justify-center shrink-0">
                        <product.icon className="h-5 w-5 text-[#F5730C]" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-[#0B1130] leading-snug">
                        {product.title}
                      </h3>
                    </div>

                    <p className="text-sm text-[#0B1130]/60 leading-relaxed mb-6">
                      {product.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-[#12C7CF] mt-0.5 shrink-0" />
                          <span className="text-sm text-[#0B1130]/60">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-[#0B1130]/8 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-display text-xl font-semibold text-[#0B1130]">
                          {product.pricing}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 bg-[#F5730C] hover:bg-[#e5670a] text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                      >
                        Get Quote
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* COMPARE AT A GLANCE                                           */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36 bg-white border-y border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-12"
            >
              <Eyebrow>At a glance</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                Compare every package
              </h2>
            </motion.div>

            <div className="rounded-2xl border border-[#0B1130]/10 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="bg-[#F7F8FC] border-b border-[#0B1130]/8">
                    <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-[#0B1130]/45">Package</th>
                    <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-[#0B1130]/45">Best for</th>
                    <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-[#0B1130]/45">Starting at</th>
                    <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-[#0B1130]/45">Popular</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={i} className="border-b border-[#0B1130]/6 last:border-0 hover:bg-[#F7F8FC] transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-[#0B1130] flex items-center justify-center">
                          <p.icon className="h-4 w-4 text-[#F5730C]" />
                        </div>
                        <span className="font-medium text-[#0B1130]">{p.title}</span>
                      </td>
                      <td className="px-6 py-4 text-[#0B1130]/60">{p.bestFor}</td>
                      <td className="px-6 py-4 text-[#0B1130]/60">{p.pricing}</td>
                      <td className="px-6 py-4">
                        {p.popular ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#F5730C]">
                            <Star className="h-3 w-3" /> Popular
                          </span>
                        ) : (
                          <span className="text-[#0B1130]/30 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SERVICE PROCESS — timeline, styled like the milestone timeline */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-16 lg:mb-20"
            >
              <Eyebrow>How we work</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                Our Service Process
              </h2>
              <p className="mt-5 text-lg text-[#0B1130]/60 leading-relaxed">
                A systematic approach to ensure seamless implementation of
                STEM solutions in your school.
              </p>
            </motion.div>

            <div className="relative">
              <div className="hidden lg:block absolute top-0 bottom-0 left-[88px] w-px bg-[#0B1130]/10" />
              <div className="space-y-10 lg:space-y-0">
                {serviceProcess.map((process, i) => (
                  <motion.div
                    key={process.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative flex flex-col lg:flex-row gap-4 lg:gap-10 lg:items-start lg:py-6"
                  >
                    <div className="flex items-center gap-4 lg:w-[176px] shrink-0">
                      <span className="font-mono text-sm text-[#F5730C] font-semibold w-16">{process.step}</span>
                      <span className="hidden lg:block h-3 w-3 rounded-full bg-[#F5730C] shadow-[0_0_0_4px_rgba(245,115,12,0.15)] relative z-10" />
                    </div>
                    <div className="pb-8 lg:pb-0 border-b border-[#0B1130]/8 lg:border-none flex-1">
                      <h3 className="font-display text-lg font-semibold text-[#0B1130] mb-1.5">{process.title}</h3>
                      <p className="text-[#0B1130]/55 leading-relaxed max-w-xl">{process.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* WHY SCHOOLS CHOOSE US                                         */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36 bg-white border-y border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Eyebrow>Why us</Eyebrow>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] mb-7 leading-[1.1]">
                  Why schools choose{" "}
                  <span className="text-[#F5730C]">our solutions</span>
                </h2>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="h-9 w-9 rounded-lg bg-[#0B1130] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-[#F5730C]" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-[#0B1130] mb-1.5">{benefit.title}</h3>
                        <p className="text-[#0B1130]/60 leading-relaxed">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="blueprint-frame relative"
              >
                <div className="rounded-2xl overflow-hidden h-96">
                  <img
                    src={image6}
                    alt="STEM Lab Setup"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-7 -right-7 bg-[#0B1130] text-white p-6 rounded-xl shadow-xl">
                  <div className="text-center">
                    <p className="font-display text-3xl font-bold leading-none text-[#F5730C]">98%</p>
                    <p className="font-mono text-[10px] uppercase tracking-wide mt-1.5 text-white/70">
                      Satisfaction rate
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* TESTIMONIAL CALLOUT                                           */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-[#0B1130] text-white rounded-3xl px-8 py-16 sm:px-16 sm:py-20 overflow-hidden text-center"
            >
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "36px 36px" }}
              />
              <div className="relative max-w-3xl mx-auto">
                <Quote className="h-8 w-8 text-[#F5730C] mx-auto mb-6" />
                <p className="font-display text-2xl sm:text-3xl font-medium leading-snug">
                  The team handled everything from lab layout to teacher
                  training. Six months in, our robotics elective has a
                  waitlist for the first time ever.
                </p>
                <p className="font-mono text-xs uppercase tracking-wide text-white/50 mt-6">
                  Program Coordinator, Partner School
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FAQ                                                           */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36 bg-white border-y border-[#0B1130]/8">
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
                  <div key={f.q} className="rounded-xl border border-[#0B1130]/10 overflow-hidden bg-[#F7F8FC]">
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                    >
                      <span className="font-medium text-[#0B1130]">{f.q}</span>
                      <ChevronDown className={`h-4 w-4 shrink-0 text-[#0B1130]/40 transition-transform ${isOpen ? "rotate-180" : ""}`} />
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
        {/* CTA Banner                                                    */}
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
                style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}
              />
              <div className="relative max-w-2xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-5 leading-tight">
                  Ready to transform your school's STEM program?
                </h2>
                <p className="text-white/60 mb-9 text-lg">
                  Tell us about your space, budget, and goals — we'll put
                  together a proposal built around what your students
                  actually need.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-[#F5730C] hover:bg-[#e5670a] text-white px-9 py-4 rounded-full font-medium transition-colors duration-300"
                  >
                    Request a quote
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.button>
                  <button className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-9 py-4 rounded-full font-medium transition-colors duration-300">
                    <GraduationCap className="h-4 w-4" />
                    Talk to our team
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductsServices;