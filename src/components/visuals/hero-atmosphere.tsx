"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroAtmosphereProps {
  className?: string;
}

export function HeroAtmosphere({ className }: HeroAtmosphereProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const small = window.matchMedia("(max-width: 767px)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.z = 8;

    const count = small ? 26 : 64;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 13;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 5;
      seeds[index] = Math.random() * Math.PI * 2;
    }
    const basePositions = positions.slice();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: small ? 0.028 : 0.034,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, small ? 1 : 1.5));
      renderer.setSize(width, height, false);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    resize();

    let frame = 0;
    let running = false;
    let startTime = performance.now();

    const render = (now: number) => {
      if (!running) return;
      const time = (now - startTime) * 0.00012;
      const attribute = geometry.attributes.position as THREE.BufferAttribute;
      for (let index = 0; index < count; index += 1) {
        const baseY = basePositions[index * 3 + 1] ?? 0;
        attribute.setY(
          index,
          baseY + Math.sin(time * 4 + (seeds[index] ?? 0)) * 0.12,
        );
      }
      attribute.needsUpdate = true;
      points.rotation.y = Math.sin(time) * 0.025;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };

    const visibilityObserver = reduced
      ? null
      : new IntersectionObserver(([entry]) => {
          const visible = entry?.isIntersecting ?? false;
          if (visible && !running) {
            running = true;
            startTime = performance.now();
            frame = requestAnimationFrame(render);
          } else if (!visible && running) {
            running = false;
            cancelAnimationFrame(frame);
          }
        });

    if (visibilityObserver) {
      visibilityObserver.observe(wrap);
    } else {
      renderer.render(scene, camera);
    }

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibilityObserver?.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
