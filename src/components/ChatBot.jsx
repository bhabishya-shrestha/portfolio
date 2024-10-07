import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Float } from "@react-three/drei";
import gsap from "gsap";

const ChatBot = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/chatbot.glb");
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (group.current) {
      setLoaded(true);
    }
  }, [group.current]);

  // Hover scaling effect
  useEffect(() => {
    if (loaded && group.current) {
      if (hovered) {
        gsap.to(group.current.scale, {
          x: 21,
          y: 21,
          z: 21,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      } else {
        gsap.to(group.current.scale, {
          x: 20,
          y: 20,
          z: 20,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      }
    }
  }, [hovered, loaded]);

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Float speed={4} rotationIntensity={2} floatIntensity={0.5}>
        <group scale={0.5}>
          <group name="Sketchfab_Scene">
            <group name="Sketchfab_model">
              <group name="root">
                <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
                  <group
                    name="Sketchfab_model_110"
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <group name="root_109">
                      <group
                        name="GLTF_SceneRootNode_108"
                        rotation={[Math.PI / 2, 0, 0]}
                      >
                        <group
                          name="uploads_files_2175002_robot_cute_robot_cute_450_107"
                          rotation={[Math.PI / 2, 0, 0]}
                          scale={0.01}
                        >
                          <group name="uploads_files_2175002_robot_cute_rig_449_106">
                            <group
                              name="uploads_files_2175002_robot_cute_Main_448_105"
                              position={[0, 0, -0.939]}
                            >
                              <group name="uploads_files_2175002_robot_cute_DeformationSystem_65_82">
                                <group
                                  name="GLTF_created_0_81"
                                  rotation={[Math.PI, 0, 0]}
                                >
                                  <group name="GLTF_created_0">
                                    <primitive
                                      object={nodes.GLTF_created_0_rootJoint}
                                    />
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
                                    <group name="Object_10_56" />
                                    <group name="Object_12_57" />
                                    <group name="Object_14_58" />
                                    <group name="Object_16_59" />
                                    <group name="Object_17_60" />
                                    <group name="Object_18_61" />
                                    <group name="Object_20_62" />
                                    <group name="Object_21_63" />
                                    <group name="Object_22_64" />
                                    <group name="Object_24_65" />
                                    <group name="Object_25_66" />
                                    <group name="Object_26_67" />
                                    <group name="Object_28_68" />
                                    <group name="Object_30_69" />
                                    <group name="Object_32_70" />
                                    <group name="Object_33_71" />
                                  </group>
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </Float>
    </group>
  );
};

useGLTF.preload("models/chatbot.glb");

export default ChatBot;
