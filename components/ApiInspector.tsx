
import React, { useState } from 'react';
import { WeightResponse, DeviceInfo } from '../types';

interface Props {
  weightData: WeightResponse;
  deviceInfo: DeviceInfo;
}

const ApiInspector: React.FC<Props> = ({ weightData, deviceInfo }) => {
  const [activeTab, setActiveTab] = useState<'weight' | 'info'>('weight');

  const jsonContent = activeTab === 'weight' ? weightData : deviceInfo;

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col h-full border border-slate-700">
      <div className="bg-slate-900 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
        <h3 className="text-slate-300 font-mono text-sm font-bold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          API HTTP Simulator
        </h3>
        <div className="flex bg-slate-800 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('weight')}
            className={`px-3 py-1 text-xs font-bold rounded ${activeTab === 'weight' ? 'bg-slate-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            GET /weight
          </button>
          <button 
            onClick={() => setActiveTab('info')}
            className={`px-3 py-1 text-xs font-bold rounded ${activeTab === 'info' ? 'bg-slate-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            GET /info
          </button>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-emerald-500 text-xs font-bold font-mono px-2 py-0.5 bg-emerald-500/10 rounded">200 OK</span>
          <span className="text-slate-500 text-xs font-mono truncate">application/json</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 relative group flex-grow">
          <button 
            onClick={() => navigator.clipboard.writeText(JSON.stringify(jsonContent, null, 2))}
            className="absolute top-2 right-2 text-slate-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
            title="Copier le JSON"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <pre className="text-blue-300 font-mono text-xs leading-relaxed whitespace-pre-wrap">
            {JSON.stringify(jsonContent, null, 2)}
          </pre>
        </div>

        <div className="text-[10px] text-slate-500 font-mono leading-tight bg-slate-900/50 p-3 rounded border border-slate-700">
          <p className="font-bold text-slate-400 mb-1">Documentation d'Intégration:</p>
          <ul className="space-y-1">
            <li>• <span className="text-blue-400">GET /weight</span>: Poll toutes les 200ms pour acquisition temps réel.</li>
            <li>• <span className="text-blue-400">POST /tare</span>: Applique la tare système.</li>
            <li>• <span className="text-blue-400">GET /info</span>: Identifie le modèle d'appareil.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApiInspector;
