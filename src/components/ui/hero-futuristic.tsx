'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { Mesh } from 'three';
import { ChevronDown } from 'lucide-react';

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add
} from 'three/tsl';

const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' };

const POST_UNIFORMS = {
  uScanProgress: uniform(0),
};

const SCENE_UNIFORMS = {
  uPointer: uniform(new THREE.Vector2(0)),
  uProgress: uniform(0),
};

extend(THREE as unknown as Parameters<typeof extend>[0]);

// Post Processing component with electric-cyan scan line
const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();

  const render = useMemo(() => {
    const postProcessing = new THREE.PostProcessing(
      gl as unknown as THREE.WebGPURenderer
    );
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode('output');
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    const scanPos = float(POST_UNIFORMS.uScanProgress.value);
    const uvY = uv().y;
    const scanWidth = float(0.05);
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));

    // Electric cyan (#00F0FF) overlay — rgb(0, 0.94, 1)
    const cyanOverlay = vec3(0, 0.94, 1).mul(oneMinus(scanLine)).mul(0.35);

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, cyanOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0
    );

    const final = withScanEffect.add(bloomPass);
    postProcessing.outputNode = final;

    return postProcessing;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    POST_UNIFORMS.uScanProgress.value =
      Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    render.renderAsync();
  }, 1);

  return null;
};

const WIDTH = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);

  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) {
      queueMicrotask(() => setVisible(true));
    }
  }, [rawMap, depthMap]);

  const { material } = useMemo(() => {
    const strength = 0.01;
    const tDepthMap = texture(depthMap);

    const tMap = texture(
      rawMap,
      uv().add(tDepthMap.r.mul(SCENE_UNIFORMS.uPointer).mul(strength))
    );

    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);

    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);

    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);

    const depth = tDepthMap.r;
    const flow = oneMinus(
      smoothstep(0, 0.02, abs(depth.sub(SCENE_UNIFORMS.uProgress)))
    );

    // Electric cyan dot mask: rgb(0, 15, 16) ≈ very bright cyan in HDR
    const mask = dot.mul(flow).mul(vec3(0, 15, 16));

    const final = blendScreen(tMap, mask);

    const material = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return { material };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    SCENE_UNIFORMS.uProgress.value =
      Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    if (meshRef.current && 'material' in meshRef.current && meshRef.current.material) {
      const mat = meshRef.current.material as unknown as { opacity?: number };
      if (typeof mat.opacity === 'number') {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.07);
      }
    }
  });

  useFrame(({ pointer }) => {
    SCENE_UNIFORMS.uPointer.value = pointer;
  });

  const scaleFactor = 0.40;
  return (
    <mesh ref={meshRef} scale={[w * scaleFactor, h * scaleFactor, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
};

export const AboutHero = () => {
  const titleWords = "WE HATE INEFFICIENCY.".split(' ');
  const accentWords = 'WE ENGINEER AUTONOMY.'.split(' ');
  const subtitle = 'Most agencies just write code. We architect specialized AI, web, and app ecosystems designed to eliminate manual bottlenecks and scale your revenue.';

  const [visibleWords, setVisibleWords] = useState(0);
  const totalWords = titleWords.length + accentWords.length;
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);
  const [subtitleDelay, setSubtitleDelay] = useState(0);

  useEffect(() => {
    const nextDelays = [...Array(totalWords)].map(() => Math.random() * 0.07);
    const nextSubtitleDelay = Math.random() * 0.1;
    queueMicrotask(() => {
      setDelays(nextDelays);
      setSubtitleDelay(nextSubtitleDelay);
    });
  }, [totalWords]);

  useEffect(() => {
    if (visibleWords < totalWords) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 500);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 700);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, totalWords]);

  const allWords = [
    ...titleWords.map((w) => ({ word: w, accent: false })),
    ...accentWords.map((w) => ({ word: w, accent: true })),
  ];

  return (
    <div className="h-svh relative overflow-hidden bg-[#02040A]">
      {/* Gradient vignette at bottom to blend into rest of page */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#02040A] to-transparent z-20 pointer-events-none" />

      {/* Text overlay */}
      <div className="h-svh uppercase items-center w-full absolute z-30 pointer-events-none px-10 flex justify-center flex-col bg-[radial-gradient(ellipse_at_center,_rgba(2,4,10,0.85)_0%,_rgba(2,4,10,0.4)_40%,_transparent_75%)]">
        <div className="text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold leading-tight">
          <div className="flex flex-wrap gap-x-3 lg:gap-x-5 gap-y-1 overflow-hidden">
            {allWords.map(({ word, accent }, index) => (
              <span
                key={index}
                className={`transition-all ${index < visibleWords ? 'about-hero-word-in' : 'opacity-0'} ${
                  accent ? 'text-[#00F0FF]' : 'text-white'
                }`}
                style={{
                  animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                  textShadow: accent 
                    ? '0 0 20px rgba(0,240,255,0.7), 0 0 60px rgba(0,240,255,0.3)' 
                    : '0 4px 12px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-sm md:text-lg xl:text-xl 2xl:text-2xl mt-4 max-w-2xl overflow-hidden text-[#F8FAFC] font-medium normal-case drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          <div
            className={subtitleVisible ? 'about-hero-subtitle-in' : 'opacity-0'}
            style={{ animationDelay: `${totalWords * 0.13 + 0.2 + subtitleDelay}s` }}
          >
            {subtitle}
          </div>
        </div>

        {/* Cyber divider line */}
        {subtitleVisible && (
          <div
            className="mt-8 about-hero-line-in"
            style={{ animationDelay: `${totalWords * 0.13 + 0.5}s` }}
          >
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-60" />
          </div>
        )}
      </div>

      {/* Scroll CTA */}
      <button className="about-explore-btn">
        Scroll to explore
        <span className="about-explore-arrow">
          <ChevronDown className="w-5 h-5 text-[#00F0FF]" />
        </span>
      </button>

      {/* WebGPU Three.js Canvas */}
      <Canvas
        flat
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer(
            props as unknown as ConstructorParameters<typeof THREE.WebGPURenderer>[0]
          );
          await renderer.init();
          return renderer;
        }}
      >
        <PostProcessing fullScreenEffect={true} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default AboutHero;
