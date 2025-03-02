import React from 'react';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Ball } from './PongBall';

const Scene = () => {
    return (
        <>
            <PerspectiveCamera 
                fov={75} 
                near={0.1}  
                far={1000}  
                makeDefault 
                position={[0, 0, 10]} 
            />
            <Environment preset="city" />
            
            <OrbitControls enableZoom={false} />
            {/* <axesHelper args={[5]} />
            <gridHelper args={[10, 10]} />  */}

            {/* Ball will now rotate on its own axis */}
            <Ball position={[0, 0, 0]} scale={[6, 6, 6]}/>

            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
        </>
    );
}

export default Scene;
