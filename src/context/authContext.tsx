import React, { createContext, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';  // Importando o SecureStore
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
      const storedUsers = await AsyncStorage.getItem('@users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const foundUser = users.find((u: any) => u.username === username);

      if (foundUser) {
        // Descriptografando a senha
        const decryptedPassword = await SecureStore.getItemAsync(foundUser.username);
        
        if (decryptedPassword === password) {
          const userWithoutPassword = { username: foundUser.username, fullName: foundUser.fullName };
          setUser(userWithoutPassword);

          if (keepConnected) {
            await AsyncStorage.setItem('@user', JSON.stringify(userWithoutPassword));
          }
        } else {
          throw new Error('Usuário ou senha inválidos.');
        }
      } else {
        throw new Error('Usuário não encontrado.');
      }
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };

  const register = async (username: string, password: string, fullName: string) => {
    try {
      const newUser = { username, fullName };
      const storedUsers = await AsyncStorage.getItem('@users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      if (users.some((u: any) => u.username === username)) {
        throw new Error('O nome de usuário já está em uso.');
      }

      // Criptografando a senha antes de salvar
      await SecureStore.setItemAsync(username, password);

      users.push(newUser);
      await AsyncStorage.setItem('@users', JSON.stringify(users));

      const userWithoutPassword = { username, fullName };
      setUser(userWithoutPassword);
      await AsyncStorage.setItem('@user', JSON.stringify(userWithoutPassword));
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
