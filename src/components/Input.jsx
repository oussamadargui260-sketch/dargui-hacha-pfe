// src/components/Input.jsx
import React, { forwardRef } from 'react';
const Input = forwardRef(({ label, error, hint, icon, iconRight, disabled=false, required=false, type='text', className='', containerClass='', ...props }, ref) => (
  <div className={`flex flex-col gap-1.5 ${containerClass}`}>
    {label && <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>}
    <div className="relative">
      {icon && <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">{icon}</span>}
      <input ref={ref} type={type} disabled={disabled} required={required}
        className={`w-full bg-white border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${error?'border-red-400 focus:ring-red-300':'border-gray-200 hover:border-gray-300'} ${icon?'pl-10':''} ${iconRight?'pr-10':''} ${className}`}
        {...props}/>
      {iconRight && <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">{iconRight}</span>}
    </div>
    {error && <p className="text-xs text-red-600">⚠ {error}</p>}
    {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
  </div>
));
Input.displayName = 'Input';
export default Input;