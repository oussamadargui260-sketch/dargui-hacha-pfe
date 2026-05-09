import React, { useState } from 'react';
import { Search, Edit2, Trash2, Plus, X } from 'lucide-react';

const INITIAL_USERS = [
  { id: 1, initials: 'OD', bg: '#FFF8E1', color: '#C9A84C', name: 'Oussama Dargui',  email: 'o.dargui@biblio.ma',   role: 'Admin',  status: 'Actif',  since: 'Jan 2024' },
  { id: 2, initials: 'SA', bg: '#E8F5E9', color: '#1A7A6B', name: 'Sara Alami',       email: 's.alami@gmail.com',    role: 'Membre', status: 'Actif',  since: 'Jan 2024' },
  { id: 3, initials: 'KB', bg: '#F3E5F5', color: '#7C6EE8', name: 'Karim Benali',     email: 'k.benali@hotmail.com', role: 'Membre', status: 'Actif',  since: 'Mar 2024' },
  { id: 4, initials: 'NE', bg: '#FCE4EC', color: '#C0404A', name: 'Nadia El Fassi',   email: 'n.elfassi@gmail.com',  role: 'Membre', status: 'Retard', since: 'Fév 2024' },
  { id: 5, initials: 'YM', bg: '#E1F5FE', color: '#1976D2', name: 'Youssef Mansouri', email: 'y.mansouri@edu.ma',    role: 'Membre', status: 'Actif',  since: 'Avr 2024' },
  { id: 6, initials: 'IT', bg: '#E8F5E9', color: '#1A7A6B', name: 'Imane Tazi',       email: 'i.tazi@gmail.com',     role: 'Membre', status: 'Actif',  since: 'Mai 2024' },
];

const STATUS_STYLE = {
  Actif:  { background: 'var(--teal3)', color: 'var(--teal)' },
  Retard: { background: 'var(--rose3)', color: 'var(--rose)' },
  Inactif:{ background: 'var(--surface2)', color: 'var(--text3)' },
};

const EMPTY_FORM = { name: '', email: '', role: 'Membre' };

