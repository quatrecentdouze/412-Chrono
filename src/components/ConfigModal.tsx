import { Clock, Repeat, MessageSquare } from 'lucide-react';
import { TimerConfig } from '../types';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Select } from './ui/Select';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: TimerConfig) => void;
  initialConfig: TimerConfig;
}

export const ConfigModal = ({ isOpen, onClose, onSave, initialConfig }: ConfigModalProps) => {
  const repetitionOptions = [
    ...Array.from({ length: 50 }, (_, i) => ({
      value: String(i + 1),
      label: String(i + 1)
    })),
    { value: 'unlimited', label: 'Illimité' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">Configuration</h2>
        <p className="text-gray-400 text-sm mt-1">Personnalisez vos paramètres</p>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        onSave({
          interval: Number(formData.get('interval')),
          repetitions: formData.get('repetitions') === 'unlimited' ? 'unlimited' : Number(formData.get('repetitions')),
          task: String(formData.get('task')),
        });
        onClose();
      }}>
        <div className="space-y-6">
          <div className="relative">
            <Clock className="absolute left-3 top-9 text-gray-400" size={18} />
            <Input
              label="Intervalle de temps (secondes)"
              type="number"
              name="interval"
              defaultValue={initialConfig.interval}
              min="1"
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Repeat className="absolute left-3 top-9 text-gray-400" size={18} />
            <Select
              label="Nombre de répétitions"
              name="repetitions"
              defaultValue={String(initialConfig.repetitions)}
              options={repetitionOptions}
              className="pl-10"
            />
          </div>

          <div className="relative space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              Votre tâche
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
              <textarea
                name="task"
                defaultValue={initialConfig.task}
                className="w-full bg-gray-800/50 rounded-lg border border-gray-700/50 text-white pl-10 pr-4 py-2 min-h-[100px]
                          focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                          transition-all duration-200 ease-in-out"
                rows={3}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Enregistrer
          </Button>
        </div>
      </form>
    </Modal>
  );
};