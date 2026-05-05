import React, { useRef, useState, useEffect } from "react";
import {
  motion,
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
  const x = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  const { data, isLoading } = useGetExpertsQuery();

  // Filter out specific members and ensure the correct property is used (expert_name)
  const experts = data?.Data?.filter((expert) => {
    const name = expert?.expert_name?.toLowerCase();
    return name !== "bijoy mondol";
  }) ?? [];

  const expertsToRender = [...experts, ...experts, ...experts]; // Triple for buttery smooth loop

  useEffect(() => {
    if (experts.length === 0) return;

    let controls;
    if (sliderRef.current && containerRef.current) {
      const sliderWidth = sliderRef.current.scrollWidth;
      const singleSetWidth = sliderWidth / 3;

      setDragConstraints({
        left: -singleSetWidth,
        right: 0,
      });

      if (!isPaused) {
        const speed = 45; // Pixels per second for constant marquee flow
        
        const loop = () => {
          const currentX = x.get();
          // Seamless wrapping logic
          if (currentX <= -singleSetWidth) {
            x.set(currentX + singleSetWidth);
          } else if (currentX > 0) {
            x.set(currentX - singleSetWidth);
          }

          const remaining = Math.abs(x.get() - (-singleSetWidth));
          const duration = remaining / speed;

          controls = animate(x, -singleSetWidth, {
            duration: duration,
            ease: "linear",
            onComplete: loop
          });
        };

        loop();
      }
    }
    return () => controls?.stop();
  }, [isPaused, experts.length, x]);

  if (isLoading) {
    return (
      <section className="py-32 relative overflow-hidden bg-[#020617]">
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <div className="h-2 w-32 bg-white/5 rounded-full animate-pulse" />
            <div className="h-16 w-64 bg-white/5 rounded-2xl animate-pulse" />
          </div>
        </div>
        <div className="flex gap-8 px-6 md:px-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[320px] md:w-95 h-[500px] bg-white/5 rounded-[40px] animate-pulse shrink-0" />
          ))}
        </div>
      </section>
    );
  }

  // Handle Controls by animating the MotionValue directly
  const handleControlClick = (direction) => {
    setIsPaused(true);
    const shift = 480 * direction; // Move roughly one card width
    const target = x.get() + shift;
    
    animate(x, target, {
      type: "spring",
      stiffness: 80,
      damping: 25,
      onComplete: () => {
        // Resume auto-scroll after 3 seconds of inactivity
        setTimeout(() => setIsPaused(false), 3000);
      }
    });
  };

  const getExpertSpecialties = (designation, expertId, name) => {
    const d = designation?.toLowerCase() || "";
    const n = name?.toLowerCase() || "";
    
    const frontendPool = ["Next.js", "React.js", "Tailwind CSS", "Framer Motion", "Three.js", "WASM"];
    const backendPool = ["Django", "Node.js","Go Lang" ,"PostgreSQL",  "System Design", "Rust", "Cloud Arch"];
    const designPool = ["UI/UX", "Product Design", "Visual ID", "Motion Design", "3D Art", "Art Direction"];
    const aiPool = ["Generative AI", "LLM Ops", "PyTorch", "NLP", "Neural Nets", "Computer Vision"];
    const appdeb = ["Flutter","Dart"];

    let pool = [];
    let isMannan = n.includes("mannan") && (d.includes("full stack") || d.includes("fullstack"));

    if (isMannan) pool = ["React Native", "Next.js", "React.js", "PostgreSQL","Node.js"];
    else if (/\b(ai|ml|data|science|scientist)\b/.test(d)) pool = aiPool;
    else if (/\b(design|ui|ux|art|creative)\b/.test(d)) pool = designPool;
    else if (d.includes("front")) pool = frontendPool;
    else if (d.includes("back")) pool = backendPool;
    else if (d.includes("app")) pool = appdeb;
    else if (d.includes("full stack") || d.includes("fullstack")) pool = ["Next.js", "Node.js", "React.js", "PostgreSQL", "System Design"];
    else pool = [...frontendPool, ...backendPool];

    const finalTags = [pool[0]];
    const index2 = ((expertId * 13) % (pool.length - 1)) + 1;
    finalTags.push(pool[index2]);
    return finalTags;
  };

  return (
    <section className="py-32 relative bg-[#020617] overflow-hidden">
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
          <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter text-end md:text-start text-white">
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleControlClick(1)}
              className="w-14 h-14 cursor-pointer rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all group"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => handleControlClick(-1)}
              className="w-14 h-14 cursor-pointer rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all group"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Draggable Slider Container */}
      <div
        ref={containerRef}
        className="w-full overflow-visible cursor-grab active:cursor-grabbing select-none"
      >
        <motion.div
          ref={sliderRef}
          style={{ x, width: "max-content" }}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          onDragStart={() => setIsPaused(true)}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
          className="flex gap-8 px-6 md:px-12 pb-12 will-change-transform"
        >
          {expertsToRender.map((expert, idx) => {
            const imageUrl = expert.expert_picture?.startsWith("http")
              ? expert.expert_picture
              : `${baseUri}${expert.expert_picture}`;

            const specialties = getExpertSpecialties(
              expert.expert_designation,
              expert.id,
              expert.expert_name,
            );

            return (
              <div
                key={`${expert.id}-${idx}`}
                className="group relative w-[320px] md:w-95 bg-[#0a0a0a] rounded-[40px] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500 shrink-0"
              >
                <div className="aspect-[3/3.5] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img
                    src={imageUrl}
                    alt={expert.expert_name}
                    draggable={false}
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-5 right-8 flex flex-col gap-2 items-end">
                    {specialties.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-xl text-white/70 px-4 py-1.5 rounded-full border border-white/10 group-hover:border-blue-500/40 group-hover:text-blue-400 transition-all duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-10 relative">
                  <div className="flex items-center gap-3 mb-3 text-white/30 group-hover:text-blue-500 transition-colors">
                    <Terminal size={14} className="group-hover:animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em]">
                      {expert.expert_designation}
                    </span>
                  </div>
                  <h3 className="text-4xl font-bold font-heading mb-1 text-white group-hover:tracking-tight transition-all duration-500 uppercase">
                    {expert.expert_name}
                  </h3>
                  <div className="flex gap-4 mt-6 opacity-20 group-hover:opacity-100 transition-all duration-700 transform group-hover:translate-x-2">
                    <Code2 size={20} className="hover:text-blue-400" />
                    <Database size={20} className="hover:text-blue-400" />
                    <Cpu size={20} className="hover:text-blue-400" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="flex justify-center mt-8">
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-3 text-white/20 text-[11px] uppercase font-black tracking-[0.4em]"
        >
          <MoveHorizontal size={14} />
          Interactive Talent Stream
        </motion.div>
      </div>
    </section>
  );
};

export default Experts;
