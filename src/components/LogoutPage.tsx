import React from 'react';
import { Link } from 'react-router-dom';

const LogoutPage: React.FC = () => {
  return (
    <div className="container mx-auto text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Has cerrado sesión como administrador</h1>
      <p className="text-lg mb-8">Tus cambios han sido guardados exitosamente.</p>
      <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default LogoutPage;