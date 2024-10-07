import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import CoderRoom from "../components/CoderRoom";
import CanvasLoader from "../components/CanvasLoader";
import "../index.css";

import { calculateSizes } from "../constants";
import ReactIcon from "../components/ReactIcon";
import PythonLogo from "../components/PythonLogo";
import GitHubLogo from "../components/GitHubLogo";
import ChatBot from "../components/ChatBot";
import ErrorBoundary from "../components/ErrorBoundary";
import HeroCamera from "../components/HeroCamera";
import Button from "../components/Button";

const Hero = () => {
  // State variables to track window dimensions
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate sizes based on window dimensions
  const sizes = calculateSizes(windowWidth, windowHeight);

  // Adjust camera settings dynamically
  const cameraSettings = {
    position: [0, 0, sizes.cameraZ],
    fov: sizes.fov,
  };

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
              <CameraUpdater />
              <group>
                <ErrorBoundary>
                  <HeroCamera>
                    <CoderRoom
                      position={sizes.deskPosition}
                      rotation={[0, -Math.PI, 0]}
                      scale={sizes.deskScale}
                    />
                  </HeroCamera>
                </ErrorBoundary>
                <ErrorBoundary>
                  <ReactIcon
                    position={sizes.iconPosition}
                    scale={sizes.iconScale}
                    rotation={[-0.2, -0.2, 0]}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <PythonLogo
                    position={sizes.pythonLogoPosition}
                    scale={sizes.pythonLogoScale}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <GitHubLogo
                    position={sizes.gitHubLogoPosition}
                    scale={sizes.gitHubLogoScale}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <ChatBot
                    position={sizes.chatBotPosition}
                    scale={sizes.chatBotScale}
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
      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a href="#contact" className="w-fit">
          <Button
            name="Contact Me"
            isBeam
            containerClass="sm:w-fit w-full sm:min-w-96"
          />
        </a>
      </div>
    </section>
  );
};

const CameraUpdater = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
};

export default Hero;
