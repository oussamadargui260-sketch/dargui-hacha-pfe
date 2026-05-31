// src/pages/admin/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useDashboard } from '../../hooks/UseDashboard';
import { LoanBadge } from '../../components/Badge';
import Button from '../../components/Button';

const PATHS = {
  books:
    'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  users:
    'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  loans:
    'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  alert:
    'M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z',
  add: 'M12 4v16m8-8H4',
};

function Icon({ name, className = '' }) {
  return (
    <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={PATHS[name]} />
    </svg>
  );
}

function StatCard({ label, value, icon, change, up, color }) {
  const pal = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pal[color]}`}>
          <Icon name={icon} />
        </div>

        {change && (
          <span className={`text-xs font-semibold ${up ? 'text-green-600' : 'text-red-500'}`}>
            {up ? '↑' : '↓'} {change}
          </span>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
          {label}
        </p>
        <p className="text-3xl font-bold text-slate-900 tracking-tight">
          {value ?? '—'}
        </p>
      </div>
    </div>
  );
}

function ActivityRow({ avatar, name, action, book, time, status }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
        {avatar}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-800 truncate">
          <span className="font-semibold">{name}</span>{' '}
          <span className="text-slate-500">{action}</span>{' '}
          <span className="font-medium">«{book}»</span>
        </p>
        <p className="text-xs text-slate-400 mt-0.5">{time}</p>
      </div>

      <LoanBadge status={status} />
    </div>
  );
}

function TopBooks() {
  const books = [
    { title: 'Dune', author: 'Frank Herbert', count: 34 },
    { title: '1984', author: 'George Orwell', count: 29 },
    { title: 'Sapiens', author: 'Yuval Noah Harari', count: 22 },
    { title: 'Clean Code', author: 'Robert C. Martin', count: 18 },
  ];

  const max = Math.max(...books.map(book => book.count));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-900">
          Livres les plus empruntés
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Classement des livres populaires
        </p>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {books.map((book, index) => (
          <div key={book.title} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                #{index + 1}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {book.title}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {book.author} • {book.count} emprunts
                </p>
              </div>
            </div>

            <div className="w-24 h-2 rounded-full bg-slate-100 overflow-hidden shrink-0">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${(book.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const monthlyLoans = [
  { month: 'Jan', emprunts: 12, retours: 8 },
  { month: 'Fév', emprunts: 18, retours: 14 },
  { month: 'Mar', emprunts: 15, retours: 11 },
  { month: 'Avr', emprunts: 26, retours: 19 },
  { month: 'Mai', emprunts: 31, retours: 24 },
  { month: 'Juin', emprunts: 28, retours: 22 },
];

const categoryData = [
  { name: 'Fiction', value: 78, color: '#2563eb' },
  { name: 'Sciences', value: 54, color: '#22c55e' },
  { name: 'Histoire', value: 41, color: '#f59e0b' },
  { name: 'Technologie', value: 35, color: '#8b5cf6' },
  { name: 'Philosophie', value: 22, color: '#ec4899' },
];

const statusData = [
  { name: 'Empruntés', value: 9, color: '#2563eb' },
  { name: 'Rendus', value: 14, color: '#22c55e' },
  { name: 'En retard', value: 3, color: '#ef4444' },
];

export default function Dashboard() {
  const { stats, loading } = useDashboard();
  const navigate = useNavigate();

  const cards = [
    {
      label: 'Total Livres',
      value: stats?.total_books,
      icon: 'books',
      color: 'blue',
      change: '+12 ce mois',
      up: true,
    },
    {
      label: 'Utilisateurs',
      value: stats?.total_users,
      icon: 'users',
      color: 'green',
      change: '+28 ce mois',
      up: true,
    },
    {
      label: 'Emprunts actifs',
      value: stats?.active_loans,
      icon: 'loans',
      color: 'amber',
      change: "+5 aujourd'hui",
      up: true,
    },
    {
      label: 'En retard',
      value: stats?.overdue_loans,
      icon: 'alert',
      color: 'red',
      change: 'Attention',
      up: false,
    },
  ];

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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="page-title">Tableau de bord</h2>
          <p className="page-subtitle">Vue d'ensemble de votre bibliothèque</p>
        </div>

        <Button
          onClick={() => navigate('/admin/books/create')}
          icon={<Icon name="add" className="w-4 h-4" />}
        >
          Ajouter un livre
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Évolution des emprunts</h3>
            <p className="text-xs text-slate-400 mt-1">Emprunts et retours par mois</p>
          </div>

          <div className="h-72 p-5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyLoans}>
                <defs>
                  <linearGradient id="empruntsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="retoursGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="emprunts"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fill="url(#empruntsGradient)"
                />

                <Area
                  type="monotone"
                  dataKey="retours"
                  stroke="#22c55e"
                  strokeWidth={3}
                  fill="url(#retoursGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Statut des emprunts</h3>
            <p className="text-xs text-slate-400 mt-1">Répartition actuelle</p>
          </div>

          <div className="h-72 p-5">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={88}
                  dataKey="value"
                  paddingAngle={5}
                >
                  {statusData.map(item => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="px-5 pb-5 flex flex-col gap-2">
            {statusData.map(item => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Activité récente</h3>

            <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              En direct
            </span>
          </div>

          <div className="px-5">
            <ActivityRow avatar="J" name="James Doe" action="a emprunté" book="Dune" time="il y a 2 min" status="borrowed" />
            <ActivityRow avatar="A" name="Alice Smith" action="a rendu" book="1984" time="il y a 18 min" status="returned" />
            <ActivityRow avatar="M" name="Mark K." action="retard sur" book="Le Grand Gatsby" time="3 jours de retard" status="overdue" />
            <ActivityRow avatar="N" name="Nadia B." action="a emprunté" book="Sapiens" time="il y a 1h" status="borrowed" />
          </div>
        </div>

        <TopBooks />

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Utilisation bibliothèque</h3>
            <p className="text-xs text-slate-400 mt-1">Capacité et disponibilité</p>
          </div>

          <div className="p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-extrabold text-slate-900">82%</p>
                <p className="text-sm text-slate-500 mt-1">Taux d’utilisation</p>
              </div>

              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                Stable
              </span>
            </div>

            <div className="h-3 bg-slate-100 rounded-full overflow-hidden mt-5">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '82%' }} />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <p className="text-xs text-slate-400 font-semibold">Disponibles</p>
                <p className="text-lg font-bold text-slate-900 mt-1">68%</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <p className="text-xs text-slate-400 font-semibold">Empruntés</p>
                <p className="text-lg font-bold text-slate-900 mt-1">32%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Emprunts par catégorie</h3>
          <p className="text-xs text-slate-400 mt-1">Catégories les plus populaires</p>
        </div>

        <div className="h-80 p-5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} width={90} />
              <Tooltip />

              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {categoryData.map(item => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="px-5 pb-4">
          <Button
            variant="secondary"
            fullWidth
            size="sm"
            onClick={() => navigate('/admin/loans')}
          >
            Voir tous les emprunts
          </Button>
        </div>
      </div>
    </div>
  );
}