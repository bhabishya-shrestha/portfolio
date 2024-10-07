import { useGLTF, useTexture } from "@react-three/drei";
import React, { useEffect } from "react";
import * as THREE from "three";

useGLTF.preload("/models/coding-room.glb");
useTexture.preload("textures/desk/monitor.png");
useTexture.preload("textures/desk/screen.png");

const CoderRoom = (props) => {
  const { nodes, materials } = useGLTF("/models/coding-room.glb");

  // Load textures
  const monitortxt = useTexture("textures/desk/monitor.png");
  const screenTxt = useTexture("textures/desk/screen.png");

  // Optionally log when textures are loaded
  useEffect(() => {
    if (monitortxt) {
      console.log("Monitor texture loaded:", monitortxt);
    }
  }, [monitortxt]);

  useEffect(() => {
    if (screenTxt) {
      console.log("Screen texture loaded:", screenTxt);
    }
  }, [screenTxt]);

  // Create materials
  const monitorMaterial = React.useMemo(() => {
    if (monitortxt) {
      return new THREE.MeshBasicMaterial({ map: monitortxt });
    }
  }, [monitortxt]);

  const screenMaterial = React.useMemo(() => {
    if (screenTxt) {
      return new THREE.MeshBasicMaterial({ map: screenTxt });
    }
  }, [screenTxt]);

  return (
    <group {...props} dispose={null}>
      {/* Use custom material directly */}
      {screenMaterial && (
        <mesh
          geometry={nodes.screen_screens_0.geometry}
          material={screenMaterial}
        />
      )}

      {/* Other meshes using default materials */}
      <mesh
        geometry={nodes.screen_glass_glass_0.geometry}
        material={materials.glass}
      />
      <mesh
        geometry={nodes.table_table_mat_0_1.geometry}
        material={materials.table_mat}
      />

      {/* Monitor mesh with custom material */}
      {monitorMaterial && (
        <mesh
          geometry={nodes.table_table_mat_0_2.geometry}
          material={monitorMaterial}
        />
      )}

      {/* Rest of your meshes */}
    </group>
  );
};

export default CoderRoom;
