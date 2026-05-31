// src/pages/admin/Loans.jsx
import React, { useState } from 'react';
import { useLoans } from '../../hooks/useLoans';
import Table, { Pagination } from '../../components/Table';
import { LoanBadge } from '../../components/Badge';
import Button from '../../components/Button';

const TABS = [
  { v: '', l: 'Tous' },
  { v: 'borrowed', l: 'Empruntés' },
  { v: 'returned', l: 'Rendus' },
  { v: 'overdue', l: 'En retard', danger: true },
];

const fmt = d => (d ? new Date(d).toLocaleDateString('fr-FR') : '—');

function WarningIcon() {
  return (
    <svg className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
      />
    </svg>
  );
}

function UserAvatar({ name }) {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
      {name?.[0]?.toUpperCase() ?? '?'}
    </div>
  );
}

export default function Loans() {
  const { loans, meta, loading, params, setPage, setStatus, returnBook } = useLoans();
  const [returning, setReturning] = useState(null);

  const handleReturn = async loan => {
    setReturning(loan.id);
    try {
      await returnBook(loan.id);
    } catch (e) {
      alert(e.response?.data?.message ?? 'Erreur');
    } finally {
      setReturning(null);
    }
  };

  const columns = [
    {
      key: 'user',
      label: 'Utilisateur',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <UserAvatar name={row.user?.name} />
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 text-sm truncate">
              {row.user?.name ?? '—'}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {row.user?.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'book',
      label: 'Livre',
      render: (_, row) => (
        <span className="font-medium text-slate-800">
          {row.book?.title ?? '—'}
        </span>
      ),
    },
    {
      key: 'borrowed_at',
      label: 'Emprunté le',
      render: value => (
        <span className="text-xs text-slate-500">
          {fmt(value)}
        </span>
      ),
    },
    {
      key: 'due_date',
      label: 'Échéance',
      render: (value, row) => (
        <span
          className={`text-xs font-semibold ${
            row.status === 'overdue' ? 'text-red-600' : 'text-slate-500'
          }`}
        >
          {row.status === 'overdue' && <WarningIcon />}
          {fmt(value)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Statut',
      width: '120px',
      render: value => <LoanBadge status={value} />,
    },
    {
      key: 'actions',
      label: '',
      width: '170px',
      render: (_, row) =>
        row.status !== 'returned' ? (
          <Button
            size="xs"
            variant="secondary"
            loading={returning === row.id}
            onClick={() => handleReturn(row)}
          >
            Marquer rendu
          </Button>
        ) : (
          <span className="text-xs text-slate-400">
            {fmt(row.returned_at)}
          </span>
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="page-title">Gestion des Emprunts</h2>
        <p className="page-subtitle">
          {meta.total} emprunt{meta.total !== 1 ? 's' : ''} au total
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {TABS.map(tab => (
          <button
            key={tab.v}
            onClick={() => setStatus(tab.v)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              params.status === tab.v
                ? tab.danger
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-blue-600 text-white border-blue-600'
                : tab.danger
                  ? 'bg-white text-red-500 border-red-200 hover:bg-red-50'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {tab.l}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <Table
          columns={columns}
          data={loans}
          loading={loading}
          empty="Aucun emprunt trouvé"
        />

        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
          <span className="text-xs text-slate-400">
            Page {meta.current_page} sur {meta.last_page}
          </span>

          <Pagination
            page={meta.current_page}
            lastPage={meta.last_page}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}