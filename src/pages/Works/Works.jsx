import React from "react";
import WorkSection from "../About/WorkSection";
import { PROJECTS } from "../About/AboutUs";
import WorksHero3D from "./WorksHero";

export default function Works() {
  return (
    <div>
      <WorksHero3D />
      <WorkSection PROJECTS={PROJECTS} />
    </div>
  );
}
