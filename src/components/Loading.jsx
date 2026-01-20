import React, { useRef } from "react";

const LoadingScreen = () => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);

  return (
    <div
      ref={loaderRef}
      className=" inset-0 flex items-center justify-center bg-linear-to-br from-slate-900 via-black to-slate-900 z-50 relative h-screen w-full overflow-hidden"
    >
      <div className=" z-10 text-center w-full  px-6">
        {/* Logo */}
        <div ref={logoRef} className=" flex justify-center items-center mb-8">
          <img
            src="/logow.png"
            alt="Logo"
            className="w-44 h-auto object-contain"
          />

          {/* Shine */}
          {/* <div
            className="absolute top-0 inset-0 h-screen"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.30) 50%, transparent 100%)",
              animation: "shine 2.2s infinite",
              transform: "skewX(-25deg)",
              opacity: 0.8,
            }}
          /> */}
        </div>

        {/* Cinematic dots */}
        <div className="flex justify-center gap-2 mt-4">
          <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
          <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse delay-150" />
          <span className="w-2 h-2 rounded-full bg-white/20 animate-pulse delay-300" />
        </div>

        {/* Keyframes */}
        <style>
          {`
            @keyframes shine {
              0% { left: -120%; }
              100% { left: 220%; }
            }
            .animate-pulse {
              animation: pulse 1.2s infinite;
            }
            .delay-150 { animation-delay: 0.15s; }
            .delay-300 { animation-delay: 0.3s; }
            @keyframes pulse {
              0%, 100% { opacity: 0.2; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.3); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default LoadingScreen;
