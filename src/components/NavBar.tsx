import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/Logo.png';
import Modal from 'react-modal';
import { useNavbarContext } from '../contexts/NavbarContext';
import { ILogin } from '../interfaces/ILogin';
import { login, register, requestResetPassword } from '../services/userServices';
import { IRegister } from '../interfaces/IRegister';

// Establecer el elemento de la aplicación para react-modal
Modal.setAppElement('#root');

interface Product {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  image: string;
  description: string;
}

const Navbar: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { isLoginModalOpen, isLoggedIn, username, openLoginModal, closeLoginModal, setIsLoggedIn, setUsername, setEmail: setUserEmail, role, setRole } = useNavbarContext();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const data: ILogin = { email, password };
      const response = await login(data);
  
      if (response) {
        console.log("Login exitoso:", response);
        
        // Guardar token y estado de autenticación en localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem('idUsuario', response.idUsuario.toString());
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', response.role);
        setIsLoggedIn(true);
        setUsername(response.username); // Actualizar el nombre de usuario
        setUserEmail(response.email); // Actualizar el correo electrónico
        setRole(response.role); // Actualizar el rol del usuario
        closeLoginModal();
        
        console.log("Rol del usuario:", response.role);
        if (response.role === 'admin') {
          console.log("Redirigiendo a /admin-page");
          navigate("/admin-page"); // Redirige a la página de administración
        } else {
          navigate("/"); // Redirige a la página principal si el usuario es normal
        }
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.");
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const newUser: IRegister = {
        nombre: username ?? "",
        email,
        password,
        telefono: null,  // Se envía como null
        direccion: null, // Se envía como null
        rol: "usuario"  // Se envía como usuario por defecto
      };
      const response = await register(newUser);  
      if (response) {
        console.log("Registro exitoso:", response);
        setIsRegisterModalOpen(false);
        openLoginModal();
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  const handleLogout = () => {
    console.log("Cerrando sesión y eliminando datos de localStorage");
    setIsLoggedIn(false);
    setUsername(null);
    setUserEmail(null);
    setEmail('');
    setPassword('');
    setIsDropdownOpen(false);
    setRole('');
    localStorage.removeItem("token");
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    navigate("/"); // Redirige a la página de inicio en lugar de "/login"
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      // Aquí iría la lógica para buscar productos
      const results: Product[] = []; // Reemplazar con lógica de búsqueda
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSelect = (productId: number) => {
    navigate(`/producto/${productId}`);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleManageAccount = () => {
    navigate('/manage-account');
    setIsDropdownOpen(false);
  };

  const handleTrackOrders = () => {
    navigate('/track-orders');
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-md py-3 rounded-md relative">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center space-x-2">
          <img src={logo} alt="Aura-style Logo" className="h-10" />
          <span>Aura-style</span>
        </div>
        {/* Links */}
        <div className="flex space-x-6 items-center flex-grow justify-center">
          <Link to="/" className="hover:text-gray-700 transition-colors">Inicio</Link>
          <Link to="/Catalogo" className="hover:text-gray-700 transition-colors">Catalogo</Link>
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Buscar..."
              className="border px-4 py-2 rounded-full shadow-sm w-full"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-lg z-50">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSearchSelect(product.id)}
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link to="/cart" className="flex items-center hover:text-gray-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H4M7 13l-1.6 8H18l-1.6-8M10 21h4" />
            </svg>
            Carrito
          </Link>
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="hover:text-gray-700 transition-colors">
                {username}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                  <button onClick={handleManageAccount} className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors">Gestionar Cuenta</button>
                  <button onClick={handleTrackOrders} className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors">Ver seguimiento de mis pedidos</button>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-black hover:text-white hover:bg-red-600 transition-colors">Cerrar Sesión</button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={openLoginModal} className="hover:text-gray-700 transition-colors">Login</button>
          )}
        </div>
      </div>

      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        className="modal-style"
        overlayClassName="overlay-style"
      >
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-4 py-2 w-full rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-4 py-2 w-full rounded-md"
              required
            />
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">Iniciar Sesión</button>
        </form>
        <p className="mt-4 text-center">
          ¿Olvidaste tu contraseña?{' '}
          <button
            onClick={() => {
              closeLoginModal();
              navigate('/recover-password');
            }}
            className="text-blue-500 hover:underline"
          >
            Recuperar contraseña
          </button>
        </p>
        <p className="mt-4 text-center">
          ¿No tienes una cuenta?{' '}
          <a href="#" className="text-blue-500 hover:underline" onClick={() => { closeLoginModal(); setIsRegisterModalOpen(true); }}>
            Regístrate
          </a>
        </p>
      </Modal>

      <Modal
        isOpen={isRegisterModalOpen}
        onRequestClose={() => setIsRegisterModalOpen(false)}
        className="modal-style"
        overlayClassName="overlay-style"
      >
        <h2 className="text-2xl font-bold mb-4">Registrar Cuenta</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-4 py-2 w-full rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre de Usuario</label>
            <input
              type="text"
              value={username ?? ''}
              onChange={(e) => setUsername(e.target.value)}
              className="border px-4 py-2 w-full rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-4 py-2 w-full rounded-md"
              required
            />
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">Registrar</button>
        </form>
      </Modal>

      <style>{`
        .modal-style {
          top: 10%;
          right: 10%;
          width: 80%;
          max-width: 400px;
          position: absolute;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          z-index: 1000;
        }

        .overlay-style {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .transition-colors {
          transition: background-color 0.3s, color 0.3s;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;