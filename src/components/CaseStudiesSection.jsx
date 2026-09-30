import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Check, X } from 'lucide-react';
import SectionHeader from './SectionHeader';

const CASE_STUDIES = [
  {
    id: 'finpulse',
    client: 'FinPulse Pay Inc.',
    category: 'Fintech',
    title: 'Scaling payment infrastructure to 15,000 req/sec',
    summary: 'A fault-tolerant micro-frontend and distributed Node.js/Go payment gateway with sub-20ms latency.',
    impact: ['15,000+ req/sec', '<20ms global latency', '99.999% availability'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    fullStory: {
      challenge: 'FinPulse Pay experienced severe latency spikes during peak transaction hours, causing gateway timeouts and revenue loss.',
      solution: 'Lyntrix redesigned their payment pipeline using Go microservices with Redis caching, PostgreSQL read-replicas, and Cloudflare Enterprise WAF.',
      results: [
        'Reduced payment checkout latency from 450ms to 18ms.',
        'Zero-downtime deployment pipeline handling $40M+ monthly throughput.',
        'Achieved 100% PCI-DSS Level 1 compliance.',
      ],
      quote: 'Lyntrix transformed our fragile legacy gateway into a high-concurrency powerhouse. Unmatched engineering depth.',
      author: 'David Rajapakse, Head of Engineering, FinPulse Pay',
    },
  },
  {
    id: 'aerocloud',
    client: 'AeroCloud Systems',
    category: 'Cloud & FinOps',
    title: 'Multi-region Kubernetes cloud migration',
    summary: 'Migrated 40+ monolithic services to multi-region AWS EKS with Terraform IaC, cutting cloud spend by 38%.',
    impact: ['38% cloud spend saved', '40+ services migrated', 'Zero downtime'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    fullStory: {
      challenge: 'Uncontrolled cloud spending and legacy virtual machine sprawl led to bloated AWS bills and slow feature delivery.',
      solution: 'Automated infrastructure declaratively using Terraform IaC, containerized application workloads into Kubernetes clusters, and enabled auto-scaling spot instances.',
      results: [
        'Slashed monthly cloud bill from $62,000 to $38,400.',
        'Reduced deployment time from 4 hours to 6 minutes.',
        'Automated multi-region failover across N. Virginia and Frankfurt.',
      ],
      quote: 'The FinOps audit and Kubernetes migration delivered immediate ROI while doubling our development velocity.',
      author: 'Marcus Vance, VP of Technology, AeroCloud',
    },
  },
  {
    id: 'omnihealth',
    client: 'OmniHealth Global',
    category: 'Healthcare & Security',
    title: 'HIPAA & SOC 2 Type II certified telehealth shield',
    summary: 'Identity-first zero-trust mTLS architecture and automated SOC threat mitigation for a patient portal.',
    impact: ['SOC 2 Type II certified', 'Zero security incidents', '100% HIPAA compliant'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    fullStory: {
      challenge: 'OmniHealth required strict security verification to achieve SOC 2 Type II compliance ahead of institutional investor audit.',
      solution: 'Deployed identity-bound zero-trust network policies, encrypted telemetry storage in AWS S3 KMS, and continuous vulnerability scanning.',
      results: [
        'Passed SOC 2 Type II audit on first evaluation with zero exceptions.',
        'Secured 1.2M patient records with end-to-end AES-256 encryption.',
        'Established 24/7 automated SOC alerting with <10 min SLA.',
      ],
      quote: 'Lyntrix made security compliance effortless. Their engineers understand both security and business urgency.',
      author: 'Dr. Sarah Lin, Chief Information Officer, OmniHealth',
    },
  },
];

function CaseModal({ study, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const { fullStory: f } = study;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={study.title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fade-up w-full sm:max-w-2xl max-h-[92dvh] overflow-y-auto overscroll-contain bg-[var(--surface)] border border-[var(--line-strong)] rounded-t-[var(--radius-lg)] sm:rounded-[var(--radius-lg)]"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-5 sm:p-6 bg-[var(--surface)]/95 backdrop-blur border-b border-[var(--line)]">
          <div className="min-w-0">
            <div className="label">{study.client} · {study.category}</div>
            <h3 className="h3 mt-2">{study.title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 -mr-2 -mt-1 grid place-items-center rounded-xl text-[var(--muted)] hover:text-white hover:bg-white/5 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6 text-sm leading-relaxed">
          <div>
            <div className="label text-[var(--danger)]">The challenge</div>
            <p className="mt-2 text-[var(--text-2)]">{f.challenge}</p>
          </div>
          <div>
            <div className="label text-[var(--accent)]">The solution</div>
            <p className="mt-2 text-[var(--text-2)]">{f.solution}</p>
          </div>
          <div>
            <div className="label text-[var(--ok)]">Results</div>
            <ul className="mt-3 space-y-2.5">
              {f.results.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-[var(--text)]">
                  <Check className="w-4 h-4 mt-0.5 text-[var(--ok)] shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <figure className="border-l-2 border-[var(--accent)] pl-4">
            <blockquote className="text-[var(--text)] italic">“{f.quote}”</blockquote>
            <figcaption className="mt-2 text-xs text-[var(--muted)]">{f.author}</figcaption>
          </figure>
        </div>

        <div className="p-5 sm:p-6 pt-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <button onClick={onClose} className="btn btn-ghost">Close</button>
          <a href="#contact" onClick={onClose} className="btn btn-primary">
            Discuss a similar project <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function CaseStudiesSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="case-studies" className="section">
      <div className="container-x">
        <SectionHeader index="03" label="Case studies" title="Proven results," accent="measured in production.">
          How we help organizations overcome complex technical challenges and scale without drama.
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {CASE_STUDIES.map((cs) => (
            <article
              key={cs.id}
              className="surface surface-interactive overflow-hidden flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-2)]">
                <img
                  src={cs.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 chip bg-black/60 backdrop-blur">{cs.category}</span>
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="label">{cs.client}</div>
                <h3 className="font-['Outfit'] text-xl font-semibold text-white leading-snug mt-2">{cs.title}</h3>
                <p className="mt-3 text-sm text-[var(--text-2)] leading-relaxed">{cs.summary}</p>

                <ul className="mt-5 space-y-1.5">
                  {cs.impact.map((imp) => (
                    <li key={imp} className="flex items-center gap-2 text-sm text-[var(--text)]">
                      <span className="w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                      {imp}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <button
                    onClick={() => setSelected(cs)}
                    className="w-full pt-5 border-t border-[var(--line)] flex items-center justify-between text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-strong)]"
                  >
                    Read the full story
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && <CaseModal study={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
