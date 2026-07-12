import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Video as VideoIcon,
  LayoutGrid,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Local media — place your files in src/images/ as 1.jpg…40.jpg and */
/*  1.mp4…11.mp4. Bundlers (CRA / Vite / webpack) resolve these to     */
/*  hashed, optimized URLs at build time.                              */
/* ------------------------------------------------------------------ */

import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";
import image3 from "../images/3.jpg";
import image4 from "../images/4.jpg";
import image5 from "../images/5.jpg";
import image6 from "../images/6.jpg";
import image7 from "../images/7.jpg";
import image8 from "../images/8.jpg";
import image9 from "../images/9.jpg";
import image10 from "../images/10.jpg";
import image11 from "../images/11.jpg";
import image12 from "../images/12.jpg";
import image13 from "../images/13.jpg";
import image14 from "../images/14.jpg";
import image15 from "../images/15.jpg";
import image16 from "../images/16.jpg";
import image17 from "../images/17.jpg";
import image18 from "../images/18.jpg";
import image19 from "../images/19.jpg";
import image20 from "../images/20.jpg";
import image21 from "../images/21.jpg";
import image22 from "../images/22.jpg";
import image23 from "../images/23.jpg";
import image24 from "../images/24.jpg";
import image25 from "../images/25.jpg";
import image26 from "../images/26.jpg";
import image27 from "../images/27.jpg";
import image28 from "../images/28.jpg";
import image29 from "../images/29.jpg";
import image30 from "../images/30.jpg";
import image31 from "../images/31.jpg";
import image32 from "../images/32.jpg";
import image33 from "../images/33.jpg";
import image34 from "../images/34.jpg";
import image35 from "../images/35.jpg";
import image36 from "../images/36.jpg";
import image37 from "../images/37.jpg";
import image38 from "../images/38.jpg";
import image39 from "../images/39.jpg";
import image40 from "../images/40.jpg";
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
  .blueprint-frame { position: relative; }
  .blueprint-frame::before, .blueprint-frame::after {
    content: ''; position: absolute; width: 24px; height: 24px; border-color: #F5730C; z-index: 10;
  }
  .blueprint-frame::before { top: -9px; left: -9px; border-top: 3px solid; border-left: 3px solid; }
  .blueprint-frame::after { bottom: -9px; right: -9px; border-bottom: 3px solid; border-right: 3px solid; }
`;

const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="h-2 w-2 rounded-full bg-[#F5730C]" />
    <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#0B1130]/50">
      {children}
    </span>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Media library — combine every imported image and video into one    */
/*  ordered array. Order here = order in the grid.                     */
/* ------------------------------------------------------------------ */

const mediaItems = [
  { type: "image", src: image1, caption: "Gallery photo 1" },
  { type: "image", src: image2, caption: "Gallery photo 2" },
  { type: "image", src: image3, caption: "Gallery photo 3" },
  { type: "image", src: image4, caption: "Gallery photo 4" },
  { type: "image", src: image5, caption: "Gallery photo 5" },
  { type: "image", src: image6, caption: "Gallery photo 6" },
  { type: "image", src: image7, caption: "Gallery photo 7" },
  { type: "image", src: image8, caption: "Gallery photo 8" },
  { type: "image", src: image9, caption: "Gallery photo 9" },
  { type: "image", src: image10, caption: "Gallery photo 10" },
  { type: "image", src: image11, caption: "Gallery photo 11" },
  { type: "image", src: image12, caption: "Gallery photo 12" },
  { type: "image", src: image13, caption: "Gallery photo 13" },
  { type: "image", src: image14, caption: "Gallery photo 14" },
  { type: "image", src: image15, caption: "Gallery photo 15" },
  { type: "image", src: image16, caption: "Gallery photo 16" },
  { type: "image", src: image17, caption: "Gallery photo 17" },
  { type: "image", src: image18, caption: "Gallery photo 18" },
  { type: "image", src: image19, caption: "Gallery photo 19" },
  { type: "image", src: image20, caption: "Gallery photo 20" },
  { type: "image", src: image21, caption: "Gallery photo 21" },
  { type: "image", src: image22, caption: "Gallery photo 22" },
  { type: "image", src: image23, caption: "Gallery photo 23" },
  { type: "image", src: image24, caption: "Gallery photo 24" },
  { type: "image", src: image25, caption: "Gallery photo 25" },
  { type: "image", src: image26, caption: "Gallery photo 26" },
  { type: "image", src: image27, caption: "Gallery photo 27" },
  { type: "image", src: image28, caption: "Gallery photo 28" },
  { type: "image", src: image29, caption: "Gallery photo 29" },
  { type: "image", src: image30, caption: "Gallery photo 30" },
  { type: "image", src: image31, caption: "Gallery photo 31" },
  { type: "image", src: image32, caption: "Gallery photo 32" },
  { type: "image", src: image33, caption: "Gallery photo 33" },
  { type: "image", src: image34, caption: "Gallery photo 34" },
  { type: "image", src: image35, caption: "Gallery photo 35" },
  { type: "image", src: image36, caption: "Gallery photo 36" },
  { type: "image", src: image37, caption: "Gallery photo 37" },
  { type: "image", src: image38, caption: "Gallery photo 38" },
  { type: "image", src: image39, caption: "Gallery photo 39" },
  { type: "image", src: image40, caption: "Gallery photo 40" },
  { type: "video", src: video1, caption: "Highlight clip 1" },
  { type: "video", src: video2, caption: "Highlight clip 2" },
  { type: "video", src: video3, caption: "Highlight clip 3" },
  { type: "video", src: video4, caption: "Highlight clip 4" },
  { type: "video", src: video5, caption: "Highlight clip 5" },
  { type: "video", src: video6, caption: "Highlight clip 6" },
  { type: "video", src: video7, caption: "Highlight clip 7" },
  { type: "video", src: video8, caption: "Highlight clip 8" },
  { type: "video", src: video9, caption: "Highlight clip 9" },
  { type: "video", src: video10, caption: "Highlight clip 10" },
  { type: "video", src: video11, caption: "Highlight clip 11" },
].map((item, i) => ({ ...item, id: i }));

/* ------------------------------------------------------------------ */
/*  Grid tile                                                          */
/* ------------------------------------------------------------------ */

const GalleryTile = ({ item, index, onOpen }) => {
  const videoRef = useRef(null);

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      onClick={() => onOpen(index)}
      onMouseEnter={() => {
        if (item.type === "video" && videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }}
      onMouseLeave={() => {
        if (item.type === "video" && videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      className="group relative aspect-square overflow-hidden rounded-xl bg-[#0B1130]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5730C]"
    >
      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <img
          src={item.src}
          alt={item.caption}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1130]/80 via-[#0B1130]/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
            item.type === "video"
              ? "bg-[#F5730C] scale-100 opacity-90 group-hover:opacity-100"
              : "bg-white/90 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
          }`}
        >
          {item.type === "video" ? (
            <Play className="h-4 w-4 text-white ml-0.5" fill="white" />
          ) : (
            <ImageIcon className="h-4 w-4 text-[#0B1130]" />
          )}
        </span>
      </div>

      <span className="absolute top-2.5 right-2.5 h-6 w-6 rounded-full bg-[#0B1130]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {item.type === "video" ? (
          <VideoIcon className="h-3 w-3 text-white" />
        ) : (
          <ImageIcon className="h-3 w-3 text-white" />
        )}
      </span>

      {item.caption && (
        <div className="absolute inset-x-0 bottom-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-[11px] font-medium text-white leading-tight line-clamp-2 text-left">
            {item.caption}
          </p>
        </div>
      )}
    </motion.button>
  );
};

