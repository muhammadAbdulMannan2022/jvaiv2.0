import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineData = [
  {
    date: "November 2024",
    title: "The Genesis",
    subtitle: "The Core Seven.",
    description:
      "Join Venture AI officially launched with a lean, elite team of seven founding members. Our mission was clear: to prove that high-end AI engineering could be delivered with boutique precision. The foundation was laid in a small workspace, fueled by late nights and a vision to disrupt the global software market.",
  },
  {
    date: "December 2024",
    title: "Proof of Concept",
    subtitle: "The First Milestone.",
    description:
      "Within just 30 days, JVAI hit its first major commercial milestone, delivering over $10,000 in project value. This wasn't just revenue; it was market validation. We proved that the global appetite for intelligent, AI-driven solutions was massive and that our team had the technical \"velocity\" to satisfy it.",
  },
  {
    date: "January 2025",
    title: "Blitzscaling",
    subtitle: "Fifty Minds Strong.",
    description:
      "To meet the surging demand, we entered a phase of hyper-growth. By the start of the year, our headcount surged to 50 professionals. We began attracting the brightest engineers and designers in the region, all united by the goal of building software that thinks.",
  },
  {
    date: "March 2025",
    title: "Breaking Barriers",
    subtitle: "The 100-Member Milestone & Six-Figure Success.",
    description:
      "The momentum became unstoppable. March marked our transition into a 100-member organization. More importantly, our operational efficiency reached new heights, achieving a consistent monthly delivery milestone of $100,000+. JVAI was no longer a startup; it was an emerging industry leader.",
  },
  {
    date: "April 2025",
    title: "Global Recognition",
    subtitle: "Welcoming the World to Dhaka.",
    description:
      "April marked a pivotal moment in our client relations. We were honored to host our first major international client, Ron Varagara, at our Dhaka headquarters. This visit solidified our reputation as a trusted global partner and showcased the world-class engineering hub we were building in the heart of Bangladesh.",
  },
  {
    date: "July 2025",
    title: "A New Horizon",
    subtitle: "Scaling Up: The Aqua Tower Era.",
    description:
      "To accommodate our explosive growth, JVAI shifted its headquarters to the prestigious Aqua Tower in Mohakhali. Spanning 12,000 square feet of state-of-the-art office space, this move symbolized our commitment to providing a high-performance environment for the best talent in the country.",
  },
  {
    date: "September 2025",
    title: "Industrial Excellence",
    subtitle: "The $200k Benchmark.",
    description:
      "Our delivery capabilities doubled again. In September, we achieved a landmark $200,000 in monthly project delivery. This success was driven by our deep integration of Generative AI and scalable system design, allowing us to handle high-stakes ventures with ease.",
  },
  {
    date: "Today",
    title: "A Force of 400",
    subtitle: "The AI Momentum.",
    description:
      "Today, Join Venture AI is a collective of 400+ world-class specialists. We have successfully shifted the AI momentum in Bangladesh, transforming the nation into a global destination for high-end creative technology.",
  },
];

export default function Evolution() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-32">
        
        {/* Left Side: Sticky Content */}
        <div className="lg:w-1/3 lg:sticky lg:top-32 lg:h-fit">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-blue-500 uppercase tracking-[0.6em] font-black text-[10px] mb-4">
                The Journey
              </p>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                The Evolution <br />
                <span className="text-gradient">of JVAI</span>
              </h2>
            </div>

            <p className="text-lg text-white/40 leading-relaxed max-w-sm">
              From a stealth-mode collective to a global powerhouse in less than a year.
            </p>

            <div className="pt-12">
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]"
                  style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                />
              </div>
              <p className="mt-6 text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">
                Mission: The Global North Star
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Scrolling Timeline Items */}
        <div className="lg:w-2/3 space-y-32 pb-20">
          {timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}

          {/* Mission Conclusion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="p-10 md:p-16 glass border border-white/5 rounded-[40px] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full group-hover:bg-blue-600/10 transition-colors duration-700" />
            <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 uppercase">Our Mission: <br/><span className="text-blue-500">The Global North Star</span></h3>
            <p className="text-white/60 text-xl leading-relaxed">
              We are on a relentless mission to become the largest and most convenient AI-powered software builder in the world. We don't just build code; we engineer the intelligent future of global enterprise.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative group"
    >
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
        {/* Date Indicator (Desktop) */}
        <div className="hidden md:flex flex-col items-center pt-3">
          <div className="w-3 h-3 rounded-full bg-blue-600 group-hover:scale-150 transition-transform duration-500 shadow-[0_0_20px_rgba(37,99,235,0.6)]" />
          <div className="w-px h-32 bg-linear-to-b from-blue-600/50 via-blue-600/10 to-transparent mt-4" />
        </div>

        {/* Content Card */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-blue-500 font-black text-xs uppercase tracking-[0.4em]">
              {item.date}
            </span>
            <div className="h-px w-12 bg-blue-500/20" />
          </div>
          
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-500 uppercase">
            {item.title}
          </h3>
          
          <div className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-wider text-blue-300/80 uppercase">
            {item.subtitle}
          </div>
          
          <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
