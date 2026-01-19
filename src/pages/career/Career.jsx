import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router";

gsap.registerPlugin(ScrollTrigger);

export const JOB_POSTINGS = [
  {
    id: "j1",
    title: "Senior AI Research Engineer",
    department: "Intelligence Unit",
    location: "Remote / London",
    type: "Full-time",
    description:
      "Lead the development of our next-gen generative models. Requires deep expertise in transformer architectures and efficient fine-tuning.",
    responsibilities: [
      "Design and implement novel neural architectures for multi-modal LLMs.",
      "Optimize model inference performance for edge and cloud deployments.",
      "Publish research findings in top-tier AI conferences.",
      "Mentor junior research engineers in advanced deep learning techniques.",
    ],
    requirements: [
      "PhD or equivalent experience in Computer Science or Mathematics.",
      "Proficiency in PyTorch or JAX.",
      "Proven track record of publishing at NeurIPS, ICML, or CVPR.",
      "Strong understanding of hardware-level optimization (CUDA, Triton).",
    ],
    benefits: [
      "Unlimited research compute budget.",
      "Annual travel stipend for global conferences.",
      "Comprehensive health, dental, and vision insurance.",
      "Equity ownership in Nexus Dynamics.",
    ],
  },
  {
    id: "j2",
    title: "Creative Technologist (Three.js)",
    department: "Digital Experiences",
    location: "Remote / Berlin",
    type: "Full-time",
    description:
      "Bridge the gap between design and high-performance WebGL. You will craft immersive spatial interfaces for global brands.",
    responsibilities: [
      "Develop interactive 3D environments using Three.js and React Three Fiber.",
      "Author custom GLSL shaders for advanced visual effects.",
      "Optimize rendering pipelines for mobile and desktop browsers.",
      "Collaborate with UI/UX designers to push the boundaries of digital storytelling.",
    ],
    requirements: [
      "Deep expertise in JavaScript/TypeScript and Three.js.",
      "Strong understanding of linear algebra and computer graphics principles.",
      "Experience with GSAP or similar animation libraries.",
      "A portfolio showcasing unique, high-performance web experiences.",
    ],
    benefits: [
      "High-end hardware setup of your choice.",
      "Flexible working hours and remote-first culture.",
      "Paid time off for personal creative projects.",
      "Bi-annual team offsites in Europe.",
    ],
  },
  {
    id: "j3",
    title: "DevOps Architect (K8s / AWS)",
    department: "Infrastructure",
    location: "Remote / NYC",
    type: "Full-time",
    description:
      "Architect self-healing, scalable cloud systems that power our real-time AI engines. Security and low latency are your north stars.",
    responsibilities: [
      "Design and manage multi-region Kubernetes clusters on AWS.",
      "Automate infrastructure provisioning using Terraform or Pulumi.",
      "Implement robust CI/CD pipelines with GitHub Actions.",
      "Lead incident response and disaster recovery planning.",
    ],
    requirements: [
      "5+ years experience in SRE or Cloud Architecture roles.",
      "Expert level knowledge of Docker, Kubernetes, and Helm.",
      "Experience managing GPU-intensive workloads in production.",
      "Strong background in networking security and IAM.",
    ],
    benefits: [
      "Competitive salary and performance bonuses.",
      "Home office stipend for ergonomic setups.",
      "Mental health support and wellness programs.",
      "Continuous learning budget for certifications.",
    ],
  },
  {
    id: "j4",
    title: "Product Designer",
    department: "Core Design",
    location: "Remote",
    type: "Contract / Full-time",
    description:
      "Design the future of human-AI collaboration. You create interfaces that make complex data feel intuitive.",
    responsibilities: [
      "Conduct user research to understand AI-driven workflows.",
      "Create high-fidelity prototypes for web and spatial interfaces.",
      "Maintain and expand our proprietary design system.",
      "Work closely with engineers to ensure pixel-perfect implementation.",
    ],
    requirements: [
      "Expert proficiency in Figma and prototyping tools.",
      "Strong visual design sense and typography skills.",
      "Experience designing complex dashboards or data-heavy apps.",
      "Basic understanding of frontend development capabilities.",
    ],
    benefits: [
      "Creative autonomy and ownership of projects.",
      "Access to premium design tools and assets.",
      "Collaborative environment with top-tier engineers.",
      "Path to full-time employment for contractors.",
    ],
  },
];

