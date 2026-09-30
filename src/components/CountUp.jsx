import React, { useEffect, useRef, useState } from 'react';

/** Counts from 0 to `to` the first time it scrolls into view. Renders the final value if motion is reduced. */
export default function CountUp({ to, decimals = 0, prefix = '', suffix = '', duration = 1400 }) {
  const ref = useRef(null);
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    let raf = 0;
    let started = false;
    const run = () => {
      // wait for the intro overlay to clear so the animation is actually seen
      const delay = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--intro')) * 1000 || 0;
      const t0 = performance.now() + delay;
      const step = (now) => {
        const p = Math.min(Math.max((now - t0) / duration, 0), 1);
        setValue(to * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
