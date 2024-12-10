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
  searchPasswords: (query: string) => void; // Adiciona a função de busca
}

export const PasswordsContext = createContext<PasswordsContextData>({} as PasswordsContextData);

export function PasswordsProvider({ children }: { children: ReactNode }) {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [originalPasswords, setOriginalPasswords] = useState<Password[]>([]); // Armazena todas as senhas originais

  useEffect(() => {
    const loadPasswords = async () => {
      const storedPasswords = await AsyncStorage.getItem('@passwords');
      if (storedPasswords) {
        const parsedPasswords = JSON.parse(storedPasswords);
        setPasswords(parsedPasswords);
        setOriginalPasswords(parsedPasswords); // Carrega na lista original também
      }
    };
    loadPasswords();
  }, []);

  const addPassword = async (password: Password) => {
    const updatedPasswords = [...passwords, password];
    setPasswords(updatedPasswords);
    setOriginalPasswords(updatedPasswords); // Atualiza a lista original também
    await AsyncStorage.setItem('@passwords', JSON.stringify(updatedPasswords));
  };

  const searchPasswords = (query: string) => {
    if (query.trim() === '') {
      // Se a busca estiver vazia, restaura a lista original
      setPasswords(originalPasswords);
    } else {
      // Filtra as senhas com base no título ou descrição
      const filteredPasswords = originalPasswords.filter(password =>
        password.title.toLowerCase().includes(query.toLowerCase()) ||
        (password.description && password.description.toLowerCase().includes(query.toLowerCase()))
      );
      setPasswords(filteredPasswords);
    }
  };

  return (
    <PasswordsContext.Provider value={{ passwords, addPassword, searchPasswords }}>
      {children}
    </PasswordsContext.Provider>
  );
}
