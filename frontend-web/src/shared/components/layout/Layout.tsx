import { Outlet, Link, useLocation } from 'react-router-dom';
import { Activity, Users, Droplet, FlaskConical, LayoutDashboard } from 'lucide-react';

export function Layout() {
  const location = useLocation();
  
  const menu = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/donantes', name: 'Donantes', icon: <Users className="w-5 h-5" /> },
    { path: '/laboratorio', name: 'Laboratorio', icon: <FlaskConical className="w-5 h-5" /> },
    { path: '/transfusiones', name: 'Transfusiones', icon: <Activity className="w-5 h-5" /> }
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-64 bg-slate-900 text-white">
        <div className="p-6 flex items-center gap-3">
          <Droplet className="w-8 h-8 text-red-500" />
          <span className="text-xl font-bold">LIMS BloodBank</span>
        </div>
        <nav className="mt-6 flex flex-col gap-2 px-4">
          {menu.map(item => (
            <Link key={item.path} to={item.path}
              className={{$`{location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-slate-800'} flex items-center gap-3 px-4 py-3 rounded-lg transition-colors}}>
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center px-8 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-800">Portal Médico</h1>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
