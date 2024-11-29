import { Play, Pause, Settings } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';
import { Button } from './ui/Button';
import { CircleProgress } from './ui/CircleProgress';

interface TimerProps {
  interval: number;
  repetitions: number | 'unlimited';
  task: string;
  onComplete: () => void;
  onConfigClick: () => void;
}

export const Timer = ({ interval, repetitions, task, onComplete, onConfigClick }: TimerProps) => {
  const { timeLeft, currentRep, isActive, toggle } = useTimer(
    interval,
    repetitions === 'unlimited' ? Infinity : repetitions,
    onComplete
  );

  const progress = (timeLeft / interval) * 100;

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Timer Circle */}
      <div className="relative">
        <CircleProgress progress={progress} />
        
        {/* Timer Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl md:text-6xl font-bold text-white mb-2">
            {timeLeft}
            <span className="text-2xl md:text-3xl text-gray-400">s</span>
          </span>
          <span className="text-gray-400 text-sm font-medium">
            Répétition {currentRep}/{repetitions === 'unlimited' ? '∞' : repetitions}
          </span>
        </div>
      </div>

      {/* Task Display and Controls */}
      <div className="w-full space-y-6">
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
          <p className="text-center text-gray-300 text-lg font-medium">
            {task}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button 
            onClick={toggle} 
            className="flex items-center gap-2 min-w-[180px] justify-center text-lg py-3"
          >
            {isActive ? (
              <>
                <Pause size={20} /> Pause
              </>
            ) : (
              <>
                <Play size={20} /> Démarrer
              </>
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={onConfigClick}
            className="flex items-center gap-2 py-3 px-6"
          >
            <Settings size={20} className="transition-transform group-hover:rotate-90" />
            Configurer
          </Button>
        </div>
      </div>
    </div>
  );
};