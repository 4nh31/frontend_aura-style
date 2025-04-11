import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import ProductManagement from './ProductManagement';
import CouponManagement from './CouponManagement';
import AdminCategories from './AdminCategories';
import AdminOrders from './AdminOrders';

// Página principal del Administrador
const AdminHome: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 text-gray-800">
    <div className="text-center p-6 bg-white shadow-lg rounded-md w-3/4 md:w-2/4 lg:w-1/3 animate-fade-in">
      <h1 className="text-4xl font-extrabold text-gray-800">Bienvenido al Administrador</h1>
      <p className="mt-4 text-gray-600">
        Seleccione una opción en el menú de navegación para comenzar a gestionar tu plataforma.
      </p>
      {/* Imagen representativa */}
      <img
        src="src/assets/img/admin-dashboard.jpg" // Reemplaza con la ruta de la imagen
        alt="Admin Dashboard"
        className="mt-8 w-full h-48 object-contain rounded-md shadow-md animate-slide-in"
      />
    </div>
  </div>
);

// Página de Administración
const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Navbar */}
      <AdminNavBar />

      {/* Contenido Principal */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/coupons" element={<CouponManagement />} />
          <Route path="/categories" element={<AdminCategories />} />
          <Route path="/orders" element={<AdminOrders />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 text-center py-6">
        <p className="text-sm">
          © {new Date().getFullYear()} Aura-style Admin Panel. Todos los derechos reservados.
        </p>
      </footer>

      {/* Animaciones Personalizadas */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-in-out;
        }

        .animate-slide-in {
          animation: slide-in 1.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AdminPage;