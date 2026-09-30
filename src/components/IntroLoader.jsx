import React, { useEffect, useState } from 'react';

const KEY = 'lyntrix-intro-seen';
const DURATION = 1900; // ms of the loading sequence
const EXIT = 800; // ms of the exit transition

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Intro plays once per browser session. Evaluated at import so the hero can time its entrance. */
const shouldPlay = (() => {
  try {
    return !reduced() && !sessionStorage.getItem(KEY);
  } catch {
    return !reduced();
  }
})();

if (typeof document !== 'undefined') {
  document.documentElement.style.setProperty('--intro', shouldPlay ? `${(DURATION + 250) / 1000}s` : '0s');
}

const LETTERS = 'LYNTRIX'.split('');

export default function IntroLoader() {
  const [phase, setPhase] = useState(shouldPlay ? 'loading' : 'done'); // loading -> exiting -> done
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase === 'done') return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let raf = 0;
    let exitTimer;
    const start = performance.now();
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    let fontsDone = false;
    fontsReady.then(() => { fontsDone = true; });

    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1);
      // ease-in-out so the counter lingers a beat near the end
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      // hold at 99 until webfonts are ready so the hero never swaps fonts under the reveal
      setProgress(Math.round(eased * (t >= 1 && !fontsDone ? 99 : 100)));

      if (t < 1 || !fontsDone) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase('exiting');
        try { sessionStorage.setItem(KEY, '1'); } catch { /* private mode */ }
        exitTimer = setTimeout(() => setPhase('done'), EXIT);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (phase === 'done') document.body.style.overflow = '';
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div className={`intro ${phase === 'exiting' ? 'intro-exit' : ''}`} role="status" aria-label="Loading Lyntrix">
      <span className="intro-glow" aria-hidden="true" />
      <span className="intro-grid" aria-hidden="true" />

      <div className="intro-center">
        <div className="intro-mark">
          <svg viewBox="0 0 120 120" className="intro-ring" aria-hidden="true">
            <circle cx="60" cy="60" r="54" className="intro-ring-track" />
            <circle cx="60" cy="60" r="54" className="intro-ring-draw" />
          </svg>
          <img src="/logo-icon.svg" alt="" className="intro-logo" />
        </div>

        <div className="intro-word" aria-hidden="true">
          {LETTERS.map((ch, i) => (
            <span key={i} style={{ animationDelay: `${0.35 + i * 0.07}s` }}>{ch}</span>
          ))}
        </div>
        <div className="intro-tag">Innovate · Integrate · Elevate</div>
      </div>

      <div className="intro-foot">
        <span className="intro-pct tabular-nums">{String(progress).padStart(3, '0')}</span>
        <span className="intro-bar"><span style={{ transform: `scaleX(${progress / 100})` }} /></span>
        <span className="intro-note">Initializing secure environment</span>
      </div>
    </div>
  );
}
