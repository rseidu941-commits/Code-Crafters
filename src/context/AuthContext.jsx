import { createContext, useContext, useState, useEffect } from 'react';

// Share auth state across all components //
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Check localStorage for saved session on load //
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cc_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) {
          setUser(parsed);
        }
      }
    } catch {
      localStorage.removeItem('cc_user');
    }
  }, []);

  // Login: save user to state and localStorage //
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('cc_user', JSON.stringify(userData));
  };

  // Logout: clear user from state and localStorage //
  const logout = () => {
    setUser(null);
    localStorage.removeItem('cc_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
