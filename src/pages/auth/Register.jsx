// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(e => ({ ...e, [e.target?.name]: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const user = await register(form);
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/library', { replace: true });
    } catch (err) {
      const d = err.response?.data;
      setErrors(d?.errors ?? { name: d?.message ?? 'Une erreur est survenue.' });
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-base font-bold text-gray-900">Librarium</p>
              <p className="text-xs text-gray-400">Créez votre compte</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Inscription</h2>
          <p className="text-sm text-gray-500 mb-6">Rejoignez la bibliothèque en ligne</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input label="Nom complet" name="name" value={form.name} onChange={onChange}
              placeholder="Votre nom" error={errors.name} required autoFocus
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            />
            <Input label="Email" name="email" type="email" value={form.email} onChange={onChange}
              placeholder="vous@exemple.com" error={errors.email} required
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>}
            />
            <Input label="Mot de passe" name="password" type="password" value={form.password} onChange={onChange}
              placeholder="Minimum 8 caractères" error={errors.password} hint="Au moins 8 caractères" required
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
            />
            <Input label="Confirmer le mot de passe" name="password_confirmation" type="password"
              value={form.password_confirmation} onChange={onChange}
              placeholder="Répétez le mot de passe" error={errors.password_confirmation} required
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
            />
            <Button type="submit" fullWidth loading={loading} size="lg" className="mt-1">Créer mon compte</Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}