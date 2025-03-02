import * as THREE from 'three'
import React, { JSX, useEffect } from 'react'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    imagetostl_mesh0: THREE.Mesh // Cup
    crossfi_logo: THREE.Mesh // Logo
  }
  materials: {
    mat0: THREE.MeshStandardMaterial // Cup Material
    ['crossfi logo']: THREE.MeshStandardMaterial // Logo Material
  }
}

export function Cup(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/simple_paper_cup.glb') as GLTFResult

  // Debugging: Check if nodes exist
  useEffect(() => {
    console.log("GLB Nodes:", nodes)
  }, [nodes])

  if (!nodes.imagetostl_mesh0) {
    console.error("⚠️ Cup mesh not found!")
    return null
  }

  if (!nodes.crossfi_logo) {
    console.warn("⚠️ CrossFi logo not found!")
  }

  return (
    <>
      <group {...props} dispose={null}>
        {/* Cup Mesh */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.imagetostl_mesh0.geometry}
          material={materials.mat0}
        />

        {/* CrossFi Logo Mesh */}
        {nodes.crossfi_logo && (
          <mesh
            geometry={nodes.crossfi_logo.geometry}
            material={materials['crossfi logo']}
            position={[0, 2, -1]} // Move logo slightly forward
            rotation={[0, 0, 0]} // Adjust if needed
            scale={[2, 2, 2]} // Increase size
          />
        )}
      </group>

      {/* Camera Controls */}
      {/* <OrbitControls /> */}
    </>
  )
}

useGLTF.preload('/simple_paper_cup.glb')
