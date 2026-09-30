import React, { useState, useEffect, useRef } from 'react';
import { Mail, ShieldCheck, AlertCircle, Lock } from 'lucide-react';
import { db } from '../services/db';
import { Modal, Field, PasswordInput } from './admin/ui';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);

  // Never leave a pending auth callback behind if the modal unmounts mid-request
  useEffect(() => () => clearTimeout(timer.current), []);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    timer.current = setTimeout(() => {
      setLoading(false);
      const authResult = db.validateAdminCredentials(email, password);
      if (authResult && authResult.success) {
        onLoginSuccess(authResult.admin);
        onClose();
        setEmail('');
        setPassword('');
      } else {
        setError('Invalid admin credentials. Access denied.');
      }
    }, 600);
  };

  return (
    <Modal
      size="sm"
      eyebrow="Restricted area"
      title="Admin sign in"
      onClose={onClose}
      footer={
        <button type="submit" form="admin-login-form" disabled={loading} className="btn btn-primary w-full sm:w-auto disabled:opacity-70">
          {loading ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-[var(--accent-ink)] border-t-transparent animate-spin" />
              Verifying…
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              Sign in to console
            </>
          )}
        </button>
      }
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] grid place-items-center shrink-0">
          <Lock className="w-5 h-5" />
        </span>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          Authenticate with your administrator credentials to open the console.
        </p>
      </div>

      {error && (
        <div role="alert" className="mb-4 p-3.5 rounded-xl border border-rose-400/30 bg-rose-400/10 text-sm text-rose-200 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form id="admin-login-form" onSubmit={handleLogin} className="space-y-4">
        <Field label="Admin email">
          <div className="relative">
            <Mail className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              required
              autoFocus
              autoComplete="username"
              placeholder="admin@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field pl-10"
            />
          </div>
        </Field>

        <Field label="Password">
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            show={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
            placeholder="Enter password"
          />
        </Field>
      </form>

      <p className="mt-5 pt-4 border-t border-[var(--line)] text-xs text-[var(--muted)] flex items-center gap-2">
        <Lock className="w-3.5 h-3.5 shrink-0" />
        Sessions are validated against the cloud database.
      </p>
    </Modal>
  );
}