/* ------------------------------------------------------------------ */
/*  Lightbox — full-screen viewer with prev / next navigation          */
/* ------------------------------------------------------------------ */

const Lightbox = ({ items, index, onClose, onNavigate }) => {
  const current = items[index];

  const goNext = useCallback(
    () => onNavigate((index + 1) % items.length),
    [index, items.length, onNavigate]
  );
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
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous"
          className="absolute left-3 sm:left-6 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next"
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
          <div className="blueprint-frame rounded-2xl overflow-hidden bg-black flex items-center justify-center">
            {current.type === "video" ? (
              <video
                key={current.src}
                src={current.src}
                controls
                autoPlay
                className="w-full max-h-[78vh] bg-black"
              />
            ) : (
              <img
                src={current.src}
                alt={current.caption}
                className="w-full max-h-[78vh] object-contain bg-black"
              />
            )}
          </div>
          <div className="mt-4 flex items-center justify-between text-white/70 font-body">
            <p className="text-sm font-medium text-white">{current.caption}</p>
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
/*  Main gallery page                                                  */
/* ------------------------------------------------------------------ */

const FILTERS = [
  { id: "all", label: "All" },
  { id: "image", label: "Photos" },
  { id: "video", label: "Videos" },
];

const NewsEvents = () => {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = useMemo(
    () => (filter === "all" ? mediaItems : mediaItems.filter((m) => m.type === filter)),
    [filter]
  );

  const photoCount = mediaItems.filter((m) => m.type === "image").length;
  const videoCount = mediaItems.filter((m) => m.type === "video").length;

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <div className="bg-[#F7F8FC] min-h-screen">
      <style>{FONT_STYLE}</style>
      <div className="font-body">
        {/* Header */}
        <section className="pt-28 pb-14 sm:pt-32 sm:pb-16 border-b border-[#0B1130]/8 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Eyebrow>Media gallery</Eyebrow>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B1130] leading-[1.1] max-w-xl">
                Photos & video from every session
              </h1>
              <div className="flex gap-8 shrink-0">
                <div>
                  <p className="font-display text-3xl font-semibold text-[#0B1130]">{photoCount}</p>
                  <p className="font-mono text-xs uppercase tracking-wide text-[#0B1130]/45 mt-1">
                    Photos
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-semibold text-[#0B1130]">{videoCount}</p>
                  <p className="font-mono text-xs uppercase tracking-wide text-[#0B1130]/45 mt-1">
                    Videos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter bar */}
        <section className="sticky top-0 z-20 bg-[#F7F8FC]/90 backdrop-blur-sm border-b border-[#0B1130]/8 py-4">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-[#0B1130]/30 mr-1 hidden sm:block" />
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  filter === f.id
                    ? "border-[#0B1130] bg-[#0B1130] text-white"
                    : "border-[#0B1130]/10 bg-white text-[#0B1130]/60 hover:border-[#0B1130]/25"
                }`}
              >
                {f.label}
                <span className="ml-1.5 font-mono text-[11px] opacity-60">
                  {f.id === "all"
                    ? mediaItems.length
                    : f.id === "image"
                    ? photoCount
                    : videoCount}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              <AnimatePresence>
                {filteredItems.map((item, i) => (
                  <GalleryTile key={item.id} item={item} index={i} onOpen={openLightbox} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
              <p className="text-center text-[#0B1130]/40 py-20 font-body">No media in this category yet.</p>
            )}
          </div>
        </section>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={filteredItems}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
};

export default NewsEvents;