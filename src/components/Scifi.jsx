import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Box3, Vector3 } from "three";
import ScifiScene from "../assets/3d/scifi.glb"

const Scifi = ({ scale, position, rotation }) => {
    const scifiRef = useRef();
    const { scene } = useGLTF(ScifiScene);

    useEffect(() => {
        const box = new Box3().setFromObject(scene);
        const size = new Vector3();
        box.getSize(size);
        console.log("Bounding Box Size:", size);
    }, [scene]);

    return (
        <primitive ref={scifiRef} object={scene} position={position} scale={scale} rotation={rotation} />
    );
};



export default Scifi;