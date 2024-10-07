import { useGLTF, useTexture } from "@react-three/drei";
import React from "react";

useGLTF.preload("/models/coding-room.glb");
useTexture.preload("textures/desk/monitor.png");
useTexture.preload("textures/desk/screen.png");

const CoderRoom = (props) => {
  const { nodes, materials } = useGLTF("/models/coding-room.glb");
  const monitorTxt = useTexture("textures/desk/monitor.png");
  const screenTxt = useTexture("textures/desk/screen.png");

  return (
    <group {...props} dispose={null}>
      {/* Screen Mesh */}
      <mesh
        geometry={nodes.screen_screens_0.geometry}
        material={materials.screens}
      >
        <meshMatcapMaterial map={screenTxt} />
      </mesh>
      {/* Glass Mesh */}
      <mesh
        geometry={nodes.screen_glass_glass_0.geometry}
        material={materials.glass}
      />
      {/* Table Mesh */}
      <mesh
        geometry={nodes.table_table_mat_0_1.geometry}
        material={materials.table_mat}
      />

      {/* Monitor Mesh */}
      <mesh
        geometry={nodes.table_table_mat_0_2.geometry}
        material={materials.computer_mat}
      >
        <meshMatcapMaterial matcap={monitorTxt} />
      </mesh>
      {/* Server Mesh */}
      <mesh
        geometry={nodes.table_table_mat_0_3.geometry}
        material={materials.server_mat}
      />
      {/* VHS Player Mesh */}
      <mesh
        geometry={nodes.table_table_mat_0_4.geometry}
        material={materials.vhsPlayer_mat}
      />
      {/* Stand Mesh */}
      <mesh
        geometry={nodes.table_table_mat_0_5.geometry}
        material={materials.stand_mat}
      />
      {/* Mat Mesh */}
      <mesh
        geometry={nodes.table_table_mat_0_6.geometry}
        material={materials.mat_mat}
      />
      {/* Arm Mesh */}
      <mesh
        geometry={nodes.table_table_mat_0_7.geometry}
        material={materials.arm_mat}
      />
      {/* TV Mesh */}
      <mesh
        geometry={nodes.table_table_mat_0_8.geometry}
        material={materials.tv}
      >
        <meshMatcapMaterial matcap={monitorTxt} />
      </mesh>
      {/* Cables Mesh */}
      <mesh
        geometry={nodes.table_table_mat_0_9.geometry}
        material={materials.cables_mat}
      />
      {/* Props Mesh */}
      <mesh
        geometry={nodes.table_table_mat_0_10.geometry}
        material={materials.props_mat}
      />
      {/* Ground Mesh */}
      <mesh
        geometry={nodes.table_table_mat_0_11.geometry}
        material={materials.ground_mat}
      />
      {/* Key Mesh */}
      <mesh
        geometry={nodes.table_table_mat_0_12.geometry}
        material={materials.key_mat}
      />
    </group>
  );
};

export default CoderRoom;

// import { useGLTF, useTexture } from "@react-three/drei";

// const CoderRoom = (props) => {
//   const { nodes, materials } = useGLTF("/models/coding-room.glb");

//   const monitortxt = useTexture("textures/desk/monitor.png");
//   const screenTxt = useTexture("textures/desk/screen.png");

//   return (
//     <group {...props} dispose={null}>
//       <mesh
//         geometry={nodes.screen_screens_0.geometry}
//         material={materials.screens}
//       >
//         <meshMatcapMaterial map={screenTxt} />
//       </mesh>
//       <mesh
//         geometry={nodes.screen_glass_glass_0.geometry}
//         material={materials.glass}
//       />
//       <mesh
//         geometry={nodes.table_table_mat_0_1.geometry}
//         material={materials.table_mat}
//       />
//       <mesh
//         geometry={nodes.table_table_mat_0_2.geometry}
//         material={materials.computer_mat}
//       >
//         <meshMatcapMaterial map={monitortxt} />
//       </mesh>
//       <mesh
//         geometry={nodes.table_table_mat_0_3.geometry}
//         material={materials.server_mat}
//       />
//       <mesh
//         geometry={nodes.table_table_mat_0_4.geometry}
//         material={materials.vhsPlayer_mat}
//       />
//       <mesh
//         geometry={nodes.table_table_mat_0_5.geometry}
//         material={materials.stand_mat}
//       />
//       <mesh
//         geometry={nodes.table_table_mat_0_6.geometry}
//         material={materials.mat_mat}
//       />
//       <mesh
//         geometry={nodes.table_table_mat_0_7.geometry}
//         material={materials.arm_mat}
//       />
//       <mesh
//         geometry={nodes.table_table_mat_0_8.geometry}
//         material={materials.tv_mat}
//       >
//         <meshMatcapMaterial map={monitortxt} />
//       </mesh>
//       <mesh
//         geometry={nodes.table_table_mat_0_9.geometry}
//         material={materials.cables_mat}
//       />
//       <mesh
//         geometry={nodes.table_table_mat_0_10.geometry}
//         material={materials.props_mat}
//       />
//       <mesh
//         geometry={nodes.table_table_mat_0_11.geometry}
//         material={materials.ground_mat}
//       />
//       <mesh
//         geometry={nodes.table_table_mat_0_12.geometry}
//         material={materials.key_mat}
//       />
//     </group>
//   );
// };

// useGLTF.preload("/models/coding-room.glb");
// export default CoderRoom;
