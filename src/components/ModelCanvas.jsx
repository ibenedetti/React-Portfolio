import { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './Model';  // Import Model as a named export
import CanvasLoader from './loader';

const ModelCanvas = ({ width = '100vw', height = '150vh', activeExperience }) => {
  const [scrollStage, setScrollStage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const stage = Math.floor(scrollPosition / window.innerHeight);
      setScrollStage(stage);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="model-canvas-container" style={{ width, height, position: 'relative' }}>
      <Canvas
        className="w-full h-screen bg-transparent z-10"
        style={{ width, height, pointerEvents: 'auto' }}
        camera={{ near: 0.1, far: 1000, position: [0, 0, 5] }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 3, 0]} intensity={3} />
          <Model
            position={[2, -5.5, 0]}
            scale={5}
            rotation={[1.5, 3, 2.5]}
            activeExperience={activeExperience} 
          />
          <OrbitControls
            autoRotate
            autoRotateSpeed={0}
            enableRotate={false}
            enableZoom={false}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelCanvas;
