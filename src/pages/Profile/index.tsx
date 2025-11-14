import React, { useState } from 'react';
import {
   KeyboardAvoidingView,
   ScrollView,
   View,
   Text,
   Image,
   TouchableOpacity,
   Platform,
   Alert,
   ActivityIndicator,
   TextInput,
} from 'react-native';
import { RefreshControl } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import colors from '@/constants/colors';
import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { styles } from './styles';
import { updateProfile } from '@/services/userService';

export function Profile() {
   const { user, setAuth } = useAuth();
   const [name, setName] = useState(user?.user_metadata?.name || '');
   const [email, setEmail] = useState(user?.email || '');
   const [newPassword, setNewPassword] = useState('');
   const [oldPassword, setOldPassword] = useState('');
   const [refreshing, setRefreshing] = useState(false);
   const [uploading, setUploading] = useState(false);
   const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || '');

   // Atualiza avatar localmente quando user mudar
   React.useEffect(() => {
      setAvatarUrl(user?.user_metadata?.avatar_url || '');
   }, [user?.user_metadata?.avatar_url]);

   // Refresh
   async function onRefresh() {
      setRefreshing(true);
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
         setAuth(data.user);
         setName(data.user.user_metadata?.name || '');
         setEmail(data.user.email || '');
         setAvatarUrl(data.user.user_metadata?.avatar_url || '');
      }
      setRefreshing(false);
   }

   // Atualizar perfil
   async function handleUpdate() {
      if (!name || !email || !oldPassword) {
         Alert.alert('Campos obrigatórios', 'Preencha nome, e-mail e senha atual.');
         return;
      }

      if (newPassword && newPassword.length < 8) {
         Alert.alert('Erro', 'A nova senha deve ter pelo menos 8 caracteres.');
         return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
         Alert.alert('Erro', 'E-mail inválido.');
         return;
      }

      try {
         // 1. Revalida senha atual
         const { error: signInError } = await supabase.auth.signInWithPassword({
            email: user?.email!,
            password: oldPassword,
         });
         if (signInError) throw new Error('Senha atual incorreta.');

         // 2. Monta update SEM email se for igual
         const updates: any = { data: { name } };

         if (email !== user?.email) {
            updates.email = email;
         }

         if (newPassword) {
            updates.password = newPassword;
         }

         console.log('Enviando update:', updates);

         const { error: updateError } = await supabase.auth.updateUser(updates);

         if (updateError) {
            console.log('Erro do Supabase:', updateError);
            throw updateError;
         }

         // 3. Atualiza contexto
         const { data: fresh } = await supabase.auth.getUser();
         setAuth(fresh.user);
         setNewPassword('');
         setOldPassword('');
         Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      } catch (err: any) {
         console.log('ERRO FINAL:', {
            message: err.message,
            status: err.status,
            name: err.name,
            __isAuthError: err.__isAuthError,
         });
         Alert.alert('Erro', err.message || 'Falha ao atualizar perfil.');
      }
   }
   // Remover foto
   async function handleRemoveAvatar() {
      Alert.alert('Remover foto', 'Tem certeza que deseja remover sua foto de perfil?', [
         { text: 'Cancelar', style: 'cancel' },
         {
            text: 'Remover',
            style: 'destructive',
            onPress: async () => {
               setUploading(true);
               const filePath = `avatars/${user?.id}.jpg`;
               await supabase.storage.from('avatars').remove([filePath]);
               await supabase.auth.updateUser({ data: { avatar_url: null } });
               const { data: fresh } = await supabase.auth.getUser();
               setAuth(fresh.user);
               setAvatarUrl('');
               setUploading(false);
            },
         },
      ]);
   }

   // Selecionar + Crop + Upload
   async function handleSelectImage() {
      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [1, 1],
         quality: 1,
      });

      if (result.canceled || !user?.id) return;

      setUploading(true);

      try {
         const image = result.assets[0];

         // Manipula a imagem (crop e compressão)
         const manip = await ImageManipulator.manipulateAsync(
            image.uri,
            [{ resize: { width: 400 } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
         );

         // Faz download como ArrayBuffer
         const response = await fetch(manip.uri);
         const arrayBuffer = await response.arrayBuffer();

         // Converte para Uint8Array — SUPABASE SUPORTA!
         const uint8Array = new Uint8Array(arrayBuffer);

         const filePath = `avatars/${user.id}.jpg`;

         // Upload correto para React Native
         const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, uint8Array, {
               contentType: 'image/jpeg',
               upsert: true,
            });

         if (uploadError) throw uploadError;

         // Gera URL pública
         const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

         const newAvatarUrl = `${data.publicUrl}?t=${Date.now()}`;

         // Atualiza metadados do usuário
         const { error: updateError } = await supabase.auth.updateUser({
            data: { avatar_url: newAvatarUrl },
         });

         if (updateError) throw updateError;

         // Atualiza estado local
         const { data: fresh } = await supabase.auth.getUser();
         setAuth(fresh.user);
         setAvatarUrl(newAvatarUrl);

         Alert.alert('Sucesso', 'Foto atualizada!');
      } catch (err: any) {
         console.log('Erro completo:', err);
         Alert.alert('Erro', err.message || 'Falha ao processar imagem.');
      } finally {
         setUploading(false);
      }
   }

   // Sair
   async function handleSignout() {
      const { error } = await supabase.auth.signOut();
      if (!error) setAuth(null);
      else Alert.alert('Erro', 'Falha ao sair.');
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
            {/* Logo */}
            <View style={styles.header}>
               <Image
                  source={require('@/assets/smartBills_second_logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
               />
            </View>

            {/* Avatar com loading e remoção */}
            <View style={styles.avatarWrapper}>
               <TouchableOpacity onPress={handleSelectImage} disabled={uploading}>
                  <View style={styles.avatarContainer}>
                     {avatarUrl ? (
                        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                     ) : (
                        <View style={styles.avatarPlaceholder}>
                           <MaterialIcons name="add-a-photo" size={28} color="#888" />
                        </View>
                     )}

                     {/* Loading overlay */}
                     {uploading && (
                        <View style={styles.loadingOverlay}>
                           <ActivityIndicator size="small" color={colors.primary} />
                        </View>
                     )}
                  </View>
               </TouchableOpacity>

               {/* Botão remover (só aparece se tiver foto) */}
               {avatarUrl && !uploading && (
                  <TouchableOpacity onPress={handleRemoveAvatar} style={styles.removeButton}>
                     <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
               )}
            </View>

            {/* Card de informações */}
            <View style={styles.card}>
               <Text style={styles.title}>Informações do Perfil</Text>
               <Text style={styles.subtitle}>Atualize as informações da sua conta</Text>

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
                  autoCapitalize="none"
               />
               <TextInput
                  style={styles.input}
                  placeholder="Nova senha (opcional)"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
               />
               <TextInput
                  style={styles.input}
                  placeholder="Senha atual (obrigatória)"
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  secureTextEntry
               />

               <Button
                  text="Atualizar Perfil"
                  backgroundColor={colors.primary}
                  width={'100%'}
                  height={48}
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
