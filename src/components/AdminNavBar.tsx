import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    navigate('/logout');
  };

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-2xl font-bold">Admin Dashboard</div>
        <div className="flex space-x-6">
          <Link to="/admin-page" className="hover:text-gray-400 transition-transform transform hover:scale-110">Inicio</Link>
          <Link to="/admin-page/products" className="hover:text-gray-400 transition-transform transform hover:scale-110">Productos</Link>
          <Link to="/admin-page/coupons" className="hover:text-gray-400 transition-transform transform hover:scale-110">Cupones</Link>
          <Link to="/admin-page/categories" className="hover:text-gray-400 transition-transform transform hover:scale-110">Categorías</Link>
          <Link to="/admin-page/orders" className="hover:text-gray-400 transition-transform transform hover:scale-110">Seguimiento de Pedidos</Link>
          <button onClick={handleLogout} className="hover:text-gray-400 transition-transform transform hover:scale-110 text-red-500">Cerrar Sesión</button>
        </div>
      </div>
      <style>{`
        nav a, nav button {
          transition: all 0.3s ease;
        }
      `}</style>
    </nav>
  );
};

export default AdminNavBar;