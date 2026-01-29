import React, { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router";
import LoadingScreen from "./components/Loading";
import { useGetSeoQuery } from "../redux/features/apiSlice";
import SupportChat from "./pages/Landing/Bot/SupportChat";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  const { data, isLoading: seoLoading } = useGetSeoQuery();
  const seoContent = data?.Data?.[0]?.seo_content;

  useEffect(() => {
    if (seoContent) {
      document.title = "JVAI - AI Solutions";

      // Update or create description meta
      const setMeta = (name, content) => {
        let element = document.querySelector(`meta[name="${name}"]`);
        if (!element) {
          element = document.createElement("meta");
          element.setAttribute("name", name);
          document.head.appendChild(element);
        }
        element.setAttribute("content", content);
      };

      setMeta("description", seoContent);
      setMeta("keywords", seoContent);
    }
  }, [seoContent]);
  return (
    <div className={`relative ${isLoading ? "h-screen overflow-hidden" : ""}`}>
      <div className="absolute top-0 left-0 right-0 z-999999999999999999">
        {isLoading && <LoadingScreen />}
      </div>
      <div
        className={`${isLoading ? "opacity-0" : "opacity-100"} transition-all duration-500`}
      >
        <Outlet />
      </div>
      <SupportChat />
    </div>
  );
}
