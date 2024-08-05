import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Computer from "./Computer";
import { OrbitControls } from "@react-three/drei";
import SciFi from "./Scifi";
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
                <directionalLight position={[3, 3, 0]} intensity={3} />
                <Computer position={[0, 0.3, 0]} scale={3} rotation={[0, 3.2, 0]} />
                <SciFi position={[0, 1, 2]} scale={12} rotation={[0, 0, 0]} />
                <OrbitControls autoRotate autoRotateSpeed={0.5} enableRotate={false} enableZoom={false} enablePan={false} />
            </Suspense>
        </Canvas>
    );
};

export default ComputerCanvas;
