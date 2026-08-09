import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

export const CyberneticGlobeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse coordinates for tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let rotationX = 0;
    let rotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetRotationY = (x / width) * 1.2;
      targetRotationX = (-y / height) * 1.2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 3D Sphere Particle Points Generator
    const radius = Math.min(width, height) * 0.32;
    const count = 380;
    const points: Array<{ x: number; y: number; z: number; baseR: number }> = [];

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      points.push({ x, y, z, baseR: radius });
    }

    let globalRotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth inertia interpolation
      rotationX += (targetRotationX - rotationX) * 0.05;
      rotationY += (targetRotationY - rotationY) * 0.05;
      globalRotation += 0.003;

      const currentAngleY = rotationY + globalRotation;
      const currentAngleX = rotationX;

      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);
      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);

      // Theme aware point & grid colors
      const isDark = document.documentElement.classList.contains("dark");
      const basePointColor = isDark ? "244, 244, 243" : "28, 29, 32";
      const lineGridColor = isDark ? "255, 255, 255" : "28, 29, 32";

      const projectedPoints: Array<{ x: number; y: number; z: number; scale: number; alpha: number }> = [];

      // Project 3D points to 2D canvas space
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Perspective scale factor
        const fov = 400;
        const scale = fov / (fov + z2 + radius);
        const projectedX = width / 2 + x1 * scale;
        const projectedY = height / 2 + y2 * scale;
        const alpha = Math.max(0.1, Math.min(1, (z2 + radius) / (2 * radius)));

        projectedPoints.push({ x: projectedX, y: projectedY, z: z2, scale, alpha });
      }

      // Draw interconnecting grid lines for close neighbor nodes
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedPoints.length; i += 4) {
        const p1 = projectedPoints[i];
        for (let j = i + 1; j < projectedPoints.length; j += 6) {
          const p2 = projectedPoints[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 42 && p1.z > -radius * 0.5 && p2.z > -radius * 0.5) {
            const lineAlpha = (1 - dist / 42) * 0.15 * p1.alpha;
            ctx.strokeStyle = `rgba(${lineGridColor}, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes
      for (let i = 0; i < projectedPoints.length; i++) {
        const p = projectedPoints[i];
        const pointSize = Math.max(0.8, 1.8 * p.scale);

        // Highlight every 12th node with royal blue glowing accent
        const isAccent = i % 12 === 0;

        ctx.fillStyle = isAccent
          ? `rgba(69, 92, 233, ${p.alpha * 0.9})`
          : `rgba(${basePointColor}, ${p.alpha * 0.65})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, pointSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Orbiting Equatorial Ring
      ctx.strokeStyle = `rgba(69, 92, 233, 0.25)`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(
        width / 2,
        height / 2,
        radius * 1.35,
        radius * 0.45,
        rotationY * 0.5,
        0,
        Math.PI * 2
      );
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-contain pointer-events-none"
      style={{ touchAction: "none" }}
    />
  );
};

export default CyberneticGlobeCanvas;
