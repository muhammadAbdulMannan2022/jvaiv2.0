import React from "react";
import Slider from "react-slick";
import { Quote } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ResonanceScroll = ({ testimonials }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    customPaging: (i) => (
      <div className="w-2 h-2 mx-1 rounded-full bg-slate-700 hover:bg-green-500 transition-colors" />
    ),
    appendDots: (dots) => (
      <div style={{ bottom: "20px" }}>
        <ul className="flex justify-center items-center gap-1"> {dots} </ul>
      </div>
    ),
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <span className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4 block">
          FROM OUR DESK
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          Why We’re Proud to Be Here
        </h2>
      </div>

      <div className="relative group">
        <Slider {...settings}>
          {testimonials.map((t, i) => (
            <div key={i} className="outline-none">
              <div className="relative bg-slate-900/50 border border-white/5 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 overflow-hidden min-h-[400px]">
                {/* Content Side */}
                <div className="flex-[1.5] space-y-6 z-10">
                  <div className="text-blue-500 opacity-80">
                    <Quote size={48} fill="currentColor" className="opacity-20" />
                  </div>
                  
                  <p className="text-lg md:text-2xl font-semibold text-slate-100 leading-snug italic max-w-2xl">
                    "{t.message}"
                  </p>

                  <div className="pt-4">
                    <h4 className="text-xl md:text-3xl font-black text-blue-500 uppercase tracking-tight">
                      {t.name}
                    </h4>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">
                      {t.role}
                    </p>
                  </div>
                </div>

                {/* Image Side */}
                <div className="relative flex-1 flex justify-center md:justify-end self-end -mb-8 md:-mb-16">
                  <div className="relative w-64 h-72 md:w-[450px] md:h-[500px]">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover object-top md:object-contain"
                    />
                  </div>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />
              </div>
            </div>
          ))}
        </Slider>
        
        {/* Dot customization */}
        <style jsx="true">{`
          .slick-dots li.slick-active div {
            background-color: #3b82f6 !important;
            width: 12px;
          }
          .slick-dots li div {
            background-color: #334155;
            transition: all 0.3s ease;
          }
        `}</style>
      </div>
    </section>
  );
};

export default ResonanceScroll;
