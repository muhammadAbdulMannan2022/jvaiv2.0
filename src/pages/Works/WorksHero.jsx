const WorksHero3D = () => {
  return (
    <section className="bg-[url('/works.png')] bg-cover bg-center bg-no-repeat ">
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
  );
};

export default WorksHero3D;
