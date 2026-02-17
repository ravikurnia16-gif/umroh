import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import Home from './pages/Home';
import PackageList from './pages/PackageList';
import PackageDetail from './pages/PackageDetail';
import Promo from './pages/Promo';
import Guide from './pages/Guide';
import Blog from './pages/Blog';
import TravelProfile from './pages/TravelProfile';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import AgentPackages from './pages/dashboard/AgentPackages';
import AdminAgents from './pages/dashboard/AdminAgents';
import AdminUsers from './pages/dashboard/AdminUsers';
import AdminVerify from './pages/dashboard/AdminVerify';
import VerifyEmail from './pages/VerifyEmail';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
          <Routes>
            {/* Dashboard Routes (No global Navbar/Footer) */}
            <Route path="/dashboard/*" element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TRAVEL_AGENT']}>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<DashboardHome />} />
                    <Route path="/packages" element={<AgentPackages />} />
                    <Route path="/agents" element={<AdminAgents />} />
                    <Route path="/users" element={<AdminUsers />} />
                    <Route path="/verify" element={<AdminVerify />} />
                    <Route path="/profile" element={<div className="bg-white dark:bg-slate-800 p-10 rounded-3xl text-center">Modul Pengaturan Profil (Coming Soon)</div>} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Public Routes (With global Navbar/Footer) */}
            <Route path="*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/packages" element={<PackageList />} />
                    <Route path="/packages/:id" element={<PackageDetail />} />
                    <Route path="/promo" element={<Promo />} />
                    <Route path="/guide" element={<Guide />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<div className="pt-24 container text-center py-20">Halaman Detail Artikel (Coming Soon)</div>} />
                    <Route path="/travel/:id" element={<TravelProfile />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                  </Routes>
                </main>
                <LiveChat />
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
