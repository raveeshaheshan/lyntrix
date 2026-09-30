import React, { useState } from 'react';
import { Code2, Cloud, Shield, Compass, Headphones, ArrowRight, Check } from 'lucide-react';
import SectionHeader from './SectionHeader';

const SERVICES = [
  {
    id: 'software',
    icon: Code2,
    title: 'Software Development',
    badge: 'Core competency',
    description: 'We build enterprise-grade software engineered for high concurrency, security and effortless maintainability, on modern stacks.',
    deliverables: [
      'Custom web & mobile app development',
      'Microservice & REST/GraphQL API design',
      'SaaS product development',
      'Legacy code modernization & refactoring',
    ],
    tech: ['React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Solutions',
    badge: 'AWS / Azure / GCP',
    description: 'Streamline operations with auto-scaling multi-cloud architecture, infrastructure as code and zero-downtime deployment pipelines.',
    deliverables: [
      'AWS & Azure cloud migration',
      'Kubernetes & container orchestration',
      'Infrastructure as code (Terraform)',
      'Cloud cost optimization & FinOps audit',
    ],
    tech: ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'Docker', 'GitHub Actions'],
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Cybersecurity',
    badge: 'Zero-trust defense',
    description: 'Protect enterprise data and customer trust with continuous penetration testing, SOC monitoring and zero-trust access policies.',
    deliverables: [
      'Penetration testing & security audits',
      'Zero-trust architecture implementation',
      'ISO 27001 & SOC 2 compliance preparation',
      'Real-time threat monitoring & incident response',
    ],
    tech: ['SIEM', 'Cloudflare Enterprise', 'SentinelOne', 'Vault', 'OAuth2/OIDC', 'TLS 1.3'],
  },
  {
    id: 'consulting',
    icon: Compass,
    title: 'IT Consulting',
    badge: 'Strategic advisory',
    description: 'Align technology investment with business objectives. Senior architects advise on technology selection, scalable systems and digital transformation.',
    deliverables: [
      'Digital transformation roadmaps',
      'Enterprise architecture design',
      'Technology stack optimization',
      'Fractional CTO advisory',
    ],
    tech: ['TOGAF', 'Agile/Scrum', 'System architecture', 'FinOps', 'Data strategy'],
  },
  {
    id: 'support',
    icon: Headphones,
    title: 'Support & Maintenance',
    badge: '24/7 managed IT',
    description: 'Dedicated engineers monitor your infrastructure, manage updates and respond to incidents in minutes, protecting 99.99% uptime.',
    deliverables: [
      '24/7 monitoring & automated alerting',
      'Database optimization & backups',
      'SLA-backed incident resolution',
      'Patch management & security updates',
    ],
    tech: ['Prometheus', 'Grafana', 'PagerDuty', 'Datadog', 'Backup vaults'],
  },
];

const SLA = [
  ['Deployment', 'Zero downtime'],
  ['Security standard', 'SOC 2 / ISO ready'],
  ['Response target', '< 15 minutes'],
  ['Engineering', 'Assigned lead'],
];

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = SERVICES[activeTab];
  const Icon = current.icon;

  return (
    <section id="services" className="section">
      <div className="container-x">
        <SectionHeader index="01" label="Services" title="Everything your stack needs," accent="under one team.">
          End-to-end engineering across software, cloud, security and operations, built for reliability and steady growth.
        </SectionHeader>

        <div role="tablist" aria-label="Services" className="rail mb-6 sm:mb-8">
          {SERVICES.map((s, idx) => {
            const TabIcon = s.icon;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={activeTab === idx}
                onClick={() => setActiveTab(idx)}
                className="tab"
              >
                <TabIcon className="w-4 h-4" />
                {s.title}
              </button>
            );
          })}
        </div>

        <div key={current.id} className="surface fade-up grid lg:grid-cols-12">
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-8">
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] grid place-items-center shrink-0">
                <Icon className="w-5 h-5" />
              </span>
              <div>
                <span className="chip">{current.badge}</span>
                <h3 className="h3 mt-2">{current.title}</h3>
              </div>
            </div>

            <p className="text-[var(--text-2)] leading-relaxed">{current.description}</p>

            <div>
              <div className="label mb-3">Deliverables</div>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {current.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--text)]">
                    <Check className="w-4 h-4 mt-0.5 text-[var(--accent)] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="label mb-3">Built with</div>
              <div className="flex flex-wrap gap-2">
                {current.tech.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>

            <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-strong)] group">
              Request a {current.title.toLowerCase()} proposal
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <aside className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[var(--line)] p-6 sm:p-10 bg-white/[0.015]">
            <div className="flex items-center justify-between">
              <span className="label">Service level</span>
              <span className="flex items-center gap-2 text-xs text-[var(--ok)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)]" /> Guaranteed
              </span>
            </div>
            <dl className="mt-4 divide-y divide-[var(--line)] text-sm">
              {SLA.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="text-[var(--muted)]">{k}</dt>
                  <dd className="text-[var(--text)] font-medium text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-[var(--text-2)] leading-relaxed">
              Every engagement includes an architecture review and dedicated post-deployment support.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
