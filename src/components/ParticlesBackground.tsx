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

    const count = Math.min(70, Math.floor((w * h) / 18000));

    const palette = [
      { r: 200, g: 74, b: 74 },
      { r: 155, g: 45, b: 62 },
      { r: 224, g: 112, b: 112 },
      { r: 123, g: 30, b: 45 },
    ];

    const particles = Array.from({ length: count }, () => {
      const c = palette[Math.floor(Math.random() * palette.length)];
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.25 + 0.08),
        r: Math.random() * 2.5 + 1,
        baseA: Math.random() * 0.5 + 0.25,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        color: c,
        trail: [] as { x: number; y: number; a: number }[],
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }

        p.trail.unshift({ x: p.x, y: p.y, a: 1 });
        if (p.trail.length > 8) p.trail.pop();

        for (let i = 0; i < p.trail.length; i++) {
          const t = p.trail[i];
          const frac = 1 - i / p.trail.length;
          t.a = frac * frac * p.baseA * 0.4;
        }

        p.phase += p.pulseSpeed;
        const pulse = Math.sin(p.phase) * 0.35 + 0.65;
        const alpha = p.baseA * pulse;

        for (let i = 1; i < p.trail.length; i++) {
          const t = p.trail[i];
          const prev = p.trail[i - 1];
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(t.x, t.y);
          ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${t.a * 0.5})`;
          ctx.lineWidth = p.r * 0.6;
          ctx.stroke();
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.35})`);
        grad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
        ctx.fill();
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
    />
  );
}
