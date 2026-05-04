import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

const ServiceCard = ({ service, index, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((e) => console.log("Video play failed:", e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(service)}
      className="group relative cursor-pointer overflow-hidden rounded-3xl md:rounded-4xl bg-[#0f0f0f] border border-white/5 hover:border-blue-500/30 transition-all duration-500 shadow-2xl"
    >
      <div className="aspect-4/5 overflow-hidden relative">
        {/* Background Image */}
        <motion.img
          src={service.img}
          alt={service.title}
          className={`h-full w-full object-cover transition-all duration-700 ${isHovered && service.category_video ? "opacity-0 scale-110" : "opacity-100 scale-100 grayscale-[0.3] group-hover:grayscale-0"}`}
        />

        {/* Video Preview on Hover - Only for devices with hover capabilities or handled by JS */}
        {service.category_video && (
          <video
            ref={videoRef}
            src={service.category_video}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
          />
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-[#000000] via-[#000000c9] to-transparent opacity-90 md:opacity-80 group-hover:opacity-60 transition-opacity" />
        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white transform transition-all duration-500 group-hover:pb-10">
        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <span className="w-6 md:w-8 h-px bg-blue-500 transition-all duration-500 group-hover:w-12" />
          <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-blue-500 font-black">
            {service.category}
          </p>
        </div>

        <h3 className="text-2xl md:text-3xl font-black font-heading tracking-tighter leading-none mb-4 group-hover:text-blue-400 transition-colors">
          {service.title}
        </h3>

        <div className="flex items-center justify-between mt-4 md:mt-6 transition-all duration-500 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/70">
            {service.category_video && isHovered ? (
              <span className="flex items-center gap-1.5 bg-blue-600 px-3 py-1.5 rounded-full text-white">
                <Play size={10} fill="currentColor" /> Previewing
              </span>
            ) : (
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                Explore Solution
              </span>
            )}
          </div>
          <div className="bg-white text-black p-2.5 md:p-3 rounded-full hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <ArrowUpRight size={18} className="md:w-5 md:h-5" />
          </div>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-bl from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default ServiceCard;
