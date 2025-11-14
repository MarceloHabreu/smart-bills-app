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

import { AuthProvider } from './src/contexts/AuthContext';
import { useNavigationContainerRef } from '@react-navigation/native';
import AuthGate from './AuthGate';
import * as SplashScreen from 'expo-splash-screen';

// Previne que a splash suma
SplashScreen.preventAutoHideAsync();

export default function App() {
   const navigationRef = useNavigationContainerRef<any>();
   const [fontsLoaded] = useFonts({
      Poppins_300Light,
      Lobster_400Regular,
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_600SemiBold,
      Poppins_700Bold,
   });

   React.useEffect(() => {
      if (fontsLoaded) {
         SplashScreen.hideAsync();
      }
   }, [fontsLoaded]);

   if (!fontsLoaded) return null;
   return (
      <AuthProvider>
         <NavigationContainer ref={navigationRef}>
            <AuthGate navigationRef={navigationRef} />
            <Routes />
         </NavigationContainer>
      </AuthProvider>
   );
}

const styles = StyleSheet.create({
   container: {},
});
