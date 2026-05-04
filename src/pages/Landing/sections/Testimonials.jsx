import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Maximize2, Move, Sparkles } from "lucide-react";
import {
  useGetClientReviewsQuery,
  baseUri,
} from "../../../../redux/features/apiSlice";

const SpatialCard = ({ item, panX, panY }) => {
  const distance = useTransform([panX, panY], ([currX, currY]) => {
    const cardX = item.x + currX;
    const cardY = item.y + currY;
    const dist = Math.sqrt(Math.pow(cardX, 2) + Math.pow(cardY, 2));
    return dist;
  });

  const scale = useTransform(distance, [0, 500, 1000], [1.05, 0.95, 0.8]);
  const rotate = useTransform(distance, [0, 500], [0, item.rotation]);
  const opacity = useTransform(distance, [0, 500, 1000], [1, 0.9, 0.4]);
  const blur = useTransform(
    distance,
    [0, 500, 1000],
    ["blur(0px)", "blur(2px)", "blur(8px)"],
  );
  const zIndex = useTransform(distance, [0, 500, 1000], [100, 50, 1]);

  const shadow = useTransform(
    distance,
    [0, 500],
    [
      "0 50px 100px -20px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.1)",
      "0 20px 40px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
    ],
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x: item.x,
        y: item.y,
        scale,
        rotate,
        opacity,
        filter: blur,
        zIndex,
        boxShadow: shadow,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className={`shrink-0 bg-white rounded-4xl md:rounded-[48px] p-8 md:p-12 text-[#050505] transition-[background-color] duration-500 ease-out flex flex-col justify-between group w-[85vw] h-auto md:w-112.5 md:h-105`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {/* <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-2"> */}
            <img
              src="/logo.png"
              alt="brand"
              className="w-full h-12 object-contain"
            />
            {/* </div> */}
          </div>
          <motion.div
            style={{ opacity: useTransform(distance, [0, 150], [1, 0]) }}
            className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
          >
            Top Feedback
          </motion.div>
        </div>

        <p
          className="text-lg md:text-xl font-extrabold leading-[1.15] mb-6 tracking-tight text-slate-900 line-clamp-6"
          title={item.quote}
        >
          "{item.quote}"
        </p>
      </div>

      <div className="mt-auto border-t border-gray-100 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center font-bold text-slate-400 border border-slate-200">
            {item.logo ? (
              <img
                src={item.logo}
                alt={item.author}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            ) : (
              item.author.charAt(0)
            )}
          </div>
          <div>
            <h4 className="font-black text-base md:text-lg text-slate-900">
              {item.author}
            </h4>
            <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest">
              {item.role}
            </p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 opacity-20 group-hover:opacity-100 transition-opacity">
          <Maximize2 size={16} />
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);

  const springX = useSpring(panX, { stiffness: 35, damping: 25 });
  const springY = useSpring(panY, { stiffness: 35, damping: 25 });

  const { data, isLoading } = useGetClientReviewsQuery();
  const rawTestimonials = data?.Data || [];

  // Map and prepare testimonials for the spatial grid
  const testimonials = rawTestimonials.map((t, i) => {
    const imageUrl = t.client_picture?.startsWith("http")
      ? t.client_picture
      : `${baseUri}${t.client_picture}`;

    return {
      id: t.id,
      author: t.client_name,
      role: t.client_profession,
      quote: t.client_feedback,
      logo: imageUrl,
      rotation: ((i * 13) % 20) - 10,
    };
  });

  // These transforms must always be called, even if data is loading
  const bgX = useTransform(springX, (v) => v * 0.12);
  const bgY = useTransform(springY, (v) => v * 0.12);

  if (isLoading) {
    return (
      <section className="h-[90vh] bg-[#050505] overflow-hidden">
        <div className="pt-12 px-6 text-center space-y-4">
          <div className="h-3 w-32 bg-white/5 rounded-full mx-auto animate-pulse" />
          <div className="h-16 w-1/2 bg-white/5 rounded-2xl mx-auto animate-pulse" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="w-112.5 h-105 bg-white/5 rounded-[48px] animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <div>
      {/* Navigation Overlay - Moved higher and increased Z to clear cards */}
      <div className=" top-12 left-0 w-full z-60 pointer-events-none text-center px-6 mb-14 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <p className="text-blue-500 uppercase tracking-[0.6em] font-black text-[11px] mb-3">
            Verified Partnerships
          </p>
          <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter text-white">
            Client Ecosystem
          </h2>
        </motion.div>
      </div>

      <section className="relative w-full h-[90vh] overflow-hidden bg-[#050505] cursor-grab active:cursor-grabbing">
        <div className="w-full h-20 bg-linear-to-b from-black to-transparent absolute z-100 "></div>
        {/* Parallax Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            style={{
              x: bgX,
              y: bgY,
            }}
            className="absolute inset-[-50%] flex items-center justify-center"
          >
            <div className="grid grid-cols-12 gap-24 opacity-[0.05]">
              {Array.from({ length: 72 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Central Focus Marker - Adjusted visual weight */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative"></div>
        </div>

        {/* Infinite Draggable Canvas */}
        <motion.div
          drag
          dragMomentum={true}
          dragElastic={0.08}
          dragTransition={{ power: 0.35, timeConstant: 250 }}
          style={{
            x: springX,
            y: springY,
            width: "100%",
            height: "100%",
            position: "absolute",
            touchAction: "none",
          }}
        >
          <div className="relative w-full h-full">
            {testimonials.map((t, i) => {
              const totalItems = testimonials.length;
              const gridSize = Math.ceil(Math.sqrt(totalItems));
              const offset = Math.floor(gridSize / 2);

              const col = (i % gridSize) - offset;
              const row = Math.floor(i / gridSize) - offset;

              const layoutItem = {
                ...t,
                x: col * 600, // Increased spacing for cards
                y: row * 600,
                baseScale: 1,
              };
              return (
                <SpatialCard
                  key={t.id}
                  item={layoutItem}
                  panX={springX}
                  panY={springY}
                />
              );
            })}
          </div>
        </motion.div>

        {/* UI Control Hint */}
        <div className="absolute bottom-12 left-0 w-full z-60 flex justify-center pointer-events-none px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-10 bg-black/70 backdrop-blur-3xl border border-white/10 px-10 py-5 rounded-[40px] shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-blue-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                Active Clients
              </span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {testimonials.slice(0, 4).map((t, i) => (
                  <div
                    key={t.id}
                    className="w-8 h-8 rounded-full border-2 border-black bg-slate-800 overflow-hidden"
                  >
                    <img
                      src={t.logo}
                      alt="client"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {testimonials.length > 4 && (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-black bg-slate-800 text-[10px] font-bold">
                    +{testimonials.length - 4}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
