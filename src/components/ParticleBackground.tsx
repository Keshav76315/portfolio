import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  alpha: number;
  vy: number;
  vanishRate: number;
  life: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const particles: Particle[] = [];
    const MAX_PARTICLES = Math.floor(window.innerWidth / 80);

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const createParticle = (): Particle => ({
      x: rand(0, width),
      y: rand(0, height),
      r: rand(4, 20),
      alpha: rand(0.02, 0.08),
      vy: rand(0.03, 0.15),
      vanishRate: rand(0.0004, 0.002),
      life: rand(300, 3000),
    });

    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push(createParticle());
    }

    let raf: number;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += Math.sin(p.life * 0.0003) * 0.4;
        p.y += p.vy;
        p.alpha -= p.vanishRate;
        p.life -= 1;

        if (p.alpha <= 0 || p.y < -50 || p.life <= 0) {
          particles[i] = createParticle();
          continue;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(100, 130, 180, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
