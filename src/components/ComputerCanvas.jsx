import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Computer from "./Computer";
import { OrbitControls } from "@react-three/drei";
import Scifi from "./Scifi";
import CanvasLoader from "./loader";

const ComputerCanvas = ({ width = "100vw", height = "150vh" }) => {
    return (
        <Canvas 
            className="w-full h-screen bg-transparent z-10" 
            style={{ width, height, pointerEvents: "none" }} 
            camera={{ near: 0.1, far: 1000, position: [0, 0, 5] }} 
        >
            <Suspense fallback={<CanvasLoader />}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 2]} intensity={1} />
                <Computer position={[0, 0.5, 0]} scale={6} rotation={[0, 0, 0]} />
                <Scifi position={[0, 1.3, 1]} scale={12} rotation={[0, 0, 0]} />
                <OrbitControls autoRotate autoRotateSpeed={0.5} enableRotate={false} enableZoom={false} enablePan={false} />
            </Suspense>
        </Canvas>
    );
};

export default ComputerCanvas;
