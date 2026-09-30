import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, Search } from 'lucide-react';

const ROWS = [
  { label: 'Edge node', value: 'Colombo, LK' },
  { label: 'Transport', value: 'TLS 1.3 · AES-256' },
  { label: 'Access model', value: 'Zero-trust' },
];

export default function LatencyWidget({ onOpenTracker }) {
  const [latency, setLatency] = useState(12);
  const [testing, setTesting] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  const runTest = () => {
    if (testing) return;
    setTesting(true);
    let count = 0;
    timer.current = setInterval(() => {
      setLatency(Math.floor(8 + Math.random() * 10));
      count += 1;
      if (count >= 5) {
        clearInterval(timer.current);
        setTesting(false);
      }
    }, 150);
  };

  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--line)]">
        <span className="label">Live platform status</span>
        <span className="flex items-center gap-2 text-xs text-[var(--ok)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--ok)] opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--ok)]" />
          </span>
          Operational
        </span>
      </div>

      <div className="px-5 py-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="label">Ping</div>
            <div className="stat mt-2 tabular-nums">
              {latency}
              <span className="text-base text-[var(--muted)] ml-1">ms</span>
            </div>
          </div>
          <button onClick={runTest} disabled={testing} className="btn btn-ghost btn-sm">
            <RefreshCw className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
            {testing ? 'Testing…' : 'Run test'}
          </button>
        </div>

        <dl className="mt-6 divide-y divide-[var(--line)] text-sm">
          {ROWS.map((r) => (
            <div key={r.label} className="flex items-center justify-between gap-4 py-3">
              <dt className="text-[var(--muted)]">{r.label}</dt>
              <dd className="text-[var(--text)] font-mono text-[13px] text-right">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {onOpenTracker && (
        <button
          onClick={onOpenTracker}
          className="w-full flex items-center justify-between px-5 py-4 border-t border-[var(--line)] text-sm text-[var(--text-2)] hover:text-white hover:bg-white/[0.03] transition-colors"
        >
          <span className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[var(--accent)]" />
            Track an existing project
          </span>
          <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  );
}