const CareerPage = () => {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Engineering",
    "Design",
    "Infrastructure",
    "Intelligence",
  ];
  const navigate = useNavigate();

  // Improved filtering logic
  const filteredJobs =
    activeFilter === "All"
      ? JOB_POSTINGS
      : JOB_POSTINGS.filter((job) => {
          const query = activeFilter.toLowerCase();
          return (
            job.department.toLowerCase().includes(query) ||
            job.title.toLowerCase().includes(query)
          );
        });

  useEffect(() => {
    // Entrance animations
    const tl = gsap.timeline();
    tl.fromTo(
      ".career-animate",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power4.out" },
    );

    // Initial scroll trigger for the job section
    ScrollTrigger.create({
      trigger: ".job-section",
      start: "top 75%",
      onEnter: () => {
        gsap.fromTo(
          ".job-card",
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        );
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Animate job cards when filter changes
  useEffect(() => {
    gsap.fromTo(
      ".job-card",
      { opacity: 0, scale: 0.98, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(1.4)",
      },
    );
  }, [activeFilter]);

  return (
    <div ref={containerRef} className="">
      {/* 1. Immersive Hero Section */}
      <section className="relative h-[50vh] flex flex-col items-center justify-center bg-[url('/careerHero.png')] bg-cover bg-center bg-no-repeat">
        <div className="w-full h-full flex flex-col items-center justify-center px-6 bg-black/70 backdrop-blur-[1px]">
          {" "}
          <div className="relative z-10 text-center w-full max-w-6xl">
            {/* Badge */}
            <span className="career-animate inline-block px-3 sm:px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[9px] sm:text-[10px] font-black tracking-widest uppercase mb-6 sm:mb-8">
              Digital Engineering Excellence
            </span>

            {/* Heading */}
            <h1 className="career-animate text-4xl md:text-6xl lg:text-7xl  font-black mb-8 tracking-tighter leading-none text-white text-gradient">
              Architect the Silicon Future.
            </h1>

            <p className="career-animate text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              JVAI is an engineering collective designed for those who find
              comfort in complexity.
            </p>

            {/* CTA */}
            <div className="career-animate flex justify-center">
              <button
                onClick={() =>
                  document
                    .getElementById("jobs")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-8  py-4  rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(45,212,191,0.25)] hover:cursor-pointer"
              >
                <div className="absolute inset-0 bg-white group-hover:bg-blue-500 transition-colors duration-300" />
                <span className="relative z-10 text-slate-950 group-hover:text-white text-[10px] sm:text-[11px] font-black tracking-widest uppercase transition-colors">
                  Connect to Open Nodes
                </span>
              </button>
            </div>
          </div>
          {/* Scroll hint (hidden on small screens) */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 opacity-30">
            <div className="w-px h-16 bg-linear-to-b from-white to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. Culture & Perks Section */}
      <section className="relative py-40 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter">
              Why <span className="text-blue-500">Nexus?</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Elite perks for an elite collective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Extreme Autonomy",
                desc: "No micromanagement. Own your domain and ship at your own pace.",
              },
              {
                title: "Research Budget",
                desc: "Annual stipend for experimentation, open-source work, and specialized hardware.",
              },
              {
                title: "Global Mobility",
                desc: "Work from anywhere. We provide co-working stipends in any city on Earth.",
              },
            ].map((perk, i) => (
              <div
                key={i}
                className="group p-10 rounded-[2.5rem] glass border border-white/5 hover:border-blue-500/40 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-black text-xl mb-8 group-hover:rotate-12 transition-transform">
                  0{i + 1}
                </div>
                <h4 className="text-2xl font-bold mb-4 text-white">
                  {perk.title}
                </h4>
                <p className="text-slate-400 font-light leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Job Board Section */}
      <section id="jobs" className="job-section py-40 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                Open <span className="text-gradient">Nodes.</span>
              </h2>
              <p className="text-slate-500 text-lg">
                Select a specialized unit to begin.
              </p>
            </div>

            {/* Functional Filter Controls */}
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-black tracking-widest text-slate-500 uppercase">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    activeFilter === filter
                      ? "border-blue-500 bg-blue-500/10 text-white"
                      : "border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="job-card group relative overflow-hidden glass p-8 md:p-12 rounded-4xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="max-w-lg">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 rounded-md bg-blue-500/10 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                          {job.department}
                        </span>
                        <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                          {job.location}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-blue-400 transition-colors mb-4">
                        {job.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed font-light">
                        {job.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="hidden lg:block text-right">
                        <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">
                          Status
                        </p>
                        <p className="text-white font-bold text-sm tracking-tight">
                          {job.type}
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/career/${job.id}`)}
                        className="px-8 py-3 hover:cursor-pointer rounded-full bg-blue-500 text-white text-[10px] font-black tracking-widest uppercase hover:bg-white hover:text-slate-950 transition-all shadow-lg shadow-blue-500/20"
                      >
                        Initiate Application
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center glass rounded-4xl border border-dashed border-white/10">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                  No active nodes in this sector.
                </p>
              </div>
            )}
          </div>

          <div className="mt-24 p-12 rounded-[3rem] bg-linear-to-br from-blue-900/10 via-slate-900/5 to-purple-900/10 border border-white/5 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Sector not listed?
            </h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
              If your expertise exists outside our predefined nodes, initiate a
              speculative data sync.
            </p>
            <a
              href="mailto:talent@nexusdynamics.io"
              className="group text-blue-400 font-black tracking-[0.2em] uppercase text-xs inline-flex items-center justify-center gap-4 transition-all"
            >
              Establish Direct Link
              <svg
                className="w-4 h-4 group-hover:translate-x-2 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
