import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './authContext';

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
  const [loading, setLoading] = useState(true); // Adicionando estado de loading

  const { user } = useAuth();

  useEffect(() => {
    const loadPasswords = async () => {
      if (!user) {
        setLoading(false); // Se não houver usuário logado, apenas finalize o loading
        return;
      }

      try {
        const storedPasswords = await AsyncStorage.getItem('@passwords');
        if (storedPasswords) {
          const parsedPasswords = JSON.parse(storedPasswords);
          const userPasswords = parsedPasswords[user.username] || [];
          setPasswords(userPasswords);
          setOriginalPasswords(userPasswords);
        }
      } catch (error) {
        console.error('Erro ao carregar as senhas do AsyncStorage:', error);
      } finally {
        setLoading(false); // Finaliza o loading após carregar ou falhar
      }
    };

    loadPasswords();
  }, [user]);

  const addPassword = async (password: Password) => {
    if (!user || loading) return; // Impede a adição de senha enquanto o loading está em progresso
    try {
      const storedPasswords = await AsyncStorage.getItem('@passwords');
      const parsedPasswords = storedPasswords ? JSON.parse(storedPasswords) : {};
      const userPasswords = parsedPasswords[user.username] || [];

      const updatedPasswords = [...userPasswords, password];
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
