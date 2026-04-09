import { useRef, useEffect, useState, Suspense } from 'react';
import type { MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { albumCubeConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

interface CubeProps {
  rotationProgressRef: MutableRefObject<number>;
}

const Cube = ({ rotationProgressRef }: CubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const textures = useTexture(albumCubeConfig.cubeTextures);

  // Responsive cube size
  const cubeSize = Math.min(viewport.width * 0.4, 3);

  useFrame(() => {
    if (meshRef.current) {
      const rotationProgress = rotationProgressRef.current;

      // Map rotation progress (0-1) to rotation angles
      const targetRotationY = rotationProgress * Math.PI * 2;
      const targetRotationX = Math.sin(rotationProgress * Math.PI) * 0.3;

      // Smooth interpolation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      {textures.map((texture, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          map={texture}
          roughness={0.2}
          metalness={0.1}
        />
      ))}
    </mesh>
  );
};

const AlbumCube = () => {
  // Null check: if config is empty, do not render
  if (albumCubeConfig.albums.length === 0 || albumCubeConfig.cubeTextures.length === 0) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const rotationProgressRef = useRef(0);
  const currentAlbumIndexRef = useRef(0);
  const blurAmountRef = useRef(0);
  const letterSpacingRef = useRef(0);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=300%',
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        rotationProgressRef.current = progress;

        // Calculate current album index
        const albumIndex = Math.min(
          Math.floor(progress * 4),
          albumCubeConfig.albums.length - 1
        );

        if (albumIndex !== currentAlbumIndexRef.current) {
          currentAlbumIndexRef.current = albumIndex;
          setCurrentAlbumIndex(albumIndex);
        }

        // Velocity-based blur effect
        const velocity = Math.abs(self.getVelocity());
        const targetBlur = Math.min(velocity / 500, 8);
        const targetSpacing = Math.min(velocity / 100, 30);

        blurAmountRef.current += (targetBlur - blurAmountRef.current) * 0.2;
        letterSpacingRef.current += (targetSpacing - letterSpacingRef.current) * 0.2;

        if (titleRef.current) {
          titleRef.current.style.filter = `blur(${blurAmountRef.current.toFixed(2)}px)`;
          titleRef.current.style.letterSpacing = `${letterSpacingRef.current.toFixed(2)}px`;
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const currentAlbum = albumCubeConfig.albums[currentAlbumIndex];

  return (
    <section
      id="albums"
      ref={sectionRef}
      className="relative w-full h-screen bg-void-black overflow-hidden"
    >
      {/* Background title with blur effect */}
      <div
        ref={titleRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{ filter: 'blur(0px)', letterSpacing: '0px' }}
      >
        <h2 className="font-display text-[20vw] text-white/5 uppercase whitespace-nowrap select-none">
          {currentAlbum.subtitle}
        </h2>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
            />
            <spotLight
              position={[-10, -10, -10]}
              angle={0.15}
              penumbra={1}
              intensity={0.5}
              color="#9DC4FF"
            />
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#00D4FF" />
            <Cube rotationProgressRef={rotationProgressRef} />
          </Suspense>
        </Canvas>
      </div>

      {/* Album info overlay */}
      <div className="absolute bottom-12 left-12 z-20">
        <p className="font-mono-custom text-xs text-neon-soft/60 uppercase tracking-wider mb-2">
          Album {String(currentAlbum.id).padStart(2, '0')} / {String(albumCubeConfig.albums.length).padStart(2, '0')}
        </p>
        <h3 className="font-display text-5xl md:text-7xl text-white mb-2 transition-all duration-300">
          {currentAlbum.title}
        </h3>
        <p className="font-mono-custom text-sm text-white/50">
          {currentAlbum.subtitle}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col gap-3">
          {albumCubeConfig.albums.map((album, index) => (
            <div
              key={album.id}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentAlbumIndex
                  ? 'bg-neon-cyan w-2 h-8'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-12 right-12 z-20">
        <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider">
          {albumCubeConfig.scrollHint}
        </p>
      </div>

      {/* Decorative corner lines */}
      <div className="absolute top-12 left-12 w-20 h-px bg-gradient-to-r from-neon-cyan/50 to-transparent" />
      <div className="absolute top-12 left-12 w-px h-20 bg-gradient-to-b from-neon-cyan/50 to-transparent" />
    </section>
  );
};

export default AlbumCube;
