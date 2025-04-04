import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavBar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-2xl font-bold">Admin Dashboard</div>
        <div className="flex space-x-6">
          <Link to="/admin-page" className="hover:text-gray-400">Inicio</Link>
          <Link to="/admin-page/products" className="hover:text-gray-400">Productos</Link>
          <Link to="/admin-page/coupons" className="hover:text-gray-400">Cupones</Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;