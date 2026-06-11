// src/pages/admin/Users.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';
import { useAuth } from '../../contexts/AuthContext';
import Table, { Pagination } from '../../components/Table';
import { RoleBadge } from '../../components/Badge';
import Button from '../../components/Button';

const fmt = d => (d ? new Date(d).toLocaleDateString('fr-FR') : '—');

function UserPlusIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
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

export default function Users() {
  const navigate = useNavigate();
  const { user: me } = useAuth();
  const { users, meta, loading, setPage, setSearch, setRole, params, deleteUser } = useUsers();

  const [search, setLocalSearch] = useState('');
  const [deleting, setDeleting] = useState(null);

  const handleSearch = value => {
    setLocalSearch(value);
    setSearch(value);
  };

  const handleDelete = async selectedUser => {
    if (selectedUser.id === me?.id) {
      alert('Vous ne pouvez pas supprimer votre propre compte.');
      return;
    }

    if (!window.confirm(`Supprimer «${selectedUser.name}» ?`)) return;

    setDeleting(selectedUser.id);

    try {
      await deleteUser(selectedUser.id);
    } catch (e) {
      alert(e.response?.data?.message ?? 'Erreur');
    } finally {
      setDeleting(null);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Utilisateur',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
            {row.name?.[0]?.toUpperCase() ?? '?'}
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-slate-900 text-sm truncate">
              {row.name}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Rôle',
      width: '100px',
      render: value => <RoleBadge role={value} />,
    },
    {
      key: 'created_at',
      label: 'Inscrit le',
      render: value => (
        <span className="text-xs text-slate-500">
          {fmt(value)}
        </span>
      ),
    },
    {
      key: 'loans_count',
      label: 'Prêts actifs',
      width: '120px',
      render: value => (
        <span className={`text-sm font-semibold ${value > 0 ? 'text-blue-600' : 'text-slate-400'}`}>
          {value ?? 0}
        </span>
      ),
    },
    {
      key: 'actions',
      label: '',
      width: '130px',
      render: (_, row) =>
        row.id === me?.id || row.role === 'admin' ? (
          <span className="text-xs text-slate-300 italic">
            Protégé
          </span>
        ) : (
          <Button
            size="xs"
            variant="danger"
            loading={deleting === row.id}
            onClick={() => handleDelete(row)}
          >
            Supprimer
          </Button>
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="page-title">Utilisateurs</h2>
          <p className="page-subtitle">
            {meta.total} membre{meta.total !== 1 ? 's' : ''} enregistré{meta.total !== 1 ? 's' : ''}
          </p>
        </div>

        <Button
          onClick={() => navigate('/admin/users/create')}
          icon={<UserPlusIcon />}
        >
          Créer un utilisateur
        </Button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 flex-wrap">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 w-64 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
            <SearchIcon />

            <input
              value={search}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Rechercher un utilisateur…"
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
            value={params.role || ''}
            onChange={e => setRole(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="">Tous les rôles</option>
            <option value="admin">Admin</option>
            <option value="user">Utilisateur</option>
          </select>
        </div>

        <Table
          columns={columns}
          data={users}
          loading={loading}
          empty="Aucun utilisateur trouvé"
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
      </div>
    </div>
  );
}