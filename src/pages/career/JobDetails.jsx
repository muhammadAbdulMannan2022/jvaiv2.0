import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import { JOB_POSTINGS } from "./Career";
import { useNavigate, useParams } from "react-router";

const JobDetails = () => {
  const { id } = useParams();
  const job = JOB_POSTINGS.find((j) => j.id == id);
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };

  const formRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const tl = gsap.timeline();

    tl.fromTo(
      ".job-detail-reveal",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
    );

    gsap.fromTo(
      ".section-divider",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "expo.inOut",
        scrollTrigger: ".section-divider",
      },
    );
  }, [job]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Protocol Initiated. Our talent scouts will decrypt your application shortly.",
    );
  };

  return (
    <div className="pt-32 pb-40 px-6 bg-[#020617]/50 relative">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <button
          onClick={onBack}
          className="job-detail-reveal flex items-center gap-2 text-blue-400 hover:text-white transition-colors mb-16 group hover:cursor-pointer"
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
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Back to Open Nodes
          </span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <header className="mb-20">
              <div className="job-detail-reveal flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded bg-blue-500/10 text-[10px] font-black text-blue-400 uppercase tracking-widest border border-blue-500/20">
                  {job.department}
                </span>
                <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                  ID: {job.id.toUpperCase()}
                </span>
              </div>
              <h1 className="job-detail-reveal text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-10">
                {job.title}
              </h1>
              <p className="job-detail-reveal text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
                {job.description}
              </p>
            </header>

            <div className="section-divider h-px bg-white/10 w-full mb-20 origin-left" />

            {/* Responsibilities */}
            {job.responsibilities && (
              <section className="mb-24">
                <h2 className="job-detail-reveal text-2xl font-black text-white uppercase tracking-widest mb-12 flex items-center gap-4">
                  <span className="w-8 h-px bg-blue-500" />
                  The Protocol
                </h2>
                <div className="space-y-8">
                  {job.responsibilities.map((resp, i) => (
                    <div key={i} className="job-detail-reveal flex gap-6 group">
                      <div className="mt-1.5 w-2 h-2 rounded-full border border-blue-500/50 group-hover:bg-blue-500 transition-colors shrink-0" />
                      <p className="text-slate-300 text-lg leading-relaxed font-light">
                        {resp}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Requirements */}
            {job.requirements && (
              <section className="mb-24">
                <h2 className="job-detail-reveal text-2xl font-black text-white uppercase tracking-widest mb-12 flex items-center gap-4">
                  <span className="w-8 h-px bg-blue-500" />
                  Required Credentials
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {job.requirements.map((req, i) => (
                    <div
                      key={i}
                      className="job-detail-reveal p-8 rounded-3xl glass border border-white/5 hover:border-blue-500/20 transition-all"
                    >
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {req}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar / Quick Actions */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="job-detail-reveal glass p-5 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />

                <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.3em] mb-8">
                  Role Metadata
                </h3>

                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-2">
                      Location
                    </label>
                    <p className="text-white font-bold">{job.location}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-2">
                      Engagement
                    </label>
                    <p className="text-white font-bold">{job.type}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-2">
                      Department
                    </label>
                    <p className="text-white font-bold">{job.department}</p>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                  <button
                    onClick={() =>
                      document
                        .getElementById("apply-form")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="w-full py-5 rounded-2xl bg-white text-slate-950 text-[10px] hover:cursor-pointer font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl"
                  >
                    Initialize Application
                  </button>
                </div>
              </div>

              {/* Benefits */}
              {job.benefits && (
                <div className="job-detail-reveal p-8 rounded-[2.5rem] border border-white/5 bg-white/2">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">
                    Unit Perks
                  </h3>
                  <ul className="space-y-4">
                    {job.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-400 flex items-center gap-3"
                      >
                        <div className="w-1 h-1 rounded-full bg-blue-500/40" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Application Form */}
        <section id="apply-form" className="job-detail-reveal mt-32 max-w-4xl">
          <div className="glass p-5 md:p-20 rounded-[3rem] border border-white/10">
            <div className="mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
                Submit <span className="text-gradient">Credentials.</span>
              </h2>
              <p className="text-slate-500">
                Provide your digital identity to begin the synchronization
                process.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">
                    Full Legal Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">
                    Network Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@domain.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">
                  Portfolio / GitHub / LinkedIn Link
                </label>
                <input
                  required
                  type="url"
                  placeholder="https://..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">
                  Message to the Collective
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us why you belong at Nexus..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="group relative inline-flex items-center gap-4 px-12 py-5 bg-blue-500 text-white rounded-full text-[11px] font-black tracking-widest uppercase overflow-hidden shadow-2xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Launch Application
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JobDetails;
