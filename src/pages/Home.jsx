import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Lightbulb,
  Users,
  Globe,
  Award,
  Cpu,
  Bone as Drone,
  Headset as VrHeadset,
  Printer,
  Code,
  Target,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { useRef, useState } from "react";
import Hero from "../components/Hero";
import AnimatedCounter from "../components/AnimatedCounter";
import LabGallery from "../components/LabGallery";
import VideoShowcase from "../components/VideoShowcase";
import { image14, image2, image38 } from "../components/ImageList";

/* -------------------------------------------------------------------------
   Design tokens (see notes below the component for how to wire these into
   tailwind.config.js / index.html instead of the inline <style> tag)
   ink      #0B1130  – primary dark / text
   paper    #F7F8FC  – page background
   navy     #142057  – secondary dark surface
   accent   #F5730C  – brand orange (kept from original)
   circuit  #12C7CF  – tech/circuit accent
   line     #E4E7F2  – hairline borders on light surfaces
   display  'Space Grotesk' – headlines
   body     'Inter' – copy
   mono     'JetBrains Mono' – eyebrows, stats, labels
------------------------------------------------------------------------- */

/* ---------------------------- Generic Carousel --------------------------- */
const Carousel = ({ items, renderItem, perView = { base: 1, md: 2, lg: 3 } }) => {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  const maxIndex = Math.max(0, items.length - perView.lg);

  const go = (dir) => {
    setIndex((prev) => Math.min(Math.max(prev + dir, 0), maxIndex));
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-6 md:gap-8"
          animate={{ x: `calc(-${index} * (100% / ${perView.lg}) - ${index} * 1.5rem)` }}
          transition={{ type: "spring", stiffness: 220, damping: 30 }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
            >
              {renderItem(item, i)}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-[#F5730C]" : "w-1.5 bg-[#0B1130]/15 hover:bg-[#0B1130]/30"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous"
            className="h-11 w-11 rounded-full border border-[#0B1130]/15 flex items-center justify-center text-[#0B1130] hover:bg-[#0B1130] hover:text-white hover:border-[#0B1130] transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#0B1130]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            disabled={index === maxIndex}
            aria-label="Next"
            className="h-11 w-11 rounded-full border border-[#0B1130]/15 flex items-center justify-center text-[#0B1130] hover:bg-[#0B1130] hover:text-white hover:border-[#0B1130] transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#0B1130]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ Section Label ----------------------------- */
const Eyebrow = ({ children, dark = false }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="h-2 w-2 rounded-full bg-[#F5730C]" />
    <span
      className={`font-['JetBrains_Mono'] text-xs tracking-[0.25em] uppercase ${
        dark ? "text-white/60" : "text-[#0B1130]/50"
      }`}
    >
      {children}
    </span>
  </div>
);

/* -------------------------------- Component ------------------------------- */
const Home = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const traceHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const aboutImgRef = useRef(null);
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutImgRef,
    offset: ["start end", "end start"],
  });
  const aboutY = useTransform(aboutProgress, [0, 1], ["-6%", "6%"]);

  const features = [
    { icon: Lightbulb, title: "Innovation-first curriculum", description: "Every module is rebuilt each year around the tools students will actually use in industry, not last decade's syllabus." },
    { icon: Users, title: "Learn by building", description: "Students leave every session with something they made — a working circuit, a line of code that runs, a printed part." },
    { icon: Globe, title: "Grounded in real problems", description: "Projects are drawn from agriculture, mobility and healthcare challenges familiar to Indian classrooms." },
    { icon: Award, title: "A path beyond the classroom", description: "Certifications, competitions and mentor introductions carry students from first robot to first internship." },
  ];

  const programs = [
    { icon: Cpu, title: "Robotics & Automation", description: "Build and program intelligent robots using sensors, actuators and control logic.", image: image38 },
    { icon: Globe, title: "IoT & Smart Systems", description: "Wire connected devices and dashboards that turn everyday objects into data.", image: "https://iot-now.com/app/uploads/2024/07/557961.jpg" },
    { icon: Drone, title: "Drone Engineering", description: "Design, assemble and fly autonomous drones with real navigation systems.", image: "https://www2.euroengineerjobs.com/content/articleimages/article_1017_image.png" },
    { icon: VrHeadset, title: "AR / VR Development", description: "Prototype immersive experiences that blend the physical and digital classroom.", image: "https://5.imimg.com/data5/SELLER/Default/2023/4/298691204/SM/EY/XK/183251335/augmented-reality-virtual-reality-ar-vr-development.jpg" },
    { icon: Printer, title: "3D Design & Printing", description: "Move from sketch to CAD to a physical part on a build plate.", image: "https://www.businessworldit.com/wp-content/uploads/2020/01/types_of_3D-_printing_technology.jpg" },
    { icon: Code, title: "Coding & Software", description: "Progress from block-based logic to real languages behind working software.", image: "https://www.tutorialspoint.com/basics_of_computer_science/images/software_programming.jpg" },
  ];

  const benefits = [
    { title: "Industry-aligned curriculum", detail: "Updated annually with input from working engineers and technologists." },
    { title: "Expert mentors", detail: "Trainers with real project experience, not just certification slides." },
    { title: "Hands-on projects", detail: "Every unit ends in a working build, never just a worksheet." },
    { title: "Advanced STEM labs", detail: "Fully equipped, school-owned labs — not shared kits on a trolley." },
    { title: "Teacher training", detail: "Your own staff certified to run and extend the program independently." },
    { title: "Partnership support", detail: "From lab layout to parent orientation, we stay through the full year." },
  ];

  const testimonials = [
    { name: "Dr. Sarah Johnson", role: "School Principal", image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300", content: "STEM RoboAI has transformed our school's approach to technology education. Our students are now more engaged and excited about learning." },
    { name: "Alex Chen", role: "Grade 10 Student", image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300", content: "The robotics program opened my eyes to engineering. I built my first robot and now I know what I want to study in college." },
    { name: "Maria Rodriguez", role: "Parent", image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300", content: "My daughter came home excited about coding every day. STEM RoboAI has given her confidence in technology and problem-solving." },
    { name: "Rahul Mehta", role: "STEM Coordinator", image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&flip=h", content: "Setup to first working lab took under three weeks. The teacher training was the part that actually made it stick." },
  ];

  const events = [
    { title: "Robotics Competition 2026", date: "March 15, 2026", tag: "Competition", image: "https://images.pexels.com/photos/8471915/pexels-photo-8471915.jpeg?auto=compress&cs=tinysrgb&w=700" },
    { title: "AI Workshop Series", date: "February 28, 2026", tag: "Workshop", image: "https://images.pexels.com/photos/7516559/pexels-photo-7516559.jpeg?auto=compress&cs=tinysrgb&w=700" },
    { title: "STEM Exhibition", date: "April 10, 2026", tag: "Exhibition", image: "https://images.pexels.com/photos/8471919/pexels-photo-8471919.jpeg?auto=compress&cs=tinysrgb&w=700" },
  ];

  const gallery = [
    "https://images.pexels.com/photos/8471728/pexels-photo-8471728.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8471915/pexels-photo-8471915.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/7516559/pexels-photo-7516559.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8471919/pexels-photo-8471919.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  const faqs = [
    { question: "What age groups do you teach?", answer: "We provide programs for K-12 students, with age-appropriate curricula designed for elementary, middle, and high school levels." },
    { question: "Do schools receive STEM labs?", answer: "Yes, we provide complete STEM lab setup including equipment, software, and infrastructure tailored to your school's needs." },
    { question: "Do students receive certification?", answer: "Students receive certificates of completion for each program, and advanced students can earn industry-recognized certifications." },
    { question: "How can schools partner with STEM RoboAI?", answer: "Schools can partner with us through our comprehensive programs including lab setup, curriculum integration, and teacher training." },
    { question: "Do teachers receive training?", answer: "Yes, we provide extensive teacher training programs so educators can confidently run and extend the program on their own." },
  ];

  return (
    <div ref={pageRef} className="pt-16 bg-[#F7F8FC] overflow-x-hidden">
      {/* Font import — move to index.html <head> in production for best performance */}
      <style>{`
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
      `}</style>

      <div className="font-body">
        {/* Circuit-trace scroll signature — desktop only */}
        <div className="hidden lg:block fixed left-8 top-0 bottom-0 w-px z-30 pointer-events-none">
          <div className="absolute inset-0 bg-[#0B1130]/8" />
          <motion.div
            style={{ height: traceHeight }}
            className="absolute top-0 left-0 w-px bg-gradient-to-b from-[#12C7CF] to-[#F5730C]"
          />
          <motion.div
            style={{ top: traceHeight }}
            className="absolute -left-[5px] h-[11px] w-[11px] rounded-full bg-[#F5730C] shadow-[0_0_12px_2px_rgba(245,115,12,0.5)]"
          />
        </div>

        {/* Hero Section */}
        <Hero />

        {/* Trust Strip */}
        <section className="border-y border-[#0B1130]/8 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
              {[
                { n: "150+", l: "Schools partnered" },
                { n: "5,000+", l: "Students trained" },
                { n: "500+", l: "Workshops run" },
                { n: "100+", l: "STEM labs installed" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="font-display text-2xl md:text-3xl font-semibold text-[#0B1130]">{s.n}</p>
                  <p className="font-mono text-[11px] tracking-wide uppercase text-[#0B1130]/45 mt-1">{s.l}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Eyebrow>Who we are</Eyebrow>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] mb-7 leading-[1.1]">
                  Technology education built for the way engineers actually learn
                </h2>
                <p className="text-lg text-[#0B1130]/65 mb-6 leading-relaxed">
                  STEM RoboAI runs the robotics, AI, IoT and drone labs inside partner
                  schools across India — not a one-day workshop, a full year of
                  hands-on building. Students leave each unit with a working
                  prototype, not a printed certificate.
                </p>
                <p className="text-lg text-[#0B1130]/65 mb-10 leading-relaxed">
                  Our trainers come from engineering backgrounds, and our labs stay
                  installed in your school long after we leave — run by teachers we
                  certify to carry the program forward.
                </p>
                <motion.button
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 bg-[#0B1130] hover:bg-[#F5730C] text-white px-8 py-4 rounded-full font-medium transition-colors duration-300"
                >
                  Learn about our approach
                  <ArrowUpRight className="h-4 w-4" />
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="blueprint-frame"
                ref={aboutImgRef}
              >
                <div className="rounded-2xl overflow-hidden h-[420px] lg:h-[520px]">
                  <motion.img
                    style={{ y: aboutY, scale: 1.15 }}
                    src={image2}
                    alt="Students building a robotics project"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-xl p-5 hidden md:flex items-center gap-4 max-w-[240px]">
                  <div className="h-11 w-11 rounded-full bg-[#12C7CF]/10 flex items-center justify-center shrink-0">
                    <Cpu className="h-5 w-5 text-[#12C7CF]" />
                  </div>
                  <p className="text-sm text-[#0B1130]/70 leading-snug">
                    Labs stay in the building — teachers run them after year one.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* STEM Approach Section */}
        <section className="py-24 sm:py-28 lg:py-36 bg-white border-y border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-16 lg:mb-20"
            >
              <Eyebrow>Our approach</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                Four principles behind every lab session
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14 relative">
              <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-[#0B1130]/10" />
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="h-16 w-16 rounded-2xl bg-[#0B1130] flex items-center justify-center mb-7 relative z-10">
                    <feature.icon className="h-7 w-7 text-[#F5730C]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#0B1130] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#0B1130]/60 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 lg:mb-20"
            >
              <div className="max-w-2xl">
                <Eyebrow>Programs</Eyebrow>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                  Six labs, one skill you can point to at the end of each
                </h2>
              </div>
              <p className="text-[#0B1130]/55 max-w-sm">
                Drag or use the arrows below — each program runs as a standalone
                term or bundled into a full-year lab.
              </p>
            </motion.div>

            <Carousel
              items={programs}
              renderItem={(program) => (
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(11,17,48,0.06)] hover:shadow-[0_12px_40px_rgba(11,17,48,0.12)] transition-shadow duration-300 h-full flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1130]/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 h-11 w-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center">
                      <program.icon className="h-5 w-5 text-[#0B1130]" />
                    </div>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-display text-xl font-semibold text-[#0B1130] mb-3">
                      {program.title}
                    </h3>
                    <p className="text-[#0B1130]/60 mb-6 leading-relaxed flex-1">
                      {program.description}
                    </p>
                    <button className="text-[#F5730C] font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-300 self-start">
                      <span>View curriculum</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            />
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 sm:py-28 lg:py-36 bg-white border-y border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="order-2 lg:order-1"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06 }}
                      className="p-6 rounded-xl border border-[#0B1130]/10 hover:border-[#F5730C]/40 hover:bg-[#F7F8FC] transition-colors duration-300"
                    >
                      <CheckCircle2 className="h-5 w-5 text-[#F5730C] mb-4" />
                      <h3 className="font-display font-semibold text-[#0B1130] mb-1.5">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-[#0B1130]/55 leading-relaxed">{benefit.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="order-1 lg:order-2"
              >
                <Eyebrow>Why partner with us</Eyebrow>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] mb-7 leading-[1.1]">
                  Everything a lab needs to outlast the pilot year
                </h2>
                <p className="text-lg text-[#0B1130]/65 leading-relaxed mb-8">
                  Most STEM pilots quietly stop after the first year. Ours are
                  built to keep running — equipment your school owns, teachers who
                  are certified to lead, and a curriculum that updates on its own
                  schedule.
                </p>
                <div className="rounded-2xl overflow-hidden h-72">
                  <img
                    src={image14}
                    alt="Teacher guiding students through a STEM lab"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="relative py-24 sm:py-28 lg:py-36 bg-[#0B1130] text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-16 lg:mb-20"
            >
              <Eyebrow dark>By the numbers</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.1]">
                Four years of labs, measured in builds, not seats filled
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-8">
              {[
                { end: 150, suffix: "+", label: "Schools partnered" },
                { end: 5000, suffix: "+", label: "Students trained" },
                { end: 500, suffix: "+", label: "Workshops conducted" },
                { end: 100, suffix: "+", label: "STEM labs installed" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-l-2 border-[#F5730C] pl-5"
                >
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  <p className="text-white/50 font-mono text-xs uppercase tracking-wide mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
       <LabGallery/>

        {/* Testimonials Section */}
        <section className="py-24 sm:py-28 lg:py-36 bg-white border-y border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-16 lg:mb-20"
            >
              <Eyebrow>What partners say</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                From principals, parents and the students themselves
              </h2>
            </motion.div>

            <Carousel
              items={testimonials}
              perView={{ base: 1, md: 2, lg: 3 }}
              renderItem={(testimonial) => (
                <div className="bg-[#F7F8FC] p-8 rounded-2xl h-full flex flex-col border border-[#0B1130]/8">
                  <div className="flex items-center mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-[#F5730C] fill-current" />
                    ))}
                  </div>
                  <p className="text-[#0B1130]/70 mb-8 leading-relaxed flex-1">
                    {testimonial.content}
                  </p>
                  {/* <div className="flex items-center pt-6 border-t border-[#0B1130]/8">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-11 h-11 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-display font-semibold text-[#0B1130] text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-[#0B1130]/50">{testimonial.role}</p>
                    </div>
                  </div> */}
                </div>
              )}
            />
          </div>
        </section>

        {/* News & Events Preview */}
        {/* <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 lg:mb-20"
            >
              <div>
                <Eyebrow>Calendar</Eyebrow>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                  Latest news &amp; events
                </h2>
              </div>
              <button className="hidden md:inline-flex items-center gap-2 text-[#0B1130] font-medium border-b-2 border-[#F5730C] pb-1 hover:gap-3 transition-all duration-300">
                View all events <ArrowUpRight className="h-4 w-4" />
              </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group rounded-2xl overflow-hidden bg-white shadow-[0_2px_20px_rgba(11,17,48,0.06)] hover:shadow-[0_12px_40px_rgba(11,17,48,0.12)] transition-shadow duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#0B1130] text-xs font-mono uppercase tracking-wide px-3 py-1.5 rounded-full">
                      {event.tag}
                    </span>
                  </div>
                  <div className="p-7">
                    <p className="text-[#F5730C] text-sm font-mono mb-2">{event.date}</p>
                    <h3 className="font-display text-xl font-semibold text-[#0B1130]">
                      {event.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <button className="inline-flex items-center gap-2 bg-[#0B1130] text-white px-8 py-3.5 rounded-full font-medium">
                View all events <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section> */}
        <VideoShowcase/>

        {/* CTA Banner */}
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
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-5 leading-tight">
                  Bring a working STEM lab to your school this term
                </h2>
                <p className="text-white/60 mb-9 text-lg">
                  Talk to our team about curriculum fit, lab setup and teacher
                  training — most partnerships go live within three weeks.
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#F5730C] hover:bg-[#ff8a2e] text-white px-9 py-4 rounded-full font-medium transition-colors duration-300"
                >
                  Start a partnership
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 lg:mb-20"
            >
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                Frequently asked questions
              </h2>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="bg-white rounded-xl border border-[#0B1130]/8 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-7 py-5 text-left flex justify-between items-center gap-4 hover:bg-[#F7F8FC] transition-colors duration-200"
                  >
                    <span className="font-display font-semibold text-[#0B1130]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#0B1130]/40 shrink-0 transition-transform duration-300 ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-7 pb-6 text-[#0B1130]/60 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;