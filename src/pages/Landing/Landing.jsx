import React from "react";
import Hero from "./sections/Hero";
import TrustSection from "./sections/TrustSection";
import Services from "./sections/Services";
import Testimonials from "./sections/Testimonials";
import Experts from "./sections/Exparts";
import PhotoGallery3D from "./sections/PhotoGallery";
import FAQ from "./sections/FAQ";
import SupportChat from "./Bot/SupportChat";

export default function Landing() {
  return (
    <div>
      <Hero />
      <TrustSection />
      <Services />
      <Experts />
      <Testimonials />
      {/* <PhotoGallery3D /> */}
      <FAQ />
    </div>
  );
}
