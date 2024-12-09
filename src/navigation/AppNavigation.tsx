import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import ResetPasswordScreen from '../screens/resetPassword';
import RegisterScreen from '../screens/register';
import DashboardScreen from '../screens/dashboard';
import NewScreen from '../screens/new';
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
          component={NewScreen} // Alteração aqui
          options={{
            headerShown: true, // ou false, dependendo do design
            title: 'Create New Item' // Título opcional
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
