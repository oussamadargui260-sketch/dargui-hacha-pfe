// src/pages/admin/CreateUser.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';

const ROLES = [
  { value: 'user', label: 'Utilisateur' },
  { value: 'admin', label: 'Admin' },
];

function BackIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export default function CreateUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'user',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = e => {
    setForm(current => ({
      ...current,
      [e.target.name]: e.target.value,
    }));

    setErrors(current => ({
      ...current,
      [e.target.name]: '',
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const existingUsers = JSON.parse(localStorage.getItem('myUsers')) || [];

      const newUser = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        role: form.role,
        created_at: new Date().toISOString(),
        loans_count: 0,
      };

      localStorage.setItem('myUsers', JSON.stringify([newUser, ...existingUsers]));
      navigate('/admin/users');
    } catch (err) {
      setErrors({
        name: err?.message ?? 'Erreur',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition"
        >
          <BackIcon />
        </button>

        <div>
          <h2 className="page-title">Créer un utilisateur</h2>
          <p className="page-subtitle">
            Ajoutez un nouveau membre à votre bibliothèque.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-3">
            Informations du compte
          </h3>

          <Input
            label="Nom complet"
            name="name"
            value={form.name}
            onChange={onChange}
            error={errors.name}
            placeholder="Ex: Ahmed Benani"
            required
          />

          <Input
            label="Adresse email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            error={errors.email}
            placeholder="ahmed@example.com"
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Rôle
            </label>

            <select
              name="role"
              value={form.role}
              onChange={onChange}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            >
              {ROLES.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>

            {errors.role && (
              <p className="text-xs text-red-500">{errors.role}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Mot de passe"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              error={errors.password}
              placeholder="••••••••"
            />

            <Input
              label="Confirmer le mot de passe"
              name="password_confirmation"
              type="password"
              value={form.password_confirmation}
              onChange={onChange}
              error={errors.password_confirmation}
              placeholder="••••••••"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={loading} size="lg">
              Créer l'utilisateur
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => navigate(-1)}
            >
              Annuler
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}