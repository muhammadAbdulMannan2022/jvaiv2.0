import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router";
export const PROJECTS = [
  {
    id: "p1",
    title: "Aether Neural Engine",
    category: "AI Infrastructure",
    description:
      "A real-time edge processing engine for autonomous drone swarms.",
    fullDescription:
      "The Aether Neural Engine was designed to solve the critical latency issues in autonomous aerial navigation. By deploying quantized neural networks directly to the edge, we achieved a 40% reduction in response time, enabling drones to navigate complex obstacle courses at speeds previously thought impossible for consumer-grade hardware.",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    client: "Skyward Autonomy",
    year: "2024",
    techStack: ["C++", "TensorRT", "Nvidia Jetson", "ROS2"],
    results: [
      "40% reduction in navigation latency",
      "Successful deployment in 5 countries",
      "Zero collision incidents in testing",
    ],
  },
  {
    id: "p2",
    title: "Cognito Chat Interface",
    category: "LLM & UX",
    description: "A custom-trained RAG system for a Fortune 500 legal firm.",
    fullDescription:
      "Cognito is not just another wrapper. It leverages a sophisticated RAG architecture combined with a custom-fine-tuned Llama model to process and synthesize legal precedents. The system understands the nuances of contract law and can generate draft arguments with citations to relevant internal case history within seconds.",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    client: "Heritage Legal Group",
    year: "2023",
    techStack: ["Python", "Pinecone", "LangChain", "Next.js"],
    results: [
      "85% faster case research",
      "99.2% citation accuracy",
      "Secure on-premise deployment",
    ],
  },
  {
    id: "p3",
    title: "Nebula Dashboard",
    category: "Web Experience",
    description:
      "An immersive 3D data visualization dashboard for global supply chain monitoring.",
    fullDescription:
      "Nebula transforms static spreadsheet data into a living, breathing 3D representation of global logistics. Using WebGL and high-performance data pipelines, it allows stakeholders to zoom from a planetary view down to individual shipping containers, identifying bottlenecks before they impact the bottom line.",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    client: "Oceanic Logistics",
    year: "2024",
    techStack: ["Three.js", "React", "D3.js", "WebSockets"],
    results: [
      "Real-time tracking of 500k+ assets",
      "Intuitive VR-ready interface",
      "15% improvement in route efficiency",
    ],
  },
];

const AboutPage = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".about-hero-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
    );

    gsap.fromTo(
      ".work-item",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".works-grid",
          start: "top 80%",
        },
      },
    );

    gsap.fromTo(
      ".value-card",
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".values-section",
          start: "top 85%",
        },
      },
    );
  }, []);

  return (
    <div ref={pageRef} className="pb-20">
      {/* 1. Hero Section */}
      <section className="bg-[url('/aboutus.png')] bg-cover bg-center bg-no-repeat ">
        <div className="w-full h-full py-14">
          <div className="max-w-5xl mx-auto text-center">
            <span className="about-hero-text inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
              The Nexus Story
            </span>
            <h1 className="about-hero-text text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-none">
              Architects of <br />
              <span className="text-gradient">The Artificial.</span>
            </h1>
            <p className="about-hero-text text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              We are a collective of rogue engineers, data scientists, and
              creative thinkers dedicated to pushing the boundaries of what
              software can achieve.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Philosophy Section */}
      <section className="px-6 py-32 bg-white/1 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              Our <span className="text-blue-500">Ethos.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              We don't just write code; we solve existential problems for
              businesses. Our approach combines mathematical rigor with
              human-centric design.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shadow-[0_0_10px_#6366f1]" />
                <p className="text-slate-300 font-medium italic">
                  "Software should be as intuitive as a reflex."
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shadow-[0_0_10px_#6366f1]" />
                <p className="text-slate-300 font-medium italic">
                  "Complexity is a bug, simplicity is the ultimate feature."
                </p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-4xl blur-2xl group-hover:opacity-100 transition-opacity opacity-50" />
            <div className="relative aspect-video glass rounded-4xl overflow-hidden border border-white/10 p-1">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
                alt="Team working"
                className="w-full h-full object-cover rounded-[1.8rem] opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Works Section (Video + Text) */}
      <section className="px-6 py-40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Selected <span className="text-blue-500">Works.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl">
              A glimpse into the digital machines we've built recently.
            </p>
          </div>

          <div className="works-grid space-y-40">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                className={`work-item flex flex-col ${idx % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-24 items-center`}
              >
                <div className="w-full md:w-1/2 group">
                  <div className="relative aspect-video rounded-[2.5rem] overflow-hidden glass border border-white/10">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <source src={project.videoUrl} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-8">
                      <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase border border-white/10">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl md:text-4xl font-black mb-6 text-white">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
                    {project.description}
                  </p>
                  <Link
                    to={`/projects?id=${project.id}`}
                    className="flex items-center gap-3 text-blue-400 font-bold tracking-widest text-xs uppercase hover:gap-5 transition-all hover:cursor-pointer"
                  >
                    View Case Study
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Values Section */}
      <section className="values-section px-6 pt-40 mb-20">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            What we <span className="text-gradient">Stand For.</span>
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Extreme Velocity",
              desc: "We deliver functional prototypes in weeks, not months. Speed is our competitive edge.",
            },
            {
              title: "Absolute Quality",
              desc: "Code is poetry. We believe in high-standard architectures that endure the test of time.",
            },
            {
              title: "Human Impact",
              desc: "Technology is a tool. We focus on building solutions that actually improve lives.",
            },
          ].map((v, i) => (
            <div
              key={i}
              className="value-card p-10 rounded-[2.5rem] glass border border-white/5 hover:border-blue-500/30 transition-all duration-500 text-center"
            >
              <div className="text-3xl font-black text-blue-500/70 mb-6 italic">
                #{i + 1}
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white">{v.title}</h4>
              <p className="text-slate-400 leading-relaxed font-light">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
