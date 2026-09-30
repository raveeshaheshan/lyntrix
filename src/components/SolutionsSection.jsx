import React, { useState } from 'react';
import { Layers, Server, ShieldAlert, Cpu, Check, ArrowRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

const SOLUTIONS = [
  {
    title: 'High-Concurrency Enterprise SaaS',
    subtitle: 'Scalable cloud-native web architecture engineered for millions of active users.',
    icon: Layers,
    metrics: ['99.999% availability', 'Sub-50ms response', 'Auto-scaling pods'],
    architecture: [
      'React / Next.js micro-frontend architecture',
      'Node.js & Go high-throughput microservices',
      'PostgreSQL with Redis caching layer',
      'Global CDN & web application firewall (WAF)',
    ],
    highlights: 'Designed for enterprise tech brands needing high throughput and fault-tolerant infrastructure.',
  },
  {
    title: 'Multi-Cloud Infrastructure & FinOps',
    subtitle: 'Migrate, automate and reduce cloud expenditure without performance loss.',
    icon: Server,
    metrics: ['Up to 40% cost savings', 'Zero-downtime migration', 'Terraform IaC'],
    architecture: [
      'Automated multi-region AWS / Azure failover',
      'Kubernetes container clustering',
      'Terraform infrastructure-as-code declarations',
      'Datadog / Prometheus real-time telemetry',
    ],
    highlights: 'Transform legacy workloads into cloud-native auto-scaling environments.',
  },
  {
    title: 'Zero-Trust Defense & Managed SOC',
    subtitle: 'Continuous threat detection, automated isolation and audit readiness.',
    icon: ShieldAlert,
    metrics: ['SOC 2 & ISO 27001 ready', 'Real-time isolation', '<15 min incident SLA'],
    architecture: [
      'Identity-based zero-trust access control (mTLS)',
      'Continuous vulnerability scanning & pentesting',
      'Automated incident isolation pipelines',
      'Encrypted data vaults & audit trail storage',
    ],
    highlights: 'Protect high-value intellectual property and consumer data against advanced threats.',
  },
  {
    title: 'Enterprise AI & Automation',
    subtitle: 'Integrate LLMs, vector search and intelligent automation into business tools.',
    icon: Cpu,
    metrics: ['Vector DB retrieval', 'Custom fine-tuning', 'Automated workflows'],
    architecture: [
      'Private LLM deployment (Llama / Claude APIs)',
      'Pinecone / Qdrant vector search engine',
      'Custom business process automation connectors',
      'Data governance & privacy safeguards',
    ],
    highlights: 'Empower your workforce with custom AI assistants and automated data pipelines.',
  },
];

const TOPOLOGY = [
  ['Cloudflare CDN & WAF', 'Active'],
  ['Kubernetes cluster', 'Auto-scale'],
  ['Zero-trust identity', 'Enforced'],
  ['PostgreSQL & Redis', 'Synced'],
];

export default function SolutionsSection() {
  const [active, setActive] = useState(0);
  const current = SOLUTIONS[active];

  return (
    <section id="solutions" className="section section-tint">
      <div className="container-x">
        <SectionHeader index="02" label="Solutions" title="Architecture built for" accent="mission-critical scale.">
          Proven patterns from senior software and cloud engineers, adapted to your workload.
        </SectionHeader>

        <div role="tablist" aria-label="Solutions" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {SOLUTIONS.map((sol, idx) => {
            const Icon = sol.icon;
            const isActive = active === idx;
            return (
              <button
                key={sol.title}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(idx)}
                className={`surface-interactive text-left p-4 sm:p-5 rounded-[var(--radius)] border ${
                  isActive ? 'border-[var(--accent)] bg-[var(--accent-soft)]' : 'border-[var(--line)] bg-[var(--surface)]'
                }`}
              >
                <Icon className={`w-5 h-5 mb-3 ${isActive ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}`} />
                <div className="font-['Outfit'] font-medium text-[15px] text-white leading-snug">{sol.title}</div>
                <div className="text-xs text-[var(--muted)] mt-1.5 line-clamp-2 hidden sm:block">{sol.subtitle}</div>
              </button>
            );
          })}
        </div>

        <div key={current.title} className="surface fade-up grid lg:grid-cols-12">
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-7">
            <div>
              <span className="label">Featured architecture</span>
              <h3 className="h3 mt-2">{current.title}</h3>
              <p className="mt-3 text-[var(--text-2)] leading-relaxed">{current.subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {current.metrics.map((m) => (
                <span key={m} className="chip chip-accent">{m}</span>
              ))}
            </div>

            <div>
              <div className="label mb-3">Blueprint</div>
              <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {current.architecture.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3 text-sm text-[var(--text)]">
                    <Check className="w-4 h-4 mt-0.5 text-[var(--accent)] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-strong)] group">
              Book a technical deep-dive
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <aside className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[var(--line)] p-6 sm:p-10 bg-white/[0.015]">
            <div className="flex items-center justify-between">
              <span className="label">Reference topology</span>
            </div>
            <ol className="mt-5">
              {TOPOLOGY.map(([name, status], i) => (
                <li key={name}>
                  <div
                    className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border text-sm ${
                      i === 1 ? 'border-[var(--accent)]/40 bg-[var(--accent-soft)]' : 'border-[var(--line)] bg-[var(--surface-2)]'
                    }`}
                  >
                    <span className="text-white truncate">{name}</span>
                    <span className="text-[var(--ok)] text-xs font-mono shrink-0">{status}</span>
                  </div>
                  {i < TOPOLOGY.length - 1 && <div className="w-px h-4 bg-[var(--line-strong)] mx-auto" aria-hidden="true" />}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-[var(--text-2)] leading-relaxed">{current.highlights}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
