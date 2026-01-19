import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import {
  Cpu,
  Code2,
  Database,
  Terminal,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
} from "lucide-react";

const Experts = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const EXPERTS = [
    {
      id: 1,
      name: "Alex Thorne",
      role: "Lead Systems Architect",
      specialty: ["Rust", "WASM", "Distributed Systems"],
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Elena Vance",
      role: "Head of AI Research",
      specialty: ["PyTorch", "NLP", "Generative Models"],
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Marcus Kael",
      role: "Visual Technologist",
      specialty: ["Three.js", "GLSL", "Creative Coding"],
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Sonia Ray",
      role: "Interaction Director",
      specialty: ["React", "Framer Motion", "UX Design"],
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Julian Voss",
      role: "Security Principal",
      specialty: ["Solidity", "Zero-Knowledge", "Cryptography"],
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Rina Sato",
      role: "Platform Engineer",
      specialty: ["Kubernetes", "Go", "Cloud Architecture"],
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 7,
      name: "David Chen",
      role: "MLOps Specialist",
      specialty: ["TensorFlow", "CUDA", "Edge AI"],
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    },
  ];
  useEffect(() => {
    if (sliderRef.current && containerRef.current) {
      const sliderWidth = sliderRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      setDragConstraints({
        left: -(sliderWidth - containerWidth + 48),
        right: 0,
      });
    }
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="py-32 relative">
      {/* Header Area */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-blue-500 uppercase tracking-[0.6em] font-black text-[10px] mb-4">
            The Engineering Core
          </p>
          <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter">
            Technological <br /> Masters.
          </h2>
        </motion.div>

        <div className="flex flex-col items-end gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md text-white/40 leading-relaxed font-light text-right"
          >
            A multi-disciplinary collective of engineers pushing the boundaries
            of what's possible in the digital realm.
          </motion.p>

          {/* Slider Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 cursor-pointer rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 cursor-pointer rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Draggable Slider Container */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      >
        <div className="w-10 md:w-36 bg-red-500 absolute top-0 left-0"></div>
        <motion.div
          ref={sliderRef}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          dragMomentum={true}
          className="flex gap-8 px-6 md:px-12 pb-12"
          style={{ width: "max-content" }}
        >
          {EXPERTS.map((expert, idx) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative w-[320px] md:w-95 bg-[#0a0a0a] rounded-[40px] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500 shrink-0"
            >
              {/* Image Container */}
              <div className="aspect-[3/3.5] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                <img
                  src={expert.image}
                  alt={expert.name}
                  draggable={false}
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />

                {/* Tech Stream Overlays */}
                <div className="absolute bottom-5 right-8 flex flex-col gap-2 items-end">
                  {expert.specialty.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-xl text-white/70 px-4 py-1.5 rounded-full border border-white/10 group-hover:border-blue-500/40 group-hover:text-blue-400 transition-all duration-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info Area */}
              <div className="p-10 relative">
                <div className="flex items-center gap-3 mb-3 text-white/30 group-hover:text-blue-500 transition-colors">
                  <Terminal size={14} className="group-hover:animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                    {expert.role}
                  </span>
                </div>
                <h3 className="text-3xl font-bold font-heading mb-1 text-white group-hover:tracking-tight transition-all duration-500">
                  {expert.name}
                </h3>

                <div className="flex gap-4 mt-6 opacity-20 group-hover:opacity-100 transition-all duration-700 transform group-hover:translate-x-2">
                  <Code2
                    size={18}
                    className="hover:text-blue-400 cursor-help"
                  />
                  <Database
                    size={18}
                    className="hover:text-blue-400 cursor-help"
                  />
                  <Cpu size={18} className="hover:text-blue-400 cursor-help" />
                </div>

                {/* Cyberpunk Scanline Effect */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Swipe Hint */}
      <div className="flex justify-center mt-8">
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-3 text-white/20 text-[10px] uppercase font-black tracking-[0.4em]"
        >
          <MoveHorizontal size={14} />
          Drag to explore talent
        </motion.div>
      </div>
    </section>
  );
};

export default Experts;
