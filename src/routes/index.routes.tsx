import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Login } from '../pages/login';
import { Register } from '../pages/register';
import BottomRoutes from './bottom.routes';
import { AuthProvider } from '../contexts/AuthContext';
import { Index } from '../pages';

export default function RootLaytout() {
   return (
      <AuthProvider>
         <Routes />
      </AuthProvider>
   );
}

function Routes() {
   const Stack = createStackNavigator();
   return (
      <Stack.Navigator
         initialRouteName="Index"
         screenOptions={{
            headerShown: false,
            cardStyle: {
               backgroundColor: '#FFF',
            },
         }}
      >
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Register" component={Register} />
         <Stack.Screen name="Index" component={Index} />
         <Stack.Screen name="BottomRoutes" component={BottomRoutes} />
      </Stack.Navigator>
   );
}
