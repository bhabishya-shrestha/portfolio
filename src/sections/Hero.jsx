import { PerspectiveCamera } from "@react-three/drei";
import React, { Suspense, useEffect } from "react";
import CoderRoom from "../components/CoderRoom";
import CanvasLoader from "../components/CanvasLoader";
import { Canvas } from "@react-three/fiber";
import "../index.css";

import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants";
import ReactIcon from "../components/ReactIcon";
import PythonLogo from "../components/PythonLogo";
import GitHubLogo from "../components/GitHubLogo";
import ChatBot from "../components/ChatBot";
import ErrorBoundary from "../components/ErrorBoundary";

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 678, maxWidth: 1024 });
  const isLargeDesktop = useMediaQuery({ minWidth: 1280 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet, isLargeDesktop);

  const iconScale = isSmall
    ? 0.4
    : isMobile
    ? 0.45
    : isLargeDesktop
    ? 0.8
    : 0.6;
  const pythonLogo = isSmall
    ? 0.4
    : isMobile
    ? 0.45
    : isLargeDesktop
    ? 0.1
    : 0.05;
  const chatBot = isSmall ? 0.4 : isMobile ? 0.45 : isLargeDesktop ? 0.75 : 0.6;

  // Adjust camera settings based on screen size
  const cameraSettings = {
    position: isSmall
      ? [0, 0, 50]
      : isMobile
      ? [0, 0, 40]
      : isLargeDesktop
      ? [0, 0, 30]
      : [0, 0, 35],
    fov: isSmall ? 80 : isMobile ? 75 : isLargeDesktop ? 70 : 75,
  };

  useEffect(() => {
    let canvas;
    const handleContextLost = (event) => {
      console.warn("WebGL context lost:", event);
      event.preventDefault();
    };
    const handleContextRestored = () => {
      console.log("WebGL context restored");
    };

    const onCanvasCreated = ({ gl }) => {
      canvas = gl.domElement;
      canvas.addEventListener("contextlost", handleContextLost);
      canvas.addEventListener("contextrestored", handleContextRestored);
    };

    return () => {
      if (canvas) {
        canvas.removeEventListener("contextlost", handleContextLost);
        canvas.removeEventListener("contextrestored", handleContextRestored);
      }
    };
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="float-text sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
          Hi, I'm Bhabishya <span className="waving-hand">👋</span>
        </p>
        <p className="float-text hero_tag text-gray_gradient">
          Dynamic UI & Fluid Web-Application Developer
        </p>
      </div>
      <div className="w-full h-full absolute inset-0">
        <ErrorBoundary>
          <Canvas
            className="w-full h-full"
            onCreated={({ gl }) => {
              const canvas = gl.domElement;
              canvas.addEventListener("contextlost", (event) => {
                console.warn("WebGL context lost:", event);
                // Do not call event.preventDefault();
              });
              canvas.addEventListener("contextrestored", () => {
                console.log("WebGL context restored");
              });
            }}
          >
            <Suspense fallback={<CanvasLoader />}>
              <PerspectiveCamera
                makeDefault
                position={cameraSettings.position}
                fov={cameraSettings.fov}
              />
              <group>
                <ErrorBoundary>
                  <CoderRoom
                    position={sizes.deskPosition}
                    rotation={[0, -Math.PI, 0]}
                    scale={sizes.deskScale}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <ReactIcon
                    position={sizes.iconPosition}
                    scale={iconScale}
                    rotation={[-0.2, -0.2, 0]}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <PythonLogo
                    position={sizes.pythonLogoPosition}
                    scale={pythonLogo}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <GitHubLogo position={sizes.gitHubLogoPosition} />
                </ErrorBoundary>
                <ErrorBoundary>
                  <ChatBot
                    position={sizes.chatBotPosition}
                    scale={chatBot}
                    rotation={[0.1, 0.4, 0]}
                  />
                </ErrorBoundary>
              </group>
              <ambientLight intensity={3} />
              <directionalLight position={[10, 10, 10]} intensity={0.5} />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default Hero;
