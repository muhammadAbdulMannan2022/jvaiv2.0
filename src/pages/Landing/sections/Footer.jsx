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
import { Linkedin } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const submit = async () => {
    if (!email) {
      alert("type your email");
    } else {
      setEmail("");
    }
  };
  return (
    <footer className="text-white pt-8 w-full bg-[#050505] open-sans-text border-t border-white/5">
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
            At JVAI, we deliver cutting-edge solutions that are fast, flexible,
            and designed for success.
          </p>
        </div>

        {/* Services */}
        <div className="w-full md:w-1/5">
          <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
          <ul className="space-y-2 list-disc text-gray-400 ml-4">
            <li>
              <Link href="/services" className="hover:text-blue-500 transition-colors">
                Web Development
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-500 transition-colors">
                AI Development
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-500 transition-colors">
                Mobile App Development
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-500 transition-colors">
                SaaS Design
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-500 transition-colors">
                WordPress Development
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-500 transition-colors">
                Shopify Store
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-500 transition-colors">
                Graphic Design
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="text-gray-400 w-full md:w-1/5">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Contact Us
          </h3>
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
          <h3 className="text-lg font-semibold mb-4 text-white">
            Newsletter
          </h3>
          <p className="mb-4 text-sm">
            Stay connected with innovation. Subscribe now for expert insights,
            latest releases, and agency-exclusive offers.
          </p>
          <div className="flex bg-white/5 rounded-l-md border border-white/10 focus-within:border-blue-500 transition-colors">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="p-3 rounded-l-md text-white w-full bg-transparent focus:outline-none placeholder:text-gray-600"
            />
            <button
              onClick={() => submit()}
              className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-500 transition-colors font-medium text-sm"
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
                to="https://www.facebook.com/hello.jvai"
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

      {/* Copyright */}
      <div className="text-center text-gray-600 mt-8 text-sm">
        <p>© 2025, JVAI | All Rights Reserved</p>
      </div>

      {/* Large Logo at Bottom */}
      <div className="mt-8 flex justify-center items-end opacity-20 hover:opacity-100 transition-opacity duration-700">
        <img loading="lazy" src="/footer.png" alt="Footer Graphic" className="brightness-0 invert filter" />
      </div>
    </footer>
  );
};

export default Footer;
