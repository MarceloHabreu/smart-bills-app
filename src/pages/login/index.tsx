import React, { useState } from 'react';
import { View, Alert } from 'react-native';

import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { styles } from './styles';
import { HeaderBox } from '../../components/HeaderBox';
import { AuthRedirect } from '../../components/AuthRedirect';

export function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(true);
   const [loading, setLoading] = useState(false);

   function getLogin() {
      try {
         if (email === '' || password === '') {
            return Alert.alert('Por favor, preencha todos os campos');
         }
         console.log('Logado com sucesso');
      } catch (error) {
         console.log('error');
      }
   }
   return (
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
            <Button text="Entrar" loading={loading} onPress={() => getLogin()} />
            <AuthRedirect
               message={'Ainda não possui uma conta?'}
               linkText={'Cadastre-se'}
               targetScreen={'Register'}
            />
         </View>
      </View>
   );
}
