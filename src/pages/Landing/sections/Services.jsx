import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { X, PlayCircle } from "lucide-react";
import Scene from "../../../components/services/Sceane";
import ServiceCard from "../../../components/services/ServiceCard";

const SERVICES = [
  {
    id: 1,
    title: "Editorial Design",
    category: "Visual Identity",
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Interaction",
    category: "Motion Systems",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "3D Art Direction",
    category: "Creative Dev",
    img: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Future of AI",
    category: "Strategic Design",
    img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Modern Web",
    category: "Fullstack Mastery",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop",
  },
];

const App = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Background 3D Scene */}
      <Scene />

      {/* Hero Content */}
      <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-blue-500 uppercase tracking-[0.4em] font-bold text-xs mb-4">
              Our Expertise
            </p>
            <h1 className="text-6xl md:text-8xl font-heading font-bold leading-tight max-w-4xl tracking-tight">
              Crafting Digital <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/70 to-white/30">
                Excellence.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-lg text-white/50 max-w-xl leading-relaxed font-light"
          >
            We are a boutique creative technology house dedicated to high-end
            design, immersive experiences, and strategic AI integration.
          </motion.p>
        </header>

        {/* Services Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {SERVICES.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={idx}
              onSelect={(s) => setSelectedService(s)}
            />
          ))}

          {/* CTA Box */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col justify-center p-12 bg-blue-600 rounded-2xl group cursor-pointer transition-colors hover:bg-blue-500"
          >
            <h3 className="text-3xl font-heading font-bold mb-4">
              Ready to elevate your vision?
            </h3>
            <p className="text-white/80 mb-8 font-light leading-relaxed">
              Let's discuss how our services can empower your next project.
            </p>
            <div className="mt-auto flex items-center gap-4 text-sm font-bold uppercase tracking-widest">
              <span>Start a Project</span>
              <PlayCircle className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </section>
      </main>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-[#0f0f0f] border border-white/10 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto max-h-[90vh]"
            >
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <img
                  src={selectedService.img}
                  alt={selectedService.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />
              </div>
              <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.4em]">
                      {selectedService.category}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-heading font-bold mt-2">
                      {selectedService.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                <p className="text-xl text-white/70 font-light leading-relaxed mb-12">
                  {selectedService.description}
                </p>
                <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 border-b border-white/5 pb-2">
                    Key Outcomes
                  </h4>
                  <ul className="grid grid-cols-2 gap-4 text-sm font-medium">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      Enhanced Visual Impact
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      Strategic Differentiation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      Future-Proof Tech Stack
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      Seamless Accessibility
                    </li>
                  </ul>
                </div>
                <button className="mt-16 bg-white text-black py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-blue-500 hover:text-white transition-all">
                  Inquire for Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
