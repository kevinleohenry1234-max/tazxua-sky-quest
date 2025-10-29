import React, { useRef, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';

interface EmeraldDiamond3DProps {
  size?: number;
  className?: string;
}

const EmeraldDiamond3D: React.FC<EmeraldDiamond3DProps> = ({ 
  size = 200, 
  className = '' 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const diamondRef = useRef<THREE.Mesh>();
  const particlesRef = useRef<THREE.Points>();
  const animationIdRef = useRef<number>();
  const [actualSize, setActualSize] = useState(size);

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      const newSize = window.innerWidth < 640 ? 120 : window.innerWidth < 768 ? 160 : 200;
      setActualSize(newSize);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create diamond geometry (emerald cut - octahedron shape)
  const createDiamondGeometry = useMemo(() => {
    const geometry = new THREE.OctahedronGeometry(1, 2);
    
    // Modify vertices to create emerald cut shape
    const vertices = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];
      
      // Scale to create emerald cut proportions
      vertices[i] = x * 0.8;     // Width
      vertices[i + 1] = y * 1.2; // Height
      vertices[i + 2] = z * 0.8; // Depth
    }
    
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    
    return geometry;
  }, []);

  // Create diamond material with emerald color and effects
  const createDiamondMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x00ff88), // Emerald green base
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 0.5,
      transparent: true,
      opacity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      ior: 2.4, // Diamond's refractive index
      envMapIntensity: 1.5,
    });
  }, []);

  // Create particle system
  const createParticleSystem = useMemo(() => {
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Create elliptical orbit positions
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      const height = (Math.random() - 0.5) * 4;
      
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius * 0.6;
      
      // Particle colors (white to cyan)
      colors[i3] = 0.8 + Math.random() * 0.2;     // R
      colors[i3 + 1] = 0.9 + Math.random() * 0.1; // G
      colors[i3 + 2] = 1.0;                       // B
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    
    return new THREE.Points(geometry, material);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      actualSize / actualSize,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(actualSize, actualSize);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x00ffaa, 1.5);
    directionalLight1.position.set(2, 2, 2);
    directionalLight1.castShadow = true;
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x0088ff, 1.0);
    directionalLight2.position.set(-2, -1, 1);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0x00ff88, 2, 10);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Create environment map for reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(scene).texture;
    scene.environment = envTexture;

    // Create diamond
    const diamond = new THREE.Mesh(createDiamondGeometry, createDiamondMaterial);
    diamond.castShadow = true;
    diamond.receiveShadow = true;
    diamondRef.current = diamond;
    scene.add(diamond);

    // Create particles
    const particles = createParticleSystem;
    particlesRef.current = particles;
    scene.add(particles);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Rotate diamond slowly (6 seconds per rotation)
      if (diamondRef.current) {
        diamondRef.current.rotation.y = time * 0.3;
        diamondRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      }

      // Animate particles in elliptical orbits
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        const particleCount = positions.length / 3;
        
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const angle = (i / particleCount) * Math.PI * 2 + time * 0.5;
          const radius = 3 + Math.sin(time + i) * 0.5;
          const height = Math.sin(time * 0.3 + i) * 2;
          
          positions[i3] = Math.cos(angle) * radius;
          positions[i3 + 1] = height;
          positions[i3 + 2] = Math.sin(angle) * radius * 0.6;
        }
        
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        particlesRef.current.rotation.y = time * 0.1;
      }

      // Animate lighting
      if (pointLight) {
        pointLight.intensity = 2 + Math.sin(time * 2) * 0.5;
        pointLight.position.x = Math.cos(time) * 2;
        pointLight.position.z = Math.sin(time) * 2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (renderer && camera) {
        renderer.setSize(actualSize, actualSize);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources
      createDiamondGeometry.dispose();
      createDiamondMaterial.dispose();
      createParticleSystem.geometry.dispose();
      (createParticleSystem.material as THREE.Material).dispose();
      renderer.dispose();
      
      if (envTexture) {
        envTexture.dispose();
      }
    };
  }, [actualSize, createDiamondGeometry, createDiamondMaterial, createParticleSystem]);

  return (
    <div 
      ref={mountRef} 
      className={`emerald-diamond-3d ${className}`}
      style={{
        width: actualSize,
        height: actualSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    />
  );
};

export default EmeraldDiamond3D;