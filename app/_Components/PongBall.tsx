import * as THREE from 'three'
import React, { useRef, JSX } from 'react'
import { useFrame } from '@react-three/fiber'

export function Ball(props: JSX.IntrinsicElements['mesh']) {
    const ballRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (ballRef.current) {
            ballRef.current.rotation.y += delta * 0.5; // Adjust speed
        }
    });

    return (
        <mesh ref={ballRef} {...props} scale={[4, 4, 4]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="orange" roughness={0.5} metalness={0.1} />
        </mesh>
    );
}
