import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { NavbarProvider, useNavbarContext } from './contexts/NavbarContext';
import { AllProductsProvider } from './contexts/AllProductsContext';
import Home from './components/Home';
import Cart from './components/Cart';
import ThankYou from './components/ThankYou';
import Navbar from './components/NavBar';
import AdminPage from './components/AdminPage'; // Importar la página de administración
import ProductManagement from './components/ProductManagement'; // Importar el componente de gestión de productos
import CouponManagement from './components/CouponManagement'; // Importar el componente de gestión de cupones
import DetallesProducto from './components/DetallesProducto';
import ManageAccount from './components/ManageAccount';
import Catalogo from './components/Catalogo';
import Footer from './components/Footer'; // Importar el componente Footer

const AppContent: React.FC = () => {
  const { isLoggedIn, role, setIsLoggedIn, setRole } = useNavbarContext(); // Usar el hook useNavbarContext
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
        <Route path="/producto/:id" element={<><DetallesProducto /><Footer /></>} />
        <Route path="/manage-account" element={<><ManageAccount /><Footer /></>} />
        <Route path="/Catalogo" element={<><Catalogo /><Footer /></>} />
        <Route path="/admin-page/*" element={<AdminPage />} /> {/* Ruta para AdminPage */}
        <Route path="*" element={<><Home /><Footer /></>} /> {/* Ruta de respaldo */}
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