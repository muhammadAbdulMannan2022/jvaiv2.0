import React from "react";
import { motion } from "framer-motion";

const CEO = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[#020617] overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative group"
          >
            <div className="absolute -inset-4 bg-blue-600/10 rounded-4xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative aspect-4/5 md:aspect-3/4 rounded-4xl overflow-hidden border border-white/10 bg-slate-900/50">
              <img 
                src="https://res.cloudinary.com/dn98ksbcf/image/upload/v1777892134/monir_kc2uwb.webp" 
                alt="Muhammad Monir Hossain"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Tactical Hud Element */}
            <div className="absolute -bottom-6 -right-6 md:right-12 p-6 glass border border-white/10 rounded-2xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black text-white/50 tracking-[0.3em] uppercase">Executive_Active</span>
              </div>
            </div>
          </motion.div>

          {/* Content Container */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-blue-500 font-black text-xs uppercase tracking-[0.5em] mb-4 block">
                Betopia Group // Leadership
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-8">
                Leading with Vision, <br />
                <span className="text-gradient">Building with Purpose.</span>
              </h2>
              <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed">
                <p>
                  Muhammad Monir Hossain is a visionary leader with a proven track record of driving digital transformation. As the CEO of Betopia Group, he leads with purpose—bridging technology and business strategy to create scalable, secure, and future-ready ecosystems.
                </p>
                <p>
                  With his deep understanding of B2B markets, he ensures every initiative is designed to deliver sustainable growth and long-term success for partners. His leadership philosophy is rooted in innovation, adaptability, and creating meaningful impact across industries.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-8 border-t border-white/5"
            >
              <h3 className="text-2xl font-bold text-white mb-1">Muhammad Monir Hossain</h3>
              <p className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em]">Chief Executive Officer // Betopia Group</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEO;
