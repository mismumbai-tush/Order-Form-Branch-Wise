import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false,
  disabled = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95 focus:ring-blue-300",
    secondary: "bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 focus:ring-blue-300",
    success: "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg active:scale-95 focus:ring-green-300",
    danger: "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg active:scale-95 focus:ring-red-300",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-300"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  );
};