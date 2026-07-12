import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Award,
  TrendingUp,
  Heart,
  MapPin,
  Clock,
  Wallet,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Check,
  Sparkles,
  Compass,
  Rocket,
  FileText,
  MessageSquare,
  CalendarCheck,
  Briefcase,
  Filter,
} from "lucide-react";
import Hero from "../components/Hero";

/* ------------------------------------------------------------------ */
/*  Shared design tokens — mirrors Programs / News & Events exactly    */
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

const benefits = [
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description:
      "Continuous learning and clear paths for advancement in educational technology.",
  },
  {
    icon: Users,
    title: "Collaborative Team",
    description:
      "Work alongside passionate educators and technologists shaping the future of learning.",
  },
  {
    icon: Award,
    title: "Impactful Work",
    description:
      "Make a real difference in students' lives by building the future of STEM education.",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description:
      "Flexible arrangements and a supportive environment that values personal well-being.",
  },
];

const departmentAccent = {
  Education: "#F5730C",
  Training: "#12C7CF",
  Content: "#7C5CFF",
  Sales: "#0B1130",
  Technology: "#12C7CF",
  Multiple: "#F5730C",
};

const openings = [
  {
    reqId: "REQ-101",
    title: "STEM Curriculum Developer",
    department: "Education",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹6–10 LPA",
    description:
      "Design and develop engaging STEM curricula for K-12 students with a focus on robotics, AI, and emerging technologies.",
    requirements: [
      "Master's in Education, Engineering, or related field",
      "3+ years curriculum development experience",
      "Strong understanding of STEM pedagogy",
      "Experience with educational technology tools",
    ],
  },
  {
    reqId: "REQ-102",
    title: "Robotics Trainer",
    department: "Training",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹5–8 LPA",
    description:
      "Conduct robotics workshops and training sessions for students and educators across partner schools.",
    requirements: [
      "Bachelor's in Engineering (preferably ECE/CSE)",
      "Experience with Arduino, Raspberry Pi, and robotics platforms",
      "Excellent communication and presentation skills",
      "Passion for teaching and mentoring",
    ],
  },
  {
    reqId: "REQ-103",
    title: "Technical Content Creator",
    department: "Content",
    location: "Remote",
    type: "Contract",
    salary: "₹3–5 LPA",
    description:
      "Create engaging technical content — tutorials, project guides, and educational materials for STEM programs.",
    requirements: [
      "Strong technical writing skills",
      "Experience with STEM subjects and technologies",
      "Ability to create multimedia content",
      "Understanding of K-12 learning levels",
    ],
  },
  {
    reqId: "REQ-104",
    title: "Business Development Manager",
    department: "Sales",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹8–12 LPA",
    description:
      "Drive business growth by building relationships with schools and educational institutions across India.",
    requirements: [
      "MBA or equivalent with sales experience",
      "5+ years in B2B sales, preferably in education",
      "Strong relationship-building skills",
      "Experience with educational institutions",
    ],
  },
  {
    reqId: "REQ-105",
    title: "Software Developer",
    department: "Technology",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹7–12 LPA",
    description:
      "Develop and maintain educational platforms, mobile apps, and web applications for STEM learning.",
    requirements: [
      "Bachelor's in Computer Science or related field",
      "Proficiency in React, Node.js, Python",
      "Experience with educational technology",
      "Understanding of UI/UX principles",
    ],
  },
  {
    reqId: "REQ-106",
    title: "Internship Program",
    department: "Multiple",
    location: "Bangalore",
    type: "Internship",
    salary: "₹15–25K/mo",
    description:
      "6-month internship program for fresh graduates in engineering, education, or related fields.",
    requirements: [
      "Recent graduate or final-year student",
      "Passion for education and technology",
      "Good communication skills",
      "Eagerness to learn and grow",
    ],
  },
];

