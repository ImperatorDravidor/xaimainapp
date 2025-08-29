"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface CanvasRevealEffectProps {
  containerClassName?: string;
  colors?: number[][];
  dotSize?: number;
  animationSpeed?: number;
}

export const CanvasRevealEffect = ({
  containerClassName,
  colors = [[255, 255, 255]],
  dotSize = 2,
  animationSpeed = 10,
}: CanvasRevealEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<
    {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: number[];
      size: number;
    }[]
  >([]);

  const initCanvas = () => {
    if (!containerRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const numberOfDots = Math.floor((width * height) / 5000);
    dotsRef.current = Array.from({ length: numberOfDots }, () => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const vx = (Math.random() - 0.5) * 2;
      const vy = (Math.random() - 0.5) * 2;
      const colorIndex = Math.floor(Math.random() * colors.length);
      const size = Math.random() * dotSize + dotSize / 2;

      return {
        x,
        y,
        vx,
        vy,
        color: colors[colorIndex],
        size,
      };
    });
  };

  const animate = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dotsRef.current.forEach((dot) => {
      dot.x += dot.vx;
      dot.y += dot.vy;

      if (dot.x < 0 || dot.x > canvas.width) {
        dot.vx = -dot.vx;
      }

      if (dot.y < 0 || dot.y > canvas.height) {
        dot.vy = -dot.vy;
      }

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${dot.color[0]}, ${dot.color[1]}, ${dot.color[2]}, 0.8)`;
      ctx.fill();
    });

    // Connect dots with lines based on proximity
    drawLines(ctx);

    requestAnimationFrame(animate);
  };

  const drawLines = (ctx: CanvasRenderingContext2D) => {
    const maxDistance = 100;
    const dots = dotsRef.current;

    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dot1 = dots[i];
        const dot2 = dots[j];
        const dx = dot1.x - dot2.x;
        const dy = dot1.y - dot2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          ctx.beginPath();
          ctx.moveTo(dot1.x, dot1.y);
          ctx.lineTo(dot2.x, dot2.y);
          const gradientColor = `rgba(${dot1.color[0]}, ${dot1.color[1]}, ${dot1.color[2]}, ${opacity * 0.5})`;
          ctx.strokeStyle = gradientColor;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  };

  useEffect(() => {
    initCanvas();
    animate();

    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full", containerClassName)}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}; 