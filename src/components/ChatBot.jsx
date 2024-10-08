import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import gsap from "gsap";

const ChatBot = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/chatbot.glb");
  const [hovered, setHovered] = useState(false);

  // Hover scaling effect similar to GitHubLogo
  useEffect(() => {
    if (hovered) {
      gsap.to(group.current.scale, {
        x: 2.1,
        y: 2.1,
        z: 2.1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    } else {
      gsap.to(group.current.scale, {
        x: 2,
        y: 2,
        z: 2,
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
            // rotation={[Math.PI / 2, 0, 0]} // Original rotation
            scale={0.1} // Adjusted scale to match the original size
          >
            {/* Model hierarchy simplified and included here */}
            <group name="GLTF_created_0">
              <primitive object={nodes.GLTF_created_0_rootJoint} />
              <skinnedMesh
                name="Object_14"
                geometry={nodes.Object_14.geometry}
                material={
                  materials.uploads_files_2175002_robot_cuterobot_black_mat
                }
                skeleton={nodes.Object_14.skeleton}
              />
              <skinnedMesh
                name="Object_16"
                geometry={nodes.Object_16.geometry}
                material={
                  materials.uploads_files_2175002_robot_cuterobot_black_mat
                }
                skeleton={nodes.Object_16.skeleton}
              />
              <skinnedMesh
                name="Object_18"
                geometry={nodes.Object_18.geometry}
                material={
                  materials.uploads_files_2175002_robot_cuterobot_black_mat
                }
                skeleton={nodes.Object_18.skeleton}
              />
              <skinnedMesh
                name="Object_20"
                geometry={nodes.Object_20.geometry}
                material={
                  materials.uploads_files_2175002_robot_cuterobot_white_mat
                }
                skeleton={nodes.Object_20.skeleton}
              />
              <skinnedMesh
                name="Object_22"
                geometry={nodes.Object_22.geometry}
                material={
                  materials.uploads_files_2175002_robot_cuterobot_white_mat
                }
                skeleton={nodes.Object_22.skeleton}
              />
              <skinnedMesh
                name="Object_24"
                geometry={nodes.Object_24.geometry}
                material={
                  materials.uploads_files_2175002_robot_cuterobot_emission_mat
                }
                skeleton={nodes.Object_24.skeleton}
              />
              <skinnedMesh
                name="Object_26"
                geometry={nodes.Object_26.geometry}
                material={
                  materials.uploads_files_2175002_robot_cuterobot_white_mat
                }
                skeleton={nodes.Object_26.skeleton}
              />
              <skinnedMesh
                name="Object_28"
                geometry={nodes.Object_28.geometry}
                material={
                  materials.uploads_files_2175002_robot_cuterobot_black_mat
                }
                skeleton={nodes.Object_28.skeleton}
              />
              <skinnedMesh
                name="Object_30"
                geometry={nodes.Object_30.geometry}
                material={
                  materials.uploads_files_2175002_robot_cuterobot_emission_mat
                }
                skeleton={nodes.Object_30.skeleton}
              />
              <skinnedMesh
                name="Object_32"
                geometry={nodes.Object_32.geometry}
                material={
                  materials.uploads_files_2175002_robot_cuterobot_white_mat
                }
                skeleton={nodes.Object_32.skeleton}
              />
              <skinnedMesh
                name="Object_34"
                geometry={nodes.Object_34.geometry}
                material={
                  materials.uploads_files_2175002_robot_cuterobot_emission_mat
                }
                skeleton={nodes.Object_34.skeleton}
              />
              <skinnedMesh
                name="Object_36"
                geometry={nodes.Object_36.geometry}
                material={materials.lambert1}
                skeleton={nodes.Object_36.skeleton}
              />
              <skinnedMesh
                name="Object_38"
                geometry={nodes.Object_38.geometry}
                material={
                  materials.uploads_files_2175002_robot_cuterobot_glasses_mat
                }
                skeleton={nodes.Object_38.skeleton}
              />
              <skinnedMesh
                name="Object_40"
                geometry={nodes.Object_40.geometry}
                material={
                  materials.uploads_files_2175002_robot_cuterobot_VFX_mat
                }
                skeleton={nodes.Object_40.skeleton}
              />
              <skinnedMesh
                name="Object_42"
                geometry={nodes.Object_42.geometry}
                material={
                  materials.uploads_files_2175002_robot_cuterobot_white_mat
                }
                skeleton={nodes.Object_42.skeleton}
              />
              <skinnedMesh
                name="Object_44"
                geometry={nodes.Object_44.geometry}
                material={
                  materials.uploads_files_2175002_robot_cuterobot_emission_mat
                }
                skeleton={nodes.Object_44.skeleton}
              />
            </group>
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

useGLTF.preload("models/chatbot.glb");

export default ChatBot;
