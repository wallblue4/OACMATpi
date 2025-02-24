import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Events from './pages/Events';
import Providers from './pages/Providers';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/events" element={<Events />} />
      <Route path="/providers" element={<Providers />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App