
import React from 'react';

interface Props {
  baseWeight: number;
  onBaseWeightChange: (val: number) => void;
  isStable: boolean;
  onToggleStability: () => void;
  isNoiseEnabled: boolean;
  onToggleNoise: () => void;
  onTare: () => void;
  onResetTare: () => void;
  tareValue: number;
}

const Controls: React.FC<Props> = ({
  baseWeight,
  onBaseWeightChange,
  isStable,
  onToggleStability,
  isNoiseEnabled,
  onToggleNoise,
  onTare,
  onResetTare,
  tareValue
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-6">
      <h3 className="font-bold text-slate-700 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0L7.15 8.78H3a1 1 0 000 2h4.15l1.36 5.61c.38 1.56 2.6 1.56 2.98 0l1.36-5.61H17a1 1 0 100-2h-4.15l-1.36-5.61z" clipRule="evenodd" />
        </svg>
        Panneau de Contrôle
      </h3>

      <div className="space-y-4">
        {/* Base Weight Input */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 uppercase">Poids de base (g)</label>
          <input 
            type="number" 
            step="0.001"
            value={baseWeight}
            onChange={(e) => onBaseWeightChange(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-lg"
          />
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onToggleStability}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isStable ? 'bg-slate-100 text-slate-600 border border-slate-200' : 'bg-yellow-500 text-white shadow-md'}`}
          >
            {isStable ? 'Mettre Instable' : 'Forcer Stable'}
          </button>
          <button 
            onClick={onToggleNoise}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isNoiseEnabled ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}
          >
            {isNoiseEnabled ? 'Bruit Activé' : 'Bruit Désactivé'}
          </button>
        </div>

        {/* Tare Operations */}
        <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
           <div className="flex justify-between items-center text-sm">
             <span className="text-slate-500">Tare actuelle:</span>
             <span className="font-mono font-bold text-blue-600">{tareValue.toFixed(3)} g</span>
           </div>
           <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={onTare}
              className="bg-slate-800 text-white py-4 rounded-lg font-bold text-lg hover:bg-slate-700 active:scale-95 transition-all shadow-lg uppercase tracking-widest"
            >
              Tare
            </button>
            <button 
              onClick={onResetTare}
              className="bg-slate-100 text-slate-600 py-4 rounded-lg font-bold border border-slate-200 hover:bg-white transition-all uppercase text-xs"
            >
              Reset Tare
            </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
