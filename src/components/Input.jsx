import React from 'react';

const Input = ({ label, type = "text", placeholder, value, onChange, name, error }) => {
  return (
    <div className="flex flex-col gap-1.5 mb-4 w-full">
      {label && <label className="text-sm font-semibold text-slate-700 ml-1">{label}</label>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border ${error ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-2.5 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all`}
      />
      {error && <span className="text-xs text-red-500 mt-1 ml-1">{error}</span>}
    </div>
  );
};

export default Input;