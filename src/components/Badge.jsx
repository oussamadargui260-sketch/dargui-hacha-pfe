import React from 'react';

const Badge = ({ status }) => {
  const getStyles = () => {
    switch (status?.toLowerCase()) {
      case 'available': case 'disponible': return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case 'loaned': case 'emprunté': return "bg-amber-100 text-amber-700 border-amber-200";
      case 'overdue': return "bg-rose-100 text-rose-700 border-rose-200";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStyles()}`}>
      {status}
    </span>
  );
};

export default Badge;