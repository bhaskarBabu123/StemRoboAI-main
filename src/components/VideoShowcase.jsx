import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, ChevronLeft, ChevronRight, Volume2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Local videos — place files in src/images/ as 1.mp4 … 11.mp4        */
/* ------------------------------------------------------------------ */

import video1 from "../images/1.mp4";
import video2 from "../images/2.mp4";
import video3 from "../images/3.mp4";
import video4 from "../images/4.mp4";
import video5 from "../images/5.mp4";
import video6 from "../images/6.mp4";
import video7 from "../images/7.mp4";
import video8 from "../images/8.mp4";
import video9 from "../images/9.mp4";
import video10 from "../images/10.mp4";
import video11 from "../images/11.mp4";

/* ------------------------------------------------------------------ */
/*  Design tokens — same palette/type used across the site             */
/* ------------------------------------------------------------------ */

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  .font-body { font-family: 'Inter', sans-serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="h-2 w-2 rounded-full bg-[#F5730C]" />
    <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#0B1130]/50">
      {children}
    </span>
  </div>
);

const clips = [
  { id: 0, src: video1, title: "Robotics championship finals", tag: "Competition" },
  { id: 1, src: video2, title: "AI workshop, computer-vision demo", tag: "Workshop" },
  { id: 2, src: video3, title: "STEM exhibition day recap", tag: "Exhibition" },
  { id: 3, src: video4, title: "Drone flight test, first launch", tag: "Bootcamp" },
  { id: 4, src: video5, title: "Teacher training keynote", tag: "Conference" },
  { id: 5, src: video6, title: "IoT hackathon pitch day", tag: "Hackathon" },
  { id: 6, src: video7, title: "3D printing, first working part", tag: "Workshop" },
  { id: 7, src: video8, title: "AR/VR lab build session", tag: "Lab session" },
  { id: 8, src: video9, title: "Student demo day walkthrough", tag: "Demo day" },
  { id: 9, src: video10, title: "Coding track, final showcase", tag: "Showcase" },
  { id: 10, src: video11, title: "Behind the scenes at the studio", tag: "Studio" },
];

/* ------------------------------------------------------------------ */
/*  Video card — hover preview (muted), click opens full lightbox      */
/* ------------------------------------------------------------------ */

const VideoCard = ({ clip, onOpen }) => {
  const ref = useRef(null);
  const [hovering, setHovering] = useState(false);

  return (
    <motion.button
      onClick={onOpen}
      onMouseEnter={() => {
        setHovering(true);
        ref.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        setHovering(false);
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      }}
      className="group relative shrink-0 snap-start w-[88%] sm:w-[62%] md:w-[48%] lg:w-[38%] xl:w-[32%] min-w-[280px] aspect-video rounded-2xl overflow-hidden bg-[#0B1130] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5730C]"
    >
      <video
        ref={ref}
        src={clip.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1130]/85 via-[#0B1130]/10 to-transparent" />

      <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-wide text-white/80 bg-white/10 backdrop-blur rounded-md px-2 py-1">
        {clip.tag}
      </span>

      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className={`h-14 w-14 rounded-full bg-[#F5730C] flex items-center justify-center shadow-lg transition-all duration-300 ${
            hovering ? "scale-90 opacity-0" : "scale-100 opacity-95"
          }`}
        >
          <Play className="h-5 w-5 text-white ml-0.5" fill="white" />
        </span>
      </span>

      <span className="absolute inset-x-0 bottom-0 p-4 text-left">
        <span className="block text-sm font-semibold text-white leading-snug">{clip.title}</span>
      </span>
    </motion.button>
  );
};

/* ------------------------------------------------------------------ */
/*  Lightbox — full playback with sound, prev / next navigation        */
/* ------------------------------------------------------------------ */

const Lightbox = ({ items, index, onClose, onNavigate }) => {
  const current = items[index];

  const goNext = useCallback(() => onNavigate((index + 1) % items.length), [index, items.length, onNavigate]);
  const goPrev = useCallback(
    () => onNavigate((index - 1 + items.length) % items.length),
    [index, items.length, onNavigate]
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [goNext, goPrev, onClose]);

  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#0B1130]/96 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 sm:top-8 sm:right-8 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="absolute top-6 left-6 font-mono text-xs text-white/50 tracking-wide hidden sm:block">
          {index + 1} / {items.length}
        </span>

        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          aria-label="Previous video"
          className="absolute left-3 sm:left-6 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          aria-label="Next video"
          className="absolute right-3 sm:right-6 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl"
        >
          <div className="rounded-2xl overflow-hidden bg-black">
            <video key={current.src} src={current.src} controls autoPlay className="w-full max-h-[75vh] bg-black" />
          </div>
          <div className="mt-4 flex items-center justify-between text-white/70 font-body">
            <div>
              <p className="text-sm font-medium text-white">{current.title}</p>
              <p className="font-mono text-[11px] uppercase tracking-wide text-white/40 mt-0.5">
                {current.tag}
              </p>
            </div>
            <span className="font-mono text-xs text-white/40 sm:hidden">
              {index + 1} / {items.length}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ------------------------------------------------------------------ */
/*  Main section — horizontal scroll row with prev / next controls     */
/* ------------------------------------------------------------------ */

const VideoShowcase = () => {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section className="py-24 sm:py-28 lg:py-36 bg-white border-y border-[#0B1130]/8 overflow-hidden">
      <style>{FONT_STYLE}</style>
      <div className="font-body">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-14"
          >
            <div className="max-w-2xl">
              <Eyebrow>Video highlights</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
                See it in motion
              </h2>
              <p className="mt-4 text-lg text-[#0B1130]/60 leading-relaxed">
                Eleven clips straight from the labs — hover to preview, click
                to watch with sound.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollByCard(-1)}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="h-12 w-12 rounded-full border border-[#0B1130]/15 flex items-center justify-center text-[#0B1130] transition-all duration-300 hover:border-[#0B1130] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#0B1130]/15"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollByCard(1)}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="h-12 w-12 rounded-full bg-[#0B1130] flex items-center justify-center text-white transition-all duration-300 hover:bg-[#F5730C] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#0B1130]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Horizontal scroll track — bleeds to the viewport edge, snaps per card */}
        <div className="relative">
          <div
            ref={trackRef}
            className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 sm:px-8 lg:px-12 pb-2 scroll-smooth"
          >
            {clips.map((clip, i) => (
              <div key={clip.id} data-card>
                <VideoCard clip={clip} onOpen={() => setLightboxIndex(i)} />
              </div>
            ))}
            <div className="shrink-0 w-px" />
          </div>

          {/* Edge fades hint that the row scrolls */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-white to-transparent" />
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center justify-center gap-3 mt-8 px-6">
          <button
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="h-11 w-11 rounded-full border border-[#0B1130]/15 flex items-center justify-center text-[#0B1130] disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="h-11 w-11 rounded-full bg-[#0B1130] flex items-center justify-center text-white disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={clips}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
};

export default VideoShowcase;