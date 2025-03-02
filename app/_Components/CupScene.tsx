import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Cup } from "./PaperCup"; // Ensure PaperCup exports `Cup` properly

export default function CupScene() {
    const cupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
      if (cupRef.current) {
        // Get current position
        const currentPos = cupRef.current.position;
        
        // Convert viewport units to world units (approximate conversion)
        const vwToWorld = state.viewport.width / 100;
        const vhToWorld = state.viewport.height / 100;
        
        // Set target position (-5vw horizontally, 10vh vertically)
        const targetX = -15 * vwToWorld;
        const targetY = -20 * vhToWorld;
        
        // Update position
        cupRef.current.position.x = targetX;
        cupRef.current.position.y = targetY;
        cupRef.current.position.z = 0;
        cupRef.current.rotation.set(0, 0, 0);
      }
    });
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} castShadow />
      
      {/* Load the Model */}
      <Suspense fallback={null}>
        <Cup scale={3} ref={cupRef} />
      </Suspense>
      
      {/* Controls */}
      {/* <OrbitControls enableZoom={true} /> */}
    </>
  );
}
