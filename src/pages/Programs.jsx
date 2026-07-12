import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Globe,
  Plane,
  Headset,
  Printer,
  Code,
  Users,
  Clock,
  Award,
  Target,
  Wrench,
  GraduationCap,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Check,
  ArrowUpRight,
  Zap,
  Compass,
  PackageCheck,
  Maximize2,
} from "lucide-react";
import Hero from "../components/Hero";
import { image38, image5 } from "../components/ImageList";

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

const programs = [
  {
    specId: "RA-104",
    icon: Cpu,
    title: "Robotics & AI",
    tagline: "Build machines that think",
    overview:
      "Students learn to build, program, and control intelligent robots using cutting-edge AI algorithms and machine learning techniques.",
    skills: ["Robot Programming", "Sensor Integration", "Machine Learning Basics", "Computer Vision", "Autonomous Navigation", "Human-Robot Interaction"],
    tools: ["Arduino & Raspberry Pi", "Python", "TensorFlow Lite", "OpenCV", "ROS", "Sensors & Actuators"],
    benefits: ["Problem-solving skills", "Logical thinking", "Programming proficiency", "Applied AI concepts", "Hands-on engineering experience"],
    ageGroups: "Grades 6–12",
    duration: "4–6 months",
    intensity: 4,
    image: image38,
  },
  {
    specId: "IOT-207",
    icon: Globe,
    title: "IoT Solutions",
    tagline: "Connect the physical world",
    overview:
      "Create connected smart devices and systems that can communicate, collect data, and respond to environmental changes.",
    skills: ["Circuit Design", "Sensor Networks", "Wireless Communication", "Data Collection & Analysis", "Cloud Integration", "Mobile App Development"],
    tools: ["ESP32 / ESP8266", "Arduino IDE", "MQTT Protocol", "Firebase", "Blynk Platform", "IoT Sensors"],
    benefits: ["Understanding connected systems", "Data analysis skills", "Real-world problem solving", "Innovation mindset", "Future-tech readiness"],
    ageGroups: "Grades 7–12",
    duration: "3–5 months",
    intensity: 3,
    image: image5,
  },
  {
    specId: "DRN-308",
    icon: Plane,
    title: "Drone Technology",
    tagline: "Design flight, program autonomy",
    overview:
      "Design, build, and program autonomous drones with advanced navigation and mission planning capabilities.",
    skills: ["Aerodynamics Basics", "Flight Control Systems", "GPS Navigation", "Autonomous Flight Programming", "Aerial Photography", "Mission Planning"],
    tools: ["Flight Controllers", "Mission Planner", "ArduPilot", "Ground Control Stations", "Telemetry Systems", "FPV Equipment"],
    benefits: ["Physics & engineering concepts", "Spatial awareness", "Programming skills", "Safety protocols", "Aerospace career prep"],
    ageGroups: "Grades 8–12",
    duration: "4–6 months",
    intensity: 4,
    image: "https://media.istockphoto.com/id/936173140/photo/little-girl-child-playing-with-drone-at-home.jpg?s=612x612&w=0&k=20&c=4QFMEqOmyhp-9Jw5gQm_4DV3eIAZEN6QfvFr82wQ5RE=",
  },
  {
    specId: "ARV-409",
    icon: Headset,
    title: "AR/VR Labs",
    tagline: "Design immersive worlds",
    overview:
      "Develop immersive virtual and augmented reality experiences using cutting-edge tools and programming languages.",
    skills: ["3D Modeling & Design", "Unity Development", "VR/AR Programming", "User Experience Design", "Interactive Storytelling", "Spatial Computing"],
    tools: ["Unity 3D Engine", "Blender", "Meta Quest", "ARCore / ARKit", "C# Programming", "VR/AR Hardware"],
    benefits: ["Creative expression", "Advanced programming", "Design thinking", "Future technology skills", "Digital content creation"],
    ageGroups: "Grades 9–12",
    duration: "5–7 months",
    intensity: 5,
    image: "https://media.istockphoto.com/id/621694778/photo/browsing-a-virtual-world-in-virtual-reality-glasses.jpg?s=612x612&w=0&k=20&c=ldWr1yPeU0jij5HrTYmE_yvsREmt_4z-_TVZlxjr7oQ=",
  },
  {
    specId: "TDP-205",
    icon: Printer,
    title: "3D Printing",
    tagline: "From CAD file to physical part",
    overview:
      "Master 3D modeling, design thinking, and additive manufacturing to bring digital creations to life.",
    skills: ["3D CAD Design", "Parametric Modeling", "Print Preparation", "Material Science", "Quality Control", "Design Optimization"],
    tools: ["Fusion 360", "Tinkercad", "PrusaSlicer", "FDM Printers", "Filaments", "Post-processing Tools"],
    benefits: ["Spatial reasoning", "Engineering design process", "Manufacturing understanding", "Creativity & innovation", "Practical problem solving"],
    ageGroups: "Grades 5–12",
    duration: "3–4 months",
    intensity: 2,
    image: "https://www.shutterstock.com/shutterstock/videos/3863461499/thumb/11.jpg?ip=x480",
  },
  {
    specId: "DEV-406",
    icon: Code,
    title: "Coding & Software Dev",
    tagline: "Ship real software",
    overview:
      "Learn programming languages and develop software solutions for real-world problems across multiple platforms.",
    skills: ["Programming Fundamentals", "Web Development", "Mobile App Development", "Database Management", "Software Architecture", "Version Control"],
    tools: ["Python, JS, Java", "React, Node.js", "Flutter / RN", "MySQL, MongoDB", "Git, GitHub", "VS Code"],
    benefits: ["Computational thinking", "Logical problem solving", "Career readiness", "Digital literacy", "Innovation capabilities"],
    ageGroups: "Grades 4–12",
    duration: "6–8 months",
    intensity: 3,
    image: "https://media.istockphoto.com/id/1254050848/photo/smart-schoolboy-uses-laptop-to-program-software-for-robotics-engineering-class-elementary.jpg?s=612x612&w=0&k=20&c=4imK7-BVxxorFs6EewSJ5Vx-TJ4I5hoEAzw3ORTR_28=",
  },
];

