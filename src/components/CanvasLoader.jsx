// Target.jsx
import * as THREE from "three";
import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line, Sphere } from "@react-three/drei";
import gsap from "gsap";

export default function Target(props) {
  const nucleusRef = useRef();

  // GSAP animation for a subtle floating effect on the nucleus
  useEffect(() => {
    if (nucleusRef.current) {
      gsap.to(nucleusRef.current.position, {
        y: "+=0.2",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  return (
    <group {...props}>
      {/* Nucleus */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.5, 64, 64]} ref={nucleusRef}>
          <meshBasicMaterial color="purple" />
        </Sphere>
      </Float>

      {/* Electron orbits */}
      <Orbit radius={2} color="turquoise" />
      <Orbit radius={2.5} color="orange" rotation={[0, 0, Math.PI / 3]} />
      <Orbit radius={3} color="cyan" rotation={[0, 0, -Math.PI / 3]} />
    </group>
  );
}

// Electron Orbit Component
function Orbit({ radius, color, ...props }) {
  const points = useMemo(
    () =>
      new THREE.EllipseCurve(
        0,
        0,
        radius,
        radius,
        0,
        2 * Math.PI,
        false,
        0
      ).getPoints(100),
    [radius]
  );

  const electronRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.5;
    electronRef.current.position.set(
      Math.sin(t) * radius,
      Math.cos(t) * radius,
      0
    );
  });

  return (
    <group {...props}>
      <Line points={points} color={color} lineWidth={0.3} />
      <Sphere ref={electronRef} args={[0.1, 16, 16]}>
        <meshBasicMaterial color={color} />
      </Sphere>
    </group>
  );
}
