import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Cpu, Wifi, Boxes, X } from 'lucide-react';
import { image1, video3 } from './ImageList';

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  .font-body { font-family: 'Inter', sans-serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
`;

/* Animated circuit-board backdrop — traces pulse in a slow, staggered loop */
const CircuitBackdrop = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.16]"
    viewBox="0 0 1200 800"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
  >
    {[
      'M0,120 H260 V280 H520 V140 H900 V320 H1200',
      'M0,420 H180 V560 H460 V440 H820 V620 H1200',
      'M0,680 H320 V740 H700 V660 H1200',
      'M120,0 V180 H380 V0',
      'M900,0 V90 H1080 V240',
    ].map((d, i) => (
      <motion.path
        key={i}
        d={d}
        stroke="url(#circuitGradient)"
        strokeWidth="1.5"
        strokeDasharray="6 10"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, delay: i * 0.25, ease: 'easeOut' }}
      />
    ))}
    {[
      [260, 120], [520, 280], [900, 140], [180, 420], [460, 560],
      [820, 440], [320, 680], [700, 660], [380, 180], [1080, 240],
    ].map(([cx, cy], i) => (
      <motion.circle
        key={`n-${i}`}
        cx={cx}
        cy={cy}
        r="4"
        fill="#12C7CF"
        initial={{ opacity: 0.2, scale: 0.8 }}
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
        transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
      />
    ))}
    <defs>
      <linearGradient id="circuitGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#12C7CF" />
        <stop offset="100%" stopColor="#F5730C" />
      </linearGradient>
    </defs>
  </svg>
);

/* Video modal — plays the "lab in session" clip with sound, Esc / backdrop to close */
const VideoModal = ({ onClose }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#0B1130]/96 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 font-body"
        onClick={onClose}
      >
        <style>{FONT_STYLE}</style>

        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-5 right-5 sm:top-8 sm:right-8 h-11 w-11 rounded-full bg-white/10 hover:bg-[#F5730C] flex items-center justify-center text-white transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl"
        >
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#12C7CF]/40 via-transparent to-[#F5730C]/40 -z-10 blur-sm" />
          <div className="rounded-2xl overflow-hidden bg-black border border-white/10">
            <video
              src={video3}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[75vh] bg-black"
            />
          </div>
          <div className="absolute -top-3 -left-3 h-8 w-8 border-t-2 border-l-2 border-[#F5730C]" />
          <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-[#F5730C]" />

          <div className="mt-4 flex items-center gap-2 text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5730C]" />
            <span className="font-mono text-xs uppercase tracking-wide">
              A lab in session — STEM RoboAI
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Hero = ({ title, subtitle, showButtons = true, isSmall = false }) => {
  const navigate = useNavigate();
  const [videoOpen, setVideoOpen] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-40, 40], [4, -4]);
  const rotateY = useTransform(mx, [-40, 40], [-4, 4]);
  const imgX = useTransform(mx, [-40, 40], [-8, 8]);
  const imgY = useTransform(my, [-40, 40], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 80 - 40);
    my.set(((e.clientY - rect.top) / rect.height) * 80 - 40);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  if (isSmall) {
    return (
      <div className="relative bg-[#0B1130] text-white py-10 overflow-hidden">
        <style>{FONT_STYLE}</style>
        <div className="font-body">
          <CircuitBackdrop />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mb-5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5730C]" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-white/50">
                STEM RoboAI
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-[1.1]"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#0B1130] text-white min-h-screen lg:py-10 flex items-center overflow-hidden">
      <style>{FONT_STYLE}</style>
      <div className="font-body w-full">
        {/* Backdrop layers */}
        <CircuitBackdrop />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-[-10%] right-[-5%] h-[420px] w-[420px] rounded-full bg-[#12C7CF]/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[380px] w-[380px] rounded-full bg-[#F5730C]/20 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-28 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 mb-6 border border-white/15 rounded-full px-4 py-1.5 bg-white/5 backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#F5730C] animate-pulse" />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/60">
                  Now enrolling — 2026 batch
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-semibold leading-[1.05] mb-7 tracking-tight"
              >
                STEM education built for{' '}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#F5730C] to-[#12C7CF]">
                  tomorrow's engineers
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.22 }}
                className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Hands-on <span className="text-white font-medium">Robotics, AI, IoT, Drone</span> and{' '}
                <span className="text-white font-medium">AR/VR</span> labs built into K-12
                classrooms — every session ends with something students actually built.
              </motion.p>

              {showButtons && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-14"
                >
                  <motion.button
                    onClick={() => navigate('/programs')}
                    whileHover={{ scale: 1.04, boxShadow: '0 14px 34px rgba(245,115,12,0.35)' }}
                    whileTap={{ scale: 0.96 }}
                    className="bg-[#F5730C] text-white px-8 py-4 rounded-full text-base font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Explore programs</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>

                  <motion.button
                    onClick={() => setVideoOpen(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="border border-white/25 text-white hover:bg-white hover:text-[#0B1130] px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur"
                  >
                    <span>Watch a lab in session</span>
                    <Play className="h-4 w-4" />
                  </motion.button>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-6 text-white/40"
              >
                {[Cpu, Wifi, Boxes].map((Icon, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                  </div>
                ))}
                <span className="font-mono text-xs tracking-wide uppercase">
                  Robotics · IoT · 3D Printing
                </span>
              </motion.div>
            </div>

            {/* Right Content — Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1200 }}
              className="relative hidden lg:block"
            >
              <motion.div
                style={{ rotateX, rotateY }}
                className="relative rounded-2xl"
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#12C7CF]/40 via-transparent to-[#F5730C]/40 -z-10 blur-sm" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <motion.img
                    style={{ x: imgX, y: imgY, scale: 1.08 }}
                    src={image1}
                    alt="Students building robots in a STEM RoboAI lab"
                    className="w-full h-[420px] xl:h-[480px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1130]/50 via-transparent to-transparent" />
                </div>

                {/* corner brackets — blueprint motif */}
                <div className="absolute -top-3 -left-3 h-8 w-8 border-t-2 border-l-2 border-[#F5730C]" />
                <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-[#F5730C]" />
              </motion.div>

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 bg-white text-[#0B1130] rounded-2xl shadow-2xl px-5 py-4"
              >
                <p className="font-display text-2xl font-bold leading-none">1,000+</p>
                <p className="font-mono text-[10px] uppercase tracking-wide text-[#0B1130]/50 mt-1">
                  Students
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 bg-[#F5730C] text-white rounded-2xl shadow-2xl px-5 py-4"
              >
                <p className="font-display text-2xl font-bold leading-none">50+</p>
                <p className="font-mono text-[10px] uppercase tracking-wide text-white/70 mt-1">
                  Schools
                </p>
              </motion.div>

              <motion.button
                onClick={() => setVideoOpen(true)}
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="absolute top-1/2 -left-10 -translate-y-1/2 bg-white/10 border border-white/15 backdrop-blur rounded-xl px-4 py-3 hidden xl:flex items-center gap-2 cursor-pointer hover:bg-white/15 transition-colors"
              >
                <Cpu className="h-4 w-4 text-[#12C7CF]" />
                <span className="font-mono text-[11px] text-white/70">Live lab feed</span>
              </motion.button>
            </motion.div>

            {/* Mobile / tablet image (no tilt/parallax) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative lg:hidden"
            >
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={image1}
                  alt="Students building robots in a STEM RoboAI lab"
                  className="w-full h-72 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1130]/40 to-transparent" />
              </div>
              <div className="flex gap-3 mt-5 justify-center">
                <div className="bg-white text-[#0B1130] rounded-xl px-5 py-3 text-center">
                  <p className="font-display text-xl font-bold leading-none">1,000+</p>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-[#0B1130]/50 mt-1">
                    Students
                  </p>
                </div>
                <div className="bg-[#F5730C] text-white rounded-xl px-5 py-3 text-center">
                  <p className="font-display text-xl font-bold leading-none">50+</p>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-white/70 mt-1">
                    Schools
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
            Scroll
          </span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2.5 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </div>

      {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}
    </div>
  );
};

export default Hero;