import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, TestTube2, Microscope, XCircle, Clock } from 'lucide-react';
import { api } from '../services/api';

export default function LaboratorioPage() {
  const [pendientes, setPendientes] = useState<any[]>([]);

  useEffect(() => {
    cargarPendientes();
  }, []);

  const cargarPendientes = async () => {
    try {
      const response = await api.get('/laboratorio/pendientes');
      setPendientes(response.data);
    } catch (error) {
      console.error('Error cargando laboratorio', error);
    }
  };

  const handleResultado = async (hemocomponenteId: number, esInfectado: boolean) => {
    try {
      await api.post('/laboratorio/procesar', {
        hemocomponente: { id: hemocomponenteId },
        vihPositivo: esInfectado,
        hepatitisBPositivo: false,
        hepatitisCPositivo: false,
        sifilisPositivo: false,
        chagasPositivo: esInfectado // Simplificado para demo
      });
      alert(`Análisis guardado. Bolsa marcada como ${esInfectado ? 'DESCARTADA' : 'LIBERADA'}`);
      cargarPendientes();
    } catch (error) {
      alert('Error guardando resultado');
    }
  };

  return (
    <div className="space-y-8 animate-in">
      {/* Header Premium */}
      <div className="flex justify-between items-end bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-violet-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-20 -translate-y-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Microscope className="w-5 h-5 text-violet-500" />
            <span className="text-violet-600 font-bold uppercase tracking-wider text-xs">Análisis Serológico</span>
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">Serología y Laboratorio</h2>
          <p className="text-slate-500 mt-2 text-lg">Procesamiento de muestras para virología e Inmunohematología.</p>
        </div>
        
        <div className="bg-amber-100 text-amber-800 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-sm border border-amber-200">
          <AlertCircle className="w-5 h-5" />
          {pendientes.length} Bolsas pendientes
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-800">Carga de Trabajo Pendiente (En Cuarentena)</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-200 text-slate-600 text-sm">
              <th className="p-4 font-bold">Lote ISBT</th>
              <th className="p-4 font-bold">Tipo Componente</th>
              <th className="p-4 font-bold">Estado Actual</th>
              <th className="p-4 font-bold">Registrar Resultado Serológico</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {pendientes.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">No hay muestras pendientes de análisis en BD.</td></tr>
            ) : pendientes.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-medium text-slate-800">{p.codigoIsbt}</td>
                <td className="p-4 text-slate-600">{p.tipoComponente}</td>
                <td className="p-4">
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold border border-amber-200 flex items-center gap-1 w-max">
                    <Clock className="w-3 h-3" /> CUARENTENA
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleResultado(p.id, false)} className="flex items-center gap-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1.5 rounded-lg font-bold text-sm border border-emerald-200 transition-colors shadow-sm active:scale-95">
                      <CheckCircle2 className="w-4 h-4" /> Negativo (Liberar)
                    </button>
                    <button onClick={() => handleResultado(p.id, true)} className="flex items-center gap-1 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded-lg font-bold text-sm border border-red-200 transition-colors shadow-sm active:scale-95">
                      <XCircle className="w-4 h-4" /> Positivo (Descartar)
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
