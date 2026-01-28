
import React from 'react';

interface Props {
  weight: number;
  unit: string;
  stable: boolean;
}

const BalanceDisplay: React.FC<Props> = ({ weight, unit, stable }) => {
  return (
    <div className="bg-slate-900 rounded-lg p-8 shadow-inner border-4 border-slate-700 relative overflow-hidden">
      {/* Stability Indicator Circle */}
      <div className={`absolute top-4 left-4 w-3 h-3 rounded-full transition-colors duration-300 ${stable ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-yellow-500 animate-pulse'}`} />
      
      <div className="flex flex-col items-center">
        <div className="flex items-baseline gap-2">
          <span className="lcd-font text-6xl md:text-7xl font-bold text-emerald-400 tracking-tighter tabular-nums">
            {weight.toFixed(3)}
          </span>
          <span className="lcd-font text-2xl font-medium text-emerald-600">
            {unit}
          </span>
        </div>
        <div className="mt-2 text-emerald-900 text-xs font-bold tracking-widest uppercase">
          {stable ? 'Measurement Stable' : 'Wait for Stability...'}
        </div>
      </div>
      
      {/* Background Grid Pattern for LCD feel */}
      <div className="absolute inset-0 pointer-events-none opacity-5" 
           style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px'}} />
    </div>
  );
};

export default BalanceDisplay;
