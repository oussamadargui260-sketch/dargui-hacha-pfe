// src/pages/user/Settings.jsx
import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../../components/Button';

function SettingCard({ title, description, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6">
      <div className="mb-5">
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-400 mt-1">{description}</p>
      </div>

      {children}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-12 h-7 rounded-full p-1 transition-all ${
        checked ? 'bg-blue-600' : 'bg-slate-300'
      }`}
    >
      <span
        className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const { darkMode, toggleTheme } = useTheme();

  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [message, setMessage] = useState('');

  const saveSettings = () => {
    setMessage('Paramètres enregistrés avec succès.');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      {message && (
        <div className="fixed top-4 right-4 z-50 bg-white border border-slate-200 rounded-2xl shadow-lg px-5 py-3 text-sm font-semibold text-slate-800">
          {message}
        </div>
      )}

      <div>
        <h2 className="page-title">Paramètres</h2>
        <p className="page-subtitle">
          Gérez l’apparence, les notifications et les préférences du compte.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SettingCard
          title="Apparence"
          description="Personnalisez le thème de votre interface."
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Mode sombre
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Activez une interface sombre pour réduire la fatigue visuelle.
              </p>
            </div>

            <Toggle checked={darkMode} onChange={toggleTheme} />
          </div>
        </SettingCard>

        <SettingCard
          title="Notifications"
          description="Choisissez comment recevoir les alertes."
        >
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Notifications système
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Alertes pour les emprunts, retards et actions importantes.
                </p>
              </div>

              <Toggle
                checked={notifications}
                onChange={() => setNotifications(v => !v)}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Emails de rappel
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Recevoir un email avant la date limite de retour.
                </p>
              </div>

              <Toggle
                checked={emailUpdates}
                onChange={() => setEmailUpdates(v => !v)}
              />
            </div>
          </div>
        </SettingCard>

        <SettingCard
          title="Langue"
          description="Sélectionnez la langue de l’interface."
        >
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </SettingCard>

        <SettingCard
          title="Compte"
          description="Actions rapides liées à votre compte."
        >
          <div className="flex flex-col gap-3">
            <Button
              variant="secondary"
              onClick={() => window.location.href = '/profile'}
            >
              Modifier le profil
            </Button>

            <Button
              variant="secondary"
              onClick={() => window.location.href = '/my-loans'}
            >
              Voir mes prêts
            </Button>
          </div>
        </SettingCard>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Enregistrer les préférences
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Sauvegardez vos paramètres actuels.
          </p>
        </div>

        <Button onClick={saveSettings}>
          Enregistrer
        </Button>
      </div>
    </div>
  );
}