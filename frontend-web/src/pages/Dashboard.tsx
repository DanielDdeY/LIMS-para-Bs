import { useState, useEffect } from 'react';
import { Activity, Droplet, Clock, AlertTriangle, ArrowUpRight, ArrowDownRight, Dna, FileText } from 'lucide-react';
import { api } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    donantes: 0,
    libres: 0,
    cuarentena: 0,
    descartados: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donantesRes, hemoRes] = await Promise.all([
          api.get('/donantes'),
          api.get('/hemocomponentes')
        ]);
        
        const libres = hemoRes.data.filter((h: any) => h.estado === 'LIBERADO').length;
        const cuarentena = hemoRes.data.filter((h: any) => h.estado === 'CUARENTENA').length;
        const descartados = hemoRes.data.filter((h: any) => h.estado === 'DESCARTADO').length;

        setStats({
          donantes: donantesRes.data.length,
          libres,
          cuarentena,
          descartados
        });
      } catch (error) {
        console.error("Error cargando dashboard:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Panel Central Médico</h2>
        <p className="text-slate-500 mt-1">Supervisión en tiempo real del Hemocentro y Banco de Sangre.</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="absolute right-0 top-0 w-24 h-24 bg-blue-50 rounded-bl-[100px] -z-10 group-hover:bg-blue-100 transition-colors"></div>
          <div className="flex justify-between items-start">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Donantes (Histórico)</h3>
            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl"><Activity className="w-5 h-5" /></div>
          </div>
          <p className="text-4xl font-black text-slate-800 mt-4">{stats.donantes}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg"><ArrowUpRight className="w-3 h-3 mr-1"/> 12%</span>
            <span className="text-xs font-medium text-slate-400">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-50 rounded-bl-[100px] -z-10 group-hover:bg-emerald-100 transition-colors"></div>
          <div className="flex justify-between items-start">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Unidades Libres</h3>
            <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl"><Droplet className="w-5 h-5" /></div>
          </div>
          <p className="text-4xl font-black text-slate-800 mt-4">{stats.libres}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg"><ArrowUpRight className="w-3 h-3 mr-1"/> 5%</span>
            <span className="text-xs font-medium text-slate-400">Stock apto</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="absolute right-0 top-0 w-24 h-24 bg-amber-50 rounded-bl-[100px] -z-10 group-hover:bg-amber-100 transition-colors"></div>
          <div className="flex justify-between items-start">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">En Cuarentena</h3>
            <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl"><Clock className="w-5 h-5" /></div>
          </div>
          <p className="text-4xl font-black text-slate-800 mt-4">{stats.cuarentena}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg"><Activity className="w-3 h-3 mr-1"/> Cola lab</span>
            <span className="text-xs font-medium text-slate-400">Esperando serología</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-red-50 relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="absolute right-0 top-0 w-24 h-24 bg-red-50 rounded-bl-[100px] -z-10 group-hover:bg-red-100 transition-colors"></div>
          <div className="flex justify-between items-start">
            <h3 className="text-red-600 text-xs font-bold uppercase tracking-wider">Descartados</h3>
            <div className="p-2.5 bg-red-100 text-red-600 rounded-xl"><AlertTriangle className="w-5 h-5" /></div>
          </div>
          <p className="text-4xl font-black text-red-700 mt-4">{stats.descartados}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="flex items-center text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg"><ArrowDownRight className="w-3 h-3 mr-1"/> Merma</span>
            <span className="text-xs font-bold text-red-400 animate-pulse">Atención médica</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Estado de Stock por Grupo Sanguíneo</h3>
              <p className="text-sm text-slate-500">Niveles actuales vs mínimos requeridos en emergencia</p>
            </div>
            <button className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">Ver Detalles</button>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-700 flex items-center gap-2"><Dna className="w-4 h-4 text-rose-500"/> O Positivo (O+)</span>
                <span className="text-emerald-600">Nivel Óptimo (450 U)</span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[85%]"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-700 flex items-center gap-2"><Dna className="w-4 h-4 text-rose-500"/> A Positivo (A+)</span>
                <span className="text-blue-600">Estable (210 U)</span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full w-[60%]"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-700 flex items-center gap-2"><Dna className="w-4 h-4 text-rose-500"/> O Negativo (O-) - Universal</span>
                <span className="text-red-500 animate-pulse">¡Crítico! (12 U)</span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full w-[15%]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Actividad Reciente</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Transfusión Completada</p>
                <p className="text-xs text-slate-500 mt-0.5">Paciente HC-900213 (UCI) recibió 1 unidad de GR.</p>
                <p className="text-[10px] text-slate-400 mt-1 font-bold">Hace 12 min</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Lotes en Cuarentena</p>
                <p className="text-xs text-slate-500 mt-0.5">3 nuevas bolsas ingresaron a Laboratorio.</p>
                <p className="text-[10px] text-slate-400 mt-1 font-bold">Hace 45 min</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Droplet className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Liberación de Stock</p>
                <p className="text-xs text-slate-500 mt-0.5">Serología negativa. 5 bolsas marcadas APTAS.</p>
                <p className="text-[10px] text-slate-400 mt-1 font-bold">Hace 2 horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}