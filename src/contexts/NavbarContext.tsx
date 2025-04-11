import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definición de las propiedades del contexto, incluidas las funciones para manejar el estado
interface NavbarContextProps {
  isLoginModalOpen: boolean;
  isLoggedIn: boolean;
  username: string | null;
  email: string | null;
  role: string | null;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUsername: (username: string | null) => void;
  setEmail: (email: string | null) => void;
  setRole: (role: string | null) => void;
  logout: () => void; // Nueva función para manejar el cierre de sesión global
}

// Contexto inicial con valores por defecto
const NavbarContext = createContext<NavbarContextProps>({
  isLoginModalOpen: false,
  isLoggedIn: false,
  username: null,
  email: null,
  role: null,
  openLoginModal: () => {},
  closeLoginModal: () => {},
  setIsLoggedIn: () => {},
  setUsername: () => {},
  setEmail: () => {},
  setRole: () => {},
  logout: () => {}, // Función vacía por defecto
});

// Hook para usar el contexto en otros componentes
export const useNavbarContext = () => useContext(NavbarContext);

interface NavbarProviderProps {
  children: ReactNode;
}

// Proveedor del contexto para envolver la aplicación
export const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  // Estados inicializados desde localStorage
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem('username');
  });
  const [email, setEmail] = useState<string | null>(() => {
    return localStorage.getItem('email');
  });
  const [role, setRole] = useState<string | null>(() => {
    return localStorage.getItem('role');
  });

  // Guardar en localStorage cuando los valores cambien
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    if (username) localStorage.setItem('username', username);
    else localStorage.removeItem('username');
  }, [username]);

  useEffect(() => {
    if (email) localStorage.setItem('email', email);
    else localStorage.removeItem('email');
  }, [email]);

  useEffect(() => {
    if (role) localStorage.setItem('role', role);
    else localStorage.removeItem('role');
  }, [role]);

  // Abrir el modal de inicio de sesión
  const openLoginModal = () => setIsLoginModalOpen(true);

  // Cerrar el modal de inicio de sesión
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // Función para manejar el cierre de sesión global
  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    setEmail(null);
    setRole(null);

    // Limpiar el almacenamiento local
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('token'); // Si tienes un token de autenticación
    localStorage.removeItem('idUsuario'); // Si guardas el ID del usuario
  };

  return (
    <NavbarContext.Provider
      value={{
        isLoginModalOpen,
        isLoggedIn,
        username,
        email,
        role,
        openLoginModal,
        closeLoginModal,
        setIsLoggedIn,
        setUsername,
        setEmail,
        setRole,
        logout, // Proveer la función de logout al contexto
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};