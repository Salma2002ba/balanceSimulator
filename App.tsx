
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { WeightResponse, DeviceInfo, SimulationState } from './types';
import BalanceDisplay from './components/BalanceDisplay';
import Controls from './components/Controls';
import ApiInspector from './components/ApiInspector';

const DEVICE_INFO: DeviceInfo = {
  manufacturer: "METTLER TOLEDO",
  model: "XP6U",
  protocol: "MT-SICS (simulé)",
  note: "Simulation logicielle uniquement"
};

const App: React.FC = () => {
  // Base state
  const [baseWeight, setBaseWeight] = useState<number>(0.000);
  const [isStable, setIsStable] = useState<boolean>(true);
  const [isNoiseEnabled, setIsNoiseEnabled] = useState<boolean>(true);
  const [tareValue, setTareValue] = useState<number>(0.000);
  
  // Real-time derived state
  const [currentWeight, setCurrentWeight] = useState<number>(0.000);
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toISOString());

  // Simulation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      let noise = 0;
      
      if (isNoiseEnabled) {
        if (!isStable) {
          // Unstable mode: noise ±0.02 g
          noise = (Math.random() - 0.5) * 0.04;
        } else {
          // Stable mode: slow drift ±0.002 g
          noise = (Math.random() - 0.5) * 0.004;
        }
      }

      const calculated = Math.max(0, baseWeight + noise - tareValue);
      setCurrentWeight(calculated);
      setLastUpdate(new Date().toISOString());
    }, 200);

    return () => clearInterval(interval);
  }, [baseWeight, isStable, isNoiseEnabled, tareValue]);

  const handleTare = useCallback(() => {
    // Current weight becomes the new relative zero
    // Wait, typically tare in lab balances is additive to the tare register
    setTareValue(prev => prev + currentWeight);
  }, [currentWeight]);

  const handleResetTare = useCallback(() => {
    setTareValue(0);
  }, []);

  const getWeightData = (): WeightResponse => ({
    value: parseFloat(currentWeight.toFixed(3)),
    unit: 'g',
    stable: isStable,
    timestamp: lastUpdate
  });

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8">
      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-end border-b border-slate-300 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            {DEVICE_INFO.manufacturer} <span className="text-blue-600">{DEVICE_INFO.model}</span>
          </h1>
          <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Simulateur de Balance de Précision</p>
        </div>
        <div className="text-right">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isStable ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {isStable ? 'STABLE' : 'INSTABLE'}
          </span>
        </div>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Physical Interface Simulation */}
        <div className="flex flex-col gap-6">
          <BalanceDisplay 
            weight={currentWeight} 
            unit="g" 
            stable={isStable} 
          />
          
          <Controls 
            baseWeight={baseWeight}
            onBaseWeightChange={setBaseWeight}
            isStable={isStable}
            onToggleStability={() => setIsStable(!isStable)}
            isNoiseEnabled={isNoiseEnabled}
            onToggleNoise={() => setIsNoiseEnabled(!isNoiseEnabled)}
            onTare={handleTare}
            onResetTare={handleResetTare}
            tareValue={tareValue}
          />
        </div>

        {/* Right Column: API & Integration View */}
        <div className="flex flex-col gap-6">
          <ApiInspector 
            weightData={getWeightData()} 
            deviceInfo={DEVICE_INFO} 
          />
        </div>
      </main>

      <footer className="mt-auto pt-8 text-slate-400 text-sm italic">
        {DEVICE_INFO.note} — Destiné au développement logiciel uniquement.
      </footer>
    </div>
  );
};

export default App;
