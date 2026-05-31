import React from 'react';
import { Link } from 'react-router-dom';

const BOOKS = [
  {
    title: 'Dune',
    author: 'Frank Herbert',
    image: 'https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg',
  },
  {
    title: '1984',
    author: 'George Orwell',
    image: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    image: 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    image: 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
  },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <span className="font-bold text-lg">Librarium</span>
    </div>
  );
}

function FeatureCard({ title, text, icon }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 mt-5">{title}</h3>
      <p className="text-sm text-slate-500 mt-2 leading-6">{text}</p>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white/80 backdrop-blur border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
              Connexion
            </Link>
            <Link to="/register" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
              Créer un compte
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold mb-5">
              Gestion moderne de bibliothèque
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-950 leading-tight">
              Gérez vos livres et emprunts avec simplicité.
            </h1>

            <p className="text-slate-500 text-lg mt-6 leading-8 max-w-xl">
              Une plateforme moderne pour organiser les livres, suivre les emprunts,
              gérer les utilisateurs et offrir une expérience professionnelle.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/login" className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 shadow-sm">
                Commencer maintenant
              </Link>
              <Link to="/register" className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 shadow-sm">
                Créer un compte
              </Link>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-5">
            <div className="rounded-2xl bg-slate-900 p-5 text-white">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-slate-400 text-sm">Dashboard</p>
                  <h3 className="font-bold text-xl">Vue globale</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ['Livres', '1,284'],
                  ['Utilisateurs', '342'],
                  ['Emprunts', '89'],
                  ['Retards', '12'],
                ].map(([label, value]) => (
                  <div key={label} className="bg-white/10 border border-white/10 rounded-2xl p-4">
                    <p className="text-slate-400 text-xs">{label}</p>
                    <p className="text-2xl font-bold mt-2">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 bg-white rounded-2xl p-4 text-slate-900">
                <p className="text-sm font-bold mb-3">Activité récente</p>
                <div className="space-y-3">
                  <div className="h-3 bg-slate-100 rounded-full w-full" />
                  <div className="h-3 bg-slate-100 rounded-full w-10/12" />
                  <div className="h-3 bg-slate-100 rounded-full w-8/12" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              ['10K+', 'Livres'],
              ['2K+', 'Utilisateurs'],
              ['15K+', 'Emprunts'],
              ['99%', 'Satisfaction'],
            ].map(([value, label]) => (
              <div key={label} className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
                <h3 className="text-3xl font-extrabold text-blue-600">{value}</h3>
                <p className="text-slate-500 text-sm mt-2">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-950">
              Fonctionnalités principales
            </h2>
            <p className="text-slate-500 mt-3">
              Tout ce qu’il faut pour gérer une bibliothèque moderne.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <FeatureCard
              title="Catalogue organisé"
              text="Recherchez, filtrez et gérez tous vos livres facilement avec une interface claire."
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13" />
                </svg>
              }
            />

            <FeatureCard
              title="Suivi des emprunts"
              text="Contrôlez les livres empruntés, rendus et en retard en temps réel."
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9" />
                </svg>
              }
            />

            <FeatureCard
              title="Gestion utilisateurs"
              text="Administrez les membres, rôles et comptes depuis un tableau de bord professionnel."
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between gap-5 flex-wrap mb-10">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-950">
                Livres populaires
              </h2>
              <p className="text-slate-500 mt-3">
                Découvrez les livres les plus consultés.
              </p>
            </div>

            <Link to="/login" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700">
              Explorer
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BOOKS.map(book => (
              <div key={book.title} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="h-72 bg-slate-100">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900">{book.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border-y border-slate-200 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-slate-950 mb-12">
              Ce que disent nos utilisateurs
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                ['Excellent système pour gérer notre bibliothèque.', 'Admin'],
                ['Interface rapide, moderne et facile à utiliser.', 'Bibliothécaire'],
                ['Le suivi des emprunts est devenu beaucoup plus simple.', 'Utilisateur'],
              ].map(([text, role], i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <p className="text-slate-600 leading-7">“{text}”</p>
                  <div className="flex items-center gap-3 mt-5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">Utilisateur {i + 1}</p>
                      <p className="text-xs text-slate-500">{role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="bg-slate-950 rounded-3xl p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Prêt à commencer ?
              </h2>
              <p className="text-slate-400 mt-3 max-w-xl">
                Connectez-vous et gérez votre bibliothèque depuis une interface simple et professionnelle.
              </p>
            </div>

            <Link to="/login" className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 shrink-0">
              Accéder au tableau de bord
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-5">
          <div>
            <Logo />
            <p className="text-slate-400 mt-3">
              Modern Library Management System
            </p>
          </div>

          <div className="text-slate-400 text-sm">
            © 2026 Librarium. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}