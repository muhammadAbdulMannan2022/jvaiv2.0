import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";

import {
  Cpu,
  Code2,
  Database,
  Terminal,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
} from "lucide-react";
import {
  useGetExpertsQuery,
  baseUri,
} from "../../../../redux/features/apiSlice";

const Experts = () => {
  const x = useMotionValue(0); // Track the X position
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  const { data, isLoading } = useGetExpertsQuery();
  const experts = data?.Data || [];

  const expertsToRender = [...experts, ...experts];

  useEffect(() => {
    if (experts.length === 0) return;

    let controls;
    if (sliderRef.current && containerRef.current) {
      const sliderWidth = sliderRef.current.scrollWidth;
      const singleSetWidth = sliderWidth / 2;
      
      setDragConstraints({
        left: -singleSetWidth,
        right: 0,
      });

      if (!isPaused) {
        const currentX = x.get();
        // Speed in pixels per second
        const speed = 50; 
        
        // Ensure we are within the range [ -singleSetWidth, 0 ]
        if (currentX <= -singleSetWidth) x.set(currentX + singleSetWidth);
        if (currentX > 0) x.set(currentX - singleSetWidth);

        const remainingDistance = Math.abs(x.get() - (-singleSetWidth));
        const duration = remainingDistance / speed;

        controls = animate(x, -singleSetWidth, {
          duration: duration,
          ease: "linear",
          onComplete: () => {
            x.set(0);
            setIsPaused(false); 
          }
        });
      }
    }
    return () => controls?.stop();
  }, [isPaused, experts.length, x]);

  if (isLoading) {
    return (
      <section className="py-32 relative overflow-hidden">
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <div className="h-2 w-32 bg-white/5 rounded-full animate-pulse" />
            <div className="h-16 w-64 bg-white/5 rounded-2xl animate-pulse" />
          </div>
          <div className="space-y-4 flex flex-col items-end">
            <div className="h-4 w-48 bg-white/5 rounded-full animate-pulse" />
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-full bg-white/5 animate-pulse" />
              <div className="w-12 h-12 rounded-full bg-white/5 animate-pulse" />
            </div>
          </div>
        </div>
        <div className="flex gap-8 px-6 md:px-12">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-[320px] md:w-95 h-[500px] bg-white/5 rounded-[40px] animate-pulse shrink-0"
            />
          ))}
        </div>
      </section>
    );
  }

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
          <p className="text-blue-500 uppercase tracking-[0.6em] font-black text-[10px] mb-4 text-end md:text-start">
            The Engineering Core
          </p>
          <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter text-end md:text-start">
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
          style={{ x, width: "max-content" }} // Bind the motion value here
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          onDragStart={() => setIsPaused(true)} // Pause when dragging starts
          onHoverStart={() => setIsPaused(true)} // Pause on mouse hover
          onHoverEnd={() => setIsPaused(false)} // Resume on mouse leave
          className="flex gap-8 px-6 md:px-12 pb-12 will-change-transform"
        >
          {expertsToRender.map((expert, idx) => {
            const imageUrl = expert.expert_picture?.startsWith("http")
              ? expert.expert_picture
              : `${baseUri}${expert.expert_picture}`;

            // Dynamic specialties based on designation (Stable/Deterministic)
            const getExpertSpecialties = (designation, expertId, name) => {
                const d = designation?.toLowerCase() || "";
                const n = name?.toLowerCase() || "";
                
                // Skill Pools - Lead with the "Main" thing in each array
                const frontendPool = ["Next.js", "React.js", "Tailwind CSS", "Framer Motion", "Three.js", "WASM"];
                const backendPool = ["Django", "Node.js","Go Lang" ,"PostgreSQL",  "System Design", "Rust", "Cloud Arch"];
                const designPool = ["UI/UX", "Product Design", "Visual ID", "Motion Design", "3D Art", "Art Direction"];
                const aiPool = ["Generative AI", "LLM Ops", "PyTorch", "NLP", "Neural Nets", "Computer Vision"];
                const appdeb= ["Flutter","Dart"]

                let pool = [];
                let isMannan = n.includes("mannan") && (d.includes("full stack") || d.includes("fullstack"));

                // 1. Specific override for you
                if (isMannan) {
                  pool = ["React Native", "Next.js", "React.js", "PostgreSQL","Node.js",];
                } 
                else if (/\b(ai|ml|data|science|scientist)\b/.test(d)) pool = aiPool;
                else if (/\b(design|ui|ux|art|creative)\b/.test(d)) pool = designPool;
                else if (d.includes("front")) pool = frontendPool;
                else if (d.includes("back")) pool = backendPool;
                else if (d.includes("app")) pool = appdeb;
                else if (d.includes("full stack") || d.includes("fullstack")) {
                  pool = ["Next.js", "Node.js", "React.js", "PostgreSQL", "System Design"];
                } 
                else {
                  pool = [...frontendPool, ...backendPool];
                }

                // --- Selection Logic ---
                
                // Tag 1: Always the "Main Thing" (First item in pool)
                const finalTags = [pool[0]];

                // Tag 2: Deterministic secondary skill
                const index2 = (expertId * 13) % (pool.length - 1) + 1;
                finalTags.push(pool[index2]);

                // Tag 3: Only for Mannan
                if (isMannan) {
                  let index3 = (expertId * 17) % (pool.length - 1) + 1;
                  // Ensure Tag 3 isn't the same as Tag 2
                  if (index3 === index2) index3 = (index3 % (pool.length - 1)) + 1;
                  finalTags.push(pool[index3]);
                }

                return finalTags;
              };

            const specialties = getExpertSpecialties(
              expert.expert_designation,
              expert.id,
              expert.expert_name 
            );

            return (
              <div
                key={`${expert.id}-${idx}`}
                className="group relative w-[320px] md:w-95 bg-[#0a0a0a] rounded-[40px] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500 shrink-0"
              >
                {/* Image Container */}
                <div className="aspect-[3/3.5] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img
                    src={imageUrl}
                    alt={expert.expert_name}
                    draggable={false}
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />

                  {/* Tech Stream Overlays */}
                  <div className="absolute bottom-5 right-8 flex flex-col gap-2 items-end">
                    {specialties.map((tech, i) => (
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
                      {expert.expert_designation}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold font-heading mb-1 text-white group-hover:tracking-tight transition-all duration-500 uppercase">
                    {expert.expert_name}
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
                    <Cpu
                      size={18}
                      className="hover:text-blue-400 cursor-help"
                    />
                  </div>

                  {/* Cyberpunk Scanline Effect */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
                </div>
              </div>
            );
          })}
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
