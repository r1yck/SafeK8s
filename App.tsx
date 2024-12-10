import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import AppNavigation from './src/navigation/AppNavigation';
import { AuthProvider } from './src/context/authContext'; // Importa o AuthProvider

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <AppNavigation />
      </SafeAreaView>
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
