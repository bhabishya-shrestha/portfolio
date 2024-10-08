import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import gsap from "gsap";

const PythonLogo = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/python.glb");
  const [hovered, setHovered] = useState(false);

  // Hover scaling effect similar to GitHubLogo
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
      <Float speed={1} rotationIntensity={1.5} floatIntensity={1}>
        <group {...props} ref={group} dispose={null}>
          <group
            rotation={[1.5, -3.1, -2.5]}
            scale={0.05} // Adjust this value as needed
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Python_Python_0.geometry}
              material={materials.Python}
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

useGLTF.preload("models/python.glb");

export default PythonLogo;
