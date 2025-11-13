import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { supabase } from '@/lib/supabase';
import { styles } from './styles';
import colors from '@/constants/colors';
import { ArrowLeft } from 'lucide-react-native';
import { BottomTabParamList } from '@/routes/types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Button } from '@/components/Button';
import { Feather, MaterialIcons } from '@expo/vector-icons';

export function BillsView() {
   const { user } = useAuth();
   const route = useRoute();

   const navigation = useNavigation<BottomTabNavigationProp<BottomTabParamList, 'BillsCreate'>>();
   const { bill } = route.params as any;

   const statusLabels = {
      pending: 'Pendente',
      overdue: 'Vencida',
      paid: 'Paga',
   };

   const statusColors = {
      pending: colors.primary,
      overdue: colors.red,
      paid: colors.paybutton,
   };

   const handleDelete = async () => {
      Alert.alert('Excluir conta', 'Tem certeza que deseja excluir esta conta?', [
         { text: 'Cancelar', style: 'cancel' },
         {
            text: 'Apagar',
            style: 'destructive',
            onPress: async () => {
               const { error } = await supabase.from('bills').delete().eq('id', bill.id);
               if (error) Alert.alert('Erro', 'Não foi possível apagar a conta.');
               else {
                  Alert.alert('Sucesso', 'Conta apagada com sucesso!');
                  navigation.goBack();
               }
            },
         },
      ]);
   };

   return (
      <View style={styles.container}>
         {/* 🔹 Header com seta e logo */}
         <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
               <ArrowLeft color={colors.gray} size={30} />
            </TouchableOpacity>

            <Image
               source={require('@/assets/smartBills_second_logo.png')}
               style={styles.logo}
               resizeMode="contain"
            />
         </View>
         <View style={styles.contentBody}>
            {/* 🔹 Conteúdo */}

            <View style={styles.card}>
               <Text style={styles.title}>{bill.name}</Text>
               <View style={styles.row}>
                  <Text style={styles.label}>Valor:</Text>
                  <Text style={styles.value}>
                     {Number(bill.amount).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                     })}
                  </Text>
               </View>

               <View style={styles.row}>
                  <Text style={styles.label}>Status:</Text>
                  <View
                     style={[styles.statusBadge, { backgroundColor: statusColors[bill.status] }]}
                  >
                     <Text style={styles.statusText}>{statusLabels[bill.status]}</Text>
                  </View>
               </View>

               <View style={styles.row}>
                  <Text style={styles.label}>Vencimento:</Text>
                  <Text style={styles.value}>
                     {new Date(bill.due_date).toLocaleDateString('pt-BR')}
                  </Text>
               </View>

               <View style={styles.rowColumn}>
                  <Text style={styles.label}>Descrição:</Text>
                  <Text style={styles.description}>{bill.description || '...'}</Text>
               </View>
            </View>

            {/* 🔹 Botões de ação */}
            <View style={styles.buttonRow}>
               <Button
                  icon={<Feather name="edit" size={18} color="#fff" />}
                  text="Editar"
                  backgroundColor={colors.yellow}
                  width="45%"
                  height={40}
                  borderRadius={10}
                  fontSize={16}
                  onPress={() => navigation.navigate('BillsEdit', { bill })}
               />
               <Button
                  icon={<MaterialIcons name="delete" size={18} color="#fff" />}
                  text="Apagar"
                  backgroundColor={colors.red}
                  width="45%"
                  height={40}
                  borderRadius={10}
                  fontSize={16}
                  onPress={handleDelete}
               />
            </View>
         </View>
      </View>
   );
}
