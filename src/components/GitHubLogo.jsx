import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import gsap from "gsap";

const GitHubLogo = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/github.glb");
  const [hovered, setHovered] = useState(false);

  // Hover scaling effect similar to ChatBot
  useEffect(() => {
    if (hovered) {
      gsap.to(group.current.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    } else {
      gsap.to(group.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    }
  }, [hovered]);

  return (
    <group
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Float speed={1} rotationIntensity={1.5} floatIntensity={0.05}>
        <group {...props} ref={group} dispose={null}>
          <group
            // position={[6.5, -2.5, 8]}
            rotation={[Math.PI / 2, 0, 0.5]}
            scale={28.364}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials.glossy_putih}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_5.geometry}
              material={materials.github}
            />
          </group>
        </group>
      </Float>

      {/* Optional bloom effect for glowing */}
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
      </EffectComposer>
    </group>
  );
};

useGLTF.preload("models/github.glb");

export default GitHubLogo;
