import React from "react";
import Hero from "./sections/Hero";
import TrustSection from "./sections/TrustSection";
import Services from "./sections/Services";
import Testimonials from "./sections/Testimonials";

export default function Landing() {
  return (
    <div>
      <Hero />
      <TrustSection />
      <Services />
      <Testimonials />
    </div>
  );
}
