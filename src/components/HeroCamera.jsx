import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";

const HeroCamera = ({ children, isMobile }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (isMobile) {
      easing.damp3(state.camera.position, [0, 0, 20], 0.25, delta);
    } else {
      easing.damp3(
        groupRef.current.rotation,
        [-state.pointer.y / 3, state.pointer.x / 4, 0],
        0.25,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 1 : 1.3}>
      {children}
    </group>
  );
};

export default HeroCamera;