const departments = [
  { id: "all", name: "All Roles" },
  ...Array.from(new Set(openings.map((o) => o.department))).map((d) => ({ id: d, name: d })),
];

const hiringSteps = [
  {
    step: "01",
    icon: FileText,
    title: "Apply",
    description: "Send your details through the contact form — tell us which role you're going for.",
  },
  {
    step: "02",
    icon: MessageSquare,
    title: "Screen",
    description: "A short call with our team to talk through your experience and what you're looking for.",
  },
  {
    step: "03",
    icon: Users,
    title: "Interview",
    description: "Meet the team you'd be working with — a mix of technical and culture conversations.",
  },
  {
    step: "04",
    icon: CalendarCheck,
    title: "Offer",
    description: "We move fast once there's a match — most offers go out within a week of the final round.",
  },
];

const cultureValues = [
  {
    title: "Innovation First",
    description: "We encourage creative thinking and innovative solutions to educational challenges.",
  },
  {
    title: "Continuous Learning",
    description: "We invest in the team's growth through training, conferences, and skill development.",
  },
  {
    title: "Impact-Driven",
    description: "Every role contributes to transforming STEM education across India.",
  },
];

const faqs = [
  {
    q: "Do I need prior EdTech experience to apply?",
    a: "No — we hire for the underlying skill (engineering, curriculum design, sales) and teach the education context on the job. Prior EdTech exposure helps but isn't required.",
  },
  {
    q: "Is remote work an option?",
    a: "Some roles, like Technical Content Creator, are remote-first. Most trainer and Bangalore-based roles need regular in-person time at partner schools or the training center.",
  },
  {
    q: "What happens after I apply through the contact page?",
    a: "Your message reaches our hiring team directly. If your background fits an open role, we'll follow up to schedule a screening call — typically within a week.",
  },
  {
    q: "Can I apply if there's no open role that matches my background?",
    a: "Yes. Use the contact page to introduce yourself — we keep strong applicants on file and reach out when a matching role opens.",
  },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                             */
/* ------------------------------------------------------------------ */

const StatChip = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-1.5 text-[#0B1130]/55 text-sm">
    <Icon className="h-3.5 w-3.5 text-[#F5730C] shrink-0" />
    {label}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

const Careers = () => {
  const navigate = useNavigate();
  const [activeDept, setActiveDept] = useState("all");
  const [activeOpening, setActiveOpening] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const filteredOpenings =
    activeDept === "all" ? openings : openings.filter((o) => o.department === activeDept);

  const applyForRole = (role) => {
    navigate("/contact", { state: { subject: `Application: ${role}`, role } });
  };

  const job = filteredOpenings[activeOpening] || filteredOpenings[0];

  return (
    <div className="bg-[#F7F8FC]">
      <style>{FONT_STYLE}</style>
      <div className="font-body">
        <Hero
          title="Join Our Team"
          subtitle="Be part of an innovative team that's transforming STEM education for students across India."
          showButtons={false}
          isSmall={true}
        />

        {/* Quick facts strip */}
        <section className="py-14 border-b border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { label: "Open positions", value: String(openings.length) },
                { label: "Departments hiring", value: String(departments.length - 1) },
                { label: "Locations", value: "2" },
                { label: "Avg. time to offer", value: "~3 wk" },
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
        {/* WHY JOIN                                                      */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-14 lg:mb-16"
            >
              <Eyebrow>Why join</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                Why join STEM RoboAI
              </h2>
              <p className="mt-5 text-lg text-[#0B1130]/60 leading-relaxed">
                A mission-driven team, passionate about revolutionizing
                education and empowering the next generation of innovators.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-[#0B1130]/10 bg-white p-7 hover:border-[#0B1130]/25 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-[#0B1130] flex items-center justify-center mb-6">
                    <b.icon className="h-5 w-5 text-[#F5730C]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#0B1130] mb-2.5">
                    {b.title}
                  </h3>
                  <p className="text-sm text-[#0B1130]/60 leading-relaxed">{b.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* OPEN POSITIONS — explorer panel, same interaction pattern as  */}
        {/* the Programs page's program explorer                         */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36 bg-white border-y border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-10"
            >
              <Eyebrow>Open positions</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                Find your role
              </h2>
              <p className="mt-5 text-lg text-[#0B1130]/60 leading-relaxed">
                Every listing is a real, open req — pick one to see the full
                spec, then apply straight through.
              </p>
            </motion.div>

            {/* department filters */}
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              <Filter className="h-4 w-4 text-[#0B1130]/30 mr-1" />
              {departments.map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setActiveDept(d.id);
                    setActiveOpening(0);
                  }}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeDept === d.id
                      ? "border-[#0B1130] bg-[#0B1130] text-white"
                      : "border-[#0B1130]/10 bg-[#F7F8FC] text-[#0B1130]/60 hover:border-[#0B1130]/25"
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>

            {/* role tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {filteredOpenings.map((o, i) => {
                const isActive = i === activeOpening;
                return (
                  <button
                    key={o.reqId}
                    onClick={() => setActiveOpening(i)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "border-[#0B1130] bg-[#0B1130] text-white"
                        : "border-[#0B1130]/10 bg-[#F7F8FC] text-[#0B1130]/60 hover:border-[#0B1130]/25"
                    }`}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: isActive ? "#F5730C" : departmentAccent[o.department] }}
                    />
                    {o.title}
                  </button>
                );
              })}
            </div>

            {job && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={job.reqId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-3xl border border-[#0B1130]/10 bg-[#F7F8FC] overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div className="p-8 lg:p-10 lg:col-span-3">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span
                          className="font-mono text-xs text-white rounded-md px-2.5 py-1"
                          style={{ backgroundColor: departmentAccent[job.department] }}
                        >
                          {job.department.toUpperCase()}
                        </span>
                        <span className="font-mono text-xs text-[#0B1130]/40">{job.reqId}</span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#0B1130]">
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-5 mt-4 mb-6">
                        <StatChip icon={MapPin} label={job.location} />
                        <StatChip icon={Clock} label={job.type} />
                        <StatChip icon={Wallet} label={job.salary} />
                      </div>

                      <p className="text-[#0B1130]/65 leading-relaxed mb-7">{job.description}</p>

                      <h4 className="font-mono text-xs uppercase tracking-wide text-[#0B1130]/40 mb-4">
                        Requirements
                      </h4>
                      <ul className="space-y-2.5">
                        {job.requirements.map((r) => (
                          <li key={r} className="flex items-start gap-2.5 text-sm text-[#0B1130]/65">
                            <Check className="h-4 w-4 text-[#F5730C] mt-0.5 shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="lg:col-span-2 bg-[#0B1130] p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                          backgroundImage:
                            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                          backgroundSize: "32px 32px",
                        }}
                      />
                      <div className="relative">
                        <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                          <Briefcase className="h-5 w-5 text-[#F5730C]" />
                        </div>
                        <p className="font-mono text-[11px] uppercase tracking-wide text-white/40 mb-1.5">
                          Compensation
                        </p>
                        <p className="font-display text-3xl font-semibold text-white mb-6">
                          {job.salary}
                        </p>
                        <p className="text-white/55 text-sm leading-relaxed">
                          Applications go straight to our hiring team — we
                          reply to every candidate, usually within a week.
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => applyForRole(job.title)}
                        className="relative mt-8 w-full inline-flex items-center justify-center gap-2 bg-[#F5730C] hover:bg-[#e5670a] text-white py-3.5 rounded-full font-semibold transition-colors duration-300"
                      >
                        Apply now
                        <ArrowUpRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* ALL ROLES GRID                                                */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-14"
            >
              <Eyebrow>Every role</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                All open roles at a glance
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpenings.map((o, i) => (
                <motion.div
                  key={o.reqId}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group rounded-2xl border border-[#0B1130]/10 bg-white p-7 hover:border-[#0B1130]/25 hover:shadow-xl hover:shadow-[#0B1130]/5 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-5">
                    <span
                      className="font-mono text-[11px] text-white rounded-md px-2.5 py-1"
                      style={{ backgroundColor: departmentAccent[o.department] }}
                    >
                      {o.department}
                    </span>
                    <span className="font-mono text-[11px] text-[#0B1130]/30">{o.reqId}</span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-[#0B1130] leading-snug mb-3">
                    {o.title}
                  </h3>

                  <div className="space-y-2 mb-5">
                    <StatChip icon={MapPin} label={o.location} />
                    <StatChip icon={Clock} label={o.type} />
                    <StatChip icon={Wallet} label={o.salary} />
                  </div>

                  <p className="text-sm text-[#0B1130]/55 leading-relaxed mb-6 flex-1">
                    {o.description}
                  </p>

                  <button
                    onClick={() => applyForRole(o.title)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1130] group-hover:text-[#F5730C] transition-colors"
                  >
                    Apply now
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* HIRING PROCESS — numbered timeline, same treatment as the     */}
        {/* Programs page's journey section                              */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36 bg-white border-y border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-16 lg:mb-20"
            >
              <Eyebrow>How hiring works</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                Four steps from apply to offer
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hiringSteps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative rounded-2xl border border-[#0B1130]/10 bg-[#F7F8FC] p-7"
                >
                  <span className="font-mono text-sm text-[#F5730C] font-semibold">{s.step}</span>
                  <div className="h-11 w-11 rounded-xl bg-[#0B1130] flex items-center justify-center my-5">
                    <s.icon className="h-4.5 w-4.5 text-[#F5730C]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#0B1130] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#0B1130]/55 leading-relaxed">{s.description}</p>
                  {i < hiringSteps.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute top-1/2 -right-3.5 h-6 w-6 text-[#0B1130]/15" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CULTURE — mirrors the Programs page's dual-card treatment     */}
        {/* ============================================================ */}
        <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative bg-[#0B1130] text-white p-10 lg:p-12 rounded-3xl overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                  }}
                />
                <div className="relative">
                  <div className="h-14 w-14 rounded-xl bg-white/10 flex items-center justify-center mb-7">
                    <Compass className="h-6 w-6 text-[#12C7CF]" />
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-semibold mb-6">Our Culture</h3>
                  <div className="space-y-6">
                    {cultureValues.map((v) => (
                      <div key={v.title}>
                        <h4 className="font-semibold text-white mb-1.5">{v.title}</h4>
                        <p className="text-white/55 text-sm leading-relaxed">{v.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden min-h-[320px]"
              >
                <img
                  src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Team collaborating"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1130]/85 via-[#0B1130]/20 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-10 lg:p-12">
                  <Sparkles className="h-6 w-6 text-[#F5730C] mb-4" />
                  <h3 className="font-display text-2xl font-semibold text-white mb-3">
                    Built by people who love teaching this stuff
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                    Engineers, educators, and mentors working side by side —
                    every hire adds a real voice to how we teach.
                  </p>
                </div>
              </motion.div>
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
        {/* CTA — routes straight to /contact                            */}
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
                  <Rocket className="h-6 w-6 text-[#F5730C]" />
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-5 leading-tight">
                  Don't see the exact fit?
                </h2>
                <p className="text-white/60 mb-9 text-lg">
                  Reach out anyway. Tell us about yourself on the contact page
                  and we'll follow up when a matching role opens.
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => applyForRole("General Application")}
                  className="inline-flex items-center gap-2 bg-[#F5730C] hover:bg-[#e5670a] text-white px-9 py-4 rounded-full font-medium transition-colors duration-300"
                >
                  Get in touch
                  <ArrowUpRight className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Careers;