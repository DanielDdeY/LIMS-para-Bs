import React, { useState } from 'react';
import { Search, HeartPulse, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function TransfusionesPage() {
  const [matchStatus, setMatchStatus] = useState<'pending' | 'compatible' | 'incompatible'>('pending');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Transfusiones y Crossmatch</h2>
        <p className="text-slate-500">Valida la compatibilidad antes de liberar una bolsa de sangre.</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        {/* Paciente Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 border-b pb-4 mb-4">
            <HeartPulse className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">Datos del Paciente</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">ID / DNI del Paciente</label>
              <div className="flex gap-2 mt-1">
                <input type="text" className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Escanear DNI..." defaultValue="45120938" />
                <button className="bg-slate-100 p-2 rounded-lg hover:bg-slate-200 text-slate-600"><Search className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between border border-blue-100">
              <div>
                <p className="text-sm text-blue-600 font-medium">Receptor Seleccionado:</p>
                <p className="text-lg font-bold text-slate-800">Jorge Ramírez</p>
              </div>
              <div className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-black shadow-md border-4 border-white">
                A+
              </div>
            </div>
          </div>
        </div>

        {/* Bolsa de Sangre Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 border-b pb-4 mb-4">
            <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center text-white font-bold text-xs">B</div>
            <h3 className="text-lg font-semibold text-slate-800">Unidad de Sangre</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Escanear Código ISBT-128</label>
              <div className="flex gap-2 mt-1">
                <input type="text" className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none font-mono" placeholder="=W1234..." defaultValue="=W1234 26 55891 00" />
                <button className="bg-slate-100 p-2 rounded-lg hover:bg-slate-200 text-slate-600"><Search className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg flex items-center justify-between border border-red-100">
              <div>
                <p className="text-sm text-red-600 font-medium">Bolsa Seleccionada:</p>
                <p className="text-lg font-bold text-slate-800 font-mono text-sm mt-1">ID: W1234-26-55891</p>
              </div>
              <div className="bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-black shadow-md border-4 border-white">
                B+
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crossmatch Result */}
      <div className="mt-8 flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-xl shadow-sm">
        <button 
          onClick={() => setMatchStatus('incompatible')}
          className="bg-slate-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold text-lg mb-6 shadow-lg transition-transform active:scale-95"
        >
          EJECUTAR CROSSMATCH
        </button>

        {matchStatus === 'incompatible' && (
          <div className="bg-red-100 border-2 border-red-500 text-red-700 w-full p-6 rounded-xl flex items-center gap-4 shadow-sm animate-pulse">
            <AlertTriangle className="w-12 h-12 text-red-600 shrink-0" />
            <div>
              <h4 className="text-xl font-black uppercase tracking-wide">¡ALERTA CRÍTICA DE INCOMPATIBILIDAD!</h4>
              <p className="font-medium mt-1">Un paciente A+ no puede recibir sangre B+. Esto causaría una reacción hemolítica fatal.</p>
              <p className="text-sm font-bold mt-2 bg-red-200 inline-block px-3 py-1 rounded text-red-800">TRANSFUSIÓN BLOQUEADA POR EL SISTEMA</p>
            </div>
          </div>
        )}

        {matchStatus === 'compatible' && (
          <div className="bg-emerald-100 border-2 border-emerald-500 text-emerald-800 w-full p-6 rounded-xl flex items-center gap-4 shadow-sm">
            <ShieldCheck className="w-12 h-12 text-emerald-600 shrink-0" />
            <div>
              <h4 className="text-xl font-black uppercase tracking-wide">Compatibilidad Confirmada</h4>
              <p className="font-medium mt-1">La unidad seleccionada es apta para este paciente.</p>
              <button className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm">
                Generar Etiqueta de Despacho
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
