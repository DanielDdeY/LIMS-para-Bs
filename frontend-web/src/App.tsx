import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './shared/components/layout/Layout';
import Dashboard from './pages/Dashboard';
import DonantesPage from './pages/DonantesPage';
import LaboratorioPage from './pages/LaboratorioPage';
import TransfusionesPage from './pages/TransfusionesPage';
import InventarioPage from './pages/InventarioPage';
import HemovigilanciaPage from './pages/HemovigilanciaPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="donantes" element={<DonantesPage />} />
          <Route path="laboratorio" element={<LaboratorioPage />} />
          <Route path="transfusiones" element={<TransfusionesPage />} />
          <Route path="inventario" element={<InventarioPage />} />
          <Route path="hemovigilancia" element={<HemovigilanciaPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;