import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';

const CATEGORIES = ['Toutes', 'Informatique', 'Roman', 'Droit', 'Science'];
const STATUSES   = ['Tous', 'Disponible', 'Emprunté'];

const INITIAL_BOOKS = [
  { id: 1, emoji: '📘', bg: '#FFF8E1', title: 'Clean Code',              author: 'Robert C. Martin',       category: 'Informatique', status: 'Disponible' },
  { id: 2, emoji: '📕', bg: '#F3E5F5', title: 'Le Petit Prince',         author: 'A. de Saint-Exupéry',    category: 'Roman',        status: 'Emprunté'   },
  { id: 3, emoji: '📗', bg: '#E3F2FD', title: 'Deep Learning',           author: 'Ian Goodfellow',          category: 'Informatique', status: 'Disponible' },
  { id: 4, emoji: '📙', bg: '#FCE4EC', title: 'Code Civil Marocain',     author: 'Éd. Officielle',         category: 'Droit',        status: 'Emprunté'   },
  { id: 5, emoji: '📔', bg: '#E8F5E9', title: 'Design Patterns',         author: 'GoF',                    category: 'Informatique', status: 'Disponible' },
  { id: 6, emoji: '📒', bg: '#FFF3E0', title: "L'Étranger",              author: 'Albert Camus',            category: 'Roman',        status: 'Disponible' },
  { id: 7, emoji: '📓', bg: '#E1F5FE', title: 'Physique Quantique',      author: 'Richard Feynman',         category: 'Science',      status: 'Emprunté'   },
  { id: 8, emoji: '📚', bg: '#F9FBE7', title: 'The Pragmatic Programmer',author: 'David Thomas',            category: 'Informatique', status: 'Disponible' },
];

const EMPTY_FORM = { title: '', author: '', category: 'Informatique', isbn: '', copies: 1 };

