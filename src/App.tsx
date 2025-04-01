import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavbarProvider } from './contexts/NavbarContext';
import { AllProductsProvider } from './contexts/AllProductsContext';
import Home from './components/Home';
import Cart from './components/Cart';
import ThankYou from './components/ThankYou';
import Navbar from './components/NavBar';
import Admin from './components/Admin';
import DetallesProducto from './components/DetallesProducto';
import ManageAccount from './components/ManageAccount';
import Catalogo from './components/Catalogo';

const App: React.FC = () => {
  return (
    <NavbarProvider>
      <AllProductsProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/gracias" element={<ThankYou />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/producto/:id" element={<DetallesProducto />} />
            <Route path="/manage-account" element={<ManageAccount />} />
            <Route path="/Catalogo" element={<Catalogo />} />
          </Routes>
        </Router>
      </AllProductsProvider>
    </NavbarProvider>
  );
};

export default App;