import React, { useState } from 'react';
import {
   View,
   Alert,
   SafeAreaView,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
} from 'react-native';

import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Input } from '../../components/auth/Input';
import { Button } from '../../components/auth/Button';
import { styles } from './styles';
import { HeaderBox } from '../../components/auth/HeaderBox';
import { AuthRedirect } from '../../components/auth/AuthRedirect';
import { supabase } from '../../lib/supabase';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { useAuth } from '../../contexts/AuthContext';

export function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(true);
   const [loading, setLoading] = useState(false);

   const { setAuth } = useAuth();

   const navigation = useNavigation<NavigationProp<any>>();

   async function handleSignIn() {
      setLoading(true);

      // Verificação de campos obrigatórios
      if (email === '' || password === '') {
         Alert.alert('Erro', 'Por favor, preencha todos os campos');
         setLoading(false);
         return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
         email: email,
         password: password,
      });

      if (error) {
         Alert.alert('Error', error.message);
         setLoading(false);
         return;
      }

      if (data.user) {
         setAuth(data.user);
         navigation.reset({ routes: [{ name: 'BottomRoutes' }] });
      }
      setLoading(false);
   }
   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={{ flex: 1 }}
      >
         <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
               <View style={styles.boxTop}>
                  <HeaderBox title="SmartBills" subtitle="Seja Bem-Vindo de Volta" />
               </View>

               <View style={styles.boxMid}>
                  <Input
                     value={email}
                     onChangeText={setEmail}
                     placeholder="Email"
                     IconRigth={MaterialIcons}
                     iconRigthName="email"
                  />
                  <Input
                     value={password}
                     onChangeText={setPassword}
                     placeholder="Senha"
                     IconRigth={Octicons}
                     iconRigthName={showPassword ? 'eye' : 'eye-closed'}
                     secureTextEntry={showPassword}
                     onIconRigthPress={() => setShowPassword(!showPassword)}
                  />
               </View>
               <View style={styles.boxBottom}>
                  <Button text="Entrar" loading={loading} onPress={() => handleSignIn()} />
                  <AuthRedirect
                     message={'Ainda não possui uma conta?'}
                     linkText={'Cadastre-se'}
                     targetScreen={'Register'}
                  />
               </View>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
}
