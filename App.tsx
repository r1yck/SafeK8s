import React from 'react';
import { SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './src/screens/LoginScreen';

const App: React.FC = () => {
  // Carregar a fonte personalizada
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter_24pt-Regular.ttf'),
  });

  // Retornar null enquanto a fonte não é carregada
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginScreen />
    </SafeAreaView>
  );
};

export default App;
