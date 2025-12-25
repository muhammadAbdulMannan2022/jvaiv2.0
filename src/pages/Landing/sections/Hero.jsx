import React from "react";
import { ArrowRight } from "lucide-react";
import Scene3D from "../../../components/hero/Scene3D";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050505]">
      {/* 3D Background Layer - Positioned to the left */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-[-10%] w-[120%] lg:w-[80%] h-full opacity-60">
          <Scene3D />
        </div>
      </div>

      {/* Content Layer */}
      <div className="max-w-screen-2xl mx-auto w-full relative z-10 px-6 py-4 md:px-8 lg:px-12">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 backdrop-blur-sm text-blue-400 text-sm font-semibold mb-8 border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            JVAI v2.0
          </div>

          <div>
            <h1 className="text-6xl md:text-7xl lg:text-9xl font-black bg-linear-to-r from-white via-blue-100 to-blue-600 inline-block text-transparent bg-clip-text leading-[0.95] tracking-tighter pb-14">
              Build better <br />
              together.
            </h1>
          </div>

          <p className="text-xl text-slate-400 max-w-lg mb-12 leading-relaxed font-medium">
            A high-performance workspace for modern teams. Orchestrate projects,
            sync with your team, and ship faster than ever.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <button className="group px-10 py-5 bg-blue-600 text-white text-lg font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-2 pointer-events-auto">
              Get Started Free
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white text-lg font-bold rounded-2xl hover:bg-white/10 transition-all pointer-events-auto">
              Book a Demo
            </button>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-4 border-[#050505] overflow-hidden shadow-sm"
                >
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                      i + 100
                    }`}
                    alt="User"
                    className="w-full h-full object-cover bg-slate-800"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm font-semibold text-slate-400">
              <span className="text-white font-bold block">
                12,000+ Happy Clients
              </span>
              Trust JVAI for there projects.
            </div>
          </div>
        </div>
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
};

export default Hero;
