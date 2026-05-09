import React, { useState } from 'react';
import { Search, Plus, RotateCcw, X } from 'lucide-react';

const INITIAL_LOANS = [
  { id: 1, emoji: '📘', bg: '#FFF8E1', bookTitle: 'Clean Code',            author: 'R. C. Martin',       memberInitials: 'SA', memberBg: '#E8F5E9', memberColor: '#1A7A6B', member: 'Sara Alami',       borrowed: '01/05/2026', due: '15/05/2026', status: 'active' },
  { id: 2, emoji: '📕', bg: '#FCE4EC', bookTitle: 'Code Civil Marocain',   author: 'Éd. Officielle',     memberInitials: 'NE', memberBg: '#FCE4EC', memberColor: '#C0404A', member: 'Nadia El Fassi',   borrowed: '20/04/2026', due: '04/05/2026', status: 'late' },
  { id: 3, emoji: '📗', bg: '#E3F2FD', bookTitle: 'Le Petit Prince',       author: 'A. de Saint-Exupéry',memberInitials: 'KB', memberBg: '#F3E5F5', memberColor: '#7C6EE8', member: 'Karim Benali',     borrowed: '25/04/2026', due: '09/05/2026', status: 'returned' },
  { id: 4, emoji: '📙', bg: '#E1F5FE', bookTitle: 'Deep Learning',         author: 'Ian Goodfellow',     memberInitials: 'YM', memberBg: '#E1F5FE', memberColor: '#1976D2', member: 'Youssef Mansouri', borrowed: '03/05/2026', due: '17/05/2026', status: 'active' },
  { id: 5, emoji: '📔', bg: '#E8F5E9', bookTitle: 'Design Patterns',       author: 'GoF',                memberInitials: 'IT', memberBg: '#E8F5E9', memberColor: '#1A7A6B', member: 'Imane Tazi',       borrowed: '05/05/2026', due: '19/05/2026', status: 'active' },
  { id: 6, emoji: '📒', bg: '#FFF3E0', bookTitle: "L'Étranger",            author: 'Albert Camus',       memberInitials: 'SA', memberBg: '#E8F5E9', memberColor: '#1A7A6B', member: 'Sara Alami',       borrowed: '28/03/2026', due: '11/04/2026', status: 'late' },
];

const STATUS_META = {
  active:   { label: 'En cours',  bg: 'var(--teal3)', color: 'var(--teal)'  },
  late:     { label: 'En retard', bg: 'var(--rose3)', color: 'var(--rose)'  },
  returned: { label: 'Rendu',     bg: '#E8F5E9',      color: '#2E7D32'      },
};

const TABS = [
  { key: 'all',      label: 'Tous' },
  { key: 'active',   label: 'En cours' },
  { key: 'late',     label: 'En retard' },
  { key: 'returned', label: 'Rendus' },
];

