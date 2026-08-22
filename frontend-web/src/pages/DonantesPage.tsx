import { useState, useEffect } from 'react';
import { Search, UserPlus, Dna, Phone, Calendar, ArrowRight, ShieldCheck, HeartPulse, Scale, Activity } from 'lucide-react';
import { api } from '../services/api';
import { toast } from 'sonner';

export default function DonantesPage() {
  const [showForm, setShowForm] = useState(false);
  const [donantes, setDonantes] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    identificacion: '', nombres: '', apellidos: '', sexo: 'Masculino',
    direccion: '', telefono: '', correoElectronico: '', grupoSanguineo: 'O',
    factorRh: 'POSITIVO', fechaNacimiento: '', ultimaDonacion: '', observacionesMedicas: '',
    peso: '', talla: '', presionArterial: '', hemoglobina: '', hematocrito: '',
    tipoDonacion: 'Sangre Total', volumenExtraidoMl: '', 
    consentimientoFirmado: false, tatuajesRecientes: false, 
    viajeZonaEndemica: false, usoAntibioticos: false
  });

  useEffect(() => {
    cargarDonantes();
  }, []);

  const cargarDonantes = async () => {
    try {
      const response = await api.get('/donantes');
      setDonantes(response.data);
    } catch (error) {
      console.error('Error cargando donantes', error);
      toast.error('No se pudo cargar la lista de donantes.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGuardar = async () => {
    try {
      const payload: any = { ...formData };
      Object.keys(payload).forEach(key => {
        if (payload[key] === '') payload[key] = null;
      });

      await api.post('/donantes', payload);
      toast.success("Donante registrado exitosamente. Generando ISBT-128...");
      setShowForm(false);
      cargarDonantes(); 
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar el donante. Asegúrate de que el Backend esté corriendo en el puerto 8080.");
    }
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="flex justify-between items-end bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-20 -translate-y-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <HeartPulse className="w-5 h-5 text-rose-500" />
            <span className="text-rose-600 font-bold uppercase tracking-wider text-xs">Módulo ISBT-128 (Área Donación)</span>
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">Gestión de Donantes</h2>
          <p className="text-slate-500 mt-2 text-lg">Triaje clínico, signos vitales e historial de extracción.</p>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`
            relative overflow-hidden px-6 py-3.5 rounded-2xl font-bold flex items-center gap-3 transition-all duration-300 active:scale-95 shadow-lg
            ${showForm 
              ? 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 shadow-slate-200/50' 
              : 'bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white shadow-rose-500/30'}
          `}
        >
          {showForm ? <Search className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          {showForm ? 'Buscar en Historial' : 'Registrar Nuevo Donante'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <Dna className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Ficha Clínica de Evaluación</h3>
          </div>
          
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-4"><h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">1. Datos Demográficos</h4></div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">DNI / Pasaporte</label>
                <input name="identificacion" onChange={handleChange} type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="N° Documento" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nombres</label>
                <input name="nombres" onChange={handleChange} type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Nombres" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Apellidos</label>
                <input name="apellidos" onChange={handleChange} type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Apellidos" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Sexo</label>
                <select name="sexo" onChange={handleChange} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option>Masculino</option>
                  <option>Femenino</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 border-t border-slate-100 pt-6">
              <div className="col-span-4"><h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">2. Triaje y Examen Físico</h4></div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1"><Scale className="w-4 h-4 text-slate-400" /> Peso (kg)</label>
                <input name="peso" onChange={handleChange} type="number" step="0.1" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Ej. 70.5" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Talla (cm)</label>
                <input name="talla" onChange={handleChange} type="number" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Ej. 175" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1"><Activity className="w-4 h-4 text-red-400" /> Presión Arterial</label>
                <input name="presionArterial" onChange={handleChange} type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Ej. 120/80" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1"><Droplet className="w-4 h-4 text-red-500" /> Hemoglobina (g/dL)</label>
                <input name="hemoglobina" onChange={handleChange} type="number" step="0.1" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Ej. 14.2" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 border-t border-slate-100 pt-6">
              <div className="col-span-4"><h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">3. Tipificación ISBT 128</h4></div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Sistema ABO</label>
                <select name="grupoSanguineo" onChange={handleChange} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold text-slate-800">
                  <option>O</option><option>A</option><option>B</option><option>AB</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Factor Rh</label>
                <select name="factorRh" onChange={handleChange} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold text-slate-800">
                  <option>POSITIVO</option><option>NEGATIVO</option>
                </select>
              </div>
                 <div className="col-span-4"><h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-4">3. Evaluación Médica (PRONAHEBAS)</h4></div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Peso (kg) *</label>
                <input type="number" name="peso" value={formData.peso} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none" required/>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Presión Arterial</label>
                <input type="text" name="presionArterial" value={formData.presionArterial} onChange={handleChange} placeholder="Ej. 120/80" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Hemoglobina (g/dL) *</label>
                <input type="number" step="0.1" name="hemoglobina" value={formData.hemoglobina} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none" required/>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Tipo de Donación</label>
                <select name="tipoDonacion" value={formData.tipoDonacion} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                  <option>Sangre Total</option>
                  <option>Aféresis Plaquetas</option>
                  <option>Aféresis Plasma</option>
                </select>
              </div>

              <div className="col-span-4"><h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-4">4. Cuestionario de Exclusión y Seguridad</h4></div>
              <div className="col-span-4 grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="tatuajesRecientes" checked={formData.tatuajesRecientes} onChange={handleChange} className="w-5 h-5 rounded text-emerald-600" />
                  <span className="text-sm font-medium text-slate-700">¿Tatuajes o piercings en los últimos 6 meses?</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="viajeZonaEndemica" checked={formData.viajeZonaEndemica} onChange={handleChange} className="w-5 h-5 rounded text-emerald-600" />
                  <span className="text-sm font-medium text-slate-700">¿Viajes a zonas endémicas (malaria, dengue)?</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="usoAntibioticos" checked={formData.usoAntibioticos} onChange={handleChange} className="w-5 h-5 rounded text-emerald-600" />
                  <span className="text-sm font-medium text-slate-700">¿Uso de antibióticos en los últimos 7 días?</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-emerald-100 p-2 rounded-lg border border-emerald-300">
                  <input type="checkbox" name="consentimientoFirmado" checked={formData.consentimientoFirmado} onChange={handleChange} className="w-5 h-5 rounded text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-800">Consentimiento Informado Firmado</span>
                </label>
              </div>

              <div className="col-span-4"><h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-4">5. Resultados de Extracción</h4></div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Volumen Extraído (ml)</label>
                <input type="number" name="volumenExtraidoMl" value={formData.volumenExtraidoMl} onChange={handleChange} placeholder="Ej. 450" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
              <div className="col-span-3">
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Observaciones</label>
                <input type="text" name="observacionesMedicas" value={formData.observacionesMedicas} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button 
                type="button" 
                onClick={handleGuardar}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95">
                Guardar Donante e Iniciar Extracción
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
                <th className="p-4 font-bold">Clínica (Hb / PA)</th>
                <th className="p-4 font-bold">Tipo Sanguíneo</th>
                <th className="p-4 font-bold">Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {donantes.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No hay donantes registrados.</td></tr>
              ) : donantes.map((d: any) => (
                <tr key={d.id} className="hover:bg-blue-50/50 transition-colors cursor-pointer">
                  <td className="p-4 font-mono text-sm font-medium">{d.identificacion || 'N/A'}</td>
                  <td className="p-4 font-medium">{d.nombres} {d.apellidos}<br/><span className="text-xs text-slate-500">{d.sexo} | {d.peso ? `${d.peso}kg` : ''}</span></td>
                  <td className="p-4 text-sm font-medium text-slate-600">
                    Hb: <span className={d.hemoglobina < 12.5 ? "text-red-600" : "text-emerald-600"}>{d.hemoglobina || '-'}</span> <br/>
                    PA: {d.presionArterial || '-'}
                  </td>
                  <td className="p-4"><span className="bg-red-100 text-red-800 px-3 py-1.5 rounded-lg font-black text-sm shadow-sm border border-red-200">{d.grupoSanguineo} {d.factorRh}</span></td>
                  <td className="p-4 text-sm"><span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">Apto</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
