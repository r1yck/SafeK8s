import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
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
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const loadUserFromStorage = async () => {
    const storedUser = await AsyncStorage.getItem('@user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  };

  // Função de login
  const login = async (username: string, password: string, keepConnected: boolean) => {
    try {
      const storedUsers = await AsyncStorage.getItem('@users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const foundUser = users.find((u: any) => u.username === username);

      if (foundUser) {
        const decryptedPassword = await SecureStore.getItemAsync(foundUser.username);

        if (decryptedPassword === password) {
          const userWithoutPassword = { username: foundUser.username, fullName: foundUser.fullName };
          setUser(userWithoutPassword);

          if (keepConnected) {
            await AsyncStorage.setItem('@user', JSON.stringify(userWithoutPassword));
          } else {
            await AsyncStorage.removeItem('@user');
          }
        } else {
          throw new Error('Invalid username or password.');
        }
      } else {
        throw new Error('User not found.');
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
        throw new Error('Username is already taken.');
      }

      await SecureStore.setItemAsync(username, password);
      users.push(newUser);
      await AsyncStorage.setItem('@users', JSON.stringify(users));

      const userWithoutPassword = { username, fullName };
      setUser(userWithoutPassword);
      await AsyncStorage.setItem('@user', JSON.stringify(userWithoutPassword));
    } catch (error: any) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('@user');
  };

  // Função de atualização de senha
  const updatePassword = async (newUsername: string, newPassword: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem('@users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const foundUser = users.find((u: any) => u.username === newUsername);

      if (foundUser) {
        await SecureStore.setItemAsync(newUsername, newPassword);

        const updatedUsers = users.map((u: any) =>
          u.username === newUsername ? { ...u, password: newPassword } : u
        );
        await AsyncStorage.setItem('@users', JSON.stringify(updatedUsers));
      } else {
        throw new Error('User not found.');
      }
    } catch (error: any) {
      console.error('Error updating password:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updatePassword, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
