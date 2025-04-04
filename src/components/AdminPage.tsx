import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductManagement from './ProductManagement';
import CouponManagement from './CouponManagement';
import AdminNavBar from './AdminNavBar';

const AdminHome: React.FC = () => (
  <div className="text-center mt-10">
    <h1 className="text-3xl font-bold">Bienvenido al Administrador</h1>
    <p className="mt-4">Seleccione una opción en el menú de navegación para comenzar.</p>
  </div>
);

const AdminPage: React.FC = () => {
  return (
    <div>
      <AdminNavBar />
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/coupons" element={<CouponManagement />} />
      </Routes>
    </div>
  );
};

export default AdminPage;