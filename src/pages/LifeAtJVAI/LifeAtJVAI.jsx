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
    name: "Alex Rivera",
    role: "Lead Frontend Engineer",
    image: "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777890276/Gazi_vai_k9nlal.png",
    message: "At JVAI, the 'impossible' is just our Tuesday. The culture here isn't just about code; it's about building a future we actually want to live in.",
  },
  {
    name: "Sarah Chen",
    role: "AI Research Scientist",
    image: "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777890276/Gazi_vai_k9nlal.png",
    message: "The freedom to experiment here is unmatched. We aren't just following trends—we're the ones setting the pulse for the next generation of intelligence.",
  },
  {
    name: "Marcus Thorne",
    role: "Product Strategist",
    image: "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777890276/Gazi_vai_k9nlal.png",
    message: "Startup energy with enterprise-grade vision. Every day feels like a sprint towards something massive. It's exhilarating and deeply rewarding.",
  },
  {
    name: "Elena Rodriguez",
    role: "UI/UX Designer",
    image: "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777890276/Gazi_vai_k9nlal.png",
    message: "Design isn't an afterthought here; it's the bridge between complex tech and human experience. I've never felt more empowered as a creator.",
  },
  {
    name: "Anika Chowdhury",
    role: "Senior Data Scientist",
    image: "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777890276/Gazi_vai_k9nlal.png",
    message: "Being part of JVAI feels like being at the center of the next big shift. The collaborative spirit here is incredible—we’re solving global challenges while constantly pushing the boundaries.",
  },
  {
    name: "Tanvir Ahmed",
    role: "Full Stack Developer",
    image: "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777890276/Gazi_vai_k9nlal.png",
    message: "Working at JVAI has been a game-changer. The focus on innovation and the high-energy environment makes every project feel like a breakthrough.",
  },
  {
    name: "Fahim Hasan",
    role: "DevOps Engineer",
    image: "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777890276/Gazi_vai_k9nlal.png",
    message: "The scale of the systems we build here at JVAI is mind-blowing. It's rare to find a place that balances cutting-edge tech with such a supportive engineering culture.",
  },
  {
    name: "Nusrat Jahan",
    role: "Backend Architect",
    image: "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777890276/Gazi_vai_k9nlal.png",
    message: "What I love about JVAI is the transparency. From the founders to the interns, everyone is aligned on the mission to redefine how AI interacts with the real world.",
  },
  {
    name: "Ariful Islam",
    role: "Mobile App Developer",
    image: "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777890276/Gazi_vai_k9nlal.png",
    message: "The pace here is fast, but the mentorship is even faster. I’ve grown more in one year at JVAI than I did in three years elsewhere. It's a true builder's paradise.",
  },
  {
    name: "Mehnaz Karim",
    role: "QA Automation Lead",
    image: "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777890276/Gazi_vai_k9nlal.png",
    message: "We don't just ship products; we ship excellence. The attention to detail and the 'test-everything' mindset at JVAI ensures we're always delivering world-class software.",
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