const journey = [
  { step: "01", title: "Enroll & Assess", description: "Students pick a track and take a short baseline assessment so mentors can calibrate pace and project difficulty." },
  { step: "02", title: "Build & Iterate", description: "Weekly studio sessions of hands-on building, guided by mentors, with real hardware and real failure-and-retry cycles." },
  { step: "03", title: "Showcase & Present", description: "Every track ends with a demo day — students present working projects to family, peers, and industry reviewers." },
];

const faqs = [
  { q: "Do students need prior coding experience?", a: "No. Every track starts from fundamentals. Prior experience only changes how fast a student moves through the early modules, not whether they can join." },
  { q: "Can a student take more than one track?", a: "Yes — many students complete Coding & Software Dev alongside a hardware track like Robotics or IoT, since the skills compound." },
  { q: "What do students take home?", a: "A working project (robot, printed part, app, or flight-ready drone), a build log, and a demo-day presentation they authored themselves." },
  { q: "How are class sizes structured?", a: "Small mentor-led cohorts, capped to keep hands-on time high — every student gets bench time with real hardware every session." },
];

const quickFacts = [
  { label: "Technical tracks", value: "6" },
  { label: "Grade range", value: "4–12" },
  { label: "Tools & platforms", value: "30+" },
  { label: "Avg. track length", value: "5 mo" },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                             */
/* ------------------------------------------------------------------ */

const IntensityDots = ({ level, size = "sm" }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className={`rounded-full ${size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2"} ${
          i <= level ? "bg-[#F5730C]" : "bg-[#0B1130]/10"
        }`}
      />
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

const Programs = () => {
  const [active, setActive] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const program = programs[active];
  const Icon = program.icon;

  return (
    <div className="bg-[#F7F8FC]">
      <style>{FONT_STYLE}</style>
      <div className="font-body">
        <Hero
          title="Our Programs"
          subtitle="Six technical tracks in robotics, connected devices, flight, immersive design, additive manufacturing, and software — built around projects students actually finish."
          showButtons={false}
          isSmall={true}
        />

        {/* Quick Facts strip */}
        <section className="py-14 border-b border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {quickFacts.map((s) => (
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
        {/* PROGRAM EXPLORER                                              */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-14 lg:mb-16"
            >
              <Eyebrow>Program explorer</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                Pick a track, see the full spec
              </h2>
              <p className="mt-5 text-lg text-[#0B1130]/60 leading-relaxed">
                Every track ships with the same rigor: a real skill list, a
                real tool stack, and a real outcome.
              </p>
            </motion.div>

            {/* tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {programs.map((p, i) => {
                const TabIcon = p.icon;
                const isActive = i === active;
                return (
                  <button
                    key={p.specId}
                    onClick={() => setActive(i)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "border-[#0B1130] bg-[#0B1130] text-white"
                        : "border-[#0B1130]/10 bg-white text-[#0B1130]/60 hover:border-[#0B1130]/25"
                    }`}
                  >
                    <TabIcon className={`h-4 w-4 ${isActive ? "text-[#F5730C]" : "text-[#0B1130]/35"}`} />
                    {p.title}
                  </button>
                );
              })}
            </div>

            {/* spec panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={program.specId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl border border-[#0B1130]/10 bg-white overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  {/* image */}
                  <div className="blueprint-frame relative h-72 lg:col-span-2 lg:h-auto m-6 mr-0 lg:mr-6 rounded-2xl overflow-hidden">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1130]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="font-mono text-xs text-[#F5730C] bg-[#0B1130]/70 rounded-md px-2.5 py-1">
                        {program.specId}
                      </span>
                      <span className="font-mono text-xs text-white bg-[#0B1130]/70 rounded-md px-2.5 py-1">
                        {program.ageGroups}
                      </span>
                    </div>
                  </div>

                  {/* content */}
                  <div className="p-8 lg:p-10 lg:col-span-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="h-12 w-12 rounded-xl bg-[#0B1130] flex items-center justify-center mb-4">
                          <Icon className="h-5 w-5 text-[#F5730C]" />
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-[#0B1130]">
                          {program.title}
                        </h3>
                        <p className="text-sm text-[#0B1130]/50 mt-1">{program.tagline}</p>
                      </div>
                      <div className="hidden sm:block text-right shrink-0">
                        <p className="font-mono text-[11px] uppercase text-[#0B1130]/40 mb-1.5">
                          Intensity
                        </p>
                        <IntensityDots level={program.intensity} size="md" />
                      </div>
                    </div>

                    <p className="mt-5 text-[#0B1130]/65 leading-relaxed">{program.overview}</p>

                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="rounded-lg bg-[#F7F8FC] p-3">
                        <div className="flex items-center gap-1.5 text-[#0B1130]/40 mb-1">
                          <Users className="h-3.5 w-3.5" />
                          <span className="font-mono text-[11px] uppercase">Ages</span>
                        </div>
                        <div className="text-sm font-medium text-[#0B1130]">{program.ageGroups}</div>
                      </div>
                      <div className="rounded-lg bg-[#F7F8FC] p-3">
                        <div className="flex items-center gap-1.5 text-[#0B1130]/40 mb-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span className="font-mono text-[11px] uppercase">Duration</span>
                        </div>
                        <div className="text-sm font-medium text-[#0B1130]">{program.duration}</div>
                      </div>
                      <div className="rounded-lg bg-[#F7F8FC] p-3 sm:hidden">
                        <div className="flex items-center gap-1.5 text-[#0B1130]/40 mb-1">
                          <Zap className="h-3.5 w-3.5" />
                          <span className="font-mono text-[11px] uppercase">Intensity</span>
                        </div>
                        <IntensityDots level={program.intensity} />
                      </div>
                    </div>

                    <button className="mt-7 inline-flex items-center gap-2 font-semibold text-[#0B1130] hover:text-[#F5730C] transition-colors duration-300">
                      View full curriculum
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* skills / tools / benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#0B1130]/8">
                  <div className="p-8 border-b md:border-b-0 md:border-r border-[#0B1130]/8">
                    <h4 className="font-mono text-xs uppercase tracking-wide text-[#0B1130]/40 mb-4 flex items-center gap-2">
                      <Target className="h-4 w-4 text-[#F5730C]" />
                      Skills learned
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {program.skills.map((s) => (
                        <span key={s} className="text-xs font-medium text-[#0B1130]/60 bg-[#F7F8FC] rounded-full px-3 py-1">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-8 border-b md:border-b-0 md:border-r border-[#0B1130]/8">
                    <h4 className="font-mono text-xs uppercase tracking-wide text-[#0B1130]/40 mb-4 flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-[#F5730C]" />
                      Tools & tech
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {program.tools.map((t) => (
                        <span key={t} className="text-xs font-medium text-[#12C7CF] bg-[#12C7CF]/10 rounded-full px-3 py-1">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="font-mono text-xs uppercase tracking-wide text-[#0B1130]/40 mb-4 flex items-center gap-2">
                      <Award className="h-4 w-4 text-[#F5730C]" />
                      Key benefits
                    </h4>
                    <ul className="space-y-2">
                      {program.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-[#0B1130]/60">
                          <Check className="h-3.5 w-3.5 text-[#F5730C] mt-0.5 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ============================================================ */}
        {/* APPROACH — mirrors the About page's Vision/Mission dual-card  */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36 bg-white border-y border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative bg-[#0B1130] text-white p-10 lg:p-12 rounded-3xl overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "36px 36px" }}
                />
                <div className="relative">
                  <div className="h-14 w-14 rounded-xl bg-white/10 flex items-center justify-center mb-7">
                    <Compass className="h-6 w-6 text-[#12C7CF]" />
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-semibold mb-5">Our Approach</h3>
                  <p className="text-white/60 leading-relaxed">
                    Every track is mentor-led and hardware-first — students
                    build with real tools from week one instead of working
                    through slides before ever touching equipment.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative bg-[#F5730C] text-white p-10 lg:p-12 rounded-3xl overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "36px 36px" }}
                />
                <div className="relative">
                  <div className="h-14 w-14 rounded-xl bg-white/15 flex items-center justify-center mb-7">
                    <PackageCheck className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-semibold mb-5">What Students Take Home</h3>
                  <p className="text-white/85 leading-relaxed">
                    A finished, working project — a robot, a printed part, a
                    flight-ready drone, or a shipped app — plus a build log
                    and a demo-day presentation they authored themselves.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* GALLERY — mosaic across all tracks                            */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-14"
            >
              <Eyebrow>Inside the labs</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                What each track looks like in session
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {programs.map((p, i) => {
                const GIcon = p.icon;
                return (
                  <motion.button
                    key={p.specId}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setActive(i)}
                    className="group relative aspect-[3/4] rounded-xl overflow-hidden"
                  >
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1130]/90 via-[#0B1130]/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                      <GIcon className="h-4 w-4 text-[#F5730C] mb-1" />
                      <div className="text-xs font-semibold text-white leading-tight">{p.title}</div>
                    </div>
                    <div className="absolute top-2 right-2 h-7 w-7 rounded-full bg-[#0B1130]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="h-3.5 w-3.5 text-white" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* COMPARISON TABLE                                              */}
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
                Compare every track
              </h2>
            </motion.div>

            <div className="rounded-2xl border border-[#0B1130]/10 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="bg-[#F7F8FC] border-b border-[#0B1130]/8">
                    <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-[#0B1130]/45">Track</th>
                    <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-[#0B1130]/45">Spec ID</th>
                    <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-[#0B1130]/45">Ages</th>
                    <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-[#0B1130]/45">Duration</th>
                    <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-[#0B1130]/45">Intensity</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((p, i) => {
                    const RowIcon = p.icon;
                    return (
                      <tr
                        key={p.specId}
                        onClick={() => setActive(i)}
                        className="border-b border-[#0B1130]/6 last:border-0 cursor-pointer hover:bg-[#F7F8FC] transition-colors"
                      >
                        <td className="px-6 py-4 flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-[#0B1130] flex items-center justify-center">
                            <RowIcon className="h-4 w-4 text-[#F5730C]" />
                          </div>
                          <span className="font-medium text-[#0B1130]">{p.title}</span>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-[#0B1130]/45">{p.specId}</td>
                        <td className="px-6 py-4 text-[#0B1130]/60">{p.ageGroups}</td>
                        <td className="px-6 py-4 text-[#0B1130]/60">{p.duration}</td>
                        <td className="px-6 py-4">
                          <IntensityDots level={p.intensity} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* JOURNEY — styled like the About page's milestone timeline     */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-16 lg:mb-20"
            >
              <Eyebrow>How a track runs</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                Every cohort follows the same build cycle
              </h2>
            </motion.div>

            <div className="relative">
              <div className="hidden lg:block absolute top-0 bottom-0 left-[88px] w-px bg-[#0B1130]/10" />
              <div className="space-y-10 lg:space-y-0">
                {journey.map((j, i) => (
                  <motion.div
                    key={j.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative flex flex-col lg:flex-row gap-4 lg:gap-10 lg:items-start lg:py-6"
                  >
                    <div className="flex items-center gap-4 lg:w-[176px] shrink-0">
                      <span className="font-mono text-sm text-[#F5730C] font-semibold w-16">{j.step}</span>
                      <span className="hidden lg:block h-3 w-3 rounded-full bg-[#F5730C] shadow-[0_0_0_4px_rgba(245,115,12,0.15)] relative z-10" />
                    </div>
                    <div className="pb-8 lg:pb-0 border-b border-[#0B1130]/8 lg:border-none flex-1">
                      <h3 className="font-display text-lg font-semibold text-[#0B1130] mb-1.5">{j.title}</h3>
                      <p className="text-[#0B1130]/55 leading-relaxed max-w-xl">{j.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
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
        {/* CTA Banner — matches the About page's CTA treatment           */}
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
                  Reserve a seat in the next cohort
                </h2>
                <p className="text-white/60 mb-9 text-lg">
                  Seats are capped per track to keep mentor time high.
                  Applications for the next intake are open now.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-[#F5730C] hover:bg-[#e5670a] text-white px-9 py-4 rounded-full font-medium transition-colors duration-300"
                  >
                    Apply now
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.button>
                  <button className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-9 py-4 rounded-full font-medium transition-colors duration-300">
                    <GraduationCap className="h-4 w-4" />
                    Talk to an advisor
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

export default Programs;