import React from 'react';
import { Snowflake, ThermometerSnowflake, AlertTriangle } from 'lucide-react';

export default function InventarioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Cadena de FrÃ­o e Inventario IoT</h2>
        <p className="text-slate-500 mt-1">Monitoreo en tiempo real de los refrigeradores de sangre.</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="bg-emerald-50 border-2 border-emerald-200 p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-emerald-800 text-lg">Refrigerador Alpha</h3>
              <p className="text-sm text-emerald-600 font-medium">GlÃ³bulos Rojos (A+, O+)</p>
            </div>
            <ThermometerSnowflake className="text-emerald-500 w-8 h-8" />
          </div>
          <div className="mt-6">
            <span className="text-4xl font-black text-emerald-700">4.2Â°C</span>
            <span className="ml-2 text-emerald-600 font-bold bg-emerald-100 px-2 py-1 rounded">Ã“PTIMO</span>
          </div>
          <div className="mt-4 text-sm font-medium text-emerald-700 bg-emerald-100/50 p-2 rounded-lg">
            124 bolsas almacenadas
          </div>
        </div>

        <div className="bg-red-50 border-2 border-red-300 p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500 rounded-bl-full flex items-start justify-end p-2 animate-pulse">
            <AlertTriangle className="text-white w-6 h-6" />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-red-800 text-lg">Refrigerador Beta</h3>
              <p className="text-sm text-red-600 font-medium">Plaquetas y Plasma</p>
            </div>
          </div>
          <div className="mt-6">
            <span className="text-4xl font-black text-red-700">8.5Â°C</span>
            <span className="ml-2 text-red-700 font-bold bg-red-200 px-2 py-1 rounded animate-pulse">ALERTA</span>
          </div>
          <div className="mt-4 text-sm font-bold text-red-800 bg-red-200 p-2 rounded-lg border border-red-300">
            Â¡Temperatura excedida! 45 bolsas en cuarentena automÃ¡tica.
          </div>
        </div>
      </div>
    </div>
  );
}