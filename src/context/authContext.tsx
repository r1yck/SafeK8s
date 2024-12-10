import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  username: string;
  fullName: string;
};

type AuthContextData = {
  user: User | null;
  login: (username: string, password: string, keepConnected: boolean) => Promise<void>;
  register: (username: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string, keepConnected: boolean) => {
    try {
      const storedUsers = await AsyncStorage.getItem('@users'); // Pega os usuários cadastrados
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const foundUser = users.find((u: User) => u.username === username); // A busca é pelo username exato
  
      if (foundUser && foundUser.password === password) {
        setUser(foundUser);
  
        if (keepConnected) {
          await AsyncStorage.setItem('@user', JSON.stringify(foundUser));  // Armazenando o usuário logado
        }
      } else {
        throw new Error('Usuário ou senha inválidos.');
      }
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };
  
  const register = async (username: string, password: string, fullName: string) => {
    try {
      const newUser = { username, fullName, password }; 
      const storedUsers = await AsyncStorage.getItem('@users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      users.push(newUser); // Adiciona o novo usuário à lista
      await AsyncStorage.setItem('@users', JSON.stringify(users)); // Salva todos os usuários no AsyncStorage
  
      // Faz login automático após o registro
      setUser(newUser);
      await AsyncStorage.setItem('@user', JSON.stringify(newUser)); 
    } catch (error: any) {
      console.error('Erro ao registrar o usuário:', error);
      throw error;
    }
  };
  
  

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('@user');
  };

  const loadUserFromStorage = async () => {
    const storedUser = await AsyncStorage.getItem('@user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  React.useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
