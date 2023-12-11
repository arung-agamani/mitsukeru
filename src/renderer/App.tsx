import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import 'tailwindcss/tailwind.css';
import './base.css';
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
import FoundSearchPage from './pages/Found/Search';
import AddFoundItemPage from './pages/Found/Add';
import DataManagementPage from './pages/Management/data';
import AddDepositItemPage from './pages/Deposit/Add';

export default function App() {
  return (
    <Router>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="lnf-lost-search" element={<SearchPage />} />
          <Route path="lnf-lost-add" element={<AddLostItemPage />} />
          <Route path="lnf-lost-detail" element={<LostDetailPage />} />
          <Route path="lnf-found-search" element={<FoundSearchPage />} />
          <Route path="lnf-found-add" element={<AddFoundItemPage />} />
          <Route path="deposit-add" element={<AddDepositItemPage />} />
          <Route path="info" element={<CentralInfoPage />} />
          <Route path="data-management" element={<DataManagementPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
