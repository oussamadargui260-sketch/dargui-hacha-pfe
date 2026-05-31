// src/pages/user/Library.jsx
import React, { useState } from 'react';
import { useBooks } from '../../hooks/useBooks';
import { useMyLoans } from '../../hooks/useLoans';
import Bookcard from '../../components/Bookcard';

const CATS = [
  '',
  'Fiction',
  'Science Fiction',
  'Histoire',
  'Technologie',
  'Développement',
  'Philosophie',
  'Biographie',
];

function SearchIcon() {
  return (
    <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
    </svg>
  );
}

function EmptyIcon() {
  return (
    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}

export default function Library() {
  const { books, meta, loading, setPage, setSearch, setCategory } = useBooks();
  const { borrow } = useMyLoans();

  const [searchVal, setSearchVal] = useState('');
  const [activeCat, setActiveCat] = useState('');
  const [borrowing, setBorrowing] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = message => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSearch = value => {
    setSearchVal(value);
    setSearch(value);
  };

  const handleCat = category => {
    setActiveCat(category);
    setCategory(category);
  };

  const handleBorrow = async book => {
    setBorrowing(book.id);

    try {
      await borrow(book.id);
      showToast(`«${book.title}» emprunté avec succès.`);
    } catch (e) {
      showToast(e.response?.data?.message ?? 'Erreur');
    } finally {
      setBorrowing(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-white border border-slate-200 rounded-2xl shadow-lg px-5 py-3 text-sm font-semibold text-slate-800">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="page-title">Bibliothèque</h2>
          <p className="page-subtitle">
            {meta.total} livre{meta.total !== 1 ? 's' : ''} disponibles
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 flex-1 max-w-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
            <SearchIcon />

            <input
              value={searchVal}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Rechercher par titre, auteur…"
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
            />

            {searchVal && (
              <button
                onClick={() => handleSearch('')}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {CATS.map(category => (
              <button
                key={category}
                onClick={() => handleCat(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeCat === category
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {category || 'Tous'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
              <EmptyIcon />
            </div>

            <p className="text-base font-semibold text-slate-700">
              Aucun livre trouvé
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Essayez une autre recherche ou catégorie.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {books.map(book => (
              <Bookcard
                key={book.id}
                book={book}
                mode="user"
                onBorrow={borrowing === book.id ? null : handleBorrow}
              />
            ))}
          </div>
        )}

        {meta.last_page > 1 && (
          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={() => setPage(meta.current_page - 1)}
              disabled={meta.current_page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 text-sm"
            >
              ‹
            </button>

            {Array.from({ length: meta.last_page }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                  page === meta.current_page
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setPage(meta.current_page + 1)}
              disabled={meta.current_page === meta.last_page}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 text-sm"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}