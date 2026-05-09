import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) { setError('Veuillez remplir tous les champs.'); return; }
    // Demo: any credentials work
    navigate('/admin/dashboard');
  }

  return (
    <div style={s.page}>
      {/* Left panel */}
      <div style={s.left}>
        <div style={s.leftContent}>
          <div style={s.logoMark}>
            <div style={s.logoIcon}><BookOpen size={24} color="#0D0D0F" strokeWidth={2} /></div>
            <span style={s.logoName}>BiblioTech</span>
          </div>
          <h1 style={s.headline}>La bibliothèque<br />à portée de main.</h1>
          <p style={s.tagline}>Gérez vos livres, membres et prêts depuis un seul tableau de bord élégant.</p>
          <div style={s.stats}>
            <div style={s.statItem}><div style={s.statNum}>1 248</div><div style={s.statLbl}>Livres</div></div>
            <div style={s.statItem}><div style={s.statNum}>342</div><div style={s.statLbl}>Membres</div></div>
            <div style={s.statItem}><div style={s.statNum}>87</div><div style={s.statLbl}>Prêts actifs</div></div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={s.right}>
        <div style={s.formBox}>
          <div style={s.formHeader}>
            <h2 style={s.formTitle}>Connexion</h2>
            <p style={s.formSub}>Bienvenue sur votre espace administrateur.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={s.field}>
              <label style={s.label}>Email</label>
              <input
                style={s.input}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@bibliotech.ma"
                autoComplete="email"
              />
            </div>

            <div style={s.field}>
              <label style={s.label}>Mot de passe</label>
              <div style={s.pwdWrap}>
                <input
                  style={{ ...s.input, paddingRight: 42 }}
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  style={s.eyeBtn}
                  onClick={() => setShowPwd(!showPwd)}
                  aria-label={showPwd ? 'Masquer' : 'Afficher'}
                >
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && <p style={s.error}>{error}</p>}

            <button type="submit" style={s.submitBtn}>
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { display: 'flex', height: '100vh', fontFamily: "'DM Sans', sans-serif" },

  left: {
    flex: 1,
    background: 'var(--ink)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  leftContent: { maxWidth: 400 },
  logoMark: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 56 },
  logoIcon: { width: 44, height: 44, background: 'var(--gold)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  logoName: { fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, color: '#fff' },
  headline: { fontFamily: 'Syne, sans-serif', fontSize: 36, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 16 },
  tagline: { fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 48 },
  stats: { display: 'flex', gap: 32 },
  statItem: {},
  statNum: { fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, color: 'var(--gold)' },
  statLbl: { fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 },

  right: { width: 460, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, background: 'var(--surface)' },
  formBox: { width: '100%', maxWidth: 360 },
  formHeader: { marginBottom: 32 },
  formTitle: { fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, marginBottom: 6 },
  formSub: { fontSize: 13, color: 'var(--text3)' },

  field: { marginBottom: 18 },
  label: { display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: 8 },
  input: { width: '100%', background: '#fff', border: '1px solid var(--border2)', borderRadius: 10, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none', transition: 'border 0.15s' },
  pwdWrap: { position: 'relative' },
  eyeBtn: { position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', color: 'var(--text3)', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  error: { fontSize: 12, color: 'var(--rose)', marginBottom: 12 },
  submitBtn: { width: '100%', background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontFamily: 'Syne, sans-serif', fontWeight: 600, letterSpacing: '0.04em', cursor: 'pointer', marginTop: 8 },
};