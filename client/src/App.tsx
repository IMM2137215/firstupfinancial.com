import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Waiver } from './pages/Waiver';
import { Dashboard } from './pages/Dashboard';
import { Partners } from './pages/Partners';
import { Layout } from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/waiver" replace />} />
          <Route path="/waiver" element={<Waiver />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/partners" element={<Partners />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
