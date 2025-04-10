import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { NavbarProvider, useNavbarContext } from './contexts/NavbarContext';
import { AllProductsProvider } from './contexts/AllProductsContext';
import Home from './components/Home';
import Cart from './components/Cart';
import ThankYou from './components/ThankYou';
import Navbar from './components/NavBar';
import AdminPage from './components/AdminPage'; 
import ProductManagement from './components/ProductManagement'; 
import CouponManagement from './components/CouponManagement'; 
import DetallesProducto from './components/DetallesProducto';
import FiltradoProducto from './components/FiltradoProducto';
import ManageAccount from './components/ManageAccount';
import Catalogo from './components/Catalogo';
import Footer from './components/Footer';
import LogoutPage from './components/LogoutPage';
import RecoverPasswordPage from './components/RecoverPasswordPage';
import TrackOrders from './components/TrackOrders'; // Importar la nueva vista de seguimiento de productos

const AppContent: React.FC = () => {
  const { isLoggedIn, role, setIsLoggedIn, setRole } = useNavbarContext();
  const location = useLocation();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedRole = localStorage.getItem('role');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
      setRole(storedRole);
    }
  }, [setIsLoggedIn, setRole]);

  console.log("isLoggedIn:", isLoggedIn, "role:", role);

  const isAdminPath = location.pathname.startsWith('/admin-page');

  return (
    <>
      {!isAdminPath && <Navbar />}
      <Routes>
        <Route path="/" element={<><Home /><Footer /></>} />
        <Route path="/cart" element={<><Cart /><Footer /></>} />
        <Route path="/gracias" element={<><ThankYou /><Footer /></>} />
        <Route path="/detalles-producto" element={<><DetallesProducto /><Footer /></>} />
        <Route path="/filtrado" element={<><FiltradoProducto /><Footer /></>} />
        <Route path="/manage-account" element={<><ManageAccount /><Footer /></>} />
        <Route path="/Catalogo" element={<><Catalogo /><Footer /></>} />
        <Route path="/admin-page/*" element={<AdminPage />} /> 
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/recover-password" element={<RecoverPasswordPage />} />
        <Route path="/track-orders" element={<TrackOrders />} /> {/* Ruta para la nueva vista de seguimiento de productos */}
        <Route path="/thank-you" element={<ThankYou />} /> {/* Ruta para la página de agradecimiento */}
        <Route path="*" element={<><Home /><Footer /></>} /> 
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <NavbarProvider>
      <AllProductsProvider>
        <Router>
          <AppContent />
        </Router>
      </AllProductsProvider>
    </NavbarProvider>
  );
};

export default App;