import React, { useEffect } from "react";
import gsap from "gsap";
import VideoPlayer from "../VideoPlayer";
import { PROJECTS } from "../../pages/About/AboutUs";
import { useNavigate, useParams } from "react-router";

const ProjectDetails = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const project = PROJECTS.find((p) => p.id == id);
  //   console.log(PROJECTS, id);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const tl = gsap.timeline();
    tl.fromTo(
      ".detail-animate",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
    );
  }, [project]);
  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="pt-14 pb-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="detail-animate flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group hover:cursor-pointer absolute left-10"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="text-xs font-black uppercase tracking-widest">
            Back
          </span>
        </button>

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">
          <div>
            <div className="detail-animate flex gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-black tracking-widest uppercase">
                {project.category}
              </span>
              <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-[10px] font-black tracking-widest uppercase">
                {project.year}
              </span>
            </div>
            <h1 className="detail-animate text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-none">
              {project.title.split(" ")[0]} <br />
              <span className="text-gradient">
                {project.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <p className="detail-animate text-xl text-slate-400 font-light leading-relaxed max-w-xl">
              {project.fullDescription}
            </p>
          </div>

          <div className="detail-animate grid grid-cols-2 gap-8 pt-8">
            <div className="p-8 rounded-3xl glass border border-white/5">
              <h4 className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase mb-4">
                Client
              </h4>
              <p className="text-lg font-bold text-white">{project.client}</p>
            </div>
            <div className="p-8 rounded-3xl glass border border-white/5">
              <h4 className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase mb-4">
                Year
              </h4>
              <p className="text-lg font-bold text-white">{project.year}</p>
            </div>
            <div className="col-span-2 p-8 rounded-3xl glass border border-white/5">
              <h4 className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase mb-6">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white/10 rounded-lg text-xs font-medium text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Project Video */}
        <div className="detail-animate mb-32">
          <VideoPlayer
            url={project.videoUrl}
            className="aspect-video shadow-3xl"
          />
        </div>

        {/* Results / Impacts Section */}
        {project.results && (
          <div className="detail-animate grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-black text-white mb-6">
                Key <span className="text-indigo-500">Outcomes.</span>
              </h2>
              <p className="text-slate-400 font-light leading-relaxed">
                Quantifiable impact delivered through engineering excellence.
              </p>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.results.map((result, i) => (
                <div
                  key={i}
                  className="p-4 rounded-3xl glass border border-white/5 flex gap-6 items-center hover:border-white/30 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-black text-xl">
                    {i + 1}
                  </div>
                  <p className="text-slate-300 font-medium">{result}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
