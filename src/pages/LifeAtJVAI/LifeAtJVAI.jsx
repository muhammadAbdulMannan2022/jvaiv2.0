import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  useGetMomentsInJvaiQuery,
  baseUri,
} from "../../../redux/features/apiSlice";
import { Camera, Heart, Users, Zap, ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router";

// --- Reusable Components ---

const GalleryItem = ({ item, index, onOpen }) => {
  const imageUrl =
    item.activity_pictures?.[0]?.file_url ||
    (item.activity_pictures?.[0]?.file
      ? `${baseUri}${item.activity_pictures[0].file}`
      : "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777890276/Gazi_vai_k9nlal.png");

  // Determine span size based on index for a denser Bento effect
  const spans = [
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
  ];
  const spanClass = spans[index % spans.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onClick={() => onOpen(item)}
      className={`${spanClass} relative group cursor-pointer overflow-hidden rounded-4xl border border-white/5 bg-slate-900 shadow-xl`}
    >
      <img
        src={imageUrl}
        alt={item.activity_title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">
          {item.activity_date
            ? new Date(item.activity_date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
            : "Archive_Log"}
        </p>
        <h3 className="text-xl font-bold text-white leading-tight">
          {item.activity_title}
        </h3>
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative p-8 md:p-12 glass border border-white/5 rounded-[3rem] overflow-hidden hover:border-blue-500/30 transition-all duration-700"
  >
    {/* Decorative Glow */}
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />

    <div className="relative z-10 flex flex-col h-full justify-between">
      <div>
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
          <Quote className="text-blue-500" size={24} />
        </div>
        <p className="text-xl md:text-2xl font-medium text-slate-200 leading-relaxed italic mb-12">
          "{testimonial.message}"
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 p-px">
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-black text-xl text-white">
            {testimonial.name.charAt(0)}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white text-lg tracking-tight">
            {testimonial.name}
          </h4>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500/60 mt-1">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Main Page Component ---

const LifeAtJVAI = () => {
  const { data: momentsData, isLoading } = useGetMomentsInJvaiQuery();
  const allMoments = momentsData?.Data || [];

  const [filter, setFilter] = React.useState("all");
  const [visibleCount, setVisibleCount] = React.useState(20);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const filteredMoments = allMoments.filter((m) => {
    if (filter === "all") return true;
    if (filter === "work")
      return (
        m.activity_title?.toLowerCase().includes("work") ||
        m.activity_title?.toLowerCase().includes("operation")
      );
    if (filter === "life")
      return (
        !m.activity_title?.toLowerCase().includes("work") &&
        !m.activity_title?.toLowerCase().includes("operation")
      );
    return true;
  });

  const visibleMoments = filteredMoments.slice(0, visibleCount);

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Lead Frontend Engineer",
      message:
        "At JVAI, the 'impossible' is just our Tuesday. The culture here isn't just about code; it's about building a future we actually want to live in.",
    },
    {
      name: "Sarah Chen",
      role: "AI Research Scientist",
      message:
        "The freedom to experiment here is unmatched. We aren't just following trends—we're the ones setting the pulse for the next generation of intelligence.",
    },
    {
      name: "Marcus Thorne",
      role: "Product Strategist",
      message:
        "Startup energy with enterprise-grade vision. Every day feels like a sprint towards something massive. It's exhilarating and deeply rewarding.",
    },
    {
      name: "Elena Rodriguez",
      role: "UI/UX Designer",
      message:
        "Design isn't an afterthought here; it's the bridge between complex tech and human experience. I've never felt more empowered as a creator.",
    },
    {
      name: "Tasnia Ahmed",
      role: "Senior Data Scientist",
      message:
        "JVAI truly fosters an environment where diverse perspectives drive innovation. It's incredibly fulfilling to work on AI solutions that are both cutting-edge and globally impactful.",
    },
  ];

  return (
    <div className="bg-[#020617] text-white overflow-hidden" ref={scrollRef}>
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex justify-center items-start pt-20 md:pt-64 px-6 overflow-hidden">
        {/* Background Animation Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-px w-12 bg-blue-500" />
            <span className="text-xs font-black uppercase tracking-[0.5em] text-blue-500">
              Inside the Nucleus
            </span>
            <div className="h-px w-12 bg-blue-500" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8"
          >
            Life at <span className="text-gradient">JVAI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed"
          >
            A high-velocity ecosystem where boundary-pushing engineers and
            visionary creators synchronize to architect the digital frontier.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-white/30">
            Initiate Scroll
          </span>
          <div className="w-px h-12 bg-linear-to-b from-blue-500 to-transparent" />
        </motion.div>
      </section>

      {/* 2. Moments Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              Moments in <br />
              <span className="text-blue-500">Synchronization.</span>
            </h2>
            <p className="text-slate-500 text-lg font-light max-w-md">
              A snapshot of our daily operations—where deep work meets explosive
              creativity.
            </p>
          </div>
          <div className="flex items-center gap-6 text-slate-700">
            <Camera size={40} strokeWidth={1} />
            <div className="h-px w-24 bg-white/5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Gallery_Module_v2.0
            </span>
          </div>
        </div>

        {/* Gallery Controls */}
        <div className="flex flex-wrap items-center justify-between gap-8 mb-16">
          <div className="flex items-center gap-3">
            {["all", "work", "life"].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setVisibleCount(10);
                }}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  filter === f
                    ? "bg-blue-500 text-white shadow-xl shadow-blue-500/20"
                    : "bg-white/5 text-slate-500 hover:bg-white/10 hover:text-white"
                }`}
              >
                {f === "all"
                  ? "Archive_Main"
                  : f === "work"
                    ? "Operations"
                    : "Pulse_v2.0"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-slate-700">
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Index_Map: {visibleMoments.length} / {filteredMoments.length}
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-3 md:grid-cols-6 auto-rows-[150px] gap-4">
            {[...Array(18)].map((_, i) => (
              <div
                key={i}
                className={`bg-white/5 rounded-2xl animate-pulse ${i % 7 === 5 ? "col-span-2" : ""}`}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            <div className="grid grid-cols-3 md:grid-cols-6 auto-rows-[120px] md:auto-rows-[180px] gap-4">
              {visibleMoments.map((moment, index) => (
                <GalleryItem
                  key={moment.id || index}
                  item={moment}
                  index={index}
                  onOpen={setSelectedImage}
                />
              ))}
            </div>

            {visibleCount < filteredMoments.length && (
              <div className="flex justify-center pt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="group flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-500">
                    <ArrowRight className="text-slate-500 group-hover:text-white rotate-90 transition-all" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 group-hover:text-blue-400">
                    Expand_Data_Stream
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Lightbox / High-Res View */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-100 bg-slate-950/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-w-7xl w-full"
            >
              <img
                src={
                  selectedImage.activity_pictures?.[0]?.file_url ||
                  (selectedImage.activity_pictures?.[0]?.file
                    ? `${baseUri}${selectedImage.activity_pictures[0].file}`
                    : "")
                }
                alt="Fullscreen View"
                className="w-full h-auto rounded-[3.5rem] shadow-2xl border border-white/5"
              />
              <div className="absolute top-8 right-8">
                <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                  <ArrowRight className="-rotate-45" size={20} />
                </button>
              </div>
              <div className="absolute -bottom-16 left-0 right-0 text-center px-6">
                <h3 className="text-2xl font-black tracking-tighter text-white">
                  {selectedImage.activity_title}
                </h3>
                <p className="text-blue-500 font-mono text-xs uppercase tracking-widest mt-1">
                  {selectedImage.activity_date}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* 3. Neural Insight Grid (Testimonials) */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/2 blur-[150px] rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-blue-500">
              <Zap size={20} />
              <span className="text-xs font-black uppercase tracking-[0.5em]">
                The_Neural_Network
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
              Shared <br />
              <span className="text-gradient">Intelligence.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-lg font-light max-w-xs leading-relaxed border-l border-white/10 pl-6">
            Unfiltered insights from the visionaries architecting the JVAI
            ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link
            to="/career"
            className="group px-12 py-5 rounded-full glass border border-white/10 hover:border-blue-500 transition-all duration-500 flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-300 hover:text-white shadow-2xl"
          >
            Become Part of the Vision
            <ArrowRight
              size={16}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </div>
      </section>

      {/* 4. Values / Culture Highlights */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: <Zap className="text-yellow-400" />,
              title: "High Velocity",
              desc: "We prioritize momentum over bureaucracy. If it adds value, we build it. Fast.",
            },
            {
              icon: <Heart className="text-rose-500" />,
              title: "Radical Empathy",
              desc: "We build for humans. That starts with how we treat our own team nodes.",
            },
            {
              icon: <Users className="text-emerald-400" />,
              title: "Parallel Thinking",
              desc: "Diverse perspectives aren't just invited; they're the core of our intelligence.",
            },
          ].map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="space-y-6 p-8 border border-white/5 rounded-[2.5rem] bg-white/2"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                {v.icon}
              </div>
              <h3 className="text-2xl font-bold">{v.title}</h3>
              <p className="text-slate-500 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Join Us CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-linear-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center group">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 blur-3xl rounded-full transition-transform duration-700 group-hover:scale-150" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-400/20 blur-3xl rounded-full transition-transform duration-700 group-hover:scale-150" />
          </div>

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white">
              Ready to <br /> Synchronize?
            </h2>
            <p className="text-white/80 text-xl max-w-xl mx-auto font-light leading-relaxed">
              We're always looking for high-capacity individuals to join our
              ranks. Your next mission starts here.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
              <Link
                to="/career"
                className="w-full md:w-auto px-10 py-5 bg-white text-blue-600 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-xl"
              >
                View Open Positions
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="w-full md:w-auto px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all"
              >
                Contact Talent Ops
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LifeAtJVAI;
