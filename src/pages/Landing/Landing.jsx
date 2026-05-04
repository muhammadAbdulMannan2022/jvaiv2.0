import React from "react";
import Hero from "./sections/Hero";
import TrustSection from "./sections/TrustSection";
import Services from "./sections/Services";
import Testimonials from "./sections/Testimonials";
import Experts from "./sections/Exparts";

import Evolution from "./sections/Evolution";
import FAQ from "./sections/FAQ";

export default function Landing() {
  return (
    <div>
      <Hero />
      <TrustSection />
      <Services />
      <Experts />
      <Evolution />
      <Testimonials />

      <FAQ />
    </div>
  );
}
