import React, { useState } from 'react';
import { Search, Plus, UserPlus, Calendar } from 'lucide-react';

export default function DonantesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Gestión de Donantes</h2>
          <p className="text-slate-500">Registra y administra los donantes del banco de sangre.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          {showForm ? <Search className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
          {showForm ? 'Ver Historial' : 'Nuevo Donante'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 border-b pb-4 mb-6">Formulario Clínico de Donación</h3>
          <form className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Documento de Identidad (DNI)</label>
              <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej. 74839201" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Nombres Completos</label>
              <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Grupo Sanguíneo</label>
              <select className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                <option>O</option><option>A</option><option>B</option><option>AB</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Factor Rh</label>
              <select className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                <option>POSITIVO (+)</option><option>NEGATIVO (-)</option>
              </select>
            </div>
            
            <div className="col-span-2 mt-4 flex justify-end">
              <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium">
                Guardar y Generar Bolsa
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-4 font-medium">ID / DNI</th>
                <th className="p-4 font-medium">Nombre</th>
                <th className="p-4 font-medium">Tipo de Sangre</th>
                <th className="p-4 font-medium">Última Donación</th>
                <th className="p-4 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-mono text-sm">74581290</td>
                <td className="p-4">Carlos Mendoza</td>
                <td className="p-4"><span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold text-sm">O+</span></td>
                <td className="p-4">Hace 3 meses</td>
                <td className="p-4"><span className="text-emerald-600 font-medium">Apto</span></td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-mono text-sm">45829104</td>
                <td className="p-4">María Fernández</td>
                <td className="p-4"><span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold text-sm">A-</span></td>
                <td className="p-4">Ayer</td>
                <td className="p-4"><span className="text-amber-500 font-medium">Diferida temporal</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
