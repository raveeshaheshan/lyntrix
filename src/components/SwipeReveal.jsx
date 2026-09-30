import React, { useEffect, useRef, useState } from 'react';

/**
 * Fades a block in once as it scrolls into view.
 * After the reveal the transform is removed entirely: a lingering `transform`
 * turns the wrapper into the containing block for descendants, which breaks
 * `position: fixed` modals and `position: sticky` panels inside it.
 */
export default function SwipeReveal({ children, className = '', delay = 0 }) {
  const [state, setState] = useState('hidden'); // hidden -> shown -> done
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setState('done');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown');
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style =
    state === 'done'
      ? undefined
      : {
          opacity: state === 'shown' ? 1 : 0,
          transform: state === 'shown' ? 'translate3d(0,0,0)' : 'translate3d(0,20px,0)',
          transition: `opacity 0.6s var(--ease) ${delay}ms, transform 0.6s var(--ease) ${delay}ms`,
        };

  return (
    <div
      ref={ref}
      style={style}
      onTransitionEnd={(e) => {
        if (e.target === ref.current && e.propertyName === 'transform') setState('done');
      }}
      className={className}
    >
      {children}
    </div>
  );
}
