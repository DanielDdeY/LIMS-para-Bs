import { useState, useEffect } from 'react';
import { ShieldAlert, Skull, AlertOctagon, RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { toast } from 'sonner';

export default function HemovigilanciaPage() {
  const [transfusiones, setTransfusiones] = useState<any[]>([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const response = await api.get('/transfusiones');
      setTransfusiones(response.data);
    } catch (error) {
      console.error('Error', error);
      toast.error('Error cargando historial de transfusiones.');
    }
  };

  const dispararLookback = async (hemocomponenteId: number) => {
    if (!confirm("¿ESTÁS SEGURO? Esta acción bloqueará en cuarentena a todos los hemocomponentes en inventario que provengan del mismo donante de esta bolsa.")) return;
    
    try {
      await api.post(`/hemovigilancia/lookback/${hemocomponenteId}`);
      toast.success("ALERTA DE RED: Lookback disparado exitosamente. Se ha puesto en cuarentena todo componente del donante originario de esta bolsa para reevaluación.");
    } catch (error) {
      toast.error("Error disparando Lookback. (Puede que no haya componentes extra del donante en inventario en este momento)");
    }
  };

  return (
    <div className="space-y-8 animate-in">
      {/* Header Premium */}
      <div className="flex justify-between items-end bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-20 -translate-y-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <AlertOctagon className="w-5 h-5 text-red-500" />
            <span className="text-red-600 font-bold uppercase tracking-wider text-xs">Módulo de Seguridad</span>
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">Hemovigilancia y Lookback</h2>
          <p className="text-slate-500 mt-2 text-lg">Rastreo inverso de reacciones adversas post-transfusionales (Lookback).</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mt-8">
        <div className="flex gap-4 items-start mb-6">
          <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
            <RefreshCw className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Historial de Transfusiones Aplicadas</h3>
            <p className="text-slate-500 text-sm mt-1">Si un paciente reporta una reacción adversa (ej. Sepsis, TRALI, Hepatitis), busca la transfusión aquí y activa el protocolo de rastreo (Lookback) para bloquear preventivamente cualquier otra donación del mismo donante.</p>
          </div>
        </div>

        <div className="overflow-hidden border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-4 font-bold">Fecha / Hora</th>
                <th className="p-4 font-bold">Paciente (Documento)</th>
                <th className="p-4 font-bold">Hemocomponente Transfundido</th>
                <th className="p-4 font-bold">Responsables</th>
                <th className="p-4 font-bold">Acción de Emergencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {transfusiones.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No hay transfusiones registradas en el sistema.</td></tr>
              ) : transfusiones.map((t) => (
                <tr key={t.id} className="hover:bg-red-50/30 transition-colors">
                  <td className="p-4 text-sm font-medium">{t.fechaHoraInicio.replace('T', ' ')}</td>
                  <td className="p-4 text-sm"><span className="font-bold">{t.paciente?.nombres} {t.paciente?.apellidos}</span><br/>{t.paciente?.documento}</td>
                  <td className="p-4 font-mono font-bold text-xs text-slate-800 bg-slate-100 px-2 py-1 rounded w-max inline-block mt-3">
                    {t.hemocomponente?.codigoIsbt || 'N/A'}
                  </td>
                  <td className="p-4 text-xs">
                    Médico: {t.medicoResponsable}<br/>
                    Aplica: {t.responsableAplicacion} ({t.areaDestino})
                  </td>
                  <td className="p-4">
                    <button onClick={() => dispararLookback(t.hemocomponente.id)} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md transition-all active:scale-95">
                      <Skull className="w-4 h-4" /> Activar Lookback
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
