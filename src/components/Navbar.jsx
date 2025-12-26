"use client";

import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";

export default function Navbar() {
  const { pathname: currentPath } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    {
      name: "Company",
      path: "/company",
      child: [
        { path: "/about", text: "About Us" },
        { path: "/career", text: "Career" },
        { path: "/team", text: "Our Team" },
      ],
    },
    { name: "Work", path: "/work" },
    { name: "JVAI Insider", path: "/blog" },
  ];

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const closeMobileMenu = () => setMobileOpen(false);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleNavClick = (path) => {
    navigate(path);
    closeMobileMenu();
  };

  return (
    <nav className="w-full pointer-events-none sticky top-0 z-9999999999">
      <div className="pointer-events-auto w-full bg-[#050505]/80 backdrop-blur-md shadow-lg shadow-black/50 rounded-b-3xl border-b border-white/10">
        <div className="flex justify-between items-center font-sans px-6 py-4 md:px-8 lg:px-12 mx-4 max-w-screen-2xl md:mx-auto">
          {/* Logo - Always visible */}
          <div className="shrink-0">
            <img
              onClick={() => handleNavClick("/")}
              className="w-20 lg:w-24 cursor-pointer transition-transform hover:scale-105 brightness-0 invert"
              src="/logo.png"
              alt="JVAI Logo"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 text-white/80 text-sm lg:text-base">
            {navItems.map((item) => {
              const isChildActive = item.child?.some((child) =>
                currentPath.startsWith(child.path)
              );
              const isActive = currentPath === item.path || isChildActive;

              return item.child ? (
                <div key={item.name} className="relative group">
                  <button
                    className={`flex items-center gap-1 transition-colors ${
                      isActive
                        ? "text-blue-500 font-medium"
                        : "hover:text-blue-400"
                    }`}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.name}
                  >
                    <span>{item.name}</span>
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>

                  <ul className="absolute left-1/2 -translate-x-1/2 mt-4 w-48 bg-[#0f0f0f] shadow-xl shadow-black/50 rounded-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-white/10">
                    {item.child.map((child) => (
                      <li key={child.path}>
                        <Link
                          to={child.path}
                          className={`block px-5 py-2.5 text-sm transition-colors ${
                            currentPath.startsWith(child.path)
                              ? "text-blue-500 bg-white/5"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {child.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative pb-1 transition-colors ${
                    isActive
                      ? "text-blue-500 font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-500"
                      : "hover:text-blue-400"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Contact Button */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-blue-500 transition-all hover:scale-105 shadow-lg shadow-blue-900/20"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-white"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed inset-0 z-40 transition-colors duration-300 ${
          mobileOpen ? "bg-black/80 backdrop-blur-sm" : "pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      />

      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-[#0f0f0f] shadow-2xl border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header with Logo + Close */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <img
              onClick={() => handleNavClick("/")}
              className="w-16 cursor-pointer brightness-0 invert"
              src="/logo.png"
              alt="JVAI Logo"
            />
            <button
              onClick={closeMobileMenu}
              className="p-2 text-white/60 hover:text-white"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* Mobile Nav Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
            {navItems.map((item) => {
              const isChildActive = item.child?.some((c) =>
                currentPath.startsWith(c.path)
              );
              const isActive = currentPath === item.path || isChildActive;

              return item.child ? (
                <div key={item.name}>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`w-full flex justify-between items-center py-4 text-lg font-medium transition-colors ${
                      isActive ? "text-blue-500" : "text-white/80"
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openDropdown === item.name
                        ? "max-h-48 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-4 mt-2 space-y-1 border-l-2 border-white/10 pl-4">
                      {item.child.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          onClick={() => handleNavClick(sub.path)}
                          className={`block py-3 text-base transition-colors ${
                            currentPath.startsWith(sub.path)
                              ? "text-blue-500 font-medium"
                              : "text-white/60 hover:text-blue-400"
                          }`}
                        >
                          {sub.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`block py-4 text-lg font-medium transition-colors ${
                    isActive
                      ? "text-blue-500"
                      : "text-white/80 hover:text-blue-400"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Contact Button */}
          <div className="p-6 border-t border-white/10">
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="block w-full text-center bg-blue-600 text-white px-6 py-3.5 rounded-full font-medium text-base hover:bg-blue-500 hover:shadow-xl transition-all hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
