import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('foodboxd_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Falha ao carregar usuário do localStorage", error);
      localStorage.removeItem('foodboxd_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    try {
      localStorage.setItem('foodboxd_user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Falha ao salvar usuário no localStorage", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('foodboxd_user');
      setUser(null);
    } catch (error) {
      console.error("Falha ao remover usuário do localStorage", error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthContext, AuthProvider, useAuth };
