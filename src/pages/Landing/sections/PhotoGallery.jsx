import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_DATA = {
  2024: [
    {
      id: "2024-1",
      images: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      ],
      caption: "Monday morning architecture reviews",
      date: "Oct 14, 2024",
      location: "San Francisco HQ",
    },
    {
      id: "2024-2",
      images: [
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
      ],
      caption: "Strategic brainstorming session",
      date: "Oct 15, 2024",
      location: "Innovation Lab",
    },
    {
      id: "2024-3",
      images: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
      ],
      caption: "DevOps team scaling new heights",
      date: "Nov 22, 2024",
      location: "Remote Summit",
    },
  ],
  2023: [
    {
      id: "2023-1",
      images: [
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop",
      ],
      caption: "Celebrating Aether v2.0 launch",
      date: "Mar 10, 2023",
      location: "Austin Office",
    },
    {
      id: "2023-2",
      images: [
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2070&auto=format&fit=crop",
      ],
      caption: "Late night hackathon marathon",
      date: "Jun 18, 2023",
      location: "Seattle Campus",
    },
    {
      id: "2023-3",
      images: [
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop",
      ],
      caption: "Summer company retreat",
      date: "Aug 5, 2023",
      location: "Lake Tahoe",
    },
  ],
  2022: [
    {
      id: "2022-1",
      images: [
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
      ],
      caption: "First office expansion celebration",
      date: "Feb 14, 2022",
      location: "New York Office",
    },
    {
      id: "2022-2",
      images: [
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
      ],
      caption: "Q4 All-hands meeting",
      date: "Dec 20, 2022",
      location: "Virtual",
    },
  ],
};

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
        <div className="relative w-full overflow-hidden bg-black">
          {item.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${item.caption} - ${idx + 1}`}
              className="w-full h-auto object-cover transition-opacity duration-700"
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
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm z-10"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-xl md:text-2xl font-light mb-2">
                {item.caption}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                <span>{item.date}</span>
                <span>•</span>
                <span>{item.location}</span>
              </div>
            </div>

            {/* Photo counter */}
            {item.images.length > 1 && (
              <div className="flex gap-1.5 mt-1">
                {item.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? "w-8 bg-white"
                        : "w-1.5 bg-white/40 hover:bg-white/60"
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
      <div ref={yearRef} className="sticky top-18 md:top-24 z-20 mb-16">
        <div className="flex items-center gap-6">
          <h2 className="text-6xl md:text-8xl font-bold text-white">{year}</h2>
          <div className="flex-1 h-px bg-white/20" />
        </div>
      </div>

      {/* Items for this year */}
      <div className="max-w-5xl mx-auto z-30 relative">
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
  const years = Object.keys(GALLERY_DATA).sort((a, b) => b - a);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        endTrigger: "#bottom",
        start: "top 20%",
        end: "bottom bottom",
        scrub: 0.5,
        // markers: true,
      },
    });
    tl.to(heroRef.current, {
      opacity: 1,
      duration: 0.9,
      y: -120,
      ease: "power4.inOut",
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black ">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={heroRef}
          className="text-center px-4 z-10 opacity-0 transform translate-y-30 transition-all"
        >
          <p className="text-white text-sm md:text-base uppercase tracking-widest mb-4">
            Company Archive
          </p>
          <h1 className="text-7xl md:text-9xl font-bold text-white mb-6">
            Our Journey
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
            Moments that shaped who we are
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-12 bg-linear-to-b from-transparent to-white/50" />
          <p className="text-white/50 text-xs uppercase tracking-widest">
            Scroll
          </p>
        </div>
      </div>
      <div id="bottom"></div>

      {/* Gallery by Year */}
      <div className="relative px-4 md:px-8 lg:px-16 pb-32">
        {years.map((year) => (
          <YearSection key={year} year={year} items={GALLERY_DATA[year]} />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
