import React from "react";
import WorkSection from "../About/WorkSection";
import WorksHero3D from "./WorksHero";
import { useGetProjectsQuery } from "../../../redux/features/apiSlice";

export default function Works() {
  const { data: projects, isLoading } = useGetProjectsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <WorksHero3D />
      <WorkSection PROJECTS={projects || []} />
    </div>
  );
}
