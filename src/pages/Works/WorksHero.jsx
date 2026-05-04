const WorksHero3D = () => {
  return (
    <section className="bg-[url('/works.png')] bg-cover bg-center bg-no-repeat ">
      <div className="w-full h-full py-14 bg-black/50">
        <div className="max-w-5xl mx-auto text-center">
          <span className="about-hero-text inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
            The JVAI Story
          </span>
          <h1 className="about-hero-text text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-none">
            Proven Solutions <br />
            <span className="text-gradient">for Global Leaders.</span>
          </h1>
          <p className="about-hero-text text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Explore our archive of digital transformation. From stealth-mode
            startups to global industry leaders, we’ve delivered scalable
            platforms that solve real-world problems through innovative
            engineering.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorksHero3D;
