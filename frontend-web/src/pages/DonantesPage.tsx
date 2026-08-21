import React, { useState } from 'react';
import { Search, UserPlus, Dna } from 'lucide-react';

export default function DonantesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">GestiÃ³n de Donantes y FenotipificaciÃ³n</h2>
          <p className="text-slate-500 mt-1">Registro avanzado con serologÃ­a extendida y fenotipos raros.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-sm transition-all active:scale-95"
        >
          {showForm ? <Search className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          {showForm ? 'Ver Historial General' : 'Registrar Nuevo Donante'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <Dna className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Formulario ClÃ­nico Avanzado</h3>
          </div>
          
          <form className="space-y-8">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3"><h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">1. Datos DemogrÃ¡ficos</h4></div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">DNI / Pasaporte</label>
                <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white transition-colors" placeholder="NÂ° Documento" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nombres</label>
                <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Nombres del donante" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Apellidos</label>
                <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Apellidos" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 border-t border-slate-100 pt-6">
              <div className="col-span-4"><h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">2. TipificaciÃ³n SanguÃ­nea Global (ISBT 128)</h4></div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Sistema ABO</label>
                <select className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold text-slate-800">
                  <option>O</option><option>A</option><option>B</option><option>AB</option>
                  <option>Fenotipo Bombay (Oh)</option>
                  <option>Para-Bombay</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Factor Rh (AntÃ­geno D)</label>
                <select className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold text-slate-800">
                  <option>POSITIVO (D+)</option><option>NEGATIVO (D-)</option>
                  <option>D DÃ©bil (Weak D)</option>
                  <option>D Parcial (Partial D)</option>
                  <option>Rh Nulo (Sangre Dorada)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Sistema Kell</label>
                <select className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-700">
                  <option>K- k+ (ComÃºn)</option><option>K+ k-</option><option>K+ k+</option><option>K0 (Kell null)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Sistema Duffy</label>
                <select className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-700">
                  <option>Fy(a+b-)</option><option>Fy(a-b+)</option><option>Fy(a+b+)</option><option>Fy(a-b-)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Sistema Kidd</label>
                <select className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-700">
                  <option>Jk(a+b-)</option><option>Jk(a-b+)</option><option>Jk(a+b+)</option><option>Jk(a-b-) nulo</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">MNSs</label>
                <select className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-700">
                  <option>M+ N- S+ s-</option><option>Otras variantes...</option>
                </select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-semibold text-slate-700">Otros Anticuerpos Irregulares (Diego, Lutheran, Lewis)</label>
                <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Especificar si existe..." />
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95">
                Generar ISBT-128 e Imprimir Pulsera
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-4 font-bold">Documento</th>
                <th className="p-4 font-bold">Nombre Completo</th>
                <th className="p-4 font-bold">Tipo Primario</th>
                <th className="p-4 font-bold">Fenotipo Raro (Alertas)</th>
                <th className="p-4 font-bold">Estatus ClÃ­nico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-blue-50/50 transition-colors cursor-pointer">
                <td className="p-4 font-mono text-sm font-medium">74581290</td>
                <td className="p-4 font-medium">Carlos Mendoza</td>
                <td className="p-4"><span className="bg-red-100 text-red-800 px-3 py-1.5 rounded-lg font-black text-sm shadow-sm border border-red-200">O POSITIVO</span></td>
                <td className="p-4 text-sm text-slate-400">Ninguno detectado</td>
                <td className="p-4"><span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">Apto</span></td>
              </tr>
              <tr className="hover:bg-blue-50/50 transition-colors cursor-pointer bg-amber-50/30">
                <td className="p-4 font-mono text-sm font-medium">45829104</td>
                <td className="p-4 font-medium">MarÃ­a FernÃ¡ndez</td>
                <td className="p-4"><span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg font-black text-sm shadow-sm border border-blue-200">A NEGATIVO</span></td>
                <td className="p-4 text-sm"><span className="bg-amber-100 text-amber-800 px-2 py-1 rounded font-bold">Kidd Null Jk(a-b-)</span></td>
                <td className="p-4"><span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">Donante Exclusiva</span></td>
              </tr>
              <tr className="hover:bg-blue-50/50 transition-colors cursor-pointer bg-purple-50/30">
                <td className="p-4 font-mono text-sm font-medium">99120344</td>
                <td className="p-4 font-medium">Thomas Creed</td>
                <td className="p-4"><span className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-lg font-black text-sm shadow-sm border border-purple-200">Rh NULO</span></td>
                <td className="p-4 text-sm"><span className="bg-purple-600 text-white px-2 py-1 rounded font-bold animate-pulse">SANGRE DORADA</span></td>
                <td className="p-4"><span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">Apto</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}