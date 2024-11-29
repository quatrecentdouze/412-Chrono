import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  children, 
  className,
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'relative px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95',
        'after:absolute after:inset-0 after:rounded-full after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100',
        variant === 'primary' 
          ? 'bg-blue-600 hover:bg-blue-700 text-white after:bg-blue-400/20'
          : 'bg-gray-700 hover:bg-gray-600 text-white after:bg-gray-400/20',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};