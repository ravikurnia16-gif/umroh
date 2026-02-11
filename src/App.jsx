import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PackageList from './pages/PackageList';
import PackageDetail from './pages/PackageDetail';
import Promo from './pages/Promo';
import Guide from './pages/Guide';
import Blog from './pages/Blog';
import TravelProfile from './pages/TravelProfile';

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
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/packages" element={<PackageList />} />
              <Route path="/packages/:id" element={<PackageDetail />} />
              <Route path="/promo" element={<Promo />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<div className="pt-24 container text-center">Halaman Detail Artikel (Coming Soon)</div>} />
              <Route path="/travel/:id" element={<TravelProfile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
