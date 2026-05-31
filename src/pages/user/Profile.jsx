// src/pages/user/Profile.jsx
import React, { useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useMyLoans } from '../../hooks/useLoans';
import { userService } from '../../services/api';
import Button from '../../components/Button';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { loans } = useMyLoans();

  const [profile, setProfile] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
  });

  const [pw, setPw] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const [profileErrors, setProfileErrors] = useState({});
  const [pwErrors, setPwErrors] = useState({});
  const [profileLoading, setProfileLoading] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [toast, setToast] = useState('');

  const stats = useMemo(() => {
    return {
      total: loans.length,
      active: loans.filter(l => l.status === 'borrowed').length,
      returned: loans.filter(l => l.status === 'returned').length,
      overdue: loans.filter(l => l.status === 'overdue').length,
    };
  }, [loans]);

  const showToast = message => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const handleProfile = async e => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileErrors({});

    try {
      const { data } = await userService.updateProfile(profile);
      updateUser(data);
      showToast('Profil mis à jour avec succès.');
    } catch (err) {
      setProfileErrors(
        err.response?.data?.errors ?? {
          name: err.response?.data?.message ?? 'Erreur',
        }
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePw = async e => {
    e.preventDefault();
    setPwLoading(true);
    setPwErrors({});

    try {
      await userService.changePassword(pw);
      setPw({
        current_password: '',
        password: '',
        password_confirmation: '',
      });
      showToast('Mot de passe modifié avec succès.');
    } catch (err) {
      setPwErrors(
        err.response?.data?.errors ?? {
          current_password: err.response?.data?.message ?? 'Erreur',
        }
      );
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-white border border-slate-200 rounded-2xl shadow-lg px-5 py-3 text-sm font-semibold text-slate-800">
          {toast}
        </div>
      )}

      <div>
        <h2 className="page-title">Mon Profil</h2>
        <p className="page-subtitle">
          Gérez vos informations personnelles et votre sécurité.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden h-fit">
          <div className="bg-gradient-to-br from-blue-600 to-violet-600 h-28" />

          <div className="px-6 pb-6 -mt-10">
            <div className="w-20 h-20 rounded-3xl bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-extrabold">
                {user?.name?.[0]?.toUpperCase() ?? 'U'}
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 mt-4">
              {user?.name}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {user?.email}
            </p>

            <span className="inline-flex mt-3 px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200 text-xs font-bold">
              {user?.role ?? 'user'}
            </span>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Total prêts" value={stats.total} tone="slate" />
          <Stat label="Actifs" value={stats.active} tone="blue" />
          <Stat label="Rendus" value={stats.returned} tone="green" />
          <Stat label="Retards" value={stats.overdue} tone="red" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <form onSubmit={handleProfile} className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Informations personnelles
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Modifiez votre nom et votre adresse email.
            </p>
          </div>

          <Field
            label="Nom complet"
            value={profile.name}
            onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
            error={profileErrors.name}
            required
          />

          <Field
            label="Email"
            type="email"
            value={profile.email}
            onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
            error={profileErrors.email}
            required
          />

          <Button type="submit" loading={profileLoading}>
            Enregistrer
          </Button>
        </form>

        <form onSubmit={handlePw} className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Sécurité
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Changez votre mot de passe.
            </p>
          </div>

          <Field
            label="Mot de passe actuel"
            type="password"
            value={pw.current_password}
            onChange={e => setPw(p => ({ ...p, current_password: e.target.value }))}
            error={pwErrors.current_password}
            required
          />

          <Field
            label="Nouveau mot de passe"
            type="password"
            value={pw.password}
            onChange={e => setPw(p => ({ ...p, password: e.target.value }))}
            error={pwErrors.password}
            hint="Minimum 8 caractères"
            required
          />

          <Field
            label="Confirmer"
            type="password"
            value={pw.password_confirmation}
            onChange={e => setPw(p => ({ ...p, password_confirmation: e.target.value }))}
            error={pwErrors.password_confirmation}
            required
          />

          <Button type="submit" loading={pwLoading} variant="secondary">
            Modifier le mot de passe
          </Button>
        </form>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }) {
  const styles = {
    slate: 'bg-slate-50 text-slate-700 border-slate-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-green-50 text-green-700 border-green-100',
    red: 'bg-red-50 text-red-700 border-red-100',
  };

  return (
    <div className={`rounded-2xl border p-4 ${styles[tone]}`}>
      <p className="text-xs font-bold uppercase tracking-wide opacity-70">
        {label}
      </p>
      <p className="text-3xl font-extrabold mt-1">
        {value}
      </p>
    </div>
  );
}

function Field({ label, error, hint, required, type = 'text', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <input
        type={type}
        required={required}
        className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
          error ? 'border-red-400' : 'border-slate-200 hover:border-slate-300'
        }`}
        {...props}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}