import * as THREE from "three";
import { useMemo, useRef, useState, useEffect } from "react";
import { Trail, Float, Line, Sphere, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

const ReactIcon = (props) => {
  const hoverGroupRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Hover scaling effect
  useEffect(() => {
    if (hovered) {
      gsap.to(hoverGroupRef.current.scale, {
        x: 0.88,
        y: 0.88,
        z: 0.88,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    } else {
      gsap.to(hoverGroupRef.current.scale, {
        x: 0.8,
        y: 0.8,
        z: 0.8,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    }
  }, [hovered]);

  return (
    <group {...props}>
      {/* Stars component outside of the hover effect */}
      <Stars saturation={0} count={400} speed={0.5} radius={100} />

      {/* Group with hover scaling effect applied */}
      <group
        ref={hoverGroupRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
          <Atom />
        </Float>
      </group>

      {/* Optional bloom effect for glowing */}
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
      </EffectComposer>
    </group>
  );
};

function Atom(props) {
  const points = useMemo(
    () =>
      new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(
        100
      ),
    []
  );

  return (
    <group {...props}>
      <Line worldUnits points={points} color="turquoise" lineWidth={0.3} />
      <Line
        worldUnits
        points={points}
        color="turquoise"
        lineWidth={0.3}
        rotation={[0, 0, 1]}
      />
      <Line
        worldUnits
        points={points}
        color="turquoise"
        lineWidth={0.3}
        rotation={[0, 0, -1]}
      />
      <Electron position={[0, 0, 0.5]} speed={6} />
      <Electron
        position={[0, 0, 0.5]}
        rotation={[0, 0, Math.PI / 3]}
        speed={6.5}
      />
      <Electron
        position={[0, 0, 0.5]}
        rotation={[0, 0, -Math.PI / 3]}
        speed={7}
      />
      <Sphere args={[0.55, 64, 64]}>
        <meshBasicMaterial color={[6, 0.5, 2]} toneMapped={false} />
      </Sphere>
    </group>
  );
}

function Electron({ radius = 2.75, speed = 6, ...props }) {
  const ref = useRef();

  // Electron position update, using the exact calculation for synchronized tail movement
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    const x = Math.sin(t) * radius;
    const y = (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25;
    ref.current.position.set(x, y, 0);
  });

  // Electron and Trail are tightly coupled with the same ref to ensure exact tail following
  return (
    <group {...props}>
      <Trail
        target={ref.current} // Bind Trail position directly to the electron
        width={5}
        length={6}
        color={new THREE.Color(2, 1, 10)}
        attenuation={(t) => t * t}
      >
        <mesh ref={ref}>
          <sphereGeometry args={[0.25]} />
          <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
}

export default ReactIcon;
