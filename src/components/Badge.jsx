import React from 'react';

const V = {
  success:'bg-green-50 text-green-700 border-green-200',
  danger:'bg-red-50 text-red-700 border-red-200',
  warning:'bg-amber-50 text-amber-700 border-amber-200',
  info:'bg-blue-50 text-blue-700 border-blue-200',
  gray:'bg-slate-100 text-slate-600 border-slate-200',
  purple:'bg-violet-50 text-violet-700 border-violet-200'
};

const D = {
  success:'bg-green-500',
  danger:'bg-red-500',
  warning:'bg-amber-500',
  info:'bg-blue-500',
  gray:'bg-slate-400',
  purple:'bg-violet-500'
};

export default function Badge({
  children,
  variant = 'gray',
  dot = false,
  className = ''
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap ${V[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${D[variant]}`}
        />
      )}
      {children}
    </span>
  );
}

export function LoanBadge({ status }) {
  const M = {
    borrowed: ['info', 'Emprunté'],
    returned: ['success', 'Rendu'],
    overdue: ['danger', 'En retard']
  };

  const [v, l] = M[status] ?? ['gray', status];

  return (
    <Badge variant={v} dot>
      {l}
    </Badge>
  );
}

export function AvailBadge({ available }) {
  if (available === 0)
    return (
      <Badge variant="danger" dot>
        Indisponible
      </Badge>
    );

  if (available <= 2)
    return (
      <Badge variant="warning" dot>
        {available} restant{available > 1 ? 's' : ''}
      </Badge>
    );

  return (
    <Badge variant="success" dot>
      Disponible
    </Badge>
  );
}

export function RoleBadge({ role }) {
  return (
    <Badge variant={role === 'admin' ? 'purple' : 'gray'}>
      {role}
    </Badge>
  );
}