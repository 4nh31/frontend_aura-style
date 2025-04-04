import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavbarProvider, useNavbarContext } from './contexts/NavbarContext';
import { AllProductsProvider } from './contexts/AllProductsContext';
import Home from './components/Home';
import Cart from './components/Cart';
import ThankYou from './components/ThankYou';
import Navbar from './components/NavBar';
import Admin from './components/AdminPage';
import AdminPage from './components/AdminPage'; // Importar la nueva página de administración
import DetallesProducto from './components/DetallesProducto';
import ManageAccount from './components/ManageAccount';
import Catalogo from './components/Catalogo';
import Footer from './components/Footer'; // Importar el componente Footer

const App: React.FC = () => {
  const { isLoggedIn, role, setIsLoggedIn, setRole } = useNavbarContext(); // Usar el hook useNavbarContext

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedRole = localStorage.getItem('role');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
      setRole(storedRole);
    }
  }, [setIsLoggedIn, setRole]);

  console.log("isLoggedIn:", isLoggedIn, "role:", role);

  return (
    <NavbarProvider>
      <AllProductsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
            <Route path="/cart" element={<><Navbar /><Cart /><Footer /></>} />
            <Route path="/gracias" element={<><Navbar /><ThankYou /><Footer /></>} />
            {isLoggedIn && role === 'admin' && (
              <Route path="/admin" element={<Admin />} />
            )}
            <Route path="/admin-page" element={<AdminPage />} /> {/* Nueva ruta para AdminPage */}
            <Route path="/producto/:id" element={<><Navbar /><DetallesProducto /><Footer /></>} />
            <Route path="/manage-account" element={<><Navbar /><ManageAccount /><Footer /></>} />
            <Route path="/Catalogo" element={<><Navbar /><Catalogo /><Footer /></>} />
            <Route path="*" element={<><Navbar /><Home /><Footer /></>} /> {/* Ruta de respaldo */}
          </Routes>
        </Router>
      </AllProductsProvider>
    </NavbarProvider>
  );
};

export default App;