import React, { useEffect, useState } from "react";
import gsap from "gsap";
import VideoPlayer from "../../components/VideoPlayer";
import CEO from "./CEO";
import Chairman from "./Chairman";

export const TEAM_MEMBERS = [
  {
    id: "gm-1",
    name: "Gazi Alauddin",
    role: "General Manager",
    department: "GM",
    color: "#ffffff",
    bio: "Gazi Alauddin is the master architect of the JVAI vision. He synchronizes all departmental nodes to ensure the company moves as a single high-performance entity.",
    image:
      "https://res.cloudinary.com/dn98ksbcf/image/upload/v1777888088/Screenshot_2026-05-04_154745_rhnhap.png",
    connection: "Central Processing Hub: Directing all strategic vectors.",
    videoUrl:
      "https://res.cloudinary.com/dn98ksbcf/video/upload/v1777887904/Gazi_via_vzw0uh.mp4",
  },

  {
    id: "hto1",
    name: "Istiaq Ahmmed Fahad",
    role: "Head of Technical Operation",
    department: "Operations",
    color: "#2dd4bf",
    bio: "Fahad oversees the structural integrity of our cloud lattice. He ensures our infrastructure is self-healing, scalable, and secure.",
    image: "https://i.ibb.co/C5szG7LV/f93c81c1ce82.png",
    connection:
      "Feeds Operations with precise client data and market-ready objectives.",
    videoUrl:
      "https://res.cloudinary.com/dn98ksbcf/video/upload/v1757576899/FAHAD_INTRO_qg9x7a.mp4",
  },
  {
    id: "hto-2",
    name: "PALASH CHANDRA BARMAN",
    role: "Head of Technical Operation",
    department: "Operations",
    color: "#818cf8",
    bio: "Palash leads the implementation of our neural models. He bridges the gap between pure research and production-grade AI delivery.",
    image: "https://i.ibb.co/SLWb1fn/931dd9a7cffd.png",
    connection:
      "Parallel Processor: Driving intelligence output across all nodes.",
    videoUrl:
      "https://res.cloudinary.com/dn98ksbcf/video/upload/v1757576884/Palash_cydcxi.mp4",
  },
  {
    id: "t1",
    name: "Mushfiqur rahman",
    role: "AGM",
    department: "Sales",
    color: "#2dd4bf",
    bio: "Mushfiq translates complex business requirements into high-velocity digital strategies, ensuring every client partnership is calibrated for maximum ROI.",
    image: "https://i.ibb.co/JWGd0z6x/54bf80ffb07f.png",
    connection:
      "Feeds Operations with precise client data and market-ready objectives.",
    videoUrl:
      "https://res.cloudinary.com/dn98ksbcf/video/upload/v1757576897/Sales_agm-_yj3dfv.mp4",
  },
];
const TeamPage = () => {
  const [selectedInterview, setSelectedInterview] = useState(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".dossier-reveal",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
    );

    gsap.fromTo(
      ".line-draw",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: "expo.inOut", stagger: 0.2 },
    );
  }, []);

  const gmMember = TEAM_MEMBERS.find((m) => m.department === "GM");
  const salesMember = TEAM_MEMBERS.find((m) => m.department === "Sales");
  const opsMembers = TEAM_MEMBERS.filter((m) => m.department === "Operations");
  const bizDevMember = TEAM_MEMBERS.find((m) => m.department === "BizDev");

  const MemberDossier = ({ member, size = "normal" }) => {
    const isLarge = size === "large";
    const isSmall = !isLarge;

    return (
      <div
        className={`group relative overflow-hidden bg-slate-900/40 border border-white/5 hover:border-white/20 transition-all duration-500
        ${isLarge ? "aspect-video md:aspect-21/9" : "aspect-4/5"}
      `}
      >
        {/* Background */}
        <div className="absolute inset-0 z-0 grayscale group-hover:grayscale-0 transition-all duration-1000">
          <img
            src={member.image}
            alt={member.name}
            className={`w-full h-full object-cover transition-all duration-1000
            ${
              isSmall
                ? "opacity-60 group-hover:opacity-80"
                : "opacity-40 group-hover:opacity-100 group-hover:scale-105"
            }
          `}
          />

          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />

          {/* Scanline */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-size-[100%_2px,3px_100%]" />
        </div>
        {/* Top HUD */}
        <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-start z-10">
          <div className="space-y-1">
            <p className="text-[8px] md:text-[9px] font-black text-white/30 tracking-[0.25em] uppercase">
              Sector: {member.department}
            </p>

            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: member.color }}
              />
              <p className="text-[9px] font-bold text-white/50 tracking-widest uppercase">
                Node_Active
              </p>
            </div>
          </div>

          <p className="text-[9px] font-mono text-white/20">
            #{member.id.toUpperCase()}
          </p>
        </div>
        \
        <div
          className="justify-end absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            display: !isLarge ? "flex" : "none",
          }}
        >
          {member.videoUrl && (
            <button
              onClick={() => setSelectedInterview(member)}
              className="items-center gap-4 px-3 py-3 rounded-full md:opacity-0 md:group-hover:opacity-100 flex bg-white text-slate-950 text-[10px] font-black tracking-widest uppercase hover:bg-blue-400 hover:text-white transition-all duration-500 hover:cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}
        </div>
        {/* Bottom Content */}
        <div
          className={`absolute bottom-0 left-0 w-full z-10
          ${isSmall ? "p-5" : "p-8 md:p-12"}
        `}
        >
          <div className="max-w-2xl">
            <h3
              className={`font-black text-white leading-none tracking-tight
              ${isSmall ? "text-xl md:text-2xl mb-1" : "text-5xl md:text-7xl mb-2"}
            `}
            >
              {member.name}
            </h3>

            <p
              className={`text-blue-400 font-black uppercase tracking-[0.35em]
              ${isSmall ? "text-[9px] mb-3" : "text-[10px] mb-6"}
            `}
            >
              {member.role}
            </p>

            {/* Extra content only for large */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end md:opacity-0 md:group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              {!isSmall && (
                <p className="text-slate-400 text-sm font-light leading-relaxed hidden md:block">
                  {member.bio}
                </p>
              )}

              <div
                className="justify-end"
                style={{
                  display: isLarge ? "flex" : "none",
                }}
              >
                {member.videoUrl && (
                  <button
                    onClick={() => setSelectedInterview(member)}
                    className="flex items-center gap-4 px-6 py-3 bg-white text-slate-950 text-[10px] font-black tracking-widest uppercase hover:bg-blue-400 hover:text-white transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Access Interview
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Corners */}
        <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-t border-r border-white/20" />
        <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-b border-l border-white/20" />
      </div>
    );
  };

  return (
    <div className=" bg-[#020617]">
      {/* 1. Tactical Header */}
      <header className="relative h-auto md:h-[80vh] flex flex-col md:flex-row items-center justify-center px-6 border-b border-white/5 overflow-hidden">
        <div className="flex max-w-7xl items-center justify-between flex-col md:flex-row mt-10 md:mt-0">
          <div className="mx-auto w-full relative z-10">
            <div className="flex items-center gap-6 mb-8 dossier-reveal">
              <div className="line-draw h-px w-20 bg-blue-500 origin-left" />
              <span className="text-[10px] font-black text-blue-400 tracking-[0.5em] uppercase">
                Human Capital Lattice
              </span>
            </div>
            <h1 className="dossier-reveal text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-12">
              The Elite <br />
              <span className="text-gradient">Collective.</span>
            </h1>
            <div className="max-w-xl dossier-reveal">
              <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed">
                JVAI Dynamics is not a traditional hierarchy. We are a
                synchronized neural network of industry leaders, engineers, and
                strategists.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img
              className="w-full"
              // src="https://i.ibb.co.com/CKchggYr/gazi-bhai-removebg-preview.png"
              src="https://res.cloudinary.com/dn98ksbcf/image/upload/v1777890276/Gazi_vai_k9nlal.png"
              alt="hero"
            />
          </div>
        </div>

        {/* Dynamic Status Bar */}
        <div className="absolute bottom-0 left-0 w-full glass border-t border-white/5 py-4 px-8 flex justify-between items-center text-[9px] font-black text-slate-500 tracking-[0.3em] uppercase">
          <div className="flex justify-between w-full max-w-7xl mx-auto">
            <div className="flex gap-8">
              <p>
                System: <span className="text-blue-400">Optimal</span>
              </p>
              <p>
                Synchronization: <span className="text-indigo-400">99.8%</span>
              </p>
            </div>
            <p className="hidden md:block">
              JVAI Dynamics // HQ: Virtual // Protocol: Alpha-7
            </p>
          </div>
        </div>
      </header>

      {/* Global Leadership (Betopia Group) */}
      <CEO />
      <Chairman />

      {/* 2. Personnel Dossiers */}
      <div className="max-w-7xl mx-auto px-6 py-32 space-y-8">
        <h1 className="text-center text-2xl md:text-4xl mb-10 font-bold uppercase">
          Leadership
        </h1>
        {/* Apex Node: GM */}
        <div className="space-y-4">
          <h2 className="text-[10px] font-black text-slate-600 tracking-[0.5em] uppercase px-4">
            Level_01: Apex Strategy
          </h2>
          {gmMember && <MemberDossier member={gmMember} size="large" />}
        </div>

        {/* Support Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Operations (Parallel HTOs) */}
          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-[10px] font-black text-slate-600 tracking-[0.5em] uppercase px-4">
              System_Architecture
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {opsMembers.map((m) => (
                <MemberDossier key={m.id} member={m} />
              ))}
            </div>
          </div>
          {/* Sales */}
          <div className="space-y-4 lg:col-span-1">
            <h2 className="text-[10px] font-black text-slate-600 tracking-[0.5em] uppercase px-4">
              Market_Resonance
            </h2>
            {salesMember && <MemberDossier member={salesMember} />}
          </div>
        </div>
      </div>

      {/* 3. Logic Manifest */}
      <section className="max-w-7xl mx-auto px-6 py-40 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4">
            <h2 className="text-4xl font-black text-white tracking-tighter mb-8">
              Connectivity <br />
              Manifest.
            </h2>
            <p className="text-slate-500 leading-relaxed font-light">
              How our departments recursively synchronize to deliver software at
              peak velocity.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                label: "Ingress",
                title: "Sales Resonance",
                desc: "Market signals are decoded into technical blueprints.",
              },
              {
                label: "Processing",
                title: "HTO Orchestration",
                desc: "Parallel technical heads ensure infrastructure and intelligence move in lockstep.",
              },
              {
                label: "Egress",
                title: "Ecosystem Scaling",
                desc: "Successes are leveraged by BizDev to secure industry-wide alliances.",
              },
              {
                label: "Governance",
                title: "GM Optimization",
                desc: "Continuous feedback loops ensure absolute departmental alignment.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="group p-8 border-l border-white/10 hover:border-blue-500 transition-colors"
              >
                <p className="text-[9px] font-black text-slate-600 tracking-[0.4em] uppercase mb-4">
                  {step.label}
                </p>
                <h4 className="text-xl font-bold text-white mb-4">
                  {step.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedInterview && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12 bg-slate-950/98 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="relative w-full max-w-6xl bg-black border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <p className="text-[10px] font-black text-white tracking-[0.3em] uppercase">
                  Live Feed: {selectedInterview.name}
                </p>
              </div>
              <button
                onClick={() => setSelectedInterview(null)}
                className="text-white/40 hover:text-white transition-colors hover:cursor-pointer"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Video Content */}
            <div className="grow relative">
              <VideoPlayer
                url={selectedInterview.videoUrl || ""}
                isRunning={true}
                className="w-full h-full rounded-none border-0"
              />

              {/* Tactical Overlays */}
              <div className="absolute top-10 left-10 pointer-events-none space-y-2 hidden md:block">
                <p className="text-[9px] font-mono text-blue-400">
                  REC [00:42:15:02]
                </p>
                <p className="text-[9px] font-mono text-blue-400">
                  LAT: 34.0522 N
                </p>
                <p className="text-[9px] font-mono text-blue-400">
                  LNG: 118.2437 W
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamPage;
