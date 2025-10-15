import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Login } from '../pages/login';
import { Register } from '../pages/register';

export default function Routes() {
   const Stack = createStackNavigator();
   return (
      <Stack.Navigator
         initialRouteName="Login"
         screenOptions={{
            headerShown: false,
            cardStyle: {
               backgroundColor: '#FFF',
            },
         }}
      >
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
   );
}
