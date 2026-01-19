import React from "react";
import Services from "../Landing/sections/Services";

export default function ServicesPage() {
  return (
    <div>
      <section className="relative h-[50vh] flex flex-col items-center justify-center  bg-[url('/servicesHbg.png')] bg-cover bg-center bg-no-repeat">
        <div className="px-6 pb-16 flex flex-col items-center justify-center w-full h-full bg-black/60 backdrop-blur-[1px]">
          <div className="max-w-5xl text-center z-10">
            <div className="hero-text-mini mb-4">
              <span className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20 backdrop-blur-sm">
                Our Capabilities
              </span>
            </div>
            <h1 className="hero-text-mini text-5xl md:text-7xl font-black tracking-tighter leading-tight text-white mb-6">
              Elite Software <span className="text-gradient">Services.</span>
            </h1>
            <p className="hero-text-mini text-lg md:text-xl text-slate-200 max-w-2xl mx-auto  leading-relaxed ">
              From cognitive architectures to immersive digital interfaces, we
              engineer the tools of the next industrial revolution.
            </p>
          </div>
        </div>
      </section>
      <Services titleClass={"text-4xl md:text-5xl"} />
    </div>
  );
}
