import React from 'react';

/** Shared section heading: numbered eyebrow, title with one accent phrase, optional lead. */
export default function SectionHeader({ index, label, title, accent, children, align = 'left' }) {
  return (
    <header className={`mb-10 sm:mb-14 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <div className={`eyebrow ${align === 'center' ? 'justify-center' : ''}`}>
        {index && <span className="idx">{index}</span>}
        <span className="rule" aria-hidden="true" />
        <span>{label}</span>
      </div>
      <h2 className="h2 mt-4">
        {title} {accent && <span className="accent">{accent}</span>}
      </h2>
      {children && <p className={`lead mt-4 ${align === 'center' ? 'mx-auto' : ''}`}>{children}</p>}
    </header>
  );
}
