import React from 'react';
import { Award, Users, Zap, Check } from 'lucide-react';

const PILLARS = [
  { icon: Zap, title: 'Innovate', text: 'AI, cloud-native architecture and zero-trust standards.' },
  { icon: Users, title: 'Integrate', text: 'Legacy systems harmonized with automated cloud pipelines.' },
  { icon: Award, title: 'Elevate', text: '99.99% uptime, rapid SOC response and business growth.' },
];

const PROMISES = [
  'A senior engineering lead assigned to every enterprise engagement.',
  'Strict adherence to OWASP Top 10 and data compliance standards.',
  'Transparent billing, zero hidden fees and clear SLA contracts.',
];

export default function AboutSection() {
  return (
    <section id="about" className="section section-tint">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 max-w-sm sm:max-w-md mx-auto lg:max-w-none w-full">
            <div className="surface p-3 sm:p-4">
              <div className="relative rounded-[calc(var(--radius-lg)-8px)] overflow-hidden bg-[#05060a] aspect-square grid place-items-center">
                <img
                  src="/logo.jpg"
                  alt="Lyntrix Technologies emblem"
                  loading="lazy"
                  className="w-full h-full object-contain p-6 sm:p-8"
                />
                <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4 px-4 py-3 rounded-xl bg-black/60 backdrop-blur border border-white/10 text-center">
                  <div className="label !text-[var(--accent)]">Lyntrix Technologies</div>
                  <div className="text-xs text-[var(--text-2)] mt-1">Smart solutions. Stronger tomorrow.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="eyebrow">
              <span className="idx">06</span>
              <span className="rule" aria-hidden="true" />
              <span>About</span>
            </div>
            <h2 className="h2 mt-4">
              Architecting digital resilience and <span className="accent">technological growth.</span>
            </h2>
            <p className="lead mt-5">
              <strong className="text-white font-semibold">Lyntrix IT Services</strong> engineers robust, secure,
              future-proof software and infrastructure for organizations navigating digital transformation. We bridge
              complex engineering with effortless user experiences.
            </p>

            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              {PILLARS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="surface-2 p-4">
                  <Icon className="w-5 h-5 text-[var(--accent)]" />
                  <div className="font-['Outfit'] font-medium text-white mt-3">{title}</div>
                  <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <ul className="mt-8 space-y-3">
              {PROMISES.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm sm:text-base text-[var(--text-2)]">
                  <Check className="w-4 h-4 mt-1 text-[var(--accent)] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
