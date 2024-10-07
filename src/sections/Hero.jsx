import { PerspectiveCamera } from "@react-three/drei";
import React, { Suspense } from "react";
import CoderRoom from "../components/CoderRoom";
import CanvasLoader from "../components/CanvasLoader";
import { Canvas } from "@react-three/fiber";
import "../index.css";

import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants";
import ReactIcon from "../components/ReactIcon";

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 678, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  // Adjust atom's position based on screen size
  const iconPosition = isSmall
    ? [-5, 6, -5] // Position for very small screens
    : isMobile
    ? [-8, 6, -5] // Position for mobile screens
    : [-8, 6, -5]; // Default position for larger screens

  const iconScale = isSmall ? 0.4 : isMobile ? 0.45 : 0.5; // Scale down for smaller screens

  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="float-text sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
          Hi, I'm Bhabishya <span className="waving-hand">👋</span>
        </p>
        <p className="float-text hero_tag text-gray_gradient">
          Building Dynamic UIs & Fluid Web-Applications
        </p>
      </div>
      <div className="w-full h-full absolute inset-0">
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />
            <CoderRoom
              position={sizes.deskPosition}
              rotation={[0, -Math.PI, 0]}
              scale={sizes.deskScale}
            />
            <ReactIcon
              position={iconPosition}
              scale={iconScale}
              rotation={[-0.2, -0.2, 0]}
            />
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
