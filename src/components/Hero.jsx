import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Cpu, Cloud, Code, Terminal, CheckCircle2, ChevronRight, ChevronDown, Play } from 'lucide-react';
import LatencyWidget from './LatencyWidget';

export default function Hero({ onOpenCalculator, onOpenTracker }) {
  const [isExiting, setIsExiting] = useState(false);

  // Seamless blur-out & auto-scroll to Page 2 (#services) with ZERO awkward space
  useEffect(() => {
    let isTransitioning = false;

    const autoScrollToNext = () => {
      if (isTransitioning) return;
      isTransitioning = true;
      setIsExiting(true);

      const nextSection = document.getElementById('services');
      if (nextSection) {
        const yOffset = -70; // clean navbar offset
        const targetY = nextSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }

      setTimeout(() => {
        isTransitioning = false;
      }, 900);
    };

    const handleWheel = (e) => {
      // If at top in Hero and scrolling down
      if (window.scrollY < 80 && e.deltaY > 15 && !isTransitioning) {
        autoScrollToNext();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;
      if (window.scrollY < 80 && diffY > 35 && !isTransitioning) {
        autoScrollToNext();
      }
    };

    // When scrolling back up to top, restore crisp focus
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setIsExiting(false);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <section 
      id="hero-section"
      className={`relative pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern transition-all duration-700 ease-out ${
        isExiting 
          ? 'filter blur-lg opacity-0 -translate-y-8 scale-[0.98]' 
          : 'filter blur-0 opacity-100 translate-y-0 scale-100'
      }`}
    >
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[200px] sm:h-[300px] bg-cyan-500/10 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-indigo-500/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] sm:text-xs font-mono text-cyan-400 shadow-xl shadow-cyan-950/20 backdrop-blur-md max-w-full overflow-hidden">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="font-semibold tracking-wider uppercase truncate">INNOVATE • INTEGRATE • ELEVATE</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden sm:inline">Smart Solutions. Stronger Tomorrow.</span>
          </div>
        </div>

        {/* Hero Main Heading */}
        <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white font-['Outfit'] leading-[1.15]">
            Next-Generation <br className="hidden sm:inline" />
            <span className="text-gradient-cyan">Enterprise IT Services</span>
          </h1>

          <p className="text-sm sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed px-2">
            Engineering resilient custom software, high-concurrency cloud architectures, and zero-trust cybersecurity for modern forward-thinking businesses.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <a
              href="#contact"
              className="glow-btn w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 transition-all"
            >
              <span>Schedule Architecture Audit</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            <button
              onClick={onOpenCalculator}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl glass-panel text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700/80 hover:border-cyan-500/50 transition-all group"
            >
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:text-cyan-300" />
              <span>Launch Cost Calculator</span>
            </button>
          </div>

          {/* Quick Value Badges */}
          <div className="pt-2 sm:pt-4 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-800/80 sm:bg-transparent sm:p-0 sm:border-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ISO 27001 Compliant
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-800/80 sm:bg-transparent sm:p-0 sm:border-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              99.99% Uptime Guarantee
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-800/80 sm:bg-transparent sm:p-0 sm:border-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              24/7 Managed SOC Support
            </span>
          </div>
        </div>


        {/* Live Network Latency Diagnostic Bar */}
        <div className="mt-8">
          <LatencyWidget />
        </div>

        {/* Live Metrics Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="glass-card p-4 sm:p-5 rounded-xl border border-slate-800 text-center">
            <div className="text-2xl sm:text-4xl font-extrabold text-cyan-400 font-['Outfit']">250+</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Enterprise Projects</div>
          </div>
          <div className="glass-card p-4 sm:p-5 rounded-xl border border-slate-800 text-center">
            <div className="text-2xl sm:text-4xl font-extrabold text-indigo-400 font-['Outfit']">99.99%</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Target Uptime SLA</div>
          </div>
          <div className="glass-card p-4 sm:p-5 rounded-xl border border-slate-800 text-center">
            <div className="text-2xl sm:text-4xl font-extrabold text-purple-400 font-['Outfit']">&lt; 15 mins</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Critical Incident SLA</div>
          </div>
          <div className="glass-card p-4 sm:p-5 rounded-xl border border-slate-800 text-center">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-400 font-['Outfit']">100%</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Compliance Guarantee</div>
          </div>
        </div>

        {/* Swipe to Next Section Transition Prompt */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center">
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex flex-col items-center gap-2.5 cursor-pointer select-none"
            title="Swipe down to explore Core Services"
          >
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 group-hover:border-cyan-400 shadow-xl backdrop-blur-md transition-all">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <span className="text-[11px] font-mono font-semibold text-slate-300 group-hover:text-cyan-300 transition-colors uppercase tracking-widest">
                Swipe to explore
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
            </div>
            <div className="w-5 h-8 rounded-full border-2 border-slate-700/80 flex items-start justify-center p-1 group-hover:border-cyan-400 transition-colors">
              <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
            </div>
          </a>
        </div>

      </div>

      {/* Holographic Laser Swipe Divider Line */}
      <div className="laser-swipe-divider mt-8" />
    </section>
  );
}
