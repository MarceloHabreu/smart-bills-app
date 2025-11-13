import React, { useState } from 'react';
import {
   View,
   Text,
   TextInput,
   TouchableOpacity,
   Image,
   Alert,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   RefreshControl,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { styles } from './styles';
import colors from '@/constants/colors';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/Button';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';

export function Profile() {
   const { user, setAuth } = useAuth();
   const navigation = useNavigation();

   const [name, setName] = useState(user?.user_metadata?.name || '');
   const [email, setEmail] = useState(user?.email || '');
   const [newPassword, setNewPassword] = useState('');
   const [oldPassword, setOldPassword] = useState('');
   const [refreshing, setRefreshing] = useState(false);

   async function onRefresh() {
      setRefreshing(true);
      const { data, error } = await supabase.auth.getUser();

      if (error) {
         Alert.alert('Erro', 'Não foi possível atualizar as informações.');
      } else {
         setAuth(data.user);
         setName(data.user?.user_metadata?.name || '');
         setEmail(data.user?.email || '');
         setOldPassword('');
      }

      setRefreshing(false);
   }

   async function handleUpdate() {
      if (!name || !email || !oldPassword) {
         Alert.alert('Campos obrigatórios', 'Preencha os campos nome, email e senha atual.');
         return;
      }

      try {
         const { error: signInError } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: oldPassword,
         });

         if (signInError) {
            Alert.alert('Erro', 'Senha atual incorreta.');
            return;
         }

         const updates: any = {
            email,
            data: { name },
         };

         if (newPassword) {
            updates.password = newPassword;
         }

         const { error: updateError } = await supabase.auth.updateUser(updates);
         if (updateError) {
            Alert.alert('Erro', 'Falha ao atualizar o perfil.');
            return;
         }
         // 🔹 Atualiza também a tabela de perfis (se você tiver uma)
         const { error: profileError } = await supabase
            .from('users') // ou o nome da sua tabela
            .update({ name })
            .eq('id', user?.id);

         if (profileError) {
            console.log('Erro ao atualizar tabela de perfil:', profileError);
         }

         // 🔄 Atualiza o contexto e estados locais
         const { data: fresh } = await supabase.auth.getUser();
         setAuth(fresh.user);
         setName(fresh.user?.user_metadata?.name || '');
         setEmail(fresh.user?.email || '');
         setNewPassword('');
         setOldPassword('');

         Alert.alert('✅ Sucesso', 'Perfil atualizado com sucesso!');
         console.log(fresh);
      } catch (err: any) {
         Alert.alert('Erro', err.message || 'Falha ao atualizar o perfil.');
      }
   }

   async function handleSignout() {
      const { error } = await supabase.auth.signOut();
      setAuth(null);

      if (error) {
         Alert.alert('Erro', 'Erro ao sair da conta, tente novamente mais tarde.');
      }
   }

   async function handleSelectImage() {
      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [1, 1],
         quality: 0.8,
         base64: true,
      });

      if (!result.canceled) {
         const image = result.assets[0];
         const filePath = `avatars/${user?.id}.jpg`;

         const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, decode(image.base64!), {
               contentType: 'image/jpeg',
               upsert: true,
               metadata: {
                  owner: user?.id,
               },
            });

         if (uploadError) {
            console.error('Erro ao enviar imagem:', uploadError);
            Alert.alert('Erro', uploadError.message || 'Falha ao enviar imagem.');
            return;
         }

         const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
         const avatarUrl = data.publicUrl;

         // Atualiza o user_metadata com o link da foto
         await supabase.auth.updateUser({ data: { avatar_url: avatarUrl } });

         Alert.alert('✅ Sucesso', 'Foto de perfil atualizada!');
      }
   }

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={{ flex: 1 }}
      >
         <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
               <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[colors.primary]}
               />
            }
         >
            {/* 🔹 Cabeçalho */}
            <View style={styles.header}>
               <Image
                  source={require('@/assets/smartBills_second_logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
               />
            </View>

            {/* 🔹 Foto do perfil */}
            <TouchableOpacity onPress={handleSelectImage}>
               <View style={styles.avatarContainer}>
                  {user?.user_metadata?.avatar_url ? (
                     <Image source={{ uri: user.user_metadata.avatar_url }} style={styles.avatar} />
                  ) : (
                     <TouchableOpacity onPress={handleSelectImage}>
                        <View style={styles.avatarPlaceholder}>
                           <Text style={{ color: '#888' }}>Adicionar foto</Text>
                        </View>
                     </TouchableOpacity>
                  )}
               </View>
            </TouchableOpacity>

            {/* 🔹 Card de informações */}
            <View style={styles.card}>
               <Text style={styles.title}>Informações do Perfil</Text>
               <Text style={styles.subtitle}>Atualize as informações do perfil da sua conta</Text>

               <TextInput
                  style={styles.input}
                  placeholder="Nome completo"
                  value={name}
                  onChangeText={setName}
               />

               <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
               />

               <TextInput
                  style={styles.input}
                  placeholder="Digite sua nova senha"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
               />
               <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha atual"
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  secureTextEntry
               />

               <Button
                  text="Atualizar"
                  backgroundColor={colors.primary}
                  width="100%"
                  height={40}
                  borderRadius={10}
                  fontSize={16}
                  onPress={handleUpdate}
               />

               <TouchableOpacity onPress={handleSignout} style={styles.logoutButton}>
                  <Text style={styles.logoutText}>Sair da conta</Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
}
