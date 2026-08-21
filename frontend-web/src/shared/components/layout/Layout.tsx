import { Outlet, Link, useLocation } from 'react-router-dom';
import { Activity, Users, Droplet, FlaskConical, LayoutDashboard, Snowflake, ShieldAlert } from 'lucide-react';

export function Layout() {
  const location = useLocation();
  
  const menu = [
    { path: '/', name: 'Dashboard Central', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/donantes', name: 'GestiÃ³n de Donantes', icon: <Users className="w-5 h-5" /> },
    { path: '/inventario', name: 'Cadena de FrÃ­o', icon: <Snowflake className="w-5 h-5" /> },
    { path: '/laboratorio', name: 'SerologÃ­a y AnÃ¡lisis', icon: <FlaskConical className="w-5 h-5" /> },
    { path: '/transfusiones', name: 'Transfusiones', icon: <Activity className="w-5 h-5" /> },
    { path: '/hemovigilancia', name: 'Hemovigilancia', icon: <ShieldAlert className="w-5 h-5" /> }
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-72 bg-slate-900 text-white shadow-2xl z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <Droplet className="w-10 h-10 text-red-600" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">LIMS Enterprise</h1>
            <p className="text-xs text-slate-400 font-mono">ISBT-128 Ready v2.0</p>
          </div>
        </div>
        <nav className="mt-6 flex flex-col gap-1 px-4">
          <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">MÃ³dulos ClÃ­nicos</p>
          {menu.map(item => (
            <Link key={item.path} to={item.path}
              className={`${location.pathname === item.path ? 'bg-blue-600 shadow-lg' : 'hover:bg-slate-800 text-slate-300'} flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium`}>
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm z-10">
          <h2 className="text-xl font-semibold text-slate-800">Portal MÃ©dico Hospitalario</h2>
          <div className="flex items-center gap-4">
            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            <span className="text-sm font-medium text-slate-600">ConexiÃ³n IoT Estable</span>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold border-2 border-blue-200 ml-4">
              DR
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8 bg-slate-50/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}