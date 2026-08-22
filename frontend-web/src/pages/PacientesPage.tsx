import { useState, useEffect } from 'react';
import { Search, UserPlus, FileText, Phone, Calendar, Stethoscope, HeartPulse, Activity } from 'lucide-react';
import { api } from '../services/api';
import { toast } from 'sonner';

export default function PacientesPage() {
  const [showForm, setShowForm] = useState(false);
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    documento: '', nombres: '', apellidos: '', sexo: 'Masculino',
    fechaNacimiento: '', grupoSanguineo: 'O', factorRh: 'POSITIVO',
    historiaClinica: '', diagnostico: '', servicioAtencion: 'Emergencia',
    areaInternacion: '', numeroCama: '', medicoTratante: '',
    anticuerposIrregulares: 'Desconocido', gestaciones: '', nivelUrgencia: 'Rutina'
  });

  useEffect(() => {
    cargarPacientes();
  }, []);

  const cargarPacientes = async () => {
    try {
      const response = await api.get('/pacientes');
      setPacientes(response.data);
    } catch (error) {
      console.error('Error cargando pacientes', error);
      toast.error('No se pudo cargar la lista de pacientes.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    try {
      const payload: any = { ...formData };
      Object.keys(payload).forEach(key => {
        if (payload[key] === '') payload[key] = null;
      });
      
      await api.post('/pacientes', payload);
      toast.success("Paciente (Receptor) registrado exitosamente.");
      setShowForm(false);
      cargarPacientes();
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar el paciente. Asegúrate de que el Backend esté corriendo en el puerto 8080.");
    }
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="flex justify-between items-end bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-20 -translate-y-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-blue-500" />
            <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Módulo Clínico (Hospital de Ate)</span>
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">Gestión de Receptores</h2>
          <p className="text-slate-500 mt-2 text-lg">Registro de pacientes, historial clínico y asignación de camas.</p>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`
            relative overflow-hidden px-6 py-3.5 rounded-2xl font-bold flex items-center gap-3 transition-all duration-300 active:scale-95 shadow-lg
            ${showForm 
              ? 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 shadow-slate-200/50' 
              : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-blue-500/30'}
          `}
        >
          {showForm ? <Search className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          {showForm ? 'Ver Lista de Receptores' : 'Registrar Nuevo Paciente'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Ficha Clínica del Receptor</h3>
          </div>
          
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-4"><h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">1. Datos Personales</h4></div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">DNI / Pasaporte</label>
                <input name="documento" value={formData.documento} onChange={handleChange} type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Nro. Documento" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nombres</label>
                <input name="nombres" value={formData.nombres} onChange={handleChange} type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Nombres completos" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Apellidos</label>
                <input name="apellidos" value={formData.apellidos} onChange={handleChange} type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Apellidos completos" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Sexo Biológico</label>
                <select name="sexo" value={formData.sexo} onChange={handleChange} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option>Masculino</option>
                  <option>Femenino</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Fecha de Nacimiento</label>
                <input name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} type="date" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 border-t border-slate-100 pt-6">
              <div className="col-span-4"><h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">2. Datos Médicos</h4></div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Historia Clínica (HC)</label>
                <input name="historiaClinica" value={formData.historiaClinica} onChange={handleChange} type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Nro. HC" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-semibold text-slate-700">Diagnóstico Principal</label>
                <input name="diagnostico" value={formData.diagnostico} onChange={handleChange} type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Ej. Anemia Severa, Hemorragia post-parto..." />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Sistema ABO</label>
                <select name="grupoSanguineo" value={formData.grupoSanguineo} onChange={handleChange} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold text-slate-800">
                  <option>O</option><option>A</option><option>B</option><option>AB</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Factor Rh</label>
                <select name="factorRh" value={formData.factorRh} onChange={handleChange} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold text-slate-800">
                  <option>POSITIVO</option><option>NEGATIVO</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 border-t border-slate-100 pt-6">
              <div className="col-span-4"><h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">3. Ubicación Hospitalaria</h4></div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Servicio de Atención</label>
                <select name="servicioAtencion" value={formData.servicioAtencion} onChange={handleChange} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold text-slate-800">
                  <option>Emergencia</option>
                  <option>UCI</option>
                  <option>Cirugía</option>
                  <option>Maternidad</option>
                  <option>Pediatría</option>
                  <option>Hospitalización General</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Área / Piso</label>
                <input name="areaInternacion" value={formData.areaInternacion} onChange={handleChange} type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Ej. Pabellón B, Piso 3" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Número de Cama</label>
                <input name="numeroCama" value={formData.numeroCama} onChange={handleChange} type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Ej. Cama 12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Médico Tratante</label>
                <input name="medicoTratante" value={formData.medicoTratante} onChange={handleChange} type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="Dr. ..." />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 border-t border-slate-100 pt-6">
              <div className="col-span-4"><h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-2">4. Historial Inmunohematológico y Urgencia</h4></div>
              <div className="col-span-2">
                <label className="text-sm font-semibold text-slate-700">Anticuerpos Irregulares Previos</label>
                <select name="anticuerposIrregulares" value={formData.anticuerposIrregulares} onChange={handleChange} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 bg-slate-50">
                  <option>Desconocido</option>
                  <option>Negativo</option>
                  <option>Positivo (Alerta Crítica)</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-semibold text-slate-700">Número de Gestaciones (Mujeres)</label>
                <input type="number" name="gestaciones" value={formData.gestaciones} onChange={handleChange} placeholder="0 si no aplica" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 bg-slate-50" />
              </div>
              <div className="col-span-4">
                <label className="text-sm font-semibold text-slate-700">Nivel de Urgencia Transfusional</label>
                <select name="nivelUrgencia" value={formData.nivelUrgencia} onChange={handleChange} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 bg-slate-50 font-bold">
                  <option>Rutina</option>
                  <option>Urgencia (Requiere en &lt; 2 horas)</option>
                  <option>Emergencia (Liberación inmediata sin crossmatch)</option>
                  <option>Protocolo Transfusión Masiva (Hemorragia Exanguinante)</option>
                </select>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button 
                type="button" 
                onClick={handleGuardar}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95">
                Registrar Paciente y Generar Pulsera
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-4 font-bold">HC / DNI</th>
                <th className="p-4 font-bold">Paciente</th>
                <th className="p-4 font-bold">Tipo Sangre</th>
                <th className="p-4 font-bold">Ubicación</th>
                <th className="p-4 font-bold">Diagnóstico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {pacientes.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No hay pacientes registrados.</td></tr>
              ) : pacientes.map((p: any) => (
                <tr key={p.id} className="hover:bg-blue-50/50 transition-colors cursor-pointer">
                  <td className="p-4 font-mono text-sm font-medium">
                    <span className="text-xs font-bold text-slate-400">HC:</span> {p.historiaClinica || 'N/A'}<br/>
                    <span className="text-xs font-bold text-slate-400">DNI:</span> {p.documento}
                  </td>
                  <td className="p-4 font-medium">{p.nombres} {p.apellidos}</td>
                  <td className="p-4">
                    <span className="bg-red-100 text-red-800 px-3 py-1.5 rounded-lg font-black text-sm shadow-sm border border-red-200">
                      {p.grupoSanguineo} {p.factorRh}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    <span className="font-bold text-blue-800">{p.servicioAtencion}</span><br/>
                    {p.areaInternacion} - Cama {p.numeroCama}
                  </td>
                  <td className="p-4 text-sm text-slate-600 max-w-[200px] truncate" title={p.diagnostico}>
                    {p.diagnostico}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
