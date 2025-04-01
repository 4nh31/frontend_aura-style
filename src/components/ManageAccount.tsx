import React, { useState, useEffect } from 'react';
import { useNavbarContext } from '../contexts/NavbarContext';
import { IGetById } from '../interfaces/IGetById';
import { getuser, deleteuser, updateUser } from '../services/userServices';
import { redirect, useNavigate } from 'react-router-dom';

const ManageAccount: React.FC = () => {
  const { username, email } = useNavbarContext();
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const idUsuario = localStorage.getItem('idUsuario'); // Obtener ID del localStorage
      if (!idUsuario) {
        console.error('No se encontró ID del usuario en localStorage');
        return;
      }

      try {
        const userData = await getuser(parseInt(idUsuario)); // Llamar al servicio
        setPhone(userData.telefono || '');
        setAddress(userData.direccion || '');
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteAccount = async () => {
    const idUsuario = localStorage.getItem('idUsuario');
    if (!idUsuario) {
      alert('No se encontró el ID del usuario.');
      return;
    }

    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (!confirmDelete) return;

    try {
      await deleteuser(parseInt(idUsuario));
      alert('Cuenta eliminada exitosamente.');
      
      // Cerrar sesión
      localStorage.removeItem('token');
      localStorage.removeItem('idUsuario');
      redirect('/login'); // Redirigir a la página de login
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
      alert('Hubo un problema al eliminar la cuenta.');
    }
  };

  const handleSave = async () => {
    const idUsuario = localStorage.getItem('idUsuario');
    if (!idUsuario) {
      alert('No se encontró el ID del usuario.');
      return;
    }

    const updatedUser = {
      nombre: username ?? undefined,
      email: email ?? undefined,
      telefono: phone,
      direccion: address,
      rol: 'usuario' // Assuming the role remains the same
    };

    try {
      await updateUser(parseInt(idUsuario), updatedUser);
      alert('Información actualizada correctamente.');
    } catch (error) {
      console.error('Error al actualizar la información:', error);
      alert('Hubo un problema al actualizar la información.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Gestionar Cuenta</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nombre de Usuario</label>
          <input
            type="text"
            value={username ?? ''}
            className="border px-4 py-2 w-full rounded-md bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Correo Electrónico</label>
          <input
            type="email"
            value={email ?? ''}
            className="border px-4 py-2 w-full rounded-md bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Número de Teléfono</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-green-300 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Dirección</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-green-300 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors mb-4"
        >
          Guardar
        </button>
        <button
          onClick={handleDeleteAccount}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Eliminar Cuenta
        </button>
      </div>
    </div>
  );
};

export default ManageAccount;