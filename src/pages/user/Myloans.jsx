import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyLoans } from '../../hooks/useLoans';
import { LoanBadge } from '../../components/Badge';
import Button from '../../components/Button';

const BOOK_IMAGES = {
  Dune: 'https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg',
  '1984': 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
  Sapiens: 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
  'Le Grand Gatsby': 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
  'Clean Code': 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
};

const TABS = [
  { v: '', l: 'Tous' },
  { v: 'borrowed', l: 'Actifs' },
  { v: 'returned', l: 'Rendus' },
  { v: 'overdue', l: 'En retard' },
];

const fmt = d => (d ? new Date(d).toLocaleDateString('fr-FR') : '—');

const BORDER = {
  borrowed: 'border-l-blue-500',
  returned: 'border-l-green-500',
  overdue: 'border-l-red-500',
};

function getCover(book) {
  const isbn = book?.isbn?.replaceAll('-', '')?.trim();

  return (
    book?.cover_image ||
    book?.image ||
    book?.cover ||
    BOOK_IMAGES[book?.title] ||
    (isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg` : null)
  );
}

function BookCover({ book }) {
  const [failed, setFailed] = useState(false);
  const cover = getCover(book);

  if (!cover || failed) {
    return (
      <div className="w-14 h-20 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold text-center px-2 shrink-0">
        {book?.title?.[0] ?? '?'}
      </div>
    );
  }

  return (
    <img
      src={cover}
      alt={book?.title}
      onError={() => setFailed(true)}
      className="w-14 h-20 rounded-lg object-cover border border-slate-200 shadow-sm shrink-0"
    />
  );
}

function StatCard({ label, value, tone }) {
  const styles = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-green-50 text-green-700 border-green-100',
    red: 'bg-red-50 text-red-700 border-red-100',
    slate: 'bg-slate-50 text-slate-700 border-slate-200',
  };

  return (
    <div className={`rounded-2xl border p-4 ${styles[tone]}`}>
      <p className="text-xs font-bold uppercase tracking-wide opacity-70">
        {label}
      </p>
      <p className="text-2xl font-extrabold mt-1">{value}</p>
    </div>
  );
}

export default function Myloans() {
  const navigate = useNavigate();
  const { loans, loading, returnBook } = useMyLoans();

  const [tab, setTab] = useState('');
  const [returning, setReturning] = useState(null);
  const [toast, setToast] = useState('');

  const activeCount = loans.filter(l => l.status === 'borrowed').length;
  const returnedCount = loans.filter(l => l.status === 'returned').length;
  const overdueCount = loans.filter(l => l.status === 'overdue').length;

  const filtered = tab ? loans.filter(l => l.status === tab) : loans;

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleReturn = async loan => {
    setReturning(loan.id);

    try {
      await returnBook(loan.id);
      showToast('Livre rendu avec succès.');
    } catch (e) {
      showToast(e.response?.data?.message ?? 'Erreur');
    } finally {
      setReturning(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[360px]">
        <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-5">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-white border border-slate-200 rounded-2xl shadow-lg px-5 py-3 text-sm font-semibold text-slate-800">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="page-title">Mes Prêts</h2>
          <p className="page-subtitle">
            {loans.length} emprunt{loans.length !== 1 ? 's' : ''} au total
            {overdueCount > 0 && (
              <span className="ml-2 text-red-600 font-semibold">
                · {overdueCount} en retard
              </span>
            )}
          </p>
        </div>

        <Button onClick={() => navigate('/library')}>
          Explorer la bibliothèque
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total" value={loans.length} tone="slate" />
        <StatCard label="Actifs" value={activeCount} tone="blue" />
        <StatCard label="Rendus" value={returnedCount} tone="green" />
        <StatCard label="En retard" value={overdueCount} tone="red" />
      </div>

      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button
            key={t.v}
            onClick={() => setTab(t.v)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              tab === t.v
                ? t.v === 'overdue'
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-blue-600 text-white border-blue-600'
                : t.v === 'overdue'
                  ? 'bg-white text-red-500 border-red-200 hover:bg-red-50'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t.l}
            {t.v === 'overdue' && overdueCount > 0 && (
              <span className="ml-1.5 bg-red-100 text-red-700 px-1.5 rounded-full text-[10px]">
                {overdueCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-8 py-10 max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
            <span className="text-3xl">📚</span>
          </div>

          <h3 className="text-lg font-semibold text-slate-900">
            Aucun prêt trouvé
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            Vous n'avez actuellement aucun livre dans cette catégorie.
          </p>

          <Button className="mt-5" onClick={() => navigate('/library')}>
            Explorer la bibliothèque
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(loan => (
            <div
              key={loan.id}
              className={`bg-white border border-slate-200 border-l-4 ${
                BORDER[loan.status] ?? 'border-l-slate-300'
              } rounded-2xl p-4 flex gap-4 hover:shadow-md transition-shadow`}
            >
              <BookCover book={loan.book} />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">
                      {loan.book?.title ?? '—'}
                    </h3>

                    <p className="text-xs text-slate-400 mt-0.5">
                      {loan.book?.author ?? 'Auteur inconnu'}
                    </p>

                    {loan.book?.category && (
                      <p className="text-[11px] text-slate-400 mt-1">
                        {loan.book.category}
                      </p>
                    )}
                  </div>

                  <LoanBadge status={loan.status} />
                </div>

                {loan.status === 'overdue' ? (
                  <div className="mt-3 bg-red-50 rounded-xl px-3 py-2 flex items-center justify-between gap-3 flex-wrap">
                    <p className="text-xs text-red-600 font-semibold">
                      ⚠ En retard depuis le {fmt(loan.due_date)}
                    </p>

                    <Button
                      size="sm"
                      onClick={() => handleReturn(loan)}
                      loading={returning === loan.id}
                      className="bg-red-600 hover:bg-red-700 text-white border-0"
                    >
                      Rendre maintenant
                    </Button>
                  </div>
                ) : loan.status === 'returned' ? (
                  <p className="mt-3 text-xs text-slate-400">
                    ✓ Rendu le {fmt(loan.returned_at)}
                  </p>
                ) : (
                  <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
                    <div className="text-xs text-slate-500">
                      Emprunté le{' '}
                      <b className="text-slate-700">{fmt(loan.borrowed_at)}</b>
                      <span className="mx-2">·</span>
                      Échéance :{' '}
                      <b className="text-slate-700">{fmt(loan.due_date)}</b>
                    </div>

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleReturn(loan)}
                      loading={returning === loan.id}
                    >
                      ↩ Rendre
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}