import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useGetMomentsInJvaiQuery,
  baseUri,
} from "../../../../redux/features/apiSlice";

gsap.registerPlugin(ScrollTrigger);

const GalleryItem = ({ item, index, year }) => {
  const itemRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % item.images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + item.images.length) % item.images.length,
    );
  };

  useEffect(() => {
    const element = itemRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.85,
        rotateY: index % 2 === 0 ? -20 : 20,
        y: 100,
      },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        y: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "top 25%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Parallax effect
    gsap.to(element, {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }, [index]);

  return (
    <div
      ref={itemRef}
      className="gallery-item relative w-full mb-16 md:mb-24"
      style={{ perspective: "1500px" }}
    >
      <div className="relative group">
        {/* Image container with manual controls */}
        <div className="relative w-full overflow-hidden bg-black rounded-2xl md:rounded-3xl shadow-2xl">
          {item.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${item.caption} - ${idx + 1}`}
              className="w-full h-auto object-cover transition-opacity duration-700 min-h-100 max-h-175"
              style={{
                opacity: idx === currentSlide ? 1 : 0,
                position: idx === 0 ? "relative" : "absolute",
                top: 0,
                left: 0,
              }}
            />
          ))}

          {/* Navigation arrows - only show if multiple images */}
          {item.images.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm z-10 hover:cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm z-10 hover:cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1">
              <p className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
                {item.caption}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-medium tracking-widest uppercase text-white/60">
                <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/5">
                  {item.date}
                </span>
                {item.location && (
                  <>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/5">
                      {item.location}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Photo counter */}
            {item.images.length > 1 && (
              <div className="flex gap-2 mb-2">
                {item.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 hover:cursor-pointer ${
                      idx === currentSlide
                        ? "w-10 bg-blue-500"
                        : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const YearSection = ({ year, items }) => {
  const yearRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      yearRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: yearRef.current,
          start: "top 80%",
        },
      },
    );
  }, []);

  return (
    <div className="mb-32">
      {/* Year divider */}
      <div ref={yearRef} className="sticky top-24 z-20 mb-20">
        <div className="flex items-center gap-8">
          <h2 className="text-7xl md:text-9xl font-black text-white/90 tracking-tighter">
            {year}
          </h2>
          <div className="flex-1 h-px bg-linear-to-r from-blue-500/50 to-transparent" />
        </div>
      </div>

      {/* Items for this year */}
      <div className="max-w-6xl mx-auto z-30 relative px-4 md:px-0">
        {items.map((item, index) => (
          <GalleryItem key={item.id} item={item} index={index} year={year} />
        ))}
      </div>
    </div>
  );
};

const PhotoGallery = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const { data, isLoading } = useGetMomentsInJvaiQuery();
  const rawMoments = data?.Data || [];

  // Grouping dynamic data by year
  const galleryData = rawMoments.reduce((acc, moment) => {
    const year = moment.activity_date
      ? moment.activity_date.split("-")[0]
      : "Archive";
    if (!acc[year]) acc[year] = [];

    acc[year].push({
      id: moment.id,
      caption: moment.activity_title,
      date: moment.activity_date,
      location: moment.activity_location || "Office HQ", // Fallback location
      images: moment.activity_pictures.map((p) =>
        p.file_url ? p.file_url : `${baseUri}${p.file}`,
      ),
    });

    return acc;
  }, {});

  const years = Object.keys(galleryData).sort((a, b) => b - a);

  useEffect(() => {
    if (isLoading || rawMoments.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        endTrigger: "#bottom",
        start: "top 20%",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });
    // tl.to(heroRef.current, {
    //   opacity: 1,
    //   duration: 0.9,
    //   y: -120,
    //   ease: "power4.inOut",
    // });
  }, [isLoading, rawMoments]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black ">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={heroRef}
          className="text-center px-4 z-10  transform translate-y-30 transition-all"
        >
          <p className="text-blue-500 text-xs md:text-sm uppercase tracking-[0.5em] font-black mb-6">
            Company Archive
          </p>
          <h1 className="text-7xl md:text-[10rem] font-black text-white mb-8 tracking-tighter leading-none">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/50 to-white/20">
              Journey.
            </span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Moments, milestones, and daily excellence that shaped who we are.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="w-px h-20 bg-linear-to-b from-blue-500/50 to-transparent animate-pulse" />
          <p className="text-white/30 text-[10px] uppercase font-black tracking-widest">
            Scroll to Explore
          </p>
        </div>
      </div>

      <div id="bottom"></div>

      {/* Gallery by Year */}
      <div className="relative px-4 md:px-0 pb-32">
        {years.map((year) => (
          <YearSection key={year} year={year} items={galleryData[year]} />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
