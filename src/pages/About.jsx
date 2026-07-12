import { motion, useScroll, useTransform } from "framer-motion";
import {
  Target,
  Eye,
  Award,
  Users,
  BookOpen,
  Globe,
  Heart,
  Zap,
  ArrowUpRight,
  Linkedin,
} from "lucide-react";
import { useRef } from "react";
import Hero from "../components/Hero";
import { image2 } from "../components/ImageList";

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

const About = () => {
  const introImgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: introImgRef, offset: ["start end", "end start"] });
  const introY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const services = [
    { icon: BookOpen, title: "Skill Lab Design & Setup", description: "Complete STEM laboratory setup with state-of-the-art equipment and infrastructure." },
    { icon: Users, title: "Customized Curriculum Development", description: "Age-appropriate curricula designed specifically for K-12 students across all grade levels." },
    { icon: Award, title: "Teacher Training", description: "Comprehensive training programs to empower educators with modern teaching methodologies." },
    { icon: Globe, title: "Workshops & Bootcamps", description: "Intensive hands-on sessions for students to dive deep into emerging technologies." },
  ];

  const values = [
    { icon: Zap, title: "Innovation", description: "Embracing cutting-edge technology to create transformative learning experiences." },
    { icon: Award, title: "Excellence", description: "Maintaining the highest standards in education delivery and student outcomes." },
    { icon: Users, title: "Accessibility", description: "Making quality STEM education available to students from all backgrounds." },
    { icon: Heart, title: "Collaboration", description: "Working together with schools, teachers, and communities for collective success." },
    { icon: BookOpen, title: "Lifelong Learning", description: "Fostering a culture of continuous learning and adaptation to new technologies." },
  ];

  const milestones = [
    { year: "2021", title: "Founded in Bangalore", description: "Started with a single robotics lab and a handful of partner classrooms." },
    { year: "2022", title: "First 25 schools", description: "Expanded curriculum to include IoT and AR/VR alongside core robotics." },
    { year: "2023", title: "Teacher certification launched", description: "Built a training track so school staff could run labs independently." },
    { year: "2024", title: "Drone & 3D printing added", description: "Rounded out the program into the six-track curriculum offered today." },
    { year: "2026", title: "150+ schools, PAN India", description: "Now running labs across multiple states with a dedicated mentor network." },
  ];

  const team = [
    { name: "Dr. Rajesh Kumar", role: "Chief Executive Officer", image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400", description: "15+ years in education technology and curriculum development." },
    { name: "Priya Sharma", role: "Chief Technology Officer", image: "https://images.pexels.com/photos/3727463/pexels-photo-3727463.jpeg?auto=compress&cs=tinysrgb&w=400", description: "Expert in AI, robotics and educational technology solutions." },
    { name: "Arun Patel", role: "Head of Curriculum", image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400", description: "Former principal with 20+ years in K-12 education." },
  ];

  return (
    <div className="bg-[#F7F8FC]">
      <style>{FONT_STYLE}</style>
      <div className="font-body">
        <Hero
          title="About STEM RoboAI"
          subtitle="Revolutionizing K-12 education through hands-on robotics, AI and technology integration — built into classrooms, not bolted on."
          showButtons={false}
          isSmall={true}
        />

        {/* Intro Section */}
        <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Eyebrow>Since 2021</Eyebrow>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] mb-7 leading-[1.1]">
                  Pioneering the future of{" "}
                  <span className="text-[#F5730C]">STEM education</span>
                </h2>
                <div className="space-y-5 text-lg text-[#0B1130]/65 leading-relaxed">
                  <p>
                    STEM RoboAI bridges traditional classrooms and the
                    technological demands of tomorrow — integrating Robotics,
                    AI, IoT and Drone Technology into comprehensive K-12
                    programs.
                  </p>
                  <p>
                    Students don't just learn about technology — they build it,
                    program it, and troubleshoot it. That hands-on approach is
                    where the critical thinking and problem-solving actually
                    come from.
                  </p>
                  <p>
                    From lab setup to teacher training to curriculum design, we
                    provide the end-to-end infrastructure schools need to run
                    technology education themselves.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="blueprint-frame"
                ref={introImgRef}
              >
                <div className="rounded-2xl overflow-hidden h-[420px] lg:h-[480px]">
                  <motion.img
                    style={{ y: introY, scale: 1.15 }}
                    src={image2}
                    alt="STEM Education Innovation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-7 -left-7 bg-[#F5730C] text-white p-6 rounded-xl shadow-xl">
                  <div className="text-center">
                    <p className="font-display text-3xl font-bold leading-none">5+</p>
                    <p className="font-mono text-[10px] uppercase tracking-wide mt-1.5 text-white/80">
                      Years innovation
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-24 sm:py-28 lg:py-36 bg-white border-y border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-16 lg:mb-20"
            >
              <Eyebrow>What we do</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                End-to-end solutions for technology education
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-8 lg:p-9 rounded-2xl border border-[#0B1130]/10 hover:border-transparent hover:bg-[#0B1130] transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-7">
                    <div className="h-14 w-14 rounded-xl bg-[#0B1130] group-hover:bg-white/10 flex items-center justify-center transition-colors duration-300">
                      <service.icon className="h-6 w-6 text-[#F5730C]" />
                    </div>
                    <span className="font-mono text-xs text-[#0B1130]/30 group-hover:text-white/30 transition-colors duration-300">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#0B1130] group-hover:text-white mb-3 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[#0B1130]/60 group-hover:text-white/60 leading-relaxed transition-colors duration-300">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-24 sm:py-28 lg:py-36">
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
                  style={{
                    backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                  }}
                />
                <div className="relative">
                  <div className="h-14 w-14 rounded-xl bg-white/10 flex items-center justify-center mb-7">
                    <Eye className="h-6 w-6 text-[#12C7CF]" />
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-semibold mb-5">Our Vision</h3>
                  <p className="text-white/60 leading-relaxed">
                    To be the leading catalyst in transforming K-12 education
                    globally — making advanced STEM technologies accessible,
                    engaging, and relevant for every student, everywhere.
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
                  style={{
                    backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                  }}
                />
                <div className="relative">
                  <div className="h-14 w-14 rounded-xl bg-white/15 flex items-center justify-center mb-7">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-semibold mb-5">Our Mission</h3>
                  <p className="text-white/85 leading-relaxed">
                    To revolutionize K-12 education through hands-on STEM
                    learning — equipping students with practical skills in
                    Robotics, AI and IoT, while supporting schools through
                    their own digital transformation.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-24 sm:py-28 lg:py-36 bg-white border-y border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-16 lg:mb-20"
            >
              <Eyebrow>Core values</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                The principles behind every decision
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-14 relative">
              <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-[#0B1130]/10" />
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="h-14 w-14 rounded-xl bg-[#0B1130] flex items-center justify-center mb-6 relative z-10">
                    <value.icon className="h-6 w-6 text-[#F5730C]" />
                  </div>
                  <h3 className="font-display font-semibold text-[#0B1130] mb-2.5">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#0B1130]/55 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones Timeline */}
        <section className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-16 lg:mb-20"
            >
              <Eyebrow>How we got here</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                Five years, one lab at a time
              </h2>
            </motion.div>

            <div className="relative">
              <div className="hidden lg:block absolute top-0 bottom-0 left-[88px] w-px bg-[#0B1130]/10" />
              <div className="space-y-10 lg:space-y-0">
                {milestones.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative flex flex-col lg:flex-row gap-4 lg:gap-10 lg:items-start lg:py-6"
                  >
                    <div className="flex items-center gap-4 lg:w-[176px] shrink-0">
                      <span className="font-mono text-sm text-[#F5730C] font-semibold w-16">
                        {m.year}
                      </span>
                      <span className="hidden lg:block h-3 w-3 rounded-full bg-[#F5730C] shadow-[0_0_0_4px_rgba(245,115,12,0.15)] relative z-10" />
                    </div>
                    <div className="pb-8 lg:pb-0 border-b border-[#0B1130]/8 lg:border-none flex-1">
                      <h3 className="font-display text-lg font-semibold text-[#0B1130] mb-1.5">
                        {m.title}
                      </h3>
                      <p className="text-[#0B1130]/55 leading-relaxed max-w-xl">{m.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 sm:py-28 lg:py-36 bg-white border-y border-[#0B1130]/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-16 lg:mb-20"
            >
              <Eyebrow>Leadership</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                Educators and engineers, in equal measure
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden bg-[#F7F8FC] border border-[#0B1130]/8"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1130]/80 via-[#0B1130]/10 to-transparent" />
                    <a
                      href="#"
                      aria-label={`${member.name} on LinkedIn`}
                      className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/15 backdrop-blur border border-white/25 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#F5730C] hover:border-[#F5730C]"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-display text-lg font-semibold text-white mb-0.5">
                        {member.name}
                      </h3>
                      <p className="text-[#F5730C] text-sm font-medium">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[#0B1130]/60 text-sm leading-relaxed">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
                  backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative max-w-2xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-5 leading-tight">
                  Want to see what our labs look like in practice?
                </h2>
                <p className="text-white/60 mb-9 text-lg">
                  Talk to our team about curriculum fit, lab setup and teacher
                  training for your school.
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
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

export default About;