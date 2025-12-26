import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
import Footer from "./sections/Footer";

export default function LandingLayou() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