export default function Loans() {
  const [loans, setLoans]   = useState(INITIAL_LOANS);
  const [tab, setTab]       = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal]   = useState(false);
  const [form, setForm]     = useState({ bookTitle: '', member: '', borrowed: '', due: '' });

  const filtered = loans.filter(l => {
    const matchTab    = tab === 'all' || l.status === tab;
    const matchSearch = l.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
                        l.member.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = {
    all: loans.length,
    active: loans.filter(l => l.status === 'active').length,
    late: loans.filter(l => l.status === 'late').length,
    returned: loans.filter(l => l.status === 'returned').length,
  };

  function markReturned(id) {
    setLoans(loans.map(l => l.id === id ? { ...l, status: 'returned' } : l));
  }

  function handleSave() {
    if (!form.bookTitle.trim() || !form.member.trim()) return;
    setLoans([...loans, {
      id: Date.now(), emoji: '📘', bg: '#FFF8E1',
      author: '—', memberInitials: form.member.slice(0, 2).toUpperCase(),
      memberBg: '#E8F5E9', memberColor: '#1A7A6B',
      status: 'active', ...form,
    }]);
    setForm({ bookTitle: '', member: '', borrowed: '', due: '' });
    setModal(false);
  }

  return (
    <div>
      <div style={s.pageHeader}>
        <h1 style={s.pageTitle}>Prêts &amp; Retours</h1>
        <p style={s.pageSubtitle}>Suivi de tous les emprunts en cours et historique des retours.</p>
      </div>

      {/* TABS + SEARCH */}
      <div style={s.topRow}>
        <div style={s.tabs}>
          {TABS.map(t => (
            <button
              key={t.key}
              style={{ ...s.tab, ...(tab === t.key ? s.tabActive : {}) }}
              onClick={() => setTab(t.key)}
            >
              {t.label}
              <span style={{ ...s.tabCount, background: tab === t.key ? 'rgba(255,255,255,0.2)' : 'var(--surface2)' }}>
                {counts[t.key]}
              </span>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={s.filterSearch}>
            <Search size={13} color="var(--text3)" />
            <input style={s.filterInput} value={search} onChange={e => setSearch(e.target.value)} placeholder="Livre ou membre..." />
          </div>
          <button style={s.addBtn} onClick={() => setModal(true)}>
            <Plus size={14} /> Nouveau prêt
          </button>
        </div>
      </div>

      {/* LOANS LIST */}
      <div style={s.list}>
        {filtered.length === 0 ? (
          <div style={s.empty}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <div style={s.emptyTitle}>Aucun prêt trouvé</div>
          </div>
        ) : filtered.map(loan => {
          const st = STATUS_META[loan.status];
          return (
            <div key={loan.id} style={s.loanCard}>
              <div style={{ ...s.bookCover, background: loan.bg }}>
                <span style={{ fontSize: 24 }}>{loan.emoji}</span>
              </div>
              <div style={s.bookInfo}>
                <div style={s.bookTitle}>{loan.bookTitle}</div>
                <div style={s.bookAuthor}>{loan.author}</div>
              </div>
              <div style={s.dates}>
                <div style={s.dateItem}>
                  <span style={s.dateLabel}>Emprunté le</span>
                  <span style={s.dateVal}>{loan.borrowed}</span>
                </div>
                <div style={s.dateItem}>
                  <span style={s.dateLabel}>Retour prévu</span>
                  <span style={{ ...s.dateVal, color: loan.status === 'late' ? 'var(--rose)' : 'inherit' }}>{loan.due}</span>
                </div>
              </div>
              <div style={s.member}>
                <div style={{ ...s.memberAv, background: loan.memberBg, color: loan.memberColor }}>{loan.memberInitials}</div>
                <span style={s.memberName}>{loan.member}</span>
              </div>
              <span style={{ ...s.statusBadge, background: st.bg, color: st.color }}>{st.label}</span>
              {loan.status !== 'returned' && (
                <button style={s.returnBtn} onClick={() => markReturned(loan.id)} title="Marquer comme rendu">
                  <RotateCcw size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL NEW LOAN */}
      {modal && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div style={s.modal}>
            <div style={s.modalHeader}>
              <h2 style={s.modalTitle}>Nouveau prêt</h2>
              <button style={s.closeBtn} onClick={() => setModal(false)}><X size={18} /></button>
            </div>
            <div style={s.formRow}>
              <label style={s.label}>Titre du livre *</label>
              <input style={s.input} value={form.bookTitle} onChange={e => setForm({ ...form, bookTitle: e.target.value })} placeholder="Nom du livre" />
            </div>
            <div style={s.formRow}>
              <label style={s.label}>Membre *</label>
              <input style={s.input} value={form.member} onChange={e => setForm({ ...form, member: e.target.value })} placeholder="Nom du membre" />
            </div>
            <div style={s.formRow2}>
              <div style={s.formRow}>
                <label style={s.label}>Date d'emprunt</label>
                <input style={s.input} type="date" value={form.borrowed} onChange={e => setForm({ ...form, borrowed: e.target.value })} />
              </div>
              <div style={s.formRow}>
                <label style={s.label}>Date de retour</label>
                <input style={s.input} type="date" value={form.due} onChange={e => setForm({ ...form, due: e.target.value })} />
              </div>
            </div>
            <div style={s.modalFooter}>
              <button style={s.btnCancel} onClick={() => setModal(false)}>Annuler</button>
              <button style={s.btnSave} onClick={handleSave}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  pageHeader: { marginBottom: 24 },
  pageTitle:  { fontSize: 22, fontWeight: 700, marginBottom: 4 },
  pageSubtitle: { color: 'var(--text3)', fontSize: 13 },

  topRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 },
  tabs: { display: 'flex', gap: 6 },
  tab: { padding: '7px 14px', borderRadius: 20, fontSize: 12, border: '1px solid var(--border2)', background: '#fff', color: 'var(--text2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s' },
  tabActive: { background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' },
  tabCount: { padding: '1px 6px', borderRadius: 10, fontSize: 11 },

  filterSearch: { display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid var(--border2)', borderRadius: 8, padding: '7px 12px', width: 200 },
  filterInput: { border: 'none', background: 'transparent', fontSize: 13, outline: 'none', flex: 1, color: 'var(--text)' },
  addBtn: { background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 14px', fontSize: 12, fontFamily: 'Syne, sans-serif', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 },

  list: { display: 'flex', flexDirection: 'column', gap: 10 },
  loanCard: { background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' },
  bookCover: { width: 40, height: 54, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  bookInfo: { flex: 1, minWidth: 130 },
  bookTitle: { fontSize: 13, fontWeight: 500, marginBottom: 2 },
  bookAuthor: { fontSize: 11, color: 'var(--text3)' },
  dates: { display: 'flex', gap: 20 },
  dateItem: { display: 'flex', flexDirection: 'column', gap: 2 },
  dateLabel: { fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text3)' },
  dateVal: { fontSize: 13, fontWeight: 500 },
  member: { display: 'flex', alignItems: 'center', gap: 8 },
  memberAv: { width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, flexShrink: 0 },
  memberName: { fontSize: 12, fontWeight: 500 },
  statusBadge: { fontSize: 10, padding: '4px 10px', borderRadius: 20, fontWeight: 500 },
  returnBtn: { width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border2)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal)', cursor: 'pointer' },

  empty: { textAlign: 'center', padding: '60px 20px', color: 'var(--text3)' },
  emptyTitle: { fontSize: 15, fontWeight: 500, color: 'var(--text2)' },

  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: '#fff', borderRadius: 16, padding: 28, width: 440, maxWidth: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' },
  modalHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  modalTitle: { fontSize: 17, fontWeight: 700 },
  closeBtn: { width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border2)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)', cursor: 'pointer' },
  formRow: { marginBottom: 14 },
  formRow2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  label: { display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text3)', marginBottom: 6 },
  input: { width: '100%', background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: 'var(--text)', outline: 'none' },
  modalFooter: { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 },
  btnCancel: { padding: '9px 18px', border: '1px solid var(--border2)', borderRadius: 8, background: '#fff', fontSize: 13, color: 'var(--text2)', cursor: 'pointer' },
  btnSave: { padding: '9px 18px', border: 'none', borderRadius: 8, background: 'var(--ink)', color: '#fff', fontSize: 13, fontFamily: 'Syne, sans-serif', fontWeight: 600, cursor: 'pointer' },
};