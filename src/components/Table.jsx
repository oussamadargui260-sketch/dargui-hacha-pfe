// src/components/Table.jsx
import React from 'react';

export default function Table({ columns=[], data=[], loading=false, empty='Aucune donnée', onRowClick }) {
  if (loading) return (
    <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
      <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
      <span className="text-sm">Chargement…</span>
    </div>
  );
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            {columns.map(c => <th key={c.key} style={c.width?{width:c.width}:{}} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{c.label}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.length===0
            ? <tr><td colSpan={columns.length} className="py-14 text-center text-sm text-gray-400">{empty}</td></tr>
            : data.map((row,i) => (
              <tr key={row.id??i} onClick={()=>onRowClick?.(row)} className={`transition-colors ${onRowClick?'cursor-pointer hover:bg-blue-50/40':'hover:bg-gray-50/60'}`}>
                {columns.map(c => <td key={c.key} className="px-4 py-3.5 text-sm text-gray-700 align-middle">{c.render?c.render(row[c.key],row):(row[c.key]??'—')}</td>)}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export function Pagination({ page, lastPage, onPageChange }) {
  if (!lastPage || lastPage <= 1) return null;
  const btn = 'w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors';
  const pages = lastPage<=7 ? Array.from({length:lastPage},(_,i)=>i+1) : [1,'…',...Array.from({length:3},(_,i)=>Math.max(2,Math.min(lastPage-1,page-1+i))).filter((v,i,a)=>a.indexOf(v)===i),'…',lastPage];
  return (
    <div className="flex items-center gap-1 justify-end mt-4 px-4 pb-2">
      <button onClick={()=>onPageChange(page-1)} disabled={page===1} className={`${btn} border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40`}>‹</button>
      {Array.from({length:lastPage},(_,i)=>i+1).map(p=>(
        <button key={p} onClick={()=>onPageChange(p)} className={`${btn} ${p===page?'bg-blue-600 text-white':'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{p}</button>
      ))}
      <button onClick={()=>onPageChange(page+1)} disabled={page===lastPage} className={`${btn} border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40`}>›</button>
    </div>
  );
}