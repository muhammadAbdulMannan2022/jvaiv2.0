import React, { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router";
import LoadingScreen from "./components/Loading";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 z-999999999999999999">
        {isLoading && <LoadingScreen />}
      </div>
      <div
        className={`${isLoading ? "opacity-0" : "opacity-100"} transition-all duration-500`}
      >
        <Outlet />
      </div>
    </div>
  );
}
