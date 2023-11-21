import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';

import BaseLayout from './components/Layout/Base';
import AboutPage from './pages/About';
import HomePage from './pages/Home';
import LostAndFoundPage from './pages/LostAndFound';
import InventoryPage from './pages/Inventory';
import CentralInfoPage from './pages/CentralInfo';
import SearchPage from './pages/Lost/Search';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="lnf-search" element={<SearchPage />} />
          <Route path="lnf-add" element={<LostAndFoundPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="info" element={<CentralInfoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
