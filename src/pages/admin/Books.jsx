// src/pages/admin/Books.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../../hooks/useBooks';
import { bookService } from '../../services/bookService';
import Table, { Pagination } from '../../components/Table';
import { AvailBadge } from '../../components/Badge';
import Button from '../../components/Button';

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

const BOOK_IMAGES = {
  Dune: 'https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg',
  '1984': 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
  Sapiens: 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
  'Le Grand Gatsby': 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
  'The Great Gatsby': 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
  'To Kill a Mockingbird': 'https://covers.openlibrary.org/b/isbn/9780060935467-L.jpg',
  'The Catcher in the Rye': 'https://covers.openlibrary.org/b/isbn/9780316769174-L.jpg',
  'Clean Code': 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
  'Design Patterns': 'https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg',
};

const GRADS = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-orange-400 to-rose-500',
  'from-pink-500 to-fuchsia-600',
  'from-amber-400 to-orange-500',
  'from-sky-400 to-blue-600',
  'from-green-400 to-emerald-600',
];

const grad = s => {
  let h = 0;
  for (let c of s || '') h = (h * 31 + c.charCodeAt(0)) % GRADS.length;
  return GRADS[Math.abs(h) % GRADS.length];
};

function PlusIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
    </svg>
  );
}

function BookCover({ book, size = 'table' }) {
  const [failed, setFailed] = useState(false);

  const isbn = book?.isbn?.replaceAll('-', '')?.trim();
  const cover =
    book?.cover_image ||
    book?.image ||
    BOOK_IMAGES[book?.title] ||
    (isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg` : null);

  const sizeClass =
    size === 'card'
      ? 'w-full h-56'
      : 'w-12 h-16';

  if (!cover || failed) {
    return (
      <div
        className={`${sizeClass} rounded-xl bg-gradient-to-br ${grad(
          book?.title
        )} flex items-center justify-center border border-slate-200 shadow-sm shrink-0 overflow-hidden`}
      >
        <div className="text-center px-2">
          <svg className="w-7 h-7 mx-auto text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          {size === 'card' && (
            <p className="text-white/80 text-xs font-semibold mt-2 line-clamp-2">
              {book?.title}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <img
      src={cover}
      alt={book?.title}
      onError={() => setFailed(true)}
      className={`${sizeClass} object-cover rounded-xl border border-slate-200 shadow-sm shrink-0 bg-slate-100`}
    />
  );
}

function StatMini({ label, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}

export default function Books() {
  const navigate = useNavigate();
  const {
    books,
    meta,
    loading,
    params,
    setPage,
    setSearch,
    setCategory,
    refresh,
  } = useBooks();

  const [search, setLocalSearch] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [view, setView] = useState('table');

  const totalAvailable = books.reduce(
    (sum, book) => sum + Number(book.available ?? 0),
    0
  );

  const totalQuantity = books.reduce(
    (sum, book) => sum + Number(book.quantity ?? 0),
    0
  );

  const handleSearch = value => {
    setLocalSearch(value);
    setSearch(value);
  };

  const handleDelete = async book => {
    if (!window.confirm(`Supprimer «${book.title}» ?`)) return;

    setDeleting(book.id);
    try {
      await bookService.delete(book.id);
      refresh();
    } catch (e) {
      alert(e.response?.data?.message ?? 'Erreur');
    } finally {
      setDeleting(null);
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Livre',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <BookCover book={row} />

          <div className="min-w-0">
            <p className="font-semibold text-slate-900 text-sm truncate">
              {row.title}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {row.author}
            </p>
            <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">
              {row.isbn}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'author',
      label: 'Auteur',
    },
    {
      key: 'category',
      label: 'Catégorie',
      render: value =>
        value ? (
          <span className="bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {value}
          </span>
        ) : (
          '—'
        ),
    },
    {
      key: 'available',
      label: 'Disponible',
      width: '120px',
      render: value => <AvailBadge available={value ?? 0} />,
    },
    {
      key: 'quantity',
      label: 'Qté',
      width: '60px',
    },
    {
      key: 'actions',
      label: '',
      width: '170px',
      render: (_, row) => (
        <div className="flex items-center gap-1.5">
          <Button
            size="xs"
            variant="secondary"
            onClick={() => navigate(`/admin/books/${row.id}/edit`)}
          >
            Éditer
          </Button>

          <Button
            size="xs"
            variant="danger"
            loading={deleting === row.id}
            onClick={() => handleDelete(row)}
          >
            Supprimer
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="page-title">Livres</h2>
          <p className="page-subtitle">
            {meta.total} livre{meta.total !== 1 ? 's' : ''} dans la collection
          </p>
        </div>

        <Button
          onClick={() => navigate('/admin/books/create')}
          icon={<PlusIcon />}
        >
          Ajouter un livre
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatMini label="Total livres" value={meta.total ?? 0} />
        <StatMini label="Copies disponibles" value={totalAvailable} />
        <StatMini label="Copies totales" value={totalQuantity} />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 w-64 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
              <SearchIcon />

              <input
                value={search}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Rechercher…"
                className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
              />

              {search && (
                <button
                  onClick={() => handleSearch('')}
                  className="text-slate-400 hover:text-slate-600 text-lg leading-none"
                >
                  ×
                </button>
              )}
            </div>

            <select
              value={params.category ?? ''}
              onChange={e => setCategory(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              {CATS.map(category => (
                <option key={category} value={category}>
                  {category || 'Toutes catégories'}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1">
            <button
              onClick={() => setView('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${view === 'table'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
                }`}
            >
              Table
            </button>

            <button
              onClick={() => setView('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${view === 'grid'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
                }`}
            >
              Cards
            </button>
          </div>
        </div>

        {view === 'table' ? (
          <>
            <Table
              columns={columns}
              data={books}
              loading={loading}
              empty="Aucun livre trouvé"
            />

            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
              <span className="text-xs text-slate-400">
                Page {meta.current_page} sur {meta.last_page} — {meta.total} résultats
              </span>

              <Pagination
                page={meta.current_page}
                lastPage={meta.last_page}
                onPageChange={setPage}
              />
            </div>
          </>
        ) : (
          <>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              </div>
            ) : books.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-sm font-semibold text-slate-700">Aucun livre trouvé</p>
                <p className="text-sm text-slate-400 mt-1">Essayez une autre recherche.</p>
              </div>
            ) : (
              <div className="p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {books.map(book => (
                  <div
                    key={book.id}
                    className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    <BookCover book={book} size="card" />

                    <div className="p-4 flex flex-col gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 truncate">
                          {book.author}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <AvailBadge available={book.available ?? 0} />
                        <span className="text-xs text-slate-400">
                          {book.category ?? '—'}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="xs"
                          variant="secondary"
                          fullWidth
                          onClick={() => navigate(`/admin/books/${book.id}/edit`)}
                        >
                          Éditer
                        </Button>

                        <Button
                          size="xs"
                          variant="danger"
                          fullWidth
                          loading={deleting === book.id}
                          onClick={() => handleDelete(book)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
              <span className="text-xs text-slate-400">
                Page {meta.current_page} sur {meta.last_page} — {meta.total} résultats
              </span>

              <Pagination
                page={meta.current_page}
                lastPage={meta.last_page}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}