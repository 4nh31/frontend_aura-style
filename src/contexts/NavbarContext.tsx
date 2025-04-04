import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
}

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
});

export const useNavbarContext = () => useContext(NavbarContext);

interface NavbarProviderProps {
  children: ReactNode;
}

export const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  // Inicializar desde localStorage
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

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

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
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};