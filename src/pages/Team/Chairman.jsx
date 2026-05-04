import React from "react";
import { motion } from "framer-motion";

const Chairman = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[#020617] overflow-hidden border-t border-white/5">
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-emerald-600/5 blur-[120px] rounded-full -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Content Container */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-emerald-500 font-black text-xs uppercase tracking-[0.5em] mb-4 block">
                Betopia Group // Governance
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-8">
                Empowering Growth, <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-500">Inspiring Innovation.</span>
              </h2>
              <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed">
                <p>
                  As the Chairman of Betopia Group, Sabina Akter plays a vital role in shaping the company's long-term direction and success. She is passionate about building an inclusive ecosystem where innovation and collaboration go hand in hand.
                </p>
                <p>
                  With her focus on people-centric leadership, she empowers teams to explore new opportunities, adapt to market changes, and consistently deliver value. Her vision emphasizes sustainable growth, ethical practices, and creating a culture that inspires innovation at every level.
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
              <h3 className="text-2xl font-bold text-white mb-1">Sabina Akter</h3>
              <p className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em]">Chairman // Betopia Group</p>
            </motion.div>
          </div>

          {/* Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative group"
          >
            <div className="absolute -inset-4 bg-emerald-600/10 rounded-4xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative aspect-4/5 md:aspect-3/4 rounded-4xl overflow-hidden border border-white/10 bg-slate-900/50">
              <img 
                src="https://res.cloudinary.com/dn98ksbcf/image/upload/v1777892134/sabina_un2vgy.webp" 
                alt="Sabina Akter"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Tactical Hud Element */}
            <div className="absolute -bottom-6 -left-6 md:left-12 p-6 glass border border-white/10 rounded-2xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-white/50 tracking-[0.3em] uppercase">Governance_Sync</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Chairman;
