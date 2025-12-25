import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

// Sample 20 logos (replace with actual logo URLs)
const logos = [
  "/logo/AiTAiN.Ai logo-01 1.png",
  "/logo/boutique.png",
  "/logo/cifa.gif",
  "/logo/cyrus.svg",
  "/logo/For delivery-01 1.png",
  "/logo/gameplan.webp",
  "/logo/image (2).png",
  "/logo/nutraAi.png",
  "/logo/valr.png",
  "/logo/fondify.png",
  "/logo/ramis.png",
  "/logo/calz.png",
  "/logo/curieCell.png",
];

const logos1 = [
  "/logo/1.png",
  "/logo/2.png",
  "/logo/3.png",
  "/logo/4.png",
  "/logo/5.png",
  "/logo/6.png",
  "/logo/7.png",
  "/logo/8.png",
  "/logo/9.png",
  "/logo/10.png",
  "/logo/11.png",
  "/logo/12.png",
];

const LogoMarquee = ({ direction = "left", items = [] }) => {
  const [isMount, setIsMount] = useState(false);
  const repeated = [...items, ...items];

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) return null;

  return (
    <div className="marquee-fade">
      <Marquee
        direction={direction}
        speed={50}
        gradient={false}
        pauseOnHover={false}
      >
        {repeated.map((src, index) => (
          <img
            loading="lazy"
            key={index}
            src={src}
            alt={`logo-${index}`}
            className="mx-8 w-28 h-14 object-contain transition duration-300"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default function TrustSection() {
  return (
    <div className=" py-12 ">
      <div className="text-center text-2xl md:text-4xl font-bold mb-8 text-gray-900">
        TRUSTED BY <span className="text-blue-600">100+</span> GLOBAL <br />
        <p className="mt-3">BRANDS</p>
      </div>

      <div className="relative w-full">
        <div className="bg-linear-to-r from-white md:via-white to-transparent absolute top-0 left-0 w-52 h-full z-50"></div>
        <div className="mb-6">
          {/* left marquee uses logos */}
          <LogoMarquee direction="left" items={logos} />
        </div>
        <div>
          {/* right marquee uses logos1 */}
          <LogoMarquee direction="right" items={logos1} />
        </div>
        <div className="bg-linear-to-l from-white md:via-white to-transparent absolute top-0 right-0 w-52 h-full z-50"></div>
      </div>
    </div>
  );
}
