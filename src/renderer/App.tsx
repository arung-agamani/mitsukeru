import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';

import BaseLayout from './components/Layout/Base';
import AboutPage from './pages/About';
import HomePage from './pages/Home';
import LostAndFoundPage from './pages/LostAndFound';
import InventoryPage from './pages/Inventory';
import CentralInfoPage from './pages/CentralInfo';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="lnf" element={<LostAndFoundPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="info" element={<CentralInfoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
