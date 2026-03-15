"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface AnimatedShaderBackgroundProps {
  /** Optional [r, g, b] 0-1 multiplier to tint the aurora toward a service theme color */
  accentRgb?: [number, number, number];
  className?: string;
}

export function AnimatedShaderBackground({
  accentRgb = [0.0, 0.94, 1.0], // default: electric cyan #00F0FF
  className = "",
}: AnimatedShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap pixel ratio for performance
    renderer.setSize(container.clientWidth, container.clientHeight);
    
    // Explicitly style the canvas so it fills the container and doesn't collapse or align weirdly
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(container.clientWidth, container.clientHeight),
        },
        // Aurexis palette tint: electric-cyan by default, overrideable
        uAccent: { value: new THREE.Vector3(...accentRgb) },
      },
      vertexShader: /* glsl */ `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float iTime;
        uniform vec2 iResolution;
        uniform vec3 uAccent;

        #define NUM_OCTAVES 3

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u * u * (3.0 - 2.0 * u);
          float res = mix(
            mix(rand(ip),              rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
            u.y
          );
          return res * res;
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.3;
          vec2 shift = vec2(100.0);
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.4;
          }
          return v;
        }

        void main() {
          vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005);
          vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5)
                   / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
          vec2 v;
          vec4 o = vec4(0.0);

          float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

          // Aurexis palette:
          // electric-cyan  #00F0FF -> (0.0,  0.94, 1.0)
          // cyber-blue     #0047FF -> (0.0,  0.28, 1.0)
          // nebula-violet  #8B5CF6 -> (0.55, 0.36, 0.96)
          // emerald-glow   #10B981 -> (0.06, 0.73, 0.51)

          for (float i = 0.0; i < 35.0; i++) {
            v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5
              + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);

            float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 35.0));

            // Blend from cyber-blue → electric-cyan/accent → nebula-violet
            float t = i / 35.0;
            vec3 col = mix(
              vec3(0.0, 0.28, 1.0),                            // cyber-blue
              mix(uAccent, vec3(0.55, 0.36, 0.96), t * 0.5),  // accent → nebula-violet
              t
            );

            // Subtle emerald shimmer at the trailing edges
            col = mix(col, vec3(0.06, 0.73, 0.51), smoothstep(0.6, 1.0, t) * 0.25);

            vec4 auroraColors = vec4(col, 1.0);
            vec4 contribution = auroraColors
              * exp(sin(i * i + iTime * 0.8))
              / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));

            float thinness = smoothstep(0.0, 1.0, t) * 0.6;
            o += contribution * (1.0 + tailNoise * 0.8) * thinness;
          }

          o = tanh(pow(o / 100.0, vec4(1.6)));
          // Keep alpha < 1 so the deep-black page colour shows through slightly
          gl_FragColor = vec4(o.rgb * 1.5, o.a * 0.92);
        }
      `,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number;
    const animate = () => {
      material.uniforms.iTime.value += 0.016;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        renderer.setSize(width, height);
        // Keep canvas filling exactly
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        material.uniforms.iResolution.value.set(width, height);
      }
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
