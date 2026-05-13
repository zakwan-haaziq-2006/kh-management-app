import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 ml-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
        <input
          className={`
            block w-full pl-10 pr-4 py-3 
            text-gray-900 bg-white border border-gray-200 rounded-xl
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
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