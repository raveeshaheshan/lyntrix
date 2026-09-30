import React from 'react';
import SectionHeader from './SectionHeader';

const REVIEWS = [
  {
    name: 'Marcus Vance',
    role: 'VP of Technology',
    company: 'AeroCloud Systems',
    text: 'Lyntrix completely modernized our cloud infrastructure. We migrated 40+ microservices to Kubernetes with zero downtime and reduced cloud costs by 38%.',
    highlight: '38% cloud savings',
  },
  {
    name: 'Dr. Sarah Lin',
    role: 'Chief Information Officer',
    company: 'OmniHealth Global',
    text: 'Their zero-trust security audit and managed SOC deployment gave us the exact audit readiness we needed for SOC 2 Type II compliance in record time.',
    highlight: 'SOC 2 ready',
  },
  {
    name: 'David Rajapakse',
    role: 'Head of Engineering',
    company: 'FinPulse Pay',
    text: 'The Lyntrix team built our high-concurrency payment gateway handling 15,000+ requests/sec with under 25ms latency. Exceptional software craftsmanship.',
    highlight: '15k req/sec',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeader index="07" label="Clients" title="Trusted by" accent="engineering leaders.">
          How we help technology teams ship faster and operate securely.
        </SectionHeader>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="surface p-6 sm:p-8 flex flex-col">
              <span className="chip chip-accent self-start">{r.highlight}</span>
              <blockquote className="mt-5 text-[var(--text)] leading-relaxed flex-1">“{r.text}”</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-[var(--line)] flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[var(--surface-2)] border border-[var(--line-strong)] grid place-items-center font-['Outfit'] font-semibold text-[var(--accent)] shrink-0">
                  {r.name.charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block font-medium text-white text-sm">{r.name}</span>
                  <span className="block text-xs text-[var(--muted)]">{r.role}, {r.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
