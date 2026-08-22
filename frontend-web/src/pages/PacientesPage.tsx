import React, { useState, useEffect } from 'react';
import { Search, UserPlus, FileText, Phone, Calendar, Stethoscope, HeartPulse, Activity, AlertTriangle, Printer, X, ShieldAlert } from 'lucide-react';
import Barcode from 'react-barcode';
import { api } from '../services/api';
import { toast } from 'sonner';

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pacienteParaPulsera, setPacienteParaPulsera] = useState<any>(null);

  const [formData, setFormData] = useState({
    documento: '', nombres: '', apellidos: '', sexo: 'Masculino',
    fechaNacimiento: '', grupoSanguineo: 'O', factorRh: 'POSITIVO',
    historiaClinica: '', diagnostico: '', servicioAtencion: 'Emergencia',
    areaInternacion: '', numeroCama: '', medicoTratante: '',
    anticuerposIrregulares: 'Desconocido', gestaciones: '', nivelUrgencia: 'Rutina',
    fenotipoExtendido: '', requiereSangreIrradiada: false, historialReaccionesAdversas: false
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
      
      const response = await api.post('/pacientes', payload);
      toast.success("Paciente registrado. Generando Pulsera ISBT...");
      setPacienteParaPulsera(response.data); // Asumimos que el backend retorna el paciente guardado
      setShowForm(false);
      cargarPacientes();
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar el paciente. Asegúrate de que el Backend esté corriendo en el puerto 8080.");
    }
  };

  const pacientesFiltrados = pacientes.filter((p: any) => 
    (p.documento || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.nombres || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.apellidos || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.historiaClinica || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar por DNI, Nombres o Historia Clínica..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>
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
              {pacientesFiltrados.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No hay pacientes encontrados.</td></tr>
              ) : pacientesFiltrados.map((p: any) => {
                const hasAntibodies = p.anticuerposIrregulares === 'Positivo (Alerta Crítica)';
                return (
                <tr key={p.id} className={`hover:bg-blue-50/50 transition-colors cursor-pointer ${hasAntibodies ? 'bg-red-50/50' : ''}`}>
                  <td className="p-4 font-mono text-sm font-medium">
                    <span className="text-xs font-bold text-slate-400">HC:</span> {p.historiaClinica || 'N/A'}<br/>
                    <span className="text-xs font-bold text-slate-400">DNI:</span> {p.documento}
                  </td>
                  <td className="p-4 font-medium flex items-center gap-2">
                    {p.nombres} {p.apellidos}
                    {hasAntibodies && <ShieldAlert className="w-4 h-4 text-red-600" title="Anticuerpos Irregulares POSITIVO" />}
                  </td>
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
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL PARA IMPRIMIR PULSERA ISBT */}
      {pacienteParaPulsera && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
            <div className="bg-slate-900 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Printer className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white text-lg">Imprimir Pulsera ISBT</h3>
              </div>
              <button onClick={() => setPacienteParaPulsera(null)} className="text-slate-400 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 flex flex-col items-center bg-slate-50">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 w-full mb-6">
                <div className="text-center mb-6">
                  <h4 className="font-black text-xl text-slate-800 uppercase tracking-tight">{pacienteParaPulsera.apellidos}, {pacienteParaPulsera.nombres}</h4>
                  <p className="text-slate-500 font-mono text-sm mt-1">DNI: {pacienteParaPulsera.documento} | HC: {pacienteParaPulsera.historiaClinica || 'N/A'}</p>
                </div>
                
                <div className="flex justify-center mb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl px-6 py-3 text-center">
                    <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">Grupo y Factor</p>
                    <p className="text-3xl font-black text-red-700">{pacienteParaPulsera.grupoSanguineo} {pacienteParaPulsera.factorRh}</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Barcode 
                    value={pacienteParaPulsera.documento ? `ID-${pacienteParaPulsera.documento}` : `HC-${pacienteParaPulsera.historiaClinica}`} 
                    width={1.8} 
                    height={60} 
                    fontSize={14} 
                    background="#ffffff" 
                    lineColor="#0f172a" 
                  />
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button onClick={() => setPacienteParaPulsera(null)} className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-colors">
                  Cancelar
                </button>
                <button onClick={() => { toast.success("Enviando a impresora térmica Zebra..."); setPacienteParaPulsera(null); }} className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center gap-2">
                  <Printer className="w-4 h-4" />
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
