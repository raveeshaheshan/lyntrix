import React, { useState, useEffect } from 'react';
import { ArrowUp, LayoutDashboard } from 'lucide-react';

const COLUMNS = [
  {
    title: 'Services',
    links: [
      ['Software Development', '#services'],
      ['Cloud Solutions', '#services'],
      ['Cybersecurity', '#services'],
      ['IT Consulting', '#services'],
      ['24/7 Managed IT', '#services'],
    ],
  },
  {
    title: 'Explore',
    links: [
      ['Solutions', '#solutions'],
      ['Case studies', '#case-studies'],
      ['Cost estimator', '#calculator'],
      ['Technology stack', '#tech-stack'],
      ['FAQ', '#faq'],
    ],
  },
];

export default function Footer({ isAdminLoggedIn, onOpenAdminDashboard }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const tick = () =>
      setTimeStr(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Colombo',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative z-10 border-t border-[var(--line)] bg-[#06070a]/80 backdrop-blur-sm">
      <div className="container-x pt-14 sm:pt-20 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-2 lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-[10px] bg-[var(--surface-2)] border border-white/10 p-1.5 grid place-items-center">
                <img src="/logo-icon.svg" alt="" className="w-full h-full object-contain" />
              </span>
              <span className="font-['Outfit'] font-semibold text-lg tracking-[0.08em] text-white">LYNTRIX</span>
            </div>
            <p className="text-sm text-[var(--muted)] max-w-sm leading-relaxed">
              Resilient custom software, high-concurrency cloud architecture and zero-trust security for modern organizations.
            </p>
            <div className="text-sm space-y-1.5">
              <a href="mailto:lyntrixtec@gmail.com" className="block text-[var(--text-2)] hover:text-white break-all">
                lyntrixtec@gmail.com
              </a>
              <a
                href="https://wa.me/94714557857"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--text-2)] hover:text-white"
              >
                +94 71 455 7857 · WhatsApp
              </a>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://github.com/raveeshaheshan/lyntrix.git"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
                aria-label="GitHub repository"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              {isAdminLoggedIn && (
                <button onClick={onOpenAdminDashboard} className="btn btn-ghost btn-sm">
                  <LayoutDashboard className="w-4 h-4 text-[var(--accent)]" /> Admin console
                </button>
              )}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} className="lg:col-span-2 lg:col-start-auto" aria-label={col.title}>
              <div className="label !text-white">{col.title}</div>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map(([name, href]) => (
                  <li key={name}>
                    <a href={href} className="text-[var(--muted)] hover:text-white transition-colors">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-3">
            <div className="label !text-white">Operations</div>
            <div className="mt-4 surface-2 p-4 text-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[var(--ok)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)]" /> SOC online
                </span>
                <span className="text-[var(--text-2)] font-mono text-xs">99.99%</span>
              </div>
              <div className="flex items-center justify-between text-[var(--muted)]">
                <span>HQ time</span>
                <span className="text-[var(--text)] font-mono text-xs tabular-nums">{timeStr || '--:--'} · Colombo</span>
              </div>
              <div className="flex items-center justify-between text-[var(--muted)]">
                <span>Incident SLA</span>
                <span className="text-[var(--text)] font-mono text-xs">&lt;15 min</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--line)] flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <p>© {new Date().getFullYear()} Lyntrix IT Services. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn btn-ghost btn-sm !min-h-[2.25rem]"
              aria-label="Back to top"
            >
              Top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
