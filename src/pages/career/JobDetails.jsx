import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate, useParams } from "react-router";
import { useGetJobsQuery, useApplyOnJobMutation } from "../../../redux/features/apiSlice";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: jobsResponse, isLoading } = useGetJobsQuery();
  const [applyOnJob, { isLoading: isApplying }] = useApplyOnJobMutation();
  
  const job = jobsResponse?.find((j) => j.id == id);

  const onBack = () => {
    navigate(-1);
  };

  const formRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (job) {
        const tl = gsap.timeline();
        tl.fromTo(
          ".job-detail-reveal",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        );
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("job", id);

    try {
      await applyOnJob(formData).unwrap();
      alert("Protocol Initiated. Our talent scouts will decrypt your application shortly.");
      e.target.reset();
    } catch (err) {
      alert("Synchronization failed. Please check your data packets and retry.");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-black mb-6 uppercase tracking-widest text-blue-500">Job Node Not Found</h2>
        <button 
            onClick={() => navigate("/career")}
            className="px-8 py-3 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-2xl"
        >
            Return to Career Grid
        </button>
      </div>
    );
  }

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
                  {job.tags || "Engineering"}
                </span>
                <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                  IDENT: NODE-{job.id}
                </span>
              </div>
              <h1 className="job-detail-reveal text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-10 uppercase">
                {job.title}
              </h1>
              <p className="job-detail-reveal text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
                {job.intro}
              </p>
            </header>

            <div className="section-divider h-px bg-white/10 w-full mb-20 origin-left" />

            {/* Description */}
            <section className="mb-24">
                <h2 className="job-detail-reveal text-2xl font-black text-white uppercase tracking-widest mb-12 flex items-center gap-4">
                  <span className="w-8 h-px bg-blue-500" />
                  Operational Brief
                </h2>
                <div 
                    className="job-detail-reveal text-slate-300 text-lg leading-relaxed font-light prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: job.job_description }}
                />
            </section>

            {/* Responsibilities */}
            {job.key_responsibilities && (
              <section className="mb-24">
                <h2 className="job-detail-reveal text-2xl font-black text-white uppercase tracking-widest mb-12 flex items-center gap-4">
                  <span className="w-8 h-px bg-blue-500" />
                  The Protocol
                </h2>
                <div 
                    className="job-detail-reveal text-slate-300 text-lg leading-relaxed font-light prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: job.key_responsibilities }}
                />
              </section>
            )}

            {/* Requirements */}
            {job.requirements && (
              <section className="mb-24">
                <h2 className="job-detail-reveal text-2xl font-black text-white uppercase tracking-widest mb-12 flex items-center gap-4">
                  <span className="w-8 h-px bg-blue-500" />
                  Required Credentials
                </h2>
                <div 
                    className="job-detail-reveal text-slate-300 text-lg leading-relaxed font-light prose prose-invert max-w-none bg-white/[0.02] p-8 md:p-12 rounded-4xl border border-white/5"
                    dangerouslySetInnerHTML={{ __html: job.requirements }}
                />
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
                    <p className="text-white font-bold">{job.work_schedule}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-2">
                      Unit
                    </label>
                    <p className="text-white font-bold">{job.tags || "Engineering"}</p>
                  </div>
                  {job.salary_range && (
                      <div>
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-2">
                          Salary Vector
                        </label>
                        <p className="text-white font-bold">{job.salary_range} Credits</p>
                      </div>
                  )}
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
            </div>
          </div>
        </div>

        {/* Application Form */}
        <section id="apply-form" className="job-detail-reveal mt-32 max-w-5xl mx-auto">
          <div className="glass p-8 md:p-20 rounded-[4rem] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
            
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                Transmit <span className="text-gradient">Credentials.</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Provide your professional signature and data logs to begin the synchronization process with our collective.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">
                    Full Legal Name
                  </label>
                  <input
                    required
                    name="full_name"
                    type="text"
                    placeholder="ENTER SIGNATURE"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">
                    Network Email
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="USER@DOMAIN.SYS"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">
                    Communication Line
                  </label>
                  <input
                    required
                    name="phone_number"
                    type="tel"
                    placeholder="+X XXX XXX XXXX"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">
                        Professional Portfolio URL
                    </label>
                    <input
                        required
                        name="portfolio_url"
                        type="url"
                        placeholder="HTTPS://..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">
                        Salary Expectations (Monthly)
                    </label>
                    <input
                        required
                        name="salary_expectations"
                        type="text"
                        placeholder="ENTER VECTOR"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                    />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">
                    Mission Motivation
                </label>
                <textarea
                  required
                  name="motivation"
                  rows={4}
                  placeholder="Explain your synchronization potential..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">
                    Deployment History / Notable Projects
                </label>
                <textarea
                  required
                  name="project_description"
                  rows={4}
                  placeholder="List significant operational achievements..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">
                    Resume Sync (PDF/DOC)
                </label>
                <div className="relative group/file">
                    <input
                        required
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full bg-white/5 border border-dashed border-white/20 rounded-2xl px-6 py-12 flex flex-col items-center justify-center gap-4 group-hover/file:border-blue-500/50 transition-all">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                             </svg>
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Archive File</p>
                    </div>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <button
                    disabled={isApplying}
                    type="submit"
                    className="group relative inline-flex items-center gap-6 px-16 py-6 bg-blue-600 text-white rounded-full text-xs font-black tracking-[0.3em] uppercase overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-wait"
                >
                    {isApplying ? "Synchronizing..." : "Initiate Full Sync"}
                    <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JobDetails;
