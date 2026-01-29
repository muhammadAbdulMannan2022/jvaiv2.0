import React from "react";
import { Link } from "react-router";
import { baseUri } from "../../../redux/features/apiSlice";

export default function WorkSection({ PROJECTS }) {
  return (
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
          {PROJECTS.map((project, idx) => {
            const videoUrl = project.project_video?.startsWith("http")
              ? project.project_video
              : `${baseUri}${project.project_video}`;
            
            const pictureUrl = project.project_picture?.startsWith("http")
              ? project.project_picture
              : `${baseUri}${project.project_picture}`;

            return (
              <div
                key={project.id}
                className={`work-item flex flex-col ${idx % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-24 items-center`}
              >
                <div className="w-full md:w-1/2 group">
                  <div className="relative aspect-video rounded-[2.5rem] overflow-hidden glass border border-white/10 bg-black">
                    {project.project_video ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      >
                        <source src={videoUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <img 
                        src={pictureUrl} 
                        alt={project.project_title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-8">
                      <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase border border-white/10">
                        {project.project_duration ? `Duration: ${project.project_duration}d` : "Premium Solution"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl md:text-4xl font-black mb-6 text-white uppercase">
                    {project.project_title}
                  </h3>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
                    {project.project_short_description}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
