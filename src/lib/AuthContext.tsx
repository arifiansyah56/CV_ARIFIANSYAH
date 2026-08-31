import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: { username: string } | null;
  userRole: 'admin' | 'editor' | null;
  loading: boolean;
  login: (username: string, role: 'admin' | 'editor') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  userRole: null, 
  loading: true, 
  login: () => {}, 
  logout: () => {} 
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'editor' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSession = localStorage.getItem('portfolio_auth');
    if (storedSession) {
      try {
        const { username, role } = JSON.parse(storedSession);
        setUser({ username });
        setUserRole(role);
      } catch (e) {
        localStorage.removeItem('portfolio_auth');
      }
    }
    setLoading(false);
  }, []);

  const login = (username: string, role: 'admin' | 'editor') => {
    setUser({ username });
    setUserRole(role);
    localStorage.setItem('portfolio_auth', JSON.stringify({ username, role }));
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    localStorage.removeItem('portfolio_auth');
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
