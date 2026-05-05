import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useGetMomentsInJvaiQuery } from "../../../redux/features/apiSlice";
import { Heart, Users, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router";

// --- Components ---
import BentoGallery from "./components/BentoGallery";
import ResonanceScroll from "./components/ResonanceScroll";

const LifeAtJVAI = () => {
  const { data: momentsData, isLoading } = useGetMomentsInJvaiQuery();
  const allMoments = momentsData?.Data || [];

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const testimonials = [
    {
      name: "Yeamin Safat",
      role: "Data scientist",
      image:
        "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777968682/11-removebg-preview_e8nixi.png",
      message:
        "What I love most about working at JVAI is the people. There's no ego in the room — just a group of curious, talented folks who genuinely want to build something meaningful together. I've had hard days here, but never a lonely one. It feels less like an office and more like a place where I'm growing alongside friends.",
    },
    {
      name: "Foysal Munna",
      role: "Backend Developer",
      image:
        "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777970848/WhatsApp_Image_2026-05-05_at_2.25.19_PM-removebg-preview_r2nlxt.png",
      message:
        "JVAI is poised for substantial growth in the coming years, focusing on innovation and customer-centric solutions. By continuously improving our services and expanding our reach, we aim to become a leading force in the industry, driving success for both our clients and our company.",
    },
    {
      name: "Shahadat Hosen Nishan",
      role: "App developer",
      image:
        "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777971084/Media__2_-removebg-preview_hzxml3.png",
      message:
        "Working with Join Venture AI means getting more than just a developer; you’re getting a strategic partner. They excel at turning complex AI concepts into user-friendly digital products that drive real growth. Their success rate and global reach speak for themselves.",
    },
    
  ];

  return (
    <div className="bg-[#020617] text-white overflow-x-clip" ref={scrollRef}>
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

      {/* 2. Moments Section (Extracted) */}
      <BentoGallery moments={allMoments} isLoading={isLoading} />

      {/* 3. Testimonials Section (Extracted) */}
      <ResonanceScroll testimonials={testimonials} />

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