export default function Users() {
  const [users, setUsers]   = useState(INITIAL_USERS);
  const [search, setSearch] = useState('');
  const [role, setRole]     = useState('Tous');
  const [modal, setModal]   = useState(false);
  const [form, setForm]     = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = role === 'Tous' || u.role === role;
    return matchSearch && matchRole;
  });

  function openAdd()       { setForm(EMPTY_FORM); setEditId(null); setModal(true); }
  function openEdit(user)  { setForm({ name: user.name, email: user.email, role: user.role }); setEditId(user.id); setModal(true); }
  function closeModal()    { setModal(false); }

  function handleSave() {
    if (!form.name.trim() || !form.email.trim()) return;
    if (editId) {
      setUsers(users.map(u => u.id === editId ? { ...u, ...form } : u));
    } else {
      const initials = form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
      const bgs = ['#E8F5E9','#E3F2FD','#F3E5F5','#FFF8E1','#FCE4EC'];
      const colors = ['#1A7A6B','#1976D2','#7C6EE8','#C9A84C','#C0404A'];
      const idx = users.length % 5;
      setUsers([...users, { id: Date.now(), initials, bg: bgs[idx], color: colors[idx], status: 'Actif', since: 'Mai 2026', ...form }]);
    }
    closeModal();
  }

  function handleDelete(id) {
    if (window.confirm('Supprimer cet utilisateur ?')) setUsers(users.filter(u => u.id !== id));
  }

  return (
    <div>
      <div style={s.pageHeader}>
        <h1 style={s.pageTitle}>Gestion Utilisateurs</h1>
        <p style={s.pageSubtitle}>Membres inscrits et accès à la bibliothèque.</p>
      </div>

      {/* FILTERS */}
      <div style={s.filterBar}>
        <div style={s.filterSearch}>
          <Search size={14} color="var(--text3)" />
          <input
            style={s.filterInput}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Nom, email..."
          />
        </div>
        <select style={s.select} value={role} onChange={e => setRole(e.target.value)}>
          <option>Tous</option><option>Admin</option><option>Membre</option>
        </select>
        <div style={s.count}>{filtered.length} utilisateur{filtered.length > 1 ? 's' : ''}</div>
        <button style={s.addBtn} onClick={openAdd}>
          <Plus size={14} /> Ajouter
        </button>
      </div>

      {/* TABLE */}
      <div style={s.table}>
        <div style={s.tableHead}>
          <span>Utilisateur</span>
          <span>Email</span>
          <span>Rôle</span>
          <span>Membre depuis</span>
          <span>Statut</span>
          <span>Actions</span>
        </div>
        {filtered.map((user, i) => {
          const st = STATUS_STYLE[user.status] || STATUS_STYLE.Actif;
          return (
            <div key={user.id} style={{ ...s.tableRow, borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={s.userCell}>
                <div style={{ ...s.userAv, background: user.bg, color: user.color }}>{user.initials}</div>
                <div>
                  <div style={s.userName}>{user.name}</div>
                  <div style={s.userSince}>Membre depuis {user.since}</div>
                </div>
              </div>
              <div style={s.cellText}>{user.email}</div>
              <div>
                <span style={{
                  ...s.badge,
                  background: user.role === 'Admin' ? '#FFF8E1' : 'var(--teal3)',
                  color:      user.role === 'Admin' ? 'var(--gold)' : 'var(--teal)',
                }}>
                  {user.role}
                </span>
              </div>
              <div style={s.cellText}>{user.since}</div>
              <div>
                <span style={{ ...s.badge, background: st.background, color: st.color }}>{user.status}</span>
              </div>
              <div style={s.rowActions}>
                <button style={s.rowBtn} onClick={() => openEdit(user)} aria-label="Modifier"><Edit2 size={13} /></button>
                <button style={{ ...s.rowBtn, color: 'var(--rose)' }} onClick={() => handleDelete(user.id)} aria-label="Supprimer"><Trash2 size={13} /></button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {modal && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && closeModal()}>
          <div style={s.modal}>
            <div style={s.modalHeader}>
              <h2 style={s.modalTitle}>{editId ? 'Modifier utilisateur' : 'Ajouter un utilisateur'}</h2>
              <button style={s.closeBtn} onClick={closeModal}><X size={18} /></button>
            </div>
            <div style={s.formRow}>
              <label style={s.label}>Nom complet *</label>
              <input style={s.input} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Prénom Nom" />
            </div>
            <div style={s.formRow}>
              <label style={s.label}>Email *</label>
              <input style={s.input} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
            </div>
            <div style={s.formRow}>
              <label style={s.label}>Rôle</label>
              <select style={s.input} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option>Membre</option><option>Admin</option>
              </select>
            </div>
            <div style={s.modalFooter}>
              <button style={s.btnCancel} onClick={closeModal}>Annuler</button>
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

  filterBar: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' },
  filterSearch: { display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid var(--border2)', borderRadius: 8, padding: '8px 14px', flex: 1, maxWidth: 280 },
  filterInput: { border: 'none', background: 'transparent', fontSize: 13, outline: 'none', flex: 1, color: 'var(--text)' },
  select: { background: '#fff', border: '1px solid var(--border2)', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: 'var(--text)', outline: 'none' },
  count: { fontSize: 12, color: 'var(--text3)' },
  addBtn: { background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 16px', fontSize: 12, fontFamily: 'Syne, sans-serif', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' },

  table: { background: '#fff', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' },
  tableHead: { display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 90px', padding: '12px 20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text3)', gap: 12 },
  tableRow: { display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 90px', padding: '14px 20px', alignItems: 'center', gap: 12, transition: 'background 0.1s' },
  userCell: { display: 'flex', alignItems: 'center', gap: 10 },
  userAv: { width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0 },
  userName: { fontSize: 13, fontWeight: 500 },
  userSince: { fontSize: 11, color: 'var(--text3)' },
  cellText: { fontSize: 13, color: 'var(--text2)' },
  badge: { fontSize: 10, padding: '3px 10px', borderRadius: 20, fontWeight: 500, display: 'inline-flex' },
  rowActions: { display: 'flex', gap: 6 },
  rowBtn: { width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border2)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)', cursor: 'pointer' },

  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: '#fff', borderRadius: 16, padding: 28, width: 420, maxWidth: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' },
  modalHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  modalTitle: { fontSize: 17, fontWeight: 700 },
  closeBtn: { width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border2)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)', cursor: 'pointer' },
  formRow: { marginBottom: 14 },
  label: { display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text3)', marginBottom: 6 },
  input: { width: '100%', background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: 'var(--text)', outline: 'none' },
  modalFooter: { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 },
  btnCancel: { padding: '9px 18px', border: '1px solid var(--border2)', borderRadius: 8, background: '#fff', fontSize: 13, color: 'var(--text2)', cursor: 'pointer' },
  btnSave: { padding: '9px 18px', border: 'none', borderRadius: 8, background: 'var(--ink)', color: '#fff', fontSize: 13, fontFamily: 'Syne, sans-serif', fontWeight: 600, cursor: 'pointer' },
};