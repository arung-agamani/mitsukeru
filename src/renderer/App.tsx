import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import BaseLayout from './components/Layout/Base';
import AboutPage from './pages/About';
import HomePage from './pages/Home';
import InventoryPage from './pages/Inventory';
import CentralInfoPage from './pages/CentralInfo';
import SearchPage from './pages/Lost/Search';
import LostDetailPage from './pages/Lost/Detail';
import AddLostItemPage from './pages/Lost/Add';

export default function App() {
  return (
    <Router>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="lnf-search" element={<SearchPage />} />
          <Route path="lnf-add" element={<AddLostItemPage />} />
          <Route path="lnf-lost-detail" element={<LostDetailPage />} />

          <Route path="inventory" element={<InventoryPage />} />
          <Route path="info" element={<CentralInfoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
