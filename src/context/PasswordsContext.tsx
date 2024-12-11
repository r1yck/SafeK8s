import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './authContext';
import * as SecureStore from 'expo-secure-store';

const SECRET_KEY = 'henri0202'; // Chave secreta para criptografia, que pode ser útil para armazenamento com SecureStore

interface Password {
  id: string;
  title: string;
  email: string;
  link: string;
  password: string;
  description?: string;
}

interface PasswordsContextData {
  passwords: Password[];
  addPassword: (password: Password) => void;
  deletePassword: (id: string) => void;
  editPassword: (id: string, updatedPassword: Partial<Password>) => void;
  searchPasswords: (query: string) => void;
  loading: boolean;
}

export const PasswordsContext = createContext<PasswordsContextData>({} as PasswordsContextData);

export function PasswordsProvider({ children }: { children: ReactNode }) {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [originalPasswords, setOriginalPasswords] = useState<Password[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Função para armazenar senha no SecureStore (usando o nome de usuário como chave)
  const storePasswordSecurely = async (key: string, password: string) => {
    await SecureStore.setItemAsync(key, password); // Armazena a senha criptografada com SecureStore
  };

  // Função para recuperar a senha do SecureStore
  const retrievePasswordSecurely = async (key: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(key); // Recupera a senha criptografada
  };

  useEffect(() => {
    const loadPasswords = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const storedPasswords = await AsyncStorage.getItem('@passwords');
        if (storedPasswords) {
          const parsedPasswords = JSON.parse(storedPasswords);
          const userPasswords = parsedPasswords[user.username] || [];

          // Descriptografar todas as senhas ao carregar
          const decryptedPasswords = await Promise.all(
            userPasswords.map(async (password: Password) => ({
              ...password,
              password: await retrievePasswordSecurely(password.id), // Recupera a senha criptografada
            }))
          );

          setPasswords(decryptedPasswords);
          setOriginalPasswords(decryptedPasswords);
        }
      } catch (error) {
        console.error('Erro ao carregar as senhas do AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPasswords();
  }, [user]);

  const addPassword = async (password: Password) => {
    if (!user || loading) return;
    try {
      const storedPasswords = await AsyncStorage.getItem('@passwords');
      const parsedPasswords = storedPasswords ? JSON.parse(storedPasswords) : {};
      const userPasswords = parsedPasswords[user.username] || [];

      // Armazena a senha de forma segura usando SecureStore
      await storePasswordSecurely(password.id, password.password);

      const updatedPasswords = [...userPasswords, { ...password }];
      parsedPasswords[user.username] = updatedPasswords;

      await AsyncStorage.setItem('@passwords', JSON.stringify(parsedPasswords));
      setPasswords(updatedPasswords);
      setOriginalPasswords(updatedPasswords);
    } catch (error) {
      console.error('Erro ao adicionar senha no AsyncStorage:', error);
    }
  };

  const deletePassword = async (id: string) => {
    if (!user || loading) return;
    try {
      const storedPasswords = await AsyncStorage.getItem('@passwords');
      const parsedPasswords: Record<string, Password[]> = storedPasswords ? JSON.parse(storedPasswords) : {};
      const userPasswords = parsedPasswords[user.username] || [];

      // Remove a senha do SecureStore
      await SecureStore.deleteItemAsync(id);

      const updatedPasswords = userPasswords.filter((password: Password) => password.id !== id);
      parsedPasswords[user.username] = updatedPasswords;

      await AsyncStorage.setItem('@passwords', JSON.stringify(parsedPasswords));
      setPasswords(updatedPasswords);
      setOriginalPasswords(updatedPasswords);
    } catch (error) {
      console.error('Erro ao deletar senha no AsyncStorage:', error);
    }
  };

  const editPassword = async (id: string, updatedPassword: Partial<Password>) => {
    if (!user || loading) return;
    try {
      const storedPasswords = await AsyncStorage.getItem('@passwords');
      const parsedPasswords: Record<string, Password[]> = storedPasswords ? JSON.parse(storedPasswords) : {};
      const userPasswords = parsedPasswords[user.username] || [];

      const updatedPasswords = userPasswords.map((password: Password) =>
        password.id === id ? { ...password, ...updatedPassword } : password
      );

      // Se a senha foi alterada, atualize no SecureStore
      if (updatedPassword.password) {
        await storePasswordSecurely(id, updatedPassword.password as string);
      }

      parsedPasswords[user.username] = updatedPasswords;

      await AsyncStorage.setItem('@passwords', JSON.stringify(parsedPasswords));
      setPasswords(updatedPasswords);
      setOriginalPasswords(updatedPasswords);
    } catch (error) {
      console.error('Erro ao editar senha no AsyncStorage:', error);
    }
  };

  const searchPasswords = (query: string) => {
    if (query.trim() === '') {
      setPasswords(originalPasswords);
    } else {
      const filteredPasswords = originalPasswords.filter(password =>
        password.title.toLowerCase().includes(query.toLowerCase()) ||
        (password.description && password.description.toLowerCase().includes(query.toLowerCase()))
      );
      setPasswords(filteredPasswords);
    }
  };

  return (
    <PasswordsContext.Provider
      value={{ passwords, addPassword, deletePassword, editPassword, searchPasswords, loading }}
    >
      {children}
    </PasswordsContext.Provider>
  );
}
