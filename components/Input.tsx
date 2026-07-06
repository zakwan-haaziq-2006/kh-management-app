import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-sm font-bold text-gray-700 ml-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
        <input
          className={`
            block w-full pl-11 pr-4 py-3.5
            text-gray-900 font-semibold bg-white border-2 border-gray-200 rounded-2xl
            placeholder-gray-400
            focus:outline-none focus:ring-4 focus:ring-sky-300/40 focus:border-sky-400
            transition-all duration-200
            ${error ? 'border-red-300 focus:ring-red-500' : ''}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
};