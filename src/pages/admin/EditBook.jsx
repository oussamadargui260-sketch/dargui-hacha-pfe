// src/pages/admin/EditBook.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBook } from '../../hooks/useBooks';
import { bookService } from '../../services/bookService';
import Input from '../../components/Input';
import Button from '../../components/Button';

const CATS = [
  'Fiction',
  'Science Fiction',
  'Histoire',
  'Technologie',
  'Développement',
  'Philosophie',
  'Biographie',
  'Autre',
];

function BackIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { book, loading: fetching } = useBook(id);

  const [form, setForm] = useState({
    title: '',
    author: '',
    category: '',
    published_date: '',
    publisher: '',
    language: '',
    pages: '',
    rating: '',
    cover_image: '',
    quantity: 1,
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title ?? '',
        author: book.author ?? '',
        category: book.category ?? '',
        published_date: book.published_date ?? '',
        publisher: book.publisher ?? '',
        language: book.language ?? '',
        pages: book.pages ?? '',
        rating: book.rating ?? '',
        cover_image: book.cover_image ?? '',
        quantity: book.quantity ?? 1,
        description: book.description ?? '',
      });
    }
  }, [book]);

  const onChange = e => {
    setForm(current => ({
      ...current,
      [e.target.name]: e.target.value,
    }));

    setErrors(current => ({
      ...current,
      [e.target.name]: '',
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await bookService.update(id, form);
      navigate('/admin/books');
    } catch (err) {
      setErrors(
        err.response?.data?.errors ?? {
          title: err.response?.data?.message ?? 'Erreur',
        }
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-5xl">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition"
        >
          <BackIcon />
        </button>

        <div>
          <h2 className="page-title">Modifier le livre</h2>
          <p className="page-subtitle">«{book?.title}»</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-3">
              Informations générales
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  ISBN non modifiable
                </label>

                <input
                  value={book?.isbn ?? ''}
                  disabled
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-slate-50 text-slate-400 cursor-not-allowed outline-none"
                />
              </div>

              <Input
                label="Date de publication"
                name="published_date"
                type="date"
                value={form.published_date}
                onChange={onChange}
              />
            </div>

            <Input
              label="Titre"
              name="title"
              value={form.title}
              onChange={onChange}
              error={errors.title}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Auteur"
                name="author"
                value={form.author}
                onChange={onChange}
                error={errors.author}
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Catégorie
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={onChange}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                >
                  <option value="">Sélectionner…</option>
                  {CATS.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {errors.category && (
                  <p className="text-xs text-red-500">{errors.category}</p>
                )}
              </div>
            </div>

            <Input
              label="Quantité"
              name="quantity"
              type="number"
              min={1}
              value={form.quantity}
              onChange={onChange}
              error={errors.quantity}
              required
            />

            <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-3 pt-3">
              Détails avancés
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Éditeur"
                name="publisher"
                value={form.publisher}
                onChange={onChange}
                placeholder="Ex: Ace Books"
              />

              <Input
                label="Langue"
                name="language"
                value={form.language}
                onChange={onChange}
                placeholder="Français"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Pages"
                name="pages"
                type="number"
                value={form.pages}
                onChange={onChange}
                placeholder="412"
              />

              <Input
                label="Note"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={onChange}
                placeholder="4.8"
              />
            </div>

            <Input
              label="Image URL"
              name="cover_image"
              value={form.cover_image}
              onChange={onChange}
              placeholder="https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg"
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                rows={5}
                placeholder="Description…"
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 resize-y outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition"
              />

              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={loading} size="lg">
                Enregistrer
              </Button>

              <Button
                variant="secondary"
                size="lg"
                type="button"
                onClick={() => navigate(-1)}
              >
                Annuler
              </Button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 h-fit">
            <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-3 mb-4">
              Aperçu couverture
            </h3>

            <div className="aspect-[2/3] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
              {form.cover_image ? (
                <img
                  src={form.cover_image}
                  alt={form.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-5">
                  <p className="text-sm font-bold text-slate-600">
                    {form.title || 'Titre du livre'}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    {form.author || 'Auteur'}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <p className="text-xs font-bold text-slate-400 uppercase">
                Aperçu
              </p>
              <p className="text-sm text-slate-600 mt-2 leading-6">
                L’image et les détails seront visibles dans la page Book Details.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}