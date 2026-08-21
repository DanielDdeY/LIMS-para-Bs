import React from 'react';
import { ShieldAlert, Search, Activity, Skull } from 'lucide-react';

export default function HemovigilanciaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Hemovigilancia y Lookback</h2>
        <p className="text-slate-500 mt-1">Rastreo inverso de reacciones adversas post-transfusionales.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mt-8">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b pb-4 mb-6">
          <ShieldAlert className="text-red-600" /> Disparar Rastreo Inverso (Lookback)
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          Si un paciente reporta una infecciÃ³n transmitida por transfusiÃ³n, escanea el cÃ³digo ISBT de la bolsa sospechosa. El sistema bloquearÃ¡ automÃ¡ticamente todas las donaciones histÃ³ricas y futuras de ese donante en toda la red de salud.
        </p>

        <div className="flex gap-4">
          <input type="text" className="flex-1 border-2 border-red-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-red-100 outline-none font-mono text-lg bg-red-50 text-red-900 placeholder:text-red-300" placeholder="Escanear CÃ³digo ISBT-128 de bolsa infectada..." />
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2">
            <Skull className="w-5 h-5" /> Bloquear Red
          </button>
        </div>
      </div>
    </div>
  );
}