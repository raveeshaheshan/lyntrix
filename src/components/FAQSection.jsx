import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import SectionHeader from './SectionHeader';

const CATEGORIES = [
  { id: 'engagement', label: 'Engagement' },
  { id: 'security', label: 'Security & compliance' },
  { id: 'cloud', label: 'Cloud & SLAs' },
];

const FAQS = {
  engagement: [
    {
      q: 'Who owns the intellectual property of the software developed?',
      a: 'You retain 100% legal ownership of all source code, architecture blueprints, database schemas and intellectual property. On completion, all repositories are handed over with zero lock-in.',
    },
    {
      q: 'How fast can a senior engineering team be onboarded?',
      a: 'We start discovery sessions within 48 hours of proposal approval. Dedicated engineering pods typically begin sprint development within 5 to 7 business days.',
    },
    {
      q: 'What is your billing structure and contract terms?',
      a: 'Fixed-scope milestone billing for project deliverables, or monthly dedicated-team retainers. All pricing is transparent with zero hidden fees.',
    },
  ],
  security: [
    {
      q: 'How do you ensure SOC 2 and ISO 27001 readiness?',
      a: 'Our code follows OWASP Top 10, identity-bound zero-trust mTLS access controls, encrypted data vaults (AWS KMS / HashiCorp Vault) and continuous vulnerability pentesting.',
    },
    {
      q: 'Do you sign NDAs before discovery?',
      a: 'Yes. We provide a standard mutual NDA before reviewing any proprietary architecture or business data.',
    },
    {
      q: 'How are backups and customer data protected?',
      a: 'Data in transit uses TLS 1.3 and data at rest uses AES-256. Backups are snapshotted automatically with multi-region failover redundancy.',
    },
  ],
  cloud: [
    {
      q: 'What uptime SLA do you guarantee?',
      a: 'A 99.99% availability target for managed cloud environments, supported by Kubernetes auto-scaling and 24/7 SOC monitoring.',
    },
    {
      q: 'What happens if a critical incident occurs?',
      a: 'Our managed IT and SOC team responds in under 15 minutes. Automated PagerDuty escalation alerts the assigned senior leads immediately.',
    },
    {
      q: 'Can you help reduce existing cloud spend (FinOps)?',
      a: 'Yes. A FinOps audit analyzes AWS/Azure infrastructure, finds underutilized instances and introduces containerization, typically reducing cost by 25% to 40%.',
    },
  ],
};

export default function FAQSection() {
  const [category, setCategory] = useState('engagement');
  const [openIndex, setOpenIndex] = useState(0);
  const items = FAQS[category] || FAQS.engagement;

  return (
    <section id="faq" className="section section-tint">
      <div className="container-x max-w-4xl">
        <SectionHeader index="08" label="FAQ" title="Frequently asked" accent="questions.">
          Engineering standards, IP ownership and SLAs, answered plainly.
        </SectionHeader>

        <div role="tablist" aria-label="FAQ categories" className="rail mb-6">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={category === c.id}
              onClick={() => { setCategory(c.id); setOpenIndex(0); }}
              className="tab"
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="surface divide-y divide-[var(--line)] overflow-hidden">
          {items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-5 sm:px-7 py-5 text-left flex items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-['Outfit'] font-medium text-white text-base sm:text-lg leading-snug">{faq.q}</span>
                  <Plus className={`w-5 h-5 shrink-0 text-[var(--muted)] transition-transform duration-300 ${isOpen ? 'rotate-45 text-[var(--accent)]' : ''}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-7 pb-6 text-[var(--text-2)] leading-relaxed max-w-3xl">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
