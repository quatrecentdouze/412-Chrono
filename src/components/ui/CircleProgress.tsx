import { useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';

interface CircleProgressProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: 'w-48 h-48',
  md: 'w-64 h-64',
  lg: 'w-80 h-80',
};

export const CircleProgress = ({ 
  progress, 
  size = 'lg',
  className 
}: CircleProgressProps) => {
  const circleRef = useRef<SVGCircleElement>(null);
  
  useEffect(() => {
    if (!circleRef.current) return;
    
    const circle = circleRef.current;
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    
    // Start from full and decrease
    const offset = circumference - (progress / 100) * circumference;
    
    // Smooth transition
    circle.style.transition = 'stroke-dashoffset 0.5s ease-in-out';
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset.toString();
  }, [progress]);

  return (
    <div className={cn("relative", SIZES[size], className)}>
      <svg className="w-full h-full transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="50%"
          cy="50%"
          r="48%"
          className="stroke-gray-800/40 fill-none"
          strokeWidth="2"
        />
        {/* Progress circle */}
        <circle
          ref={circleRef}
          cx="50%"
          cy="50%"
          r="48%"
          className="stroke-blue-500 fill-none"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};