import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import ResetPasswordScreen from '../screens/resetPassword';
import RegisterScreen from '../screens/register';
import DashboardScreen from '../screens/dashboard';
import NewScreen from '../screens/new';
import DetailsScreen from '../screens/details'; // Importe a DetailsScreen
import { RoutesParams } from './routesParams';

const Stack = createNativeStackNavigator<RoutesParams>();

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="New"
          component={NewScreen}
          options={{
            headerShown: true,
            title: 'Create New Item',
          }}
        />
        {/* Configuração da DetailsScreen */}
        <Stack.Screen
          name="Details"
          component={DetailsScreen} // Componente da tela de detalhes
          options={{
            headerShown: true, // Mostra o cabeçalho
            title: 'Details', // Título da tela
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
