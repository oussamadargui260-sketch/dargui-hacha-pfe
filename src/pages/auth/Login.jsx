// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const onChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const fillDemo = role => {
    setForm({
      email: role === 'admin' ? 'admin@library.com' : 'user@library.com',
      password: 'password',
    });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await login(form.email, form.password);
      if (data?.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/library', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message ?? 'Email ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="hidden lg:flex flex-1 bg-slate-900 text-white p-10 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center">
            <BookIcon />
          </div>
          <div>
            <h1 className="text-lg font-extrabold">Librarium</h1>
            <p className="text-xs text-slate-400">Library Management System</p>
          </div>
        </div>

        <div className="max-w-xl">
          <span className="inline-flex px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/20 text-xs font-bold mb-6">
            Modern SaaS Dashboard
          </span>

          <h2 className="text-5xl font-black leading-tight">
            Gérez vos livres, emprunts et utilisateurs simplement.
          </h2>

          <p className="text-slate-400 text-lg leading-8 mt-5">
            Une interface moderne pour administrer une bibliothèque complète avec Laravel, React et Tailwind CSS.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-10">
            <Stat value="Dashboard" label="Analytics" />
            <Stat value="CRUD" label="Books & Users" />
            <Stat value="Dark" label="Mode" />
          </div>
        </div>

        <p className="text-xs text-slate-500">
          © 2026 Librarium — OFPPT DEV FS
        </p>
      </div>

      <div className="w-full lg:w-[520px] flex items-center justify-center p-5">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
              <BookIcon />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-950">Librarium</h1>
              <p className="text-xs text-slate-400">Library Management System</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-8">
            <div className="mb-7">
              <h2 className="text-3xl font-black text-slate-950">
                Bon retour 👋
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Connectez-vous à votre espace.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 mb-5 text-sm font-semibold">
                ⚠ {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 mb-5">
              <button
                type="button"
                onClick={() => fillDemo('admin')}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left hover:bg-blue-50 hover:border-blue-200 transition"
              >
                <p className="text-xs font-black text-slate-900">Admin Demo</p>
                <p className="text-[11px] text-slate-400 mt-1 truncate">
                  admin@library.com
                </p>
              </button>

              <button
                type="button"
                onClick={() => fillDemo('user')}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left hover:bg-blue-50 hover:border-blue-200 transition"
              >
                <p className="text-xs font-black text-slate-900">User Demo</p>
                <p className="text-[11px] text-slate-400 mt-1 truncate">
                  user@library.com
                </p>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="admin@library.com"
                required
                autoFocus
                icon={<EmailIcon />}
              />

              <Input
                label="Mot de passe"
                name="password"
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
                required
                icon={<LockIcon />}
                iconRight={
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-700"
                  >
                    {showPw ? 'Masquer' : 'Voir'}
                  </button>
                }
              />

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                  Se souvenir de moi
                </label>

                <button type="button" className="text-blue-600 font-bold hover:text-blue-700">
                  Mot de passe oublié ?
                </button>
              </div>

              <Button type="submit" fullWidth loading={loading} size="lg" className="mt-2">
                Se connecter
              </Button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-blue-600 font-black hover:text-blue-700">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
      <p className="text-lg font-black">{value}</p>
      <p className="text-xs text-slate-400 mt-1">{label}</p>
    </div>
  );
}

function BookIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 002 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}