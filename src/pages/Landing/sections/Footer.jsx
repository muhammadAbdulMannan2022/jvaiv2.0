import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import { Link } from "react-router";
import { Linkedin, ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSubscribeUpdateMutation } from "../../../../redux/features/apiSlice";

const Footer = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [subscribeUpdate, { isLoading }] = useSubscribeUpdateMutation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const submit = async () => {
    if (!email) {
      setError("Please enter your email address");
    } else {
      const res = await subscribeUpdate({ email }).unwrap();
      setEmail("");
      setError("");
    }
  };
  return (
    <footer
      id="footer"
      className="text-white pt-8 w-full bg-[#050505] open-sans-text border-t border-white/5 group"
    >
      <div className="container max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8 w-full border-t border-b border-white/10 py-12">
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/5">
          <div className="text-2xl font-bold text-blue-500 mb-2">
            <img
              loading="lazy"
              src="/logow.png"
              className="w-37 md:max-w-50 "
              alt="JVAI Logo"
            />
          </div>
          <p className="text-center md:text-left max-w-xs text-gray-400">
            Delivering cutting-edge solutions that are fast, flexible, and
            designed for global success.
          </p>
        </div>

        {/* Services */}
        <div className="w-full md:w-1/5">
          <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
          <ul className="space-y-2 list-disc text-gray-400 ml-4">
            <li>
              <Link
                href="/services"
                className="hover:text-blue-500 transition-colors"
              >
                Web Development
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-blue-500 transition-colors"
              >
                AI Development
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-blue-500 transition-colors"
              >
                Mobile App Development
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-blue-500 transition-colors"
              >
                SaaS Design
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-blue-500 transition-colors"
              >
                WordPress Development
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-blue-500 transition-colors"
              >
                Shopify Store
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-blue-500 transition-colors"
              >
                Graphic Design
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="text-gray-400 w-full md:w-1/5">
          <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
          <p className="flex items-center gap-2 mb-2 hover:text-blue-500 transition-colors">
            <FaPhone className="text-blue-500" />
            <span>+880 1332-840935</span>
          </p>
          <p className="flex items-center gap-2 mb-2 hover:text-blue-500 transition-colors">
            <FaEnvelope className="text-blue-500" />
            <span>info@joinventureai.com</span>
          </p>
          <p>Aqua Tower, 43 Mohakhali C/A, Level 12-13, Dhaka 1212</p>
        </div>

        {/* Newsletter + Follow Us */}
        <div className="text-gray-400 w-full md:w-1/5">
          <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
          <p className="mb-4 text-sm">
            Stay Connected with Innovation. Subscribe for expert insights on AI
            trends, latest releases, and agency-exclusive offers.
          </p>
          <div
            className={`flex bg-white/5 rounded-l-md  focus-within:border-blue-500 transition-colors ${error ? "border border-red-500" : "border border-white/10"}`}
          >
            {/* {alert(error)} */}
            <input
              type="email"
              disabled={isLoading}
              required
              error={error}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter your email"
              className="p-3 rounded-l-md text-white w-full bg-transparent focus:outline-none placeholder:text-gray-600"
            />
            <button
              onClick={() => submit()}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-500 transition-colors font-medium text-sm hover:cursor-pointer disabled:opacity-50 disabled:cursor-wait"
            >
              Subscribe
            </button>
          </div>
          {/* Follow Us */}
          <div className="text-gray-400 mt-8">
            <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-4 text-lg">
              <Link
                target="_blank"
                to="https://www.facebook.com/joinventureai/"
                className="bg-white/5 hover:bg-blue-600 text-white p-3 rounded-full transition-all border border-white/10 hover:border-blue-600 hover:scale-110"
              >
                <FaFacebookF size={18} />
              </Link>
              <Link
                target="_blank"
                to="https://www.instagram.com/joinventure.ai/"
                className="bg-white/5 hover:bg-blue-600 text-white p-3 rounded-full transition-all border border-white/10 hover:border-blue-600 hover:scale-110"
              >
                <FaInstagram size={18} />
              </Link>
              <Link
                target="_blank"
                to="https://www.linkedin.com/company/joinventureai/"
                className="bg-white/5 hover:bg-blue-600 text-white p-3 rounded-full transition-all border border-white/10 hover:border-blue-600 hover:scale-110"
              >
                <FaLinkedin size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Back to Top */}
      <div className="container max-w-7xl mx-auto px-4 mt-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-8 pb-12">
        <p className="text-gray-600 text-sm order-2 md:order-1">
          © 2025, JVAI | All Rights Reserved
        </p>
        
        <button
          onClick={scrollToTop}
          className="flex items-center gap-3 text-white/40 hover:text-blue-500 transition-all group cursor-pointer order-1 md:order-2"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Top</span>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-600 transition-all">
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* Large Logo at Bottom */}
      <div className="mt-8 flex justify-center items-end opacity-20 transition-opacity duration-700 group-hover:opacity-100">
        <img
          loading="lazy"
          src="/footer.png"
          alt="Footer Graphic"
          className="brightness-0 invert filter"
        />
      </div>
      <div id="footerEnd"></div>
    </footer>
  );
};

export default Footer;
