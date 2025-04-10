import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecoverPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const handleRecoverPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== repeatPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/recover-password', {
        newPassword
      });

      if (response.data.success) {
        alert('Contraseña cambiada exitosamente.');
        navigate('/'); // Redirige a la página principal
      } else {
        alert('Error al cambiar la contraseña. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      alert('Error al cambiar la contraseña. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Recuperar Contraseña</h2>
        <form onSubmit={handleRecoverPassword} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nueva Contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Repetir Nueva Contraseña</label>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">Cambiar Contraseña</button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;