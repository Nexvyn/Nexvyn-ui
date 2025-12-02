"use client";

import { useEffect, useState } from "react";
import { GrainGradient } from "@paper-design/shaders-react";

const LIGHT_MODE_COLORS = ["#e8f4ff", "#5a9fd4", "#1e3a5f"];
const DARK_MODE_COLORS = ["#1a1a2e", "#16213e", "#5a9fd4"];

const VoronoiBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const updateDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    updateDimensions();
    updateDarkMode();

    window.addEventListener("resize", updateDimensions);
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener("resize", updateDimensions);
      observer.disconnect();
    };
  }, []);

  if (dimensions.width === 0 || dimensions.height === 0) {
    return null;
  }

  const colors = isDarkMode ? DARK_MODE_COLORS : LIGHT_MODE_COLORS;
  const colorBack = isDarkMode ? "#0a0a0a" : "#c5e3ff";

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <GrainGradient
        width={dimensions.width}
        height={dimensions.height}
        colors={colors}
        colorBack={colorBack}
        softness={0.6}
        intensity={0.3}
        noise={0.2}
        shape="wave"
        speed={1.4}
      />
    </div>
  );
};

export default VoronoiBackground;
