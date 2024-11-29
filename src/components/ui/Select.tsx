import { SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'options'> {
  label?: string;
  options: SelectOption[];
}

export const Select = ({ label, options, className, ...props }: SelectProps) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={cn(
            "w-full bg-gray-800/50 rounded-lg border border-gray-700/50 text-white",
            "px-4 py-2.5 pr-10 appearance-none",
            "transition-all duration-200 ease-in-out",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
            "hover:bg-gray-800/70",
            "text-base leading-6",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="bg-gray-900 text-white py-3 px-2"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
  );
};