import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useGraph } from '@react-three/fiber';
import { useFBX, useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export function Model({ activeExperience, ...props }) {
  const group = useRef();
  const [currentAction, setCurrentAction] = useState('LookingUp');
  
  // Ensure correct path to model
  const { scene } = useGLTF('/3d/model.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  
  // Ensure correct path to animations
  const { animations: LookUp } = useFBX('/animations/LookUp.fbx');
  LookUp[0].name = 'LookingUp';

  const { animations: LookMiddle } = useFBX('/animations/LookMiddle.fbx');
  LookMiddle[0].name = 'LookingMiddle';

  const { animations: LookDown } = useFBX('/animations/LookDown.fbx');
  LookDown[0].name = 'LookingDown';

  const { animations: Bounce } = useFBX('/animations/Bouncing.fbx');
  Bounce[0].name = 'Bouncing';

  const { actions } = useAnimations([...LookUp, ...LookMiddle, ...LookDown, ...Bounce], group);

  useEffect(() => {
    // Ensure the animation is set to loop and play
    if (actions[currentAction]) {
      const action = actions[currentAction];
      action.setLoop(THREE.LoopOnce);
      action.play();
      
      const freezeAtEnd = () => {
        if (action) {
          action.paused = true;
          action.time = action.getClip().duration; // Ensure action is at end
        }
      };
      
      action.clampWhenFinished = true;
      action.onFinish = freezeAtEnd;
    }
  }, [actions, currentAction]);

  useEffect(() => {
    // Reset and play the current action
    if (actions[currentAction]) {
      const action = actions[currentAction];
      action.reset().play(); 
    }
  }, [currentAction, actions]);

  const handleClick = () => {
    if (actions['Bouncing']) {
      const bounceAction = actions['Bouncing'];
      bounceAction.reset().play();

      // Switch back to the previous animation after Bounce completes
      bounceAction.onFinish = () => {
        if (actions[currentAction]) {
          actions[currentAction].reset().play();
        }
      };
    }
  };

  useEffect(() => {
    // Change animation based on activeExperience
    if (activeExperience === 'First Steps') {
      setCurrentAction('LookingMiddle');
    } else if (activeExperience === 'Now' || activeExperience === 'The Loop') {
      setCurrentAction('LookingDown');
    } else {
      setCurrentAction('LookingUp');
    }
  }, [activeExperience]);

  return (
    <group ref={group} {...props} dispose={null} onClick={handleClick}>
      <primitive object={nodes.Hips} />
      {nodes.Wolf3D_Glasses && materials.Wolf3D_Glasses && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Glasses.geometry}
          material={materials.Wolf3D_Glasses}
          skeleton={nodes.Wolf3D_Glasses.skeleton}
        />
      )}
      {nodes.Wolf3D_Body && materials.Wolf3D_Body && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
      )}
      {nodes.Wolf3D_Outfit_Bottom && materials.Wolf3D_Outfit_Bottom && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
      )}
      {nodes.Wolf3D_Outfit_Footwear && materials.Wolf3D_Outfit_Footwear && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
      )}
      {nodes.Wolf3D_Outfit_Top && materials.Wolf3D_Outfit_Top && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
      )}
      {nodes.EyeLeft && materials.Wolf3D_Eye && (
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
      )}
      {nodes.EyeRight && materials.Wolf3D_Eye && (
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
      )}
      {nodes.Wolf3D_Head && materials.Wolf3D_Skin && (
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
      )}
      {nodes.Wolf3D_Teeth && materials.Wolf3D_Teeth && (
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
      )}
      {nodes.Wolf3D_Beard && materials.Wolf3D_Beard && (
        <skinnedMesh
          name="Wolf3D_Beard"
          geometry={nodes.Wolf3D_Beard.geometry}
          material={materials.Wolf3D_Beard}
          skeleton={nodes.Wolf3D_Beard.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Beard.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Beard.morphTargetInfluences}
        />
      )}
    </group>
  );
}

useGLTF.preload('/3d/model.glb');
