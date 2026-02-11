"use client";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Sparkles, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from 'three';
import { useTexture } from "@react-three/drei";


function IndustrialKitchen() {
  const stoveRef = useRef<THREE.Group>(null);
  const hoodRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (stoveRef.current && hoodRef.current) {
      const animate = () => {
        if (stoveRef.current) {
          stoveRef.current.rotation.y += 0.001;
        }
        if (hoodRef.current) {
          hoodRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1 + 2.5;
        }
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <group position={[0, -1, 0]}>
      {/* Industrial Stove */}
      <group ref={stoveRef}>
        <mesh position={[-3, 0, 0]} castShadow>
          <boxGeometry args={[2, 1.2, 1.5]} />
          <meshStandardMaterial 
            color="#2a2a2a" 
            roughness={0.3} 
            metalness={0.8}
            emissive="#ff4400"
            emissiveIntensity={0.1}
          />
        </mesh>
        
        {/* Burners */}
        {[-0.6, 0, 0.6].map((x, i) => (
          <mesh key={i} position={[-3 + x, 0.61, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
            <meshStandardMaterial 
              color="#ff6600"
              emissive="#ff3300"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
        
        {/* Stove Controls */}
        <mesh position={[-3, 0.7, 0.8]}>
          <boxGeometry args={[1.5, 0.2, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Industrial Hood */}
      <group ref={hoodRef}>
        <mesh position={[-3, 2.5, 0]} castShadow>
          <boxGeometry args={[2.5, 0.8, 1.8]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            roughness={0.2} 
            metalness={0.9}
          />
        </mesh>
        
        {/* Hood Lights */}
        {[0.8, 0, -0.8].map((x, i) => (
          <mesh key={i} position={[-3 + x, 2.1, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.05, 16]} />
            <meshStandardMaterial 
              color="#ffffff"
              emissive="#ffff00"
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Prep Station */}
      <mesh position={[2, 0, 0]} castShadow>
        <boxGeometry args={[3, 0.9, 1.8]} />
        <meshStandardMaterial 
          color="#333333" 
          roughness={0.4} 
          metalness={0.6}
        />
      </mesh>
      
      {/* Prep Station Tools */}
      {[1.2, 1.8, 2.4].map((x, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.5} floatIntensity={0.3}>
          <mesh position={[x, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
            <meshStandardMaterial 
              color="#c0c0c0"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}

      {/* Refrigeration Unit */}
      <mesh position={[0, 0, -3]} castShadow>
        <boxGeometry args={[1.5, 2, 1]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          roughness={0.3} 
          metalness={0.7}
        />
      </mesh>
      
      {/* Refrigeration Glow */}
      <mesh position={[0, 0.5, -2.5]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial 
          color="#00ffff"
          emissive="#0088ff"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

function RoboticArm() {
  const armRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (armRef.current) {
      const animate = () => {
        if (armRef.current) {
          const time = Date.now() * 0.0005;
          armRef.current.rotation.y = time;
          
          const segment1 = armRef.current.children[1];
          if (segment1) {
            segment1.rotation.z = Math.sin(time * 2) * 0.5;
          }
          
          const segment2 = armRef.current.children[2];
          if (segment2) {
            segment2.rotation.z = Math.sin(time * 3) * 0.7;
          }
        }
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <group ref={armRef} position={[0, -1, 2]}>
      {/* Base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.5, 0.7, 0.3, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* Segment 1 */}
      <group position={[0, 0.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.2, 1, 0.2]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
      
      {/* Segment 2 */}
      <group position={[0, 1.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.2, 1, 0.2]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
      
      {/* Claw */}
      <group position={[0, 2.2, 0]}>
        <mesh position={[-0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

function ConveyorBelt() {
  const beltRef = useRef<THREE.Mesh>(null);

  const texture = useTexture("/textures/conveyor.png");

  useEffect(() => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 1);
  }, [texture]);

  useEffect(() => {
    const animate = () => {
      texture.offset.y -= 0.01;
      requestAnimationFrame(animate);
    };
    animate();
  }, [texture]);

  return (
    <group position={[0, -0.5, -5]}>
      <mesh ref={beltRef} castShadow>
        <boxGeometry args={[8, 0.2, 1.5]} />
        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>

      {[-4.2, 4.2].map((x, i) => (
        <mesh key={i} position={[x, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 1.5, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}





function AtmosphericEffects() {
  return (
    <>
      {/* Steam from cooking */}
      <Sparkles 
        count={60}
        scale={[8, 3, 8]}
        size={2}
        speed={0.3}
        color="#ffffff"
        opacity={0.4}
      />
      
      {/* Ambient kitchen particles */}
      <Sparkles 
        count={30}
        scale={[12, 6, 12]}
        size={1.5}
        speed={0.1}
        color="#ffaa00"
        opacity={0.2}
      />
      
      {/* Mystical dark particles */}
      <Sparkles 
        count={25}
        scale={[15, 8, 15]}
        size={3}
        speed={0.05}
        color="#440044"
        opacity={0.3}
      />
    </>
  );
}

function DramaticLighting() {
  return (
    <>
      {/* Ambient base lighting */}
      <ambientLight intensity={0.1} color="#220011" />
      
      {/* Main kitchen spotlight */}
      <spotLight
        position={[0, 8, 0]}
        angle={0.6}
        penumbra={0.5}
        intensity={2}
        castShadow
        color="#ff6600"
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
      />
      
      {/* Accent lighting for equipment */}
      <pointLight position={[-3, 2, 0]} intensity={1.5} color="#ff4400" />
      <pointLight position={[2, 1.5, 0]} intensity={1} color="#ffffff" />
      <pointLight position={[0, 1, -3]} intensity={0.8} color="#0088ff" />
      
      {/* Dramatic back lighting */}
      <directionalLight
        position={[-5, 5, 5]}
        intensity={0.5}
        color="#4400ff"
        castShadow
      />
      
      {/* Rim lighting for atmosphere */}
      <pointLight position={[5, 3, -5]} intensity={0.7} color="#ff0088" />
    </>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full opacity-90 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 5, 12], fov: 60 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Camera Controls */}
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
          
          {/* Lighting Setup */}
          <DramaticLighting />
          
          {/* Main Scene Components */}
          <IndustrialKitchen />
           <RoboticArm />
           <ConveyorBelt />
           <AtmosphericEffects />
            <Sparkles
              count={100}
              speed={0.5}
              opacity={0.7}
              color="#fff"
              size={1}
              scale={[10, 10, 10]}
            />
          
          {/* Ground shadows */}
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.75}
            scale={10}
            blur={2.5}
            far={4}
          />
          
          {/* Environment for reflections */}
          <Environment preset="city" />
          
          {/* Fog for depth */}
          <fog attach="fog" args={['#0a0a0a', 15, 40]} />
        </Suspense>
      </Canvas>
    </div>
  );
}