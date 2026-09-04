"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

import { gsap, ScrollTrigger } from "@/lib/gsap";

const ACCENT = 0xff6a2e;
const ACCENT_HI = 0xffb066;
const BONE = 0xf3efe6;
const ROCK = 0x0d0f16;

interface MonolithSceneProps {
  /** Section whose scroll progress drives the camera pull-back / fade. */
  sceneRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

/**
 * The hero's signature piece: a faceted obsidian giant, cracked with molten
 * light, slowly turning in a dark void. Confined to the hero's own scroll
 * range — no cross-section pinning — and fully paused via
 * IntersectionObserver once it scrolls out of view.
 */
export function MonolithScene({ sceneRef, className }: MonolithSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isSmall = window.matchMedia("(max-width: 767px)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060a, 0.055);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.3, 9.4);

    const dpr = Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 2);
    renderer.setPixelRatio(dpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // --- the giant ------------------------------------------------------
    const detail = isSmall ? 1 : 2;
    const geometry = new THREE.IcosahedronGeometry(2.15, detail);
    const pos = geometry.attributes.position!;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n = 1 + (Math.sin(i * 12.9898) * 43758.5453 - Math.floor(Math.sin(i * 12.9898) * 43758.5453) - 0.5) * 0.22;
      v.multiplyScalar(n);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geometry.computeVertexNormals();

    const rockMaterial = new THREE.MeshStandardMaterial({
      color: ROCK,
      metalness: 0.55,
      roughness: 0.4,
      flatShading: true,
    });
    const giant = new THREE.Mesh(geometry, rockMaterial);
    scene.add(giant);

    const edges = new THREE.EdgesGeometry(geometry, 1);
    const crackMaterial = new THREE.LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cracks = new THREE.LineSegments(edges, crackMaterial);
    cracks.scale.setScalar(1.002);
    scene.add(cracks);

    // --- lighting ---------------------------------------------------------
    scene.add(new THREE.HemisphereLight(0x2a2f3a, 0x000000, 0.55));
    const emberLight = new THREE.PointLight(ACCENT, 6, 14, 2);
    emberLight.position.set(-2.4, -1.6, 2.6);
    scene.add(emberLight);
    const rimLight = new THREE.PointLight(BONE, 3.2, 16, 2);
    rimLight.position.set(3.2, 2.6, 4);
    scene.add(rimLight);

    // --- embers -----------------------------------------------------------
    const emberCount = isSmall ? 220 : 480;
    const emberGeo = new THREE.BufferGeometry();
    const emberPos = new Float32Array(emberCount * 3);
    const emberSeed = new Float32Array(emberCount);
    for (let i = 0; i < emberCount; i++) {
      const r = 3.4 + Math.random() * 4.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      emberPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      emberPos[i * 3 + 1] = r * Math.cos(phi) * 0.6 - 1;
      emberPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      emberSeed[i] = Math.random() * 100;
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPos, 3));
    emberGeo.setAttribute("seed", new THREE.BufferAttribute(emberSeed, 1));

    const emberMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        colorA: { value: new THREE.Color(ACCENT) },
        colorB: { value: new THREE.Color(ACCENT_HI) },
      },
      vertexShader: `
        attribute float seed;
        uniform float time;
        varying float vFade;
        void main() {
          vec3 pos = position;
          float t = time * 0.18 + seed;
          pos.y += mod(t, 9.0) - 1.5;
          pos.x += sin(t * 1.3 + seed) * 0.35;
          pos.z += cos(t * 1.1 + seed) * 0.35;
          vFade = 1.0 - clamp((pos.y + 1.0) / 7.0, 0.0, 1.0);
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (2.0 + sin(seed) * 1.2) * (60.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 colorA;
        uniform vec3 colorB;
        varying float vFade;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float glow = 1.0 - smoothstep(0.0, 0.5, d);
          vec3 color = mix(colorA, colorB, vFade);
          gl_FragColor = vec4(color, glow * vFade * 0.9);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const embers = new THREE.Points(emberGeo, emberMaterial);
    scene.add(embers);

    // --- postprocessing -----------------------------------------------
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(1, 1),
      isSmall ? 0.85 : 1.15,
      0.45,
      0.18,
    );
    composer.addPass(bloom);

    // --- sizing ----------------------------------------------------------
    function resize() {
      const rect = wrap!.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    }
    resize();
    window.addEventListener("resize", resize);

    // --- pointer parallax --------------------------------------------
    const pointer = { x: 0, y: 0 };
    const smoothPointer = { x: 0, y: 0 };
    function onPointerMove(e: PointerEvent) {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    if (!reduced) window.addEventListener("pointermove", onPointerMove);

    // --- scroll-tied camera pull-back, scoped to the hero only -------
    const scrollState = { z: 0, fade: 0 };
    let st: ScrollTrigger | undefined;
    if (!reduced && sceneRef.current) {
      st = ScrollTrigger.create({
        trigger: sceneRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scrollState.z = self.progress * 3.2;
          scrollState.fade = self.progress;
          gsap.set(wrap, { opacity: 1 - self.progress * 1.1 });
        },
      });
    }

    // --- render loop, paused when off-screen --------------------------
    let raf = 0;
    let running = false;
    const clock = new THREE.Clock();

    function frame() {
      raf = requestAnimationFrame(frame);
      const t = clock.getElapsedTime();

      giant.rotation.y = t * 0.055;
      giant.rotation.x = Math.sin(t * 0.15) * 0.05;
      cracks.rotation.copy(giant.rotation);

      const flicker = 0.75 + Math.sin(t * 3.1) * 0.08 + Math.sin(t * 7.7) * 0.05;
      crackMaterial.opacity = flicker;
      emberLight.intensity = 5.2 + Math.sin(t * 2.4) * 1.2;

      emberMaterial.uniforms.time!.value = t;

      smoothPointer.x += (pointer.x - smoothPointer.x) * 0.04;
      smoothPointer.y += (pointer.y - smoothPointer.y) * 0.04;

      camera.position.x = smoothPointer.x * 0.6;
      camera.position.y = 0.3 - smoothPointer.y * 0.35;
      camera.position.z = 9.4 + scrollState.z;
      camera.lookAt(0, 0, 0);

      composer.render();
    }

    function start() {
      if (running) return;
      running = true;
      clock.start();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    if (reduced) {
      composer.render();
    } else {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) start();
          else stop();
        },
        { threshold: 0.01 },
      );
      observer.observe(wrap);

      return () => {
        stop();
        observer.disconnect();
        st?.kill();
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointerMove);
        geometry.dispose();
        edges.dispose();
        rockMaterial.dispose();
        crackMaterial.dispose();
        emberGeo.dispose();
        emberMaterial.dispose();
        composer.dispose();
        renderer.dispose();
      };
    }

    return () => {
      window.removeEventListener("resize", resize);
      geometry.dispose();
      edges.dispose();
      rockMaterial.dispose();
      crackMaterial.dispose();
      emberGeo.dispose();
      emberMaterial.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, [sceneRef]);

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
