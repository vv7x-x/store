"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: Star[] = Array.from({ length: 280 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.3,
      opacity: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    let animFrame: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;

      // Nebula blobs
      const nebulaData = [
        { x: canvas.width * 0.15, y: canvas.height * 0.1, r: 340, color: "rgba(124,58,237,0.04)" },
        { x: canvas.width * 0.8, y: canvas.height * 0.15, r: 280, color: "rgba(168,85,247,0.05)" },
        { x: canvas.width * 0.5, y: canvas.height * 0.4, r: 420, color: "rgba(45,27,105,0.06)" },
        { x: canvas.width * 0.1, y: canvas.height * 0.6, r: 300, color: "rgba(124,58,237,0.03)" },
        { x: canvas.width * 0.9, y: canvas.height * 0.7, r: 380, color: "rgba(76,29,149,0.05)" },
      ];

      nebulaData.forEach((n) => {
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        gradient.addColorStop(0, n.color);
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Stars
      stars.forEach((star) => {
        const twinkle =
          0.4 +
          0.6 * Math.abs(Math.sin(t * star.twinkleSpeed * 60 + star.twinkleOffset));
        const finalOpacity = star.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

        // Color variation
        const hue = Math.floor(star.x / canvas.width * 60) + 220;
        ctx.fillStyle = `hsla(${hue}, 70%, 90%, ${finalOpacity})`;
        ctx.fill();

        // Glow for bigger stars
        if (star.size > 1.5) {
          const glow = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 4
          );
          glow.addColorStop(0, `hsla(${hue}, 80%, 95%, ${finalOpacity * 0.6})`);
          glow.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      });

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
