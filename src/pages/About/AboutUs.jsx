import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router";
import WorkSection from "./WorkSection";
import { useGetProjectsQuery } from "../../../redux/features/apiSlice";

const AboutPage = () => {
  const pageRef = useRef(null);
  const { data: projects, isLoading } = useGetProjectsQuery();

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
  }, [projects]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="pb-20">
      {/* 1. Hero Section */}
      <section className="bg-[url('/aboutus.png')] bg-cover bg-center bg-no-repeat ">
        <div className="w-full h-full py-14 bg-black/50">
          <div className="max-w-5xl mx-auto text-center">
            <span className="about-hero-text inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
              The JVAI Story
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
      <WorkSection PROJECTS={projects || []} />

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
