import { Outlet, Link, useLocation } from 'react-router-dom';
import { Activity, Users, Droplet, FlaskConical, LayoutDashboard, Snowflake, ShieldAlert, Bell, Search, Settings, ChevronRight, UserCircle } from 'lucide-react';
import { Toaster } from 'sonner';

export function Layout() {
  const location = useLocation();
  
  const menu = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/donantes', name: 'Donantes', icon: <Users className="w-5 h-5" /> },
    { path: '/pacientes', name: 'Pacientes', icon: <UserCircle className="w-5 h-5" /> },
    { path: '/inventario', name: 'Inventario', icon: <Snowflake className="w-5 h-5" /> },
    { path: '/laboratorio', name: 'Laboratorio', icon: <FlaskConical className="w-5 h-5" /> },
    { path: '/transfusiones', name: 'Transfusiones', icon: <Activity className="w-5 h-5" /> },
    { path: '/hemovigilancia', name: 'Hemovigilancia', icon: <ShieldAlert className="w-5 h-5" /> }
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans selection:bg-rose-100 selection:text-rose-900">
      <Toaster position="top-right" richColors />
      {/* SIDEBAR MODERNIZADO */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col justify-between shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20 relative">
        <div>
          <div className="h-20 flex items-center px-8 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-700 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/30">
                <Droplet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-800 leading-none">HemaSys</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">LIMS Enterprise</p>
              </div>
            </div>
          </div>
          
          <nav className="mt-8 px-4 flex flex-col gap-1.5">
            <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Módulos Principales</p>
            {menu.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}
                  className={`
                    group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-rose-50 text-rose-700 font-bold' 
                      : 'hover:bg-slate-50 text-slate-500 hover:text-slate-800 font-medium'}
                  `}>
                  <div className="flex items-center gap-3">
                    <div className={`${isActive ? 'text-rose-600' : 'text-slate-400 group-hover:text-rose-500'} transition-colors`}>
                      {item.icon}
                    </div>
                    {item.name}
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-rose-400" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Bottom */}
        <div className="p-6 border-t border-slate-100">
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer">
            <img src="https://ui-avatars.com/api/?name=D+R&background=0D8ABC&color=fff" alt="User" className="w-10 h-10 rounded-xl shadow-sm" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">Dr. Roberto G.</p>
              <p className="text-xs text-slate-500 truncate">Jefe de Banco</p>
            </div>
            <Settings className="w-5 h-5 text-slate-400 hover:text-slate-600" />
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* TOPBAR FLOTANTE */}
        <header className="h-20 px-8 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-rose-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar donantes, unidades ISBT, pacientes..." 
                className="w-full bg-slate-100 hover:bg-slate-200/50 focus:bg-white border-2 border-transparent focus:border-rose-200 rounded-full py-2.5 pl-12 pr-4 text-sm outline-none transition-all text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-6 ml-4">
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Sistema Online</span>
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-700 transition-colors rounded-full hover:bg-slate-100">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>
          </div>
        </header>

        {/* AREA DE CONTENIDO */}
        <div className="flex-1 overflow-auto p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}