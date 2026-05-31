// src/components/Card.jsx
import React from 'react';

export default function Card({ children, className = '', hover = false, noPadding = false }) {
  return (
    <div className={`
      bg-white border border-gray-200 rounded-xl
      ${hover ? 'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : ''}
      ${noPadding ? '' : 'p-5'}
      ${className}
    `}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-center justify-between px-5 py-4 border-b border-gray-100 ${className}`}>
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

export function StatCard({ label, value, icon, change, changeType = 'up', color = 'blue' }) {
  const pal = {
    blue:   'bg-blue-50   text-blue-600',
    green:  'bg-green-50  text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red:    'bg-red-50    text-red-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${pal[color]}`}>
          {icon}
        </div>
        {change && (
          <span className={`text-xs font-medium ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {changeType === 'up' ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
        <p className="text-3xl font-semibold text-gray-900 tracking-tight">{value ?? '—'}</p>
      </div>
    </div>
  );
}