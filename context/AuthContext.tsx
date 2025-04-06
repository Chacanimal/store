import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) setUser(JSON.parse(userData));
    };
    loadUser();
  }, []);

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      const newUser = { email, password };
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } catch {
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const stored = await AsyncStorage.getItem('user');
    if (!stored) return false;

    const savedUser: User = JSON.parse(stored);
    if (savedUser.email === email && savedUser.password === password) {
      setUser(savedUser);
      return true;
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
