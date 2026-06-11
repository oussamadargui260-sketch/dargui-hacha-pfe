// src/components/Bookcard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AvailBadge } from './Badge';
import Button from './Button';

const BOOK_IMAGES = {
  Dune: 'https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg',
  '1984': 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
  Sapiens: 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
  'Le Grand Gatsby': 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
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

export default function Bookcard({
  book,
  onBorrow,
  onEdit,
  onDelete,
  mode = 'user',
}) {
  const navigate = useNavigate();
  const [failed, setFailed] = useState(false);

  const title = book?.title ?? 'Sans titre';
  const author = book?.author ?? 'Auteur inconnu';
  const category = book?.category;
  const avail = book?.available ?? 0;
  const cover = getCover(book);

  const goToDetails = () => {
    if (mode === 'user') {
      navigate(`/library/${book.id}`);
    }
  };

  return (
    <div
      onClick={goToDetails}
      className={`group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${mode === 'user' ? 'cursor-pointer' : ''
        }`}
    >
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        {cover && !failed ? (
          <img
            src={cover}
            alt={title}
            onError={() => setFailed(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center p-5 text-center">
            <div>
              <p className="text-white text-sm font-bold line-clamp-2">
                {title}
              </p>
              <p className="text-white/70 text-xs mt-2 line-clamp-1">
                {author}
              </p>
            </div>
          </div>
        )}

        {category && (
          <span className="absolute top-3 left-3 bg-slate-900/70 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug mb-1">
            {title}
          </h3>

          <p className="text-xs text-slate-400 truncate">
            {author}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 mt-auto">
          <AvailBadge available={avail} />

          {mode === 'user' ? (
            <Button
              size="sm"
              variant={avail > 0 ? 'primary' : 'secondary'}
              disabled={avail === 0}
              onClick={e => {
                e.stopPropagation();
                onBorrow?.(book);
              }}
            >
              {avail > 0 ? 'Emprunter' : 'Indispo'}
            </Button>
          ) : (
            <div className="flex gap-1.5">
              <Button
                size="xs"
                variant="secondary"
                onClick={e => {
                  e.stopPropagation();
                  onEdit?.(book);
                }}
              >
                Éditer
              </Button>

              <Button
                size="xs"
                variant="danger"
                onClick={e => {
                  e.stopPropagation();
                  onDelete?.(book);
                }}
              >
                Supprimer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}