import { useState, useEffect } from 'react';
import { Snowflake, ThermometerSnowflake, AlertTriangle, Package, Truck } from 'lucide-react';
import { api } from '../services/api';
import { toast } from 'sonner';

export default function InventarioPage() {
  const [hemocomponentes, setHemocomponentes] = useState<any[]>([]);

  useEffect(() => {
    cargarInventario();
  }, []);

  const cargarInventario = async () => {
    try {
      const response = await api.get('/hemocomponentes');
      setHemocomponentes(response.data);
    } catch (error) {
      console.error('Error cargando inventario', error);
      toast.error('Error al cargar el inventario de la base de datos.');
    }
  };

  const handleIngresarLote = async () => {
    const isbt = prompt("Ingrese el Código ISBT-128 de la nueva bolsa:");
    if (!isbt) return;
    try {
      await api.post('/hemocomponentes', {
        codigoIsbt: isbt,
        tipoComponente: 'Sangre Total',
        origen: 'Interno',
        volumenMl: 450,
        ubicacionFisica: 'Refrigerador A - Estante 1'
      });
      toast.success('Lote ingresado a cuarentena exitosamente');
      cargarInventario();
    } catch (error) {
      toast.error('Error al ingresar el lote al sistema.');
    }
  };

  const libres = hemocomponentes.filter((h: any) => h.estado === 'LIBERADO').length;
  const enCuarentena = hemocomponentes.filter((h: any) => h.estado === 'CUARENTENA').length;
  const descartados = hemocomponentes.filter((h: any) => h.estado === 'DESCARTADO').length;

  return (
    <div className="space-y-8 animate-in">
      {/* Header Premium */}
      <div className="flex justify-between items-end bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-20 -translate-y-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <ThermometerSnowflake className="w-5 h-5 text-cyan-500" />
            <span className="text-cyan-600 font-bold uppercase tracking-wider text-xs">Gestión de Almacenamiento</span>
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">Cadena de Frío e Inventario</h2>
          <p className="text-slate-500 mt-2 text-lg">Control de temperaturas y stock físico de hemocomponentes.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="px-6 py-3.5 rounded-2xl font-bold bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 shadow-sm transition-all active:scale-95">
            Generar Reporte de Stock
          </button>
          <button onClick={handleIngresarLote} className="px-6 py-3.5 rounded-2xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg shadow-cyan-500/30 transition-all flex items-center gap-2 active:scale-95">
            <Package className="w-5 h-5" /> Ingresar Lote
          </button>
        </div>
      </div>

      {/* DASHBOARD DE STOCK POR ORIGEN */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-xl">
            <Package className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-slate-500 font-bold text-sm">Stock Interno Libre</p>
            <p className="text-3xl font-black text-slate-800">{libres}</p>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="bg-amber-100 p-4 rounded-xl">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <p className="text-slate-500 font-bold text-sm">En Cuarentena</p>
            <p className="text-3xl font-black text-slate-800">{enCuarentena}</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="bg-red-100 p-4 rounded-xl">
            <Truck className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <p className="text-slate-500 font-bold text-sm">Descartados</p>
            <p className="text-3xl font-black text-slate-800">{descartados}</p>
          </div>
        </div>
      </div>

      {/* REFRIGERADORES (IoT) */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="bg-emerald-50 border-2 border-emerald-200 p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-emerald-800 text-lg">Refrigerador Alpha</h3>
              <p className="text-sm text-emerald-600 font-medium">Glóbulos Rojos (A+, O+)</p>
            </div>
            <ThermometerSnowflake className="text-emerald-500 w-8 h-8" />
          </div>
          <div className="mt-6">
            <span className="text-4xl font-black text-emerald-700">4.2°C</span>
            <span className="ml-2 text-emerald-600 font-bold bg-emerald-100 px-2 py-1 rounded">ÓPTIMO</span>
          </div>
          <div className="mt-4 text-sm font-medium text-emerald-700 bg-emerald-100/50 p-2 rounded-lg">
            Ubicación Física: Piso 1 - Laboratorio Principal
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
            <span className="text-4xl font-black text-red-700">8.5°C</span>
            <span className="ml-2 text-red-700 font-bold bg-red-200 px-2 py-1 rounded animate-pulse">ALERTA</span>
          </div>
          <div className="mt-4 text-sm font-bold text-red-800 bg-red-200 p-2 rounded-lg border border-red-300">
            ¡Temperatura excedida! Ubicación: Piso 2 - Reserva
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><Snowflake className="text-blue-500" /> Detalle Físico de Inventario (Conectado a BD)</h3>
          <span className="text-sm font-medium text-slate-500">Mostrando {hemocomponentes.length} bolsas físicas</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-200 text-slate-600 text-sm">
              <th className="p-4 font-bold">ISBT-128</th>
              <th className="p-4 font-bold">Hemocomponente</th>
              <th className="p-4 font-bold">Volumen / Origen</th>
              <th className="p-4 font-bold">Ubicación Física</th>
              <th className="p-4 font-bold">Caducidad</th>
              <th className="p-4 font-bold">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {hemocomponentes.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-slate-500">No hay inventario registrado en PostgreSQL.</td></tr>
            ) : hemocomponentes.map((h: any) => (
              <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-mono text-sm font-bold text-slate-900">{h.codigoIsbt}</td>
                <td className="p-4 font-medium">{h.tipoComponente}</td>
                <td className="p-4 text-sm text-slate-600">{h.volumenMl}ml<br/><span className="text-xs font-bold text-blue-600">{h.origen}</span></td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <ThermometerSnowflake className="w-4 h-4 text-cyan-600" />
                    <span className="text-sm font-medium">{h.ubicacionFisica}</span>
                  </div>
                </td>
                <td className="p-4 text-sm font-medium">{h.fechaCaducidad || 'N/A'}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full border text-sm font-bold ${
                    h.estado === 'LIBERADO' ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 
                    h.estado === 'CUARENTENA' ? 'text-amber-600 bg-amber-50 border-amber-200' :
                    'text-red-600 bg-red-50 border-red-200'
                  }`}>
                    {h.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
