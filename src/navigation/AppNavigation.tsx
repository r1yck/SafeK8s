import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import ResetPasswordScreen from '../screens/resetPassword';
import RegisterScreen from '../screens/register';
import DashboardScreen from '../screens/dashboard';
import NewScreen from '../screens/new';
import DetailsScreen from '../screens/details'; // Importe a DetailsScreen
import EditScreen from '../screens/edit'; // Importe a tela de edição
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
        <Stack.Screen
          name="Details"
          component={DetailsScreen} // Componente da tela de detalhes
          options={{
            headerShown: true, // Mostra o cabeçalho
            title: 'Details', // Título da tela
          }}
        />
        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{
            headerShown: true,
            title: 'Edit Item',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
