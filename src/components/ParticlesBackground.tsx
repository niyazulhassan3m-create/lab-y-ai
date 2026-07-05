"use client";

import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const gap = 80;
    const cols = Math.floor(w / gap) + 1;
    const rows = Math.floor(h / gap) + 1;
    const particles: { x: number; y: number; r: number; phase: number; speed: number; glow: number; hue: number }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        particles.push({
          x: c * gap + (Math.random() - 0.5) * 12,
          y: r * gap + (Math.random() - 0.5) * 12,
          r: Math.random() * 2 + 1,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.5,
          glow: Math.random() * 6 + 3,
          hue: Math.random() < 0.3 ? 3 : 0,
        });
      }
    }

    let time = 0;

    const draw = () => {
      time += 0.02;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        const pulse = (Math.sin(time * p.speed + p.phase) + 1) / 2;
        const pr = p.r + pulse * 2;
        const pa = 0.15 + pulse * 0.45;

        const r = 110 + pulse * 35 + p.hue;
        const g = 30 + pulse * 15;
        const b = 40 + pulse * 10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, pr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${pa})`;
        ctx.fill();

        if (pulse > 0.7) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, pr + p.glow, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(pulse - 0.7) * 0.2})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
