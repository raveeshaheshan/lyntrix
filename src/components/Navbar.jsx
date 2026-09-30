import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, LayoutDashboard, Search, User, LogOut, AlertTriangle } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Services', href: '#services' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Stack', href: '#tech-stack' },
  { name: 'Estimator', href: '#calculator' },
  { name: 'FAQ', href: '#faq' },
];

export default function Navbar({
  onOpenCalculator,
  isAdminLoggedIn,
  onOpenAdminDashboard,
  onOpenTracker,
  onOpenAuth,
  onOpenUserProfile,
  currentUser,
  onLogoutUser,
  maintenanceConfig,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll while the mobile sheet is open; close on Escape / when resized to desktop
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 1024px)');
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  const close = () => setOpen(false);
  const initial = currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color] duration-300 border-b ${
        scrolled || open ? 'bg-[#06080d]/90 backdrop-blur-xl border-white/[0.08]' : 'bg-transparent border-transparent'
      }`}
    >
      {maintenanceConfig?.enabled && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-2 text-amber-200 text-xs flex items-center justify-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-semibold text-amber-300 shrink-0">Maintenance</span>
          <span className="truncate min-w-0 text-amber-100/90">{maintenanceConfig.message}</span>
          {maintenanceConfig.eta && (
            <span className="hidden sm:inline shrink-0 chip border-amber-500/30 text-amber-200 bg-transparent">
              ETA {maintenanceConfig.eta}
            </span>
          )}
        </div>
      )}

      <div className="container-x h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 shrink-0" aria-label="Lyntrix home">
          <span className="w-9 h-9 rounded-[10px] bg-[var(--surface-2)] border border-white/10 p-1.5 grid place-items-center">
            <img src="/logo-icon.svg" alt="" className="w-full h-full object-contain" />
          </span>
          <span className="font-['Outfit'] font-semibold text-[1.15rem] tracking-[0.08em] text-white leading-none">
            LYNTRIX
            <span className="hidden sm:inline ml-2 font-['Fira_Code'] text-[10px] font-normal tracking-[0.14em] text-[var(--muted)]">
              IT SERVICES
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className="px-3 py-2 rounded-lg text-sm text-[var(--text-2)] hover:text-white hover:bg-white/5 transition-colors"
            >
              {l.name}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <button onClick={onOpenTracker} className="btn btn-ghost btn-sm" title="Track project status">
            <Search className="w-4 h-4" />
            <span className="hidden xl:inline">Track</span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-1 rounded-[10px] border border-white/10 bg-white/[0.03] p-1">
              <button
                onClick={onOpenUserProfile}
                className="flex items-center gap-2 pl-1 pr-2 h-8 rounded-md hover:bg-white/5 transition-colors"
                title="Profile, password & proposals"
              >
                <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-[11px] font-bold grid place-items-center">
                  {initial}
                </span>
                <span className="text-sm text-white max-w-[110px] truncate">{currentUser.name}</span>
                {isAdminLoggedIn && <span className="chip chip-accent !py-0">Admin</span>}
              </button>
              <button
                onClick={onLogoutUser}
                className="w-8 h-8 grid place-items-center rounded-md text-[var(--muted)] hover:text-rose-300 hover:bg-white/5 transition-colors"
                title="Sign out"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="btn btn-ghost btn-sm">
              <User className="w-4 h-4" />
              <span>Sign in</span>
            </button>
          )}

          {isAdminLoggedIn && (
            <button onClick={onOpenAdminDashboard} className="btn btn-ghost btn-sm" title="Open admin console">
              <LayoutDashboard className="w-4 h-4 text-[var(--accent)]" />
              <span className="hidden xl:inline">Console</span>
            </button>
          )}

          <a href="#contact" className="btn btn-primary btn-sm">
            Get a proposal
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden w-11 h-11 -mr-2 grid place-items-center rounded-xl text-white hover:bg-white/5"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="lg:hidden fixed inset-x-0 bottom-0 top-16 bg-[#06080d]/98 overflow-y-auto overscroll-contain fade-up">
          <div className="container-x py-6 pb-[max(2rem,env(safe-area-inset-bottom))] flex flex-col min-h-full">
            <nav className="flex flex-col" aria-label="Mobile">
              {[...NAV_LINKS, { name: 'Contact', href: '#contact' }].map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  onClick={close}
                  className="flex items-center justify-between py-4 border-b border-white/[0.06] font-['Outfit'] text-2xl font-medium text-white"
                >
                  {l.name}
                  <ArrowRight className="w-5 h-5 text-[var(--muted)]" />
                </a>
              ))}
            </nav>

            <div className="mt-8 space-y-3">
              {currentUser ? (
                <div className="surface-2 p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-11 h-11 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-bold grid place-items-center shrink-0">
                      {initial}
                    </span>
                    <div className="min-w-0">
                      <div className="text-white font-medium truncate flex items-center gap-2">
                        {currentUser.name}
                        {isAdminLoggedIn && <span className="chip chip-accent !py-0">Admin</span>}
                      </div>
                      <div className="text-xs text-[var(--muted)] truncate">{currentUser.email}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => { close(); onOpenUserProfile(); }} className="btn btn-ghost btn-sm">
                      <User className="w-4 h-4" /> Profile
                    </button>
                    <button onClick={() => { close(); onLogoutUser(); }} className="btn btn-ghost btn-sm">
                      <LogOut className="w-4 h-4" /> Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => { close(); onOpenAuth(); }} className="btn btn-ghost w-full">
                  <User className="w-4 h-4" /> Sign in / Register
                </button>
              )}

              <button onClick={() => { close(); onOpenTracker(); }} className="btn btn-ghost w-full">
                <Search className="w-4 h-4" /> Track project status
              </button>

              {isAdminLoggedIn && (
                <button onClick={() => { close(); onOpenAdminDashboard(); }} className="btn btn-ghost w-full">
                  <LayoutDashboard className="w-4 h-4 text-[var(--accent)]" /> Admin console
                </button>
              )}

              <a href="#contact" onClick={close} className="btn btn-primary w-full">
                Get a proposal <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-auto pt-8 flex items-center gap-2 text-xs text-[var(--muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)]" />
              All systems operational
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
