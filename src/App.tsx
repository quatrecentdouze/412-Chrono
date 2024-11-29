import { useState } from 'react';
import { Settings } from 'lucide-react';
import { Timer } from './components/Timer';
import { ConfigModal } from './components/ConfigModal';
import { Button } from './components/ui/Button';
import { AnimatedTitle } from './components/ui/AnimatedTitle';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { TimerConfig } from './types';

function App() {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [config, setConfig] = useLocalStorage<TimerConfig>('timerConfig', {
    interval: 30,
    repetitions: 5,
    task: "Réalisez votre tâche !",
  });

  const handleConfigSave = (newConfig: TimerConfig) => {
    setConfig(newConfig);
    setIsConfigOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header Section */}
      <header className="pt-12 pb-8 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <AnimatedTitle>412-Chrono</AnimatedTitle>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed tracking-wide">
            Configurez un intervalle de temps et un nombre de répétitions. 
            À chaque intervalle, un son vous rappellera votre tâche planifiée.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-12">
          {/* Timer Section */}
          <div className="w-full max-w-2xl bg-gray-900/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-800/30">
            <Timer
              interval={config.interval}
              repetitions={config.repetitions}
              task={config.task}
              onComplete={() => console.log('Timer completed')}
              onConfigClick={() => setIsConfigOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Configuration Modal */}
      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onSave={handleConfigSave}
        initialConfig={config}
      />
    </div>
  );
}

export default App;