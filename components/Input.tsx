import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({ label, containerClassName = "", className = "", ...props }) => {
  return (
    <div className={`flex flex-col ${containerClassName}`}>
      {label && <label className="mb-2 text-sm font-semibold text-gray-800">{label}</label>}
      <input
        className={`w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
    </div>
  );
};

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string, containerClassName?: string }> = ({ label, containerClassName = "", className = "", children, ...props }) => {
  return (
    <div className={`flex flex-col ${containerClassName}`}>
      {label && <label className="mb-2 text-sm font-semibold text-gray-800">{label}</label>}
      <select
        className={`w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed appearance-none ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          paddingRight: '36px'
        }}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};