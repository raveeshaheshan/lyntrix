import React, { useState } from 'react';
import SectionHeader from './SectionHeader';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend & mobile' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'security', label: 'Security & data' },
];

const TECHNOLOGIES = [
  { name: 'React / Next.js', category: 'frontend', desc: 'High-performance UI and server-side rendering', badge: 'Primary' },
  { name: 'TypeScript', category: 'frontend', desc: 'Type-safe enterprise software architecture', badge: 'Standard' },
  { name: 'Tailwind CSS', category: 'frontend', desc: 'Modern responsive component styling', badge: 'Standard' },
  { name: 'React Native', category: 'frontend', desc: 'Cross-platform iOS and Android apps', badge: 'Mobile' },

  { name: 'Node.js / Express', category: 'backend', desc: 'Event-driven high-concurrency microservices', badge: 'Primary' },
  { name: 'Python / FastAPI', category: 'backend', desc: 'AI integration, data engineering and REST APIs', badge: 'Primary' },
  { name: 'Go', category: 'backend', desc: 'Ultra-low latency microservices and network systems', badge: 'High perf' },
  { name: 'GraphQL & REST', category: 'backend', desc: 'Flexible data querying and API gateways', badge: 'API' },

  { name: 'Amazon Web Services', category: 'cloud', desc: 'EC2, EKS, Lambda, S3, RDS, CloudFront', badge: 'Cloud' },
  { name: 'Microsoft Azure', category: 'cloud', desc: 'Azure DevOps, App Services and enterprise cloud', badge: 'Cloud' },
  { name: 'Docker & Kubernetes', category: 'cloud', desc: 'Containerization and resilient orchestration', badge: 'DevOps' },
  { name: 'Terraform', category: 'cloud', desc: 'Declarative infrastructure as code', badge: 'IaC' },

  { name: 'PostgreSQL & Redis', category: 'security', desc: 'Relational integrity and ultra-fast caching', badge: 'Database' },
  { name: 'Zero-Trust mTLS', category: 'security', desc: 'Mutual TLS and identity-bound network policies', badge: 'Security' },
  { name: 'Cloudflare Enterprise', category: 'security', desc: 'DDoS mitigation, WAF and edge routing', badge: 'Security' },
  { name: 'Pinecone / Qdrant', category: 'security', desc: 'Vector databases for AI semantic retrieval', badge: 'AI DB' },
];

export default function TechStackSection() {
  const [active, setActive] = useState('all');
  const list = active === 'all' ? TECHNOLOGIES : TECHNOLOGIES.filter((t) => t.category === active);

  return (
    <section id="tech-stack" className="section">
      <div className="container-x">
        <SectionHeader index="05" label="Stack" title="Battle-tested tools," accent="chosen deliberately.">
          Security-hardened open-source and enterprise frameworks, picked for the job, not the hype.
        </SectionHeader>

        <div role="tablist" aria-label="Technology categories" className="rail mb-8">
          {CATEGORIES.map((c) => (
            <button key={c.id} role="tab" aria-selected={active === c.id} onClick={() => setActive(c.id)} className="tab">
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {list.map((tech) => (
            <div key={tech.name} className="surface surface-interactive fade-up p-5 rounded-[var(--radius)]">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-['Outfit'] font-medium text-white text-base leading-snug">{tech.name}</h3>
                <span className="chip shrink-0">{tech.badge}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
