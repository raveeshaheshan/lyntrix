import React from 'react';
import { ArrowRight, Calculator, Check } from 'lucide-react';
import LatencyWidget from './LatencyWidget';
import CountUp from './CountUp';

const STATS = [
  { to: 250, suffix: '+', label: 'Enterprise projects' },
  { to: 99.99, decimals: 2, suffix: '%', label: 'Uptime SLA target' },
  { to: 15, prefix: '<', suffix: ' min', label: 'Critical incident response' },
  { to: 100, suffix: '%', label: 'Compliance guarantee' },
];

// Staggered entrance: each element gets its own delay, offset by the intro overlay in CSS
const d = (n) => ({ '--d': `${n * 0.09}s` });

const PROOF = ['ISO 27001 aligned', '24/7 managed SOC', 'You own all source code'];

export default function Hero({ onOpenCalculator, onOpenTracker }) {
  return (
    <section id="hero-section" className="relative pt-32 sm:pt-40 pb-16 sm:pb-24">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" aria-hidden="true" />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="eyebrow hero-in" style={d(0)}>
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--ok)] opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--ok)]" />
              </span>
              <span>Innovate · Integrate · Elevate</span>
            </div>

            <h1 className="h1 mt-5 hero-in" style={d(1)}>
              Engineering the systems
              <br className="hidden sm:block" /> modern business{' '}
              <span className="accent-shimmer">runs on.</span>
            </h1>

            <p className="lead mt-6 hero-in" style={d(2)}>
              Resilient custom software, high-concurrency cloud architecture and zero-trust
              security, built and operated by senior engineers.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 hero-in" style={d(3)}>
              <a href="#contact" className="btn btn-primary btn-shine">
                Schedule an architecture audit
                <ArrowRight className="w-4 h-4" />
              </a>
              <button onClick={onOpenCalculator} className="btn btn-ghost">
                <Calculator className="w-4 h-4 text-[var(--accent)]" />
                Estimate your project
              </button>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--text-2)] hero-in" style={d(4)}>
              {PROOF.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--ok)] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 hero-in" style={d(3)}>
            <LatencyWidget onOpenTracker={onOpenTracker} />
          </div>
        </div>

        <dl className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 border border-[var(--line)] rounded-[var(--radius-lg)] bg-[var(--surface)] overflow-hidden hero-in" style={d(6)}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`p-5 sm:p-6 ${i % 2 === 1 ? 'border-l' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''} ${
                i > 0 ? 'lg:border-l' : ''
              } border-[var(--line)]`}
            >
              <dd className="stat">
                <CountUp to={s.to} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 text-xs sm:text-sm text-[var(--muted)]">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
