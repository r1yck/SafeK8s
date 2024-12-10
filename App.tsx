import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import AppNavigation from './src/navigation/AppNavigation';
import { AuthProvider } from './src/context/authContext'; // Importa o AuthProvider
import { PasswordsProvider } from './src/context/PasswordsContext'; // Importa o PasswordsProvider

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <PasswordsProvider>
        <SafeAreaView style={styles.container}>
          <AppNavigation />
        </SafeAreaView>
      </PasswordsProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15616D',
  },
});

export default App;
