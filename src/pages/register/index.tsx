import React, { useState } from 'react';
import { View, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Input } from '@/components/auth/Input';
import { Button } from '@/components/auth/Button';
import { styles } from './styles';

import { HeaderBox } from '@/components/auth/HeaderBox';
import { AuthRedirect } from '@/components/auth/AuthRedirect';
import { supabase } from '@/lib/supabase';
import { NavigationProp, useNavigation } from '@react-navigation/core';

export function Register() {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [showPassword, setShowPassword] = useState(true);
   const [loading, setLoading] = useState(false);

   const navigation = useNavigation<NavigationProp<any>>();

   async function handleSignUp() {
      setLoading(true);

      // Verificação de campos obrigatórios
      if (name === '' || email === '' || password === '' || confirmPassword === '') {
         Alert.alert('Erro', 'Por favor, preencha todos os campos');
         setLoading(false);
         return;
      }

      // Verificação se as senhas coincidem
      if (password !== confirmPassword) {
         Alert.alert('Erro', 'As senhas não coincidem');
         setLoading(false);
         return;
      }

      const { data, error } = await supabase.auth.signUp({
         email,
         password,
         options: {
            data: {
               name: name,
            },
         },
      });

      if (error) {
         Alert.alert('Error', error.message);

         setLoading(false);
         return;
      }

      setLoading(false);
      Alert.alert('Sucesso', 'Cadastro realizado! Verifique seu e-mail para confirmar.');
      navigation.navigate('Login');
   }

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={{ flex: 1 }}
      >
         <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
               <View style={styles.boxTop}>
                  <HeaderBox
                     title="SmartBills"
                     subtitle="Um controle inteligente para as suas contas"
                  />
               </View>

               <View style={styles.boxMid}>
                  <Input
                     value={name}
                     onChangeText={setName}
                     placeholder="Nome"
                     IconRigth={MaterialIcons}
                     iconRigthName="person"
                  />
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
                  <Input
                     value={confirmPassword}
                     onChangeText={setConfirmPassword}
                     placeholder="Confirme a Senha"
                     IconRigth={Octicons}
                     iconRigthName={showPassword ? 'eye' : 'eye-closed'}
                     secureTextEntry={showPassword}
                     onIconRigthPress={() => setShowPassword(!showPassword)}
                  />
               </View>
               <View style={styles.boxBottom}>
                  <Button text="Cadastrar" loading={loading} onPress={handleSignUp} />
                  <AuthRedirect
                     message={'Já tem uma conta?'}
                     linkText="Login"
                     targetScreen="Login"
                  />
               </View>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
}
