import './gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index.routes';

import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';
import {
   Poppins_300Light,
   Poppins_400Regular,
   Poppins_500Medium,
   Poppins_600SemiBold,
   Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import AppLoading from 'expo-app-loading';

export default function App() {
   const [fontsLoaded] = useFonts({
      Poppins_300Light,
      Lobster_400Regular,
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_600SemiBold,
      Poppins_700Bold,
   });

   if (!fontsLoaded) {
      return <AppLoading />;
   }
   return (
      <NavigationContainer>
         <Routes />
      </NavigationContainer>
   );
}

const styles = StyleSheet.create({
   container: {},
});
