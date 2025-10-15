import React, { useState } from 'react';
import { View, Alert } from 'react-native';

import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { styles } from './styles';

import { HeaderBox } from '../../components/HeaderBox';
import { AuthRedirect } from '../../components/AuthRedirect';

export function Register() {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [showPassword, setShowPassword] = useState(true);
   const [loading, setLoading] = useState(false);

   function getRegister() {
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
            <HeaderBox title="SmartBills" subtitle="Um controle inteligente para as suas contas" />
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
            <Button text="Cadastrar" loading={loading} onPress={() => getRegister()} />
            <AuthRedirect message={'Já tem uma conta?'} linkText="Login" targetScreen="Login" />
         </View>
      </View>
   );
}