export default function Books() {
  const [books, setBooks]             = useState(INITIAL_BOOKS);
  const [search, setSearch]           = useState('');
  const [catFilter, setCatFilter]     = useState('Toutes');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [modal, setModal]             = useState(false);
  const [form, setForm]               = useState(EMPTY_FORM);
  const [editId, setEditId]           = useState(null);

  const filtered = books.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
                        b.author.toLowerCase().includes(search.toLowerCase());
    const matchCat    = catFilter === 'Toutes' || b.category === catFilter;
    const matchStatus = statusFilter === 'Tous'  || b.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  function openAdd()       { setForm(EMPTY_FORM); setEditId(null); setModal(true); }
  function openEdit(book)  { setForm({ title: book.title, author: book.author, category: book.category, isbn: book.isbn || '', copies: 1 }); setEditId(book.id); setModal(true); }
  function closeModal()    { setModal(false); }

  function handleSave() {
    if (!form.title.trim() || !form.author.trim()) return;
    if (editId) {
      setBooks(books.map(b => b.id === editId ? { ...b, ...form } : b));
    } else {
      const emojis = ['📘','📕','📗','📙','📔','📒','📓','📚'];
      const bgs    = ['#FFF8E1','#F3E5F5','#E3F2FD','#FCE4EC','#E8F5E9','#FFF3E0','#E1F5FE','#F9FBE7'];
      const idx    = books.length % 8;
      setBooks([...books, { id: Date.now(), emoji: emojis[idx], bg: bgs[idx], status: 'Disponible', ...form }]);
    }
    closeModal();
  }

  function handleDelete(id) {
    if (window.confirm('Supprimer ce livre ?')) {
      setBooks(books.filter(b => b.id !== id));
    }
  }

  return (
    <div>
      <div style={s.pageHeader}>
        <h1 style={s.pageTitle}>Catalogue de Livres</h1>
        <p style={s.pageSubtitle}>Gérez votre inventaire et suivez la disponibilité en temps réel.</p>
      </div>

      {/* FILTERS */}
      <div style={s.filterBar}>
        <div style={s.filterSearch}>
          <Search size={14} color="var(--text3)" />
          <input
            style={s.filterInput}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Titre, auteur, ISBN..."
          />
        </div>

        <select style={s.select} value={catFilter} onChange={e => setCatFilter(e.target.value)}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>

        <select style={s.select} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>

        <div style={s.count}>{filtered.length} livre{filtered.length > 1 ? 's' : ''}</div>

        <button style={s.addBtn} onClick={openAdd}>
          <Plus size={14} /> Ajouter un livre
        </button>
      </div>

      {/* GRID */}
      {filtered.length === 0 ? (
        <div style={s.empty}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
          <div style={s.emptyTitle}>Aucun livre trouvé</div>
          <div style={s.emptyText}>Essayez d'autres filtres ou ajoutez un nouveau livre.</div>
        </div>
      ) : (
        <div style={s.grid}>
          {filtered.map(book => (
            <div key={book.id} style={s.bookCard}>
              <div style={{ ...s.bookCover, background: book.bg }}>
                <span style={{ fontSize: 36 }}>{book.emoji}</span>
                <span style={{
                  ...s.bookBadge,
                  background: book.status === 'Disponible' ? 'var(--teal3)' : 'var(--rose3)',
                  color:      book.status === 'Disponible' ? 'var(--teal)'  : 'var(--rose)',
                }}>
                  {book.status}
                </span>
              </div>
              <div style={s.bookInfo}>
                <div style={s.bookTitle}>{book.title}</div>
                <div style={s.bookAuthor}>{book.author}</div>
                <div style={s.bookFooter}>
                  <span style={s.bookCat}>{book.category}</span>
                  <div style={s.bookActions}>
                    <button style={s.rowBtn} onClick={() => openEdit(book)} aria-label="Modifier">
                      <Edit2 size={12} />
                    </button>
                    <button style={{ ...s.rowBtn, color: 'var(--rose)' }} onClick={() => handleDelete(book.id)} aria-label="Supprimer">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {modal && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && closeModal()}>
          <div style={s.modal}>
            <div style={s.modalHeader}>
              <h2 style={s.modalTitle}>{editId ? 'Modifier le livre' : 'Ajouter un nouveau livre'}</h2>
              <button style={s.closeBtn} onClick={closeModal}><X size={18} /></button>
            </div>

            <div style={s.formRow}>
              <label style={s.label}>Titre *</label>
              <input style={s.input} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Titre du livre" />
            </div>
            <div style={s.formRow}>
              <label style={s.label}>Auteur *</label>
              <input style={s.input} value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="Nom de l'auteur" />
            </div>
            <div style={s.formRow2}>
              <div style={s.formRow}>
                <label style={s.label}>Catégorie</label>
                <select style={s.input} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.filter(c => c !== 'Toutes').map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={s.formRow}>
                <label style={s.label}>ISBN</label>
                <input style={s.input} value={form.isbn} onChange={e => setForm({ ...form, isbn: e.target.value })} placeholder="978-..." />
              </div>
            </div>
            <div style={s.formRow}>
              <label style={s.label}>Nombre d'exemplaires</label>
              <input style={s.input} type="number" min="1" value={form.copies} onChange={e => setForm({ ...form, copies: parseInt(e.target.value) || 1 })} />
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

  filterBar: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' },
  filterSearch: { display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid var(--border2)', borderRadius: 8, padding: '8px 14px', flex: 1, maxWidth: 280 },
  filterInput: { border: 'none', background: 'transparent', fontSize: 13, outline: 'none', flex: 1, color: 'var(--text)' },
  select: { background: '#fff', border: '1px solid var(--border2)', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: 'var(--text)', outline: 'none' },
  count: { fontSize: 12, color: 'var(--text3)', marginLeft: 4 },
  addBtn: { background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 16px', fontSize: 12, fontFamily: 'Syne, sans-serif', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 },
  bookCard: { background: '#fff', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', transition: 'all 0.18s' },
  bookCover: { height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  bookBadge: { position: 'absolute', top: 8, right: 8, fontSize: 10, padding: '2px 7px', borderRadius: 20, fontWeight: 500 },
  bookInfo: { padding: 12 },
  bookTitle: { fontSize: 12, fontWeight: 500, marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  bookAuthor: { fontSize: 11, color: 'var(--text3)', marginBottom: 8 },
  bookFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  bookCat: { fontSize: 10, background: 'var(--surface2)', borderRadius: 4, padding: '2px 7px', color: 'var(--text2)' },
  bookActions: { display: 'flex', gap: 4 },
  rowBtn: { width: 24, height: 24, borderRadius: 6, border: '1px solid var(--border2)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', cursor: 'pointer' },

  empty: { textAlign: 'center', padding: '60px 20px', color: 'var(--text3)' },
  emptyTitle: { fontSize: 15, fontWeight: 500, color: 'var(--text2)', marginBottom: 6 },
  emptyText: { fontSize: 13 },

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