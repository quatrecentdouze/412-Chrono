import { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, className, ...props }: InputProps) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full bg-gray-800/50 rounded-lg border border-gray-700/50 text-white px-4 py-2",
          "transition-all duration-200 ease-in-out",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
          "placeholder:text-gray-500",
          className
        )}
        {...props}
      />
    </div>
  );
};