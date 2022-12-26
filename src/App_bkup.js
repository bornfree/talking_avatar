import React, { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stage, useFBX, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial';
// import * as THREE from 'three';
import _ from 'lodash';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useLoader } from '@react-three/fiber';
import { sRGBEncoding, LinearEncoding } from 'three/src/constants';


function Avatar({ fbx_url }) {
  let fbx = useGLTF(fbx_url);
  // console.log(fbx.scene);

  // let fbx = useLoader(GLTFLoader, fbx_url, loader => {
  //   const dracoLoader = new DRACOLoader();
  //   dracoLoader.setDecoderPath('/draco-gltf/');
  //   loader.setDRACOLoader(dracoLoader);
  // });

  fbx.scene.traverse(node => {
    
    if(node.type === 'Mesh' || node.type == 'SkinnedMesh') {
      
        node.frustumCulled = false;
      
        // let prevMaterial = node.material;
        // node.material = new MeshStandardMaterial();
        // node.material.copy(prevMaterial);
        // node.material.roughness = 0.9;
        
        // node.material.color.setHex(0xFFFFFF);

        // node.material.environmentIntensity = 0.2;
        // node.material.envMapIntensity = 0.2;

      

        if (node.name.toLowerCase().includes("hair")) {
          node.material.transparent = true;
          node.material.depthWrite = false;
          node.material.side = 2;
          node.material.color.setHex(0x222222);
        }

    }

  });

  // let posesFbx = useFBX("/avatar.fbx");
    
  // const clips = posesFbx.animations;
  // const mixer = new THREE.AnimationMixer(fbx);
  

  // setTimeout(() => {
  //   // mixer.clipAction(clips[2]).play();
  // }, 2000);
        
  // useFrame((state, delta) => {
  //   mixer.update(delta);
  // });


  // console.log("FBX to render", fbx);


  return (<group>
    <primitive object={fbx.scene} dispose={null} />

  </group>);
}

function App() {

  let avatarUrl = (new URLSearchParams(window.location.search)).get("avatar");

  
  return (
    <div className="full">
    <Canvas dpr={2}>
    
      <PerspectiveCamera 
        position={[0, 1.6, 2.5]}
        makeDefault={true}/>

      <OrbitControls
        target={[0, 1, 0]}
      />
      
      <Suspense fallback={null}>

        <Stage 
          contactShadow 
          shadows 
          adjustCamera={false}
          intensity={0.2} 
          environment="forest" 
          preset="upfront">
      
        

          {/* <Avatar fbx_url={"/avatar.fbx"} /> */}
          <Avatar fbx_url={avatarUrl} />


      
        </Stage>
      </Suspense>
  

  </Canvas>
  </div>
  )
}

export default App;
