import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {  Maximize2, Move, Sparkles } from "lucide-react";
const TESTIMONIALS = [
  {
    id: 1,
    author: "Jane Cooper",
    role: "CEO, StartupX",
    quote:
      "JVAI delivered our web platform insanely fast. Clean code, smooth UX, zero headaches.",
    logo: "/logo.png",
  },
  {
    id: 2,
    author: "Floyd Miles",
    role: "CTO, Fintech Labs",
    quote:
      "Their LLM integration took our product to the next level. Smart, scalable, and future-proof.",
    logo: "/logo.png",
  },
  {
    id: 3,
    author: "Kristin Watson",
    role: "Founder, SaaSly",
    quote:
      "JVAI understands startups. From idea to production, everything felt effortless.",
    logo: "/logo.png",
  },
  {
    id: 4,
    author: "Guy Hawkins",
    role: "Product Manager, CloudCore",
    quote:
      "The mobile app performance is top-tier. Our users noticed the difference immediately.",
    logo: "/logo.png",
  },
  {
    id: 5,
    author: "Arlene McCoy",
    role: "Head of Ops, RetailPro",
    quote:
      "Their NLP solutions automated 70% of our customer support. Huge win for our team.",
    logo: "/logo.png",
  },
  {
    id: 6,
    author: "Bessie Cooper",
    role: "VP Engineering, ScaleAI",
    quote:
      "JVAI’s architecture decisions saved us months of refactoring. Solid engineering.",
    logo: "/logo.png",
  },
  {
    id: 7,
    author: "Dianne Russell",
    role: "Founder, CreatorHub",
    quote:
      "They turned a rough idea into a polished product. Design + tech combo is elite.",
    logo: "/logo.png",
  },
  {
    id: 8,
    author: "Ronald Richards",
    role: "Security Lead, PaySecure",
    quote:
      "Secure, reliable, and well-documented. JVAI takes best practices seriously.",
    logo: "/logo.png",
  },
  {
    id: 9,
    author: "Cody Fisher",
    role: "UX Designer, SoftWorks",
    quote:
      "The UI/UX work was clean, modern, and user-focused. Exactly what we wanted.",
    logo: "/logo.png",
  },
  {
    id: 10,
    author: "Savannah Nguyen",
    role: "COO, HealthTech Inc",
    quote: "JVAI shipped our MVP faster than expected without cutting corners.",
    logo: "/logo.png",
  },
  {
    id: 11,
    author: "Jerome Bell",
    role: "Lead Developer, DevHouse",
    quote: "Code quality is top-notch. Easy to maintain and scale.",
    logo: "/logo.png",
  },
  {
    id: 12,
    author: "Leslie Alexander",
    role: "Founder, EduSmart",
    quote:
      "Their AI-powered features made our learning platform stand out instantly.",
    logo: "/logo.png",
  },
  {
    id: 13,
    author: "Brooklyn Simmons",
    role: "Marketing Director, Brandify",
    quote:
      "JVAI built tools that actually convert. The results speak for themselves.",
    logo: "/logo.png",
  },
  {
    id: 14,
    author: "Courtney Henry",
    role: "Product Owner, WorkflowX",
    quote: "Communication was smooth and transparent throughout the project.",
    logo: "/logo.png",
  },
  {
    id: 15,
    author: "Wade Warren",
    role: "CEO, LogiChain",
    quote:
      "Their backend systems handle scale like a champ. No downtime, no stress.",
    logo: "/logo.png",
  },
  {
    id: 16,
    author: "Esther Howard",
    role: "HR Tech Lead, PeopleOps",
    quote:
      "JVAI automated our internal tools with smart AI workflows. Super efficient.",
    logo: "/logo.png",
  },
  {
    id: 17,
    author: "Cameron Williamson",
    role: "CTO, TravelNow",
    quote:
      "The mobile-first approach really paid off. Performance is buttery smooth.",
    logo: "/logo.png",
  },
  {
    id: 18,
    author: "Eleanor Pena",
    role: "Founder, LegalTech Pro",
    quote:
      "Their NLP models handled complex documents with impressive accuracy.",
    logo: "/logo.png",
  },
  {
    id: 19,
    author: "Ralph Edwards",
    role: "Engineering Manager, Buildify",
    quote: "JVAI feels like an extension of our in-house team.",
    logo: "/logo.png",
  },
  {
    id: 20,
    author: "Annette Black",
    role: "Product Strategist, VisionAI",
    quote: "They don’t just build software — they think product.",
    logo: "/logo.png",
  },
  {
    id: 21,
    author: "Jacob Jones",
    role: "Founder, AnalyticsHub",
    quote:
      "Our data pipelines and AI models are now rock solid thanks to JVAI.",
    logo: "/logo.png",
  },
  {
    id: 22,
    author: "Theresa Webb",
    role: "Operations Lead, FleetOps",
    quote: "Automation reduced our manual workload massively. ROI was instant.",
    logo: "/logo.png",
  },
  {
    id: 23,
    author: "Albert Flores",
    role: "CEO, MediaStack",
    quote: "JVAI nailed both performance and aesthetics. Rare combo.",
    logo: "/logo.png",
  },
  {
    id: 24,
    author: "Kathryn Murphy",
    role: "Tech Consultant",
    quote: "Their system design choices were clean, modern, and scalable.",
    logo: "/logo.png",
  },
  {
    id: 25,
    author: "Marvin McKinney",
    role: "Founder, EcomBoost",
    quote: "Our conversion rates improved after the JVAI rebuild. Big W.",
    logo: "/logo.png",
  },
  {
    id: 26,
    author: "Kristin Hayes",
    role: "AI Researcher",
    quote:
      "JVAI knows how to ship AI features that actually work in production.",
    logo: "/logo.png",
  },
  {
    id: 27,
    author: "Darlene Robertson",
    role: "Product Lead, FinServe",
    quote: "From APIs to dashboards, everything was thoughtfully executed.",
    logo: "/logo.png",
  },
  {
    id: 28,
    author: "Darrell Steward",
    role: "CTO, RealEstateTech",
    quote: "Their platform handles real-time data flawlessly.",
    logo: "/logo.png",
  },
  {
    id: 29,
    author: "Ali Hassan",
    role: "Startup Founder",
    quote: "JVAI helped us go from zero to launch without chaos.",
    logo: "/logo.png",
  },
  {
    id: 30,
    author: "Sofia Martinez",
    role: "Product Designer",
    quote: "The collaboration was smooth, fast, and honestly fun.",
    logo: "/logo.png",
  },
];

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
    ["blur(0px)", "blur(2px)", "blur(8px)"]
  );
  const zIndex = useTransform(distance, [0, 500, 1000], [100, 50, 1]);

  const shadow = useTransform(
    distance,
    [0, 500],
    [
      "0 50px 100px -20px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.1)",
      "0 20px 40px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
    ]
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
      className={`shrink-0 bg-white rounded-[48px] p-12 text-[#050505] transition-[background-color] duration-500 ease-out flex flex-col justify-between group w-full h-auto md:w-[450px] md:h-[420px]`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-auto h-12">
               <img src={item.logo} alt="brand" className="w-full h-full object-cover" />
            </div>
           
          </div>
          <motion.div
            style={{ opacity: useTransform(distance, [0, 150], [1, 0]) }}
            className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
          >
            Top Feedback
          </motion.div>
        </div>

        <p className="text-2xl font-extrabold leading-[1.15] mb-6 tracking-tight text-slate-900 line-clamp-5">
          "{item.quote}"
        </p>
      </div>

      <div className="mt-auto border-t border-gray-100 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">
            {item.author.charAt(0)}
          </div>
          <div>
            <h4 className="font-black text-lg text-slate-900">{item.author}</h4>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
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

      <section className="relative w-full h-screen overflow-hidden bg-[#050505] cursor-grab active:cursor-grabbing">
        <div className="w-full h-20 bg-linear-to-b from-black to-transparent absolute z-10 "></div>
        {/* Parallax Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            style={{
              x: useTransform(springX, (v) => v * 0.12),
              y: useTransform(springY, (v) => v * 0.12),
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
          <div className="relative">
            {/* <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="w-[550px] h-[550px] border border-white/5 rounded-full"
          /> */}
            {/* <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-px h-32 bg-linear-to-t from-transparent via-blue-500 to-transparent" />
            <div className="absolute w-32 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent" />
          </div> */}
          </div>
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
            {TESTIMONIALS.map((t, i) => {
              const totalItems = TESTIMONIALS.length;
              const gridSize = Math.ceil(Math.sqrt(totalItems));
              const offset = Math.floor(gridSize / 2);

              const col = (i % gridSize) - offset;
              const row = Math.floor(i / gridSize) - offset;

              const layoutItem = {
                ...t,
                x: col * 500,
                y: row * 500,
                rotation: ((i * 13) % 20) - 10,
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
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-black bg-slate-800"
                  />
                ))}
                <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-black bg-slate-800">
                  +
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
