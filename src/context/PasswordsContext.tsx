import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  deletePassword: (id: string) => void; // Função para deletar senha
  editPassword: (id: string, updatedPassword: Partial<Password>) => void; // Função para editar senha
  searchPasswords: (query: string) => void;
}

export const PasswordsContext = createContext<PasswordsContextData>({} as PasswordsContextData);

export function PasswordsProvider({ children }: { children: ReactNode }) {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [originalPasswords, setOriginalPasswords] = useState<Password[]>([]);

  useEffect(() => {
    const loadPasswords = async () => {
      try {
        const storedPasswords = await AsyncStorage.getItem('@passwords');
        if (storedPasswords) {
          const parsedPasswords = JSON.parse(storedPasswords);
          // Verificação simples para garantir que os dados estão no formato correto
          if (Array.isArray(parsedPasswords)) {
            setPasswords(parsedPasswords);
            setOriginalPasswords(parsedPasswords);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar as senhas do AsyncStorage:', error);
      }
    };
    loadPasswords();
  }, []);

  const addPassword = async (password: Password) => {
    try {
      const updatedPasswords = [...passwords, password];
      setPasswords(updatedPasswords);
      setOriginalPasswords(updatedPasswords);
      await AsyncStorage.setItem('@passwords', JSON.stringify(updatedPasswords));
    } catch (error) {
      console.error('Erro ao adicionar senha no AsyncStorage:', error);
    }
  };

  const deletePassword = async (id: string) => {
    try {
      const updatedPasswords = passwords.filter(password => password.id !== id);
      setPasswords(updatedPasswords);
      setOriginalPasswords(updatedPasswords);
      await AsyncStorage.setItem('@passwords', JSON.stringify(updatedPasswords));
    } catch (error) {
      console.error('Erro ao deletar senha no AsyncStorage:', error);
    }
  };

  const editPassword = async (id: string, updatedPassword: Partial<Password>) => {
    try {
      const updatedPasswords = passwords.map(password =>
        password.id === id ? { ...password, ...updatedPassword } : password
      );
      setPasswords(updatedPasswords);
      setOriginalPasswords(updatedPasswords);
      await AsyncStorage.setItem('@passwords', JSON.stringify(updatedPasswords));
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
      value={{ passwords, addPassword, deletePassword, editPassword, searchPasswords }}
    >
      {children}
    </PasswordsContext.Provider>
  );
}
