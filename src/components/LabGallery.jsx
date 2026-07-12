import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, ArrowUpRight, Camera } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Local media for the home-page teaser grid.                        */
/*  Place files in src/images/ — these are a curated subset; the full */
/*  set (40 photos, 11 videos) lives on the dedicated /gallery page.  */
/* ------------------------------------------------------------------ */

import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";
import image3 from "../images/3.jpg";
import image4 from "../images/4.jpg";
import image5 from "../images/5.jpg";
import image6 from "../images/6.jpg";
import image7 from "../images/7.jpg";
import video1 from "../images/1.mp4";

/* ------------------------------------------------------------------ */
/*  Design tokens — same palette/type used across the site             */
/* ------------------------------------------------------------------ */

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  .font-body { font-family: 'Inter', sans-serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
`;

const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="h-2 w-2 rounded-full bg-[#F5730C]" />
    <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#0B1130]/50">
      {children}
    </span>
  </div>
);

/* Total items that live on the full /gallery page — used only to compute the "+N more" badge. */
const TOTAL_MEDIA_COUNT = 51;

const teaser = [
  { id: 0, type: "image", src: image1, caption: "Robotics build session", size: "large" },
  { id: 1, type: "image", src: image2, caption: "Circuit assembly" },
  { id: 2, type: "image", src: image3, caption: "Team pit stop" },
  { id: 3, type: "video", src: video1, caption: "Drone flight test" },
  { id: 4, type: "image", src: image4, caption: "IoT sensor rig" },
  { id: 5, type: "image", src: image5, caption: "Demo day presentation" },
  { id: 6, type: "image", src: image6, caption: "Mentor walkthrough" },
];

const viewAllBg = image7;

/* ------------------------------------------------------------------ */
/*  Grid tile                                                          */
/* ------------------------------------------------------------------ */

const Tile = ({ item, onOpen, large = false }) => {
  const videoRef = useRef(null);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: item.id * 0.05 }}
      onClick={onOpen}
      onMouseEnter={() => {
        if (item.type === "video" && videoRef.current) videoRef.current.play().catch(() => {});
      }}
      onMouseLeave={() => {
        if (item.type === "video" && videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      className={`group relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5730C] ${
        large ? "col-span-2 row-span-2 h-full" : "h-40 md:h-[13.5rem]"
      }`}
    >
      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <img
          src={item.src}
          alt={item.caption}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1130]/75 via-[#0B1130]/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {item.type === "video" && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-11 w-11 rounded-full bg-[#F5730C] flex items-center justify-center shadow-lg">
            <Play className="h-4 w-4 text-white ml-0.5" fill="white" />
          </span>
        </span>
      )}

      <span className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left">
        <span className="text-xs font-medium text-white leading-tight">{item.caption}</span>
      </span>
    </motion.button>
  );
};

/* ------------------------------------------------------------------ */
/*  Lightbox — quick preview for the teaser items only                 */
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

        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          aria-label="Previous"
          className="absolute left-3 sm:left-6 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          aria-label="Next"
          className="absolute right-3 sm:right-6 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl"
        >
          <div className="rounded-2xl overflow-hidden bg-black flex items-center justify-center">
            {current.type === "video" ? (
              <video key={current.src} src={current.src} controls autoPlay className="w-full max-h-[75vh] bg-black" />
            ) : (
              <img src={current.src} alt={current.caption} className="w-full max-h-[75vh] object-contain bg-black" />
            )}
          </div>
          <div className="mt-4 flex items-center justify-between text-white/70 font-body">
            <p className="text-sm font-medium text-white">{current.caption}</p>
            <span className="font-mono text-xs text-white/40">{index + 1} / {items.length}</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ------------------------------------------------------------------ */
/*  Main section — drop into the Home page                             */
/* ------------------------------------------------------------------ */

const LabGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const remaining = TOTAL_MEDIA_COUNT - teaser.length - 1; // minus the view-all tile's own background image

  return (
    <section className="py-24 sm:py-28 lg:py-36">
      <style>{FONT_STYLE}</style>
      <div className="font-body max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14 lg:mb-16"
        >
          <div className="max-w-2xl">
            <Eyebrow>Inside the labs</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1]">
              What building looks like on a Tuesday afternoon
            </h2>
          </div>
          <Link
            to="/gallery"
            className="hidden sm:inline-flex items-center gap-2 shrink-0 rounded-full border border-[#0B1130]/15 hover:border-[#0B1130] px-6 py-3 text-sm font-semibold text-[#0B1130] transition-colors duration-300"
          >
            View full gallery
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[10rem] md:auto-rows-[13.5rem] gap-4 md:gap-5">
          <Tile large item={teaser[0]} onOpen={() => setLightboxIndex(0)} />
          {teaser.slice(1).map((item, i) => (
            <Tile key={item.id} item={item} onOpen={() => setLightboxIndex(i + 1)} />
          ))}

          {/* View-all tile — closes out the bento grid, routes to the full gallery */}
          <Link
            to="/gallery"
            className="group relative overflow-hidden rounded-xl h-40 md:h-[13.5rem]"
          >
            <img
              src={viewAllBg}
              alt="View the full gallery"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#0B1130]/70 group-hover:bg-[#0B1130]/80 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-3">
              <Camera className="h-5 w-5 text-[#F5730C] mb-2" />
              <span className="font-display text-lg font-semibold leading-none">+{remaining}</span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-white/60 mt-1">
                View all
              </span>
            </div>
          </Link>
        </div>

        <div className="mt-10 sm:hidden text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 rounded-full border border-[#0B1130]/15 px-6 py-3 text-sm font-semibold text-[#0B1130]"
          >
            View full gallery
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={teaser}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
};

export default LabGallery;