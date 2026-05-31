// src/pages/user/BookDetails.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBook } from '../../hooks/useBooks';
import { useMyLoans } from '../../hooks/useLoans';
import { AvailBadge } from '../../components/Badge';
import Button from '../../components/Button';

const BOOK_IMAGES = {
  Dune: 'https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg',
  '1984': 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
  Sapiens: 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
  'Le Grand Gatsby': 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
  'The Great Gatsby': 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
  'Clean Code': 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
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

function Info({ label, value }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-800 mt-1 truncate">
        {value || '—'}
      </p>
    </div>
  );
}

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { book, loading } = useBook(id);
  const { borrow } = useMyLoans();

  const [failed, setFailed] = useState(false);
  const [borrowing, setBorrowing] = useState(false);
  const [message, setMessage] = useState('');

  const handleBorrow = async () => {
    if (!book) return;

    setBorrowing(true);
    setMessage('');

    try {
      await borrow(book.id);
      setMessage('Livre emprunté avec succès.');
    } catch (e) {
      setMessage(e.response?.data?.message ?? 'Erreur');
    } finally {
      setBorrowing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
        <p className="text-slate-700 font-semibold">Livre introuvable</p>
        <Button className="mt-4" onClick={() => navigate('/library')}>
          Retour bibliothèque
        </Button>
      </div>
    );
  }

  const cover = getCover(book);
  const available = book.available_quantity ?? 0;
  const rating = Number(book.rating || 0);

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <button
        onClick={() => navigate(-1)}
        className="w-fit px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
      >
        Retour
      </button>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr]">
          <div className="bg-slate-100 p-8 flex items-center justify-center">
            {cover && !failed ? (
              <img
                src={cover}
                alt={book.title}
                onError={() => setFailed(true)}
                className="w-64 max-h-[430px] object-cover rounded-2xl shadow-xl border border-slate-200"
              />
            ) : (
              <div className="w-64 h-[390px] rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-center p-6 shadow-xl">
                <div>
                  <p className="text-xl font-bold">{book.title}</p>
                  <p className="text-sm text-white/70 mt-3">{book.author}</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <AvailBadge available={available} />

                {book.category && (
                  <span className="bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {book.category}
                  </span>
                )}

                {rating > 0 && (
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    ⭐ {rating}/5
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">
                {book.title}
              </h1>

              <p className="text-lg text-slate-500 mt-2">
                par <span className="font-semibold text-slate-700">{book.author}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Info label="ISBN" value={book.isbn} />
              <Info label="Pages" value={book.pages} />
              <Info label="Langue" value={book.language} />
              <Info label="Publié" value={book.published_date} />
              <Info label="Éditeur" value={book.publisher} />
              <Info label="Quantité" value={book.quantity} />
              <Info label="Disponible" value={available} />
              <Info label="Note" value={rating ? `${rating}/5` : '—'} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Description
              </h3>

              <p className="text-sm leading-7 text-slate-600">
                {book.description || 'Aucune description disponible pour ce livre.'}
              </p>
            </div>

            {message && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-2xl px-4 py-3 text-sm font-semibold">
                {message}
              </div>
            )}

            <div className="flex gap-3 pt-2 flex-wrap">
              <Button
                size="lg"
                disabled={available === 0}
                loading={borrowing}
                onClick={handleBorrow}
              >
                Emprunter ce livre
              </Button>

              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/library')}
              >
                Voir la bibliothèque
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}