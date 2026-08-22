import { useState, useEffect } from 'react';
import { Search, HeartPulse, AlertTriangle, ShieldCheck, UserCheck, MapPin, Activity, Droplet } from 'lucide-react';
import { api } from '../services/api';
import { toast } from 'sonner';

export default function TransfusionesPage() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [libres, setLibres] = useState<any[]>([]);
  const [transfusiones, setTransfusiones] = useState<any[]>([]);
  const [matchStatus, setMatchStatus] = useState<'pending' | 'checking' | 'compatible' | 'incompatible'>('pending');

  const [form, setForm] = useState({
    pacienteId: '',
    hemocomponenteId: '',
    medicoResponsable: '',
    responsableAplicacion: '',
    areaDestino: 'UCI'
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [pacRes, hemoRes, transRes] = await Promise.all([
        api.get('/pacientes'),
        api.get('/hemocomponentes'),
        api.get('/transfusiones')
      ]);
      setPacientes(pacRes.data);
      setLibres(hemoRes.data.filter((h: any) => h.estado === 'LIBERADO'));
      setTransfusiones(transRes.data);
    } catch (error) {
      console.error("Error cargando transfusiones:", error);
      toast.error('Error cargando los datos clínicos de la BD.');
    }
  };

  const simularCrossmatch = () => {
    if (!form.pacienteId || !form.hemocomponenteId) {
      toast.warning("Seleccione paciente y hemocomponente");
      return;
    }
    setMatchStatus('checking');
    setTimeout(() => {
      // Simulación de crossmatch exitoso para la demo
      setMatchStatus('compatible');
      toast.success("¡Crossmatch compatible!");
    }, 1500);
  };

  const handleTransfundir = async () => {
    try {
      await api.post('/transfusiones', {
        paciente: { id: form.pacienteId },
        hemocomponente: { id: form.hemocomponenteId },
        medicoResponsable: form.medicoResponsable,
        responsableAplicacion: form.responsableAplicacion,
        areaDestino: form.areaDestino,
        signosVitalesPre: "PA: 120/80, FC: 75, Temp: 36.5"
      });
      toast.success('Transfusión registrada exitosamente. Hemocomponente descontado del stock.');
      setMatchStatus('pending');
      setForm({ pacienteId: '', hemocomponenteId: '', medicoResponsable: '', responsableAplicacion: '', areaDestino: 'UCI' });
      cargarDatos();
    } catch (error) {
      toast.error('Error registrando transfusión en el backend.');
    }
  };

  return (
    <div className="space-y-8 animate-in">
      {/* Header Premium */}
      <div className="flex justify-between items-end bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-fuchsia-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-20 -translate-y-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-fuchsia-500" />
            <span className="text-fuchsia-600 font-bold uppercase tracking-wider text-xs">Módulo Clínico</span>
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">Transfusiones y Crossmatch</h2>
          <p className="text-slate-500 mt-2 text-lg">Pruebas de compatibilidad, asignación a pacientes y despacho a piso.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        {/* Panel Izquierdo: Formulario de Asignación */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <ShieldCheck className="text-fuchsia-500" /> Nueva Orden de Transfusión
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Paciente Receptor</label>
              <select 
                value={form.pacienteId} 
                onChange={(e) => setForm({...form, pacienteId: e.target.value})}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-fuchsia-500"
              >
                <option value="">-- Seleccionar Paciente --</option>
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>{p.nombres} {p.apellidos} ({p.grupoSanguineo} {p.factorRh})</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Hemocomponente (Stock Libre)</label>
              <select 
                value={form.hemocomponenteId} 
                onChange={(e) => setForm({...form, hemocomponenteId: e.target.value})}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-fuchsia-500"
              >
                <option value="">-- Seleccionar Bolsa Disponible --</option>
                {libres.map((h) => (
                  <option key={h.id} value={h.id}>{h.codigoIsbt} - {h.tipoComponente}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Médico que Solicita</label>
                <input type="text" value={form.medicoResponsable} onChange={(e) => setForm({...form, medicoResponsable: e.target.value})} placeholder="Dr. Pérez" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Enfermero/a a Cargo</label>
                <input type="text" value={form.responsableAplicacion} onChange={(e) => setForm({...form, responsableAplicacion: e.target.value})} placeholder="Lic. García" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Área Destino (Piso)</label>
              <select value={form.areaDestino} onChange={(e) => setForm({...form, areaDestino: e.target.value})} className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white outline-none">
                <option>UCI</option>
                <option>Emergencia</option>
                <option>Quirófano A</option>
                <option>Pediatría</option>
              </select>
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                onClick={simularCrossmatch}
                className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all active:scale-95 shadow-md"
              >
                <Search className="w-5 h-5" /> Iniciar Prueba Cruzada (Crossmatch)
              </button>
            </div>
          </div>
        </div>

        {/* Panel Derecho: Estado de Compatibilidad y Transfusiones Activas */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 h-max">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <HeartPulse className="text-fuchsia-500" /> Resultado de Compatibilidad
            </h3>
            
            {matchStatus === 'pending' && (
              <div className="text-center py-10 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                <UserCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">Esperando ejecución de prueba cruzada en el sistema.</p>
              </div>
            )}

            {matchStatus === 'checking' && (
              <div className="text-center py-10 bg-blue-50 rounded-xl border border-blue-200">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-3"></div>
                <p className="text-blue-700 font-bold">Validando anticuerpos y grupo sanguíneo en Base de Datos...</p>
              </div>
            )}

            {matchStatus === 'compatible' && (
              <div className="text-center py-8 bg-emerald-50 rounded-xl border-2 border-emerald-200">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="text-xl font-black text-emerald-800 mb-1">¡COMPATIBLE!</h4>
                <p className="text-emerald-700 font-medium mb-6">El paciente puede recibir este hemocomponente.</p>
                
                <button onClick={handleTransfundir} className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-4 rounded-xl font-bold shadow-lg shadow-emerald-500/30 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <Droplet className="w-5 h-5" />
                  Autorizar Salida de Inventario
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
