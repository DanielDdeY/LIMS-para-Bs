import React from 'react';
export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-slate-500 text-sm font-medium">Donantes Hoy</h3>
        <p className="text-3xl font-bold text-slate-800 mt-2">14</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-slate-500 text-sm font-medium">Unidades Disponibles</h3>
        <p className="text-3xl font-bold text-emerald-600 mt-2">85</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-slate-500 text-sm font-medium">En Cuarentena</h3>
        <p className="text-3xl font-bold text-amber-500 mt-2">12</p>
      </div>
    </div>
  );
}
