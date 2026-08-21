import React from 'react';
import { AlertCircle, CheckCircle2, TestTube2 } from 'lucide-react';

export default function LaboratorioPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Serología y Laboratorio</h2>
          <p className="text-slate-500">Analiza bolsas en cuarentena y registra resultados.</p>
        </div>
        <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          3 Bolsas pendientes de análisis
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white text-sm">
              <th className="p-4 font-medium">ISBT-128 (Código de Bolsa)</th>
              <th className="p-4 font-medium">Grupo</th>
              <th className="p-4 font-medium text-center">VIH</th>
              <th className="p-4 font-medium text-center">Hepatitis B</th>
              <th className="p-4 font-medium text-center">Sífilis</th>
              <th className="p-4 font-medium text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {/* Fila 1 */}
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-mono font-bold text-slate-900 flex items-center gap-2">
                <TestTube2 className="w-4 h-4 text-slate-400" />
                =W1234 26 123456 00
              </td>
              <td className="p-4"><span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold text-sm">A+</span></td>
              <td className="p-4 text-center">
                <select className="border border-slate-300 rounded px-2 py-1 text-sm bg-white"><option>Pendiente</option><option className="text-emerald-600">Negativo</option><option className="text-red-600">Positivo</option></select>
              </td>
              <td className="p-4 text-center">
                <select className="border border-slate-300 rounded px-2 py-1 text-sm bg-white"><option>Pendiente</option><option className="text-emerald-600">Negativo</option><option className="text-red-600">Positivo</option></select>
              </td>
              <td className="p-4 text-center">
                <select className="border border-slate-300 rounded px-2 py-1 text-sm bg-white"><option>Pendiente</option><option className="text-emerald-600">Negativo</option><option className="text-red-600">Positivo</option></select>
              </td>
              <td className="p-4 text-center">
                <button className="bg-slate-200 text-slate-500 px-4 py-2 rounded font-medium text-sm w-full cursor-not-allowed">
                  Guardar
                </button>
              </td>
            </tr>
            {/* Fila 2 */}
            <tr className="bg-emerald-50/30">
              <td className="p-4 font-mono font-bold text-slate-900 flex items-center gap-2">
                <TestTube2 className="w-4 h-4 text-slate-400" />
                =W1234 26 883210 00
              </td>
              <td className="p-4"><span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold text-sm">O-</span></td>
              <td className="p-4 text-center text-emerald-600 font-bold text-sm">Negativo</td>
              <td className="p-4 text-center text-emerald-600 font-bold text-sm">Negativo</td>
              <td className="p-4 text-center text-emerald-600 font-bold text-sm">Negativo</td>
              <td className="p-4 text-center">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded font-medium text-sm w-full flex items-center justify-center gap-1 shadow-sm transition-colors">
                  <CheckCircle2 className="w-4 h-4" /> Aprobar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
