import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import gsap from "gsap";

const PythonLogo = (props) => {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("models/python.glb");
  const [hovered, setHovered] = useState(false);

  // Hover scaling effect
  useEffect(() => {
    if (hovered) {
      gsap.to(groupRef.current.scale, {
        x: 11,
        y: 11,
        z: 11,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    } else {
      gsap.to(groupRef.current.scale, {
        x: 10,
        y: 10,
        z: 10,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    }
  }, [hovered]);

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      {...props}
      dispose={null}
    >
      <Float speed={4} rotationIntensity={1.5} floatIntensity={0.5}>
        <group scale={0.004}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Python_Python_0.geometry}
            material={materials.Python}
            rotation={[1.5, -3.1, -2.5]}
          />
        </group>
      </Float>

      {/* Optional bloom effect for glowing */}
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
      </EffectComposer>
    </group>
  );
};

useGLTF.preload("models/python.glb");

export default PythonLogo;
