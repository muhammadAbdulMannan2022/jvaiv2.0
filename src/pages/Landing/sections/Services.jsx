import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PlayCircle, CheckCircle2 } from "lucide-react";
import Scene from "../../../components/services/Sceane";
import ServiceCard from "../../../components/services/ServiceCard";
import VideoPlayer from "../../../components/VideoPlayer";
import { useGetAllCategoriesQuery } from "../../../../redux/features/apiSlice";

const App = ({ titleClass }) => {
  const [selectedService, setSelectedService] = useState(null);
  const { data: categoriesData, isLoading } = useGetAllCategoriesQuery();

  // Handle body scroll lock
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  const services = categoriesData?.Data || [];

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
        <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <header className="mb-24 space-y-6">
            <div className="h-3 w-40 bg-white/5 rounded-full animate-pulse" />
            <div className="h-20 w-3/4 bg-white/5 rounded-3xl animate-pulse" />
            <div className="h-20 w-1/2 bg-white/5 rounded-3xl animate-pulse" />
            <div className="h-6 w-1/3 bg-white/5 rounded-xl animate-pulse mt-8" />
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[4/5] bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        </main>
      </div>
    );
  }

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
            <h1
              className={` font-heading font-bold leading-tight max-w-4xl tracking-tight ${titleClass ? titleClass : "text-6xl md:text-8xl"}`}
            >
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
          {services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={{
                ...service,
                title: service.category_name,
                category: "Service Excellence",
                img: service.category_background_image,
              }}
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
            className="fixed inset-0 z-999999999999 flex items-center justify-center p-4 md:p-6 bg-black/10 backdrop-blur-xl h-screen"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-6xl rounded-4xl md:rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Responsive Position */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-110 p-3 bg-black/60 md:bg-white/5 hover:bg-white/10 rounded-full transition-all hover:scale-110 hover:cursor-pointer group backdrop-blur-md border border-white/10"
              >
                <X
                  size={20}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
              </button>

              {/* Media Section */}
              <div className="w-full md:w-[55%] relative h-[30vh] md:h-auto overflow-hidden bg-black shrink-0">
                {selectedService.category_video ? (
                  <VideoPlayer
                    url={selectedService.category_video}
                    poster={selectedService.category_background_image}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={selectedService.category_background_image}
                    alt={selectedService.category_name}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                )}
              </div>

              {/* Content Section */}
              <div className="w-full md:w-[45%] p-6 md:p-12 flex flex-col overflow-y-auto custom-scrollbar">
                <div className="mb-8 mt-4 md:mt-0">
                  <span className="text-blue-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    Expertise
                  </span>
                  <h2 className="text-3xl md:text-5xl font-heading font-black mt-4 tracking-tighter leading-tight">
                    {selectedService.category_name}
                  </h2>
                </div>

                <div className="prose prose-invert max-w-none mb-10">
                  <p className="text-base md:text-lg text-white/70 font-light leading-relaxed whitespace-pre-line">
                    {selectedService.category_description}
                  </p>
                </div>

                {selectedService.key_points &&
                  selectedService.key_points.length > 0 && (
                    <div className="space-y-6 mb-10">
                      <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/30 border-b border-white/5 pb-3">
                        Key Objectives
                      </h4>
                      <div className="grid grid-cols-1 gap-3 md:gap-4">
                        {selectedService.key_points.map((point, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors"
                          >
                            <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                            <span className="text-sm font-medium text-white/80 leading-snug">
                              {point.point_name}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                {(selectedService.category_left_picture ||
                  selectedService.category_right_picture) && (
                  <div className="space-y-6">
                    <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/30 border-b border-white/5 pb-3">
                      Visual References
                    </h4>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      {selectedService.category_left_picture && (
                        <div className="group relative overflow-hidden rounded-2xl aspect-square bg-white/5 border border-white/10">
                          <img
                            src={selectedService.category_left_picture}
                            alt="Left Detail"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                      )}
                      {selectedService.category_right_picture && (
                        <div className="group relative overflow-hidden rounded-2xl aspect-square bg-white/5 border border-white/10">
                          <img
                            src={selectedService.category_right_picture}
                            alt="Right Detail"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-12 pt-8 border-t border-white/5">
                  <button className="w-full bg-blue-600 text-white py-4 md:py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] md:text-sm hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all transform hover:-translate-y-1">
                    Inquire for Project
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
