import { cn } from '../../utils/cn';

interface AnimatedTitleProps {
  className?: string;
  children: React.ReactNode;
}

export const AnimatedTitle = ({ className, children }: AnimatedTitleProps) => {
  return (
    <h1 
      className={cn(
        "text-7xl font-bold text-transparent bg-clip-text",
        "bg-gradient-to-r from-blue-500 via-purple-400 to-blue-500",
        "bg-[length:200%_auto] animate-gradient-x",
        "transition-transform duration-300 hover:scale-105",
        className
      )}
    >
      {children}
    </h1>
  );
};