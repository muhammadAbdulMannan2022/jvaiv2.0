import React, { useEffect } from "react";
import gsap from "gsap";
import VideoPlayer from "../VideoPlayer";
import { useNavigate } from "react-router";
import {
  useGetOneProjectQuery,
  baseUri,
} from "../../../redux/features/apiSlice";

const ProjectDetails = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const navigate = useNavigate();

  const { data: projectResponse, isLoading } = useGetOneProjectQuery(id);
  const project = projectResponse?.Data;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      const tl = gsap.timeline();
      tl.fromTo(
        ".detail-animate",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      );
    }
  }, [project]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-black mb-6">Execution Node Not Found</h2>
        <button
          onClick={() => navigate("/work")}
          className="px-8 py-3 bg-blue-600 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-blue-500 transition-colors"
        >
          Return to Archive
        </button>
      </div>
    );
  }

  const videoUrl = project.project_video?.startsWith("http")
    ? project.project_video
    : `${baseUri}${project.project_video}`;

  return (
    <div className="pt-14 pb-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="detail-animate flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group hover:cursor-pointer relative z-50 md:fixed md:left-10"
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
              <span className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                Premium Solution
              </span>
              <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-[10px] font-black tracking-widest uppercase">
                {project.project_duration
                  ? `${project.project_duration} Days`
                  : "Active"}
              </span>
            </div>
            <h1 className="detail-animate text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-none uppercase">
              {project.project_title.split(" ")[0]} <br />
              <span className="text-gradient">
                {project.project_title.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <div
              className="detail-animate text-xl text-slate-400 font-light leading-relaxed max-w-xl prose prose-invert"
              dangerouslySetInnerHTML={{ __html: project.project_description }}
            />
          </div>

          <div className="detail-animate grid grid-cols-2 gap-8 pt-8">
            <div className="p-8 rounded-3xl glass border border-white/5">
              <h4 className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase mb-4">
                Node ID
              </h4>
              <p className="text-lg font-bold text-white">PX-{project.id}</p>
            </div>
            <div className="p-8 rounded-3xl glass border border-white/5">
              <h4 className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase mb-4">
                Cycle Time
              </h4>
              <p className="text-lg font-bold text-white">
                {project.project_duration || "90"} Days
              </p>
            </div>
            <div className="col-span-2 p-8 rounded-3xl glass border border-white/5">
              <h4 className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase mb-6">
                Technical Highlights
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Proprietary Engine", "Scalable Ops", "Custom UI"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 rounded-lg text-xs font-medium text-slate-300"
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Project Video */}
        <div className="detail-animate mb-32 rounded-[2.5rem] overflow-hidden shadow-3xl border border-white/10">
          <VideoPlayer
            url={videoUrl}
            className="w-full aspect-video"
            controls
          />
        </div>

        {/* Results / Impacts Section */}
        <div className="detail-animate grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-3xl font-black text-white mb-6">
              Strategic <span className="text-blue-500">Outcomes.</span>
            </h2>
            <p className="text-slate-400 font-light leading-relaxed">
              Quantifiable impact delivered through engineering excellence and
              iterative optimization.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Performance benchmark exceeded by 40%",
              "Cloud-native architecture integration",
              "Sub-100ms response time latency",
              "Enterprise-grade security protocols",
            ].map((result, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl glass border border-white/5 flex gap-6 items-center hover:border-white/30 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-black text-xl">
                  {i + 1}
                </div>
                <p className="text-slate-300 font-medium text-sm">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
