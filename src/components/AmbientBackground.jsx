import React, { useEffect, useRef } from 'react';

/**
 * Ambient page backdrop:
 *  - three slow-drifting aurora blobs (pure CSS, compositor-only)
 *  - a constellation of nodes that link when close, with soft pointer attraction
 * Cheap by design: DPR capped at 2, node count scales with viewport area,
 * pauses when the tab is hidden, static under prefers-reduced-motion.
 */
export default function AmbientBackground({ intensity = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes = [];
    let raf = 0;
    let running = true;
    const pointer = { x: -9999, y: -9999, active: false };

    const LINK = 130;
    const ACCENT = '56,189,248';
    const VIOLET = '129,140,248';

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(90, Math.max(22, (w * h) / 17000)) * intensity);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.3 + 0.5,
        tint: Math.random() > 0.7 ? VIOLET : ACCENT,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20;
          else if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          else if (n.y > h + 20) n.y = -20;

          if (pointer.active) {
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 22000 && d2 > 1) {
              const f = (1 - d2 / 22000) * 0.012;
              n.x += dx * f;
              n.y += dy * f;
            }
          }
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.16;
            ctx.strokeStyle = `rgba(${a.tint},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const twinkle = reduced ? 0.7 : 0.55 + 0.35 * Math.sin(t * 0.0012 + n.phase);
        ctx.fillStyle = `rgba(${n.tint},${twinkle})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t) => {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reduced) raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(raf);
    };
    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => { pointer.active = false; };
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { build(); if (reduced) draw(0); }, 150);
    };

    build();
    if (reduced) draw(0);
    else raf = requestAnimationFrame(loop);

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [intensity]);

  return (
    <div className="ambient" aria-hidden="true">
      <span className="ambient-blob ambient-blob-a" />
      <span className="ambient-blob ambient-blob-b" />
      <span className="ambient-blob ambient-blob-c" />
      <canvas ref={canvasRef} className="ambient-canvas" />
      <span className="ambient-vignette" />
    </div>
  );
}
