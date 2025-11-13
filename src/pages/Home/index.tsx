import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Image } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import StatusTabs from '@/components/StatusTabs/Index';
import MaskInput from 'react-native-mask-input';
import { Bill } from '@/interfaces';
import { fetchBillsByStatus, searchBills } from '@/services/billService';
import { fetchUserName } from '@/services/userService';
import colors from '@/constants/colors';

interface BillsState {
   pending: Bill[];
   overdue: Bill[];
   paid: Bill[];
}

export function Home() {
   const { setAuth, user } = useAuth();
   const [nameUser, setNameUser] = useState('');
   const [refreshing, setRefreshing] = useState(false);
   const [bills, setBills] = useState<BillsState>({
      pending: [],
      overdue: [],
      paid: [],
   });
   const [loading, setLoading] = useState(true);
   const [searchName, setSearchName] = useState('');
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');

   const onRefresh = async () => {
      setRefreshing(true);
      await fetchBills();
      setRefreshing(false);
   };

   const handleSearch = async () => {
      if (!user?.id) return;
      const { pending, overdue, paid } = await searchBills({
         userId: user.id,
         searchName,
         startDate,
         endDate,
      });
      setBills({ pending, overdue, paid });
   };

   const dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

   const fetchUser = async () => {
      if (!user?.id) return;
      const name = await fetchUserName(user.id);
      setNameUser(name);
   };

   const fetchBills = async () => {
      try {
         setLoading(true);

         if (!user?.id) {
            return;
         }
         const [pending, overdue, paid] = await Promise.all([
            fetchBillsByStatus(user.id, 'pending'),
            fetchBillsByStatus(user.id, 'overdue'),
            fetchBillsByStatus(user.id, 'paid'),
         ]);
         setBills({ pending, overdue, paid });
      } catch (error) {
         console.log('Erro ao buscar contas:', error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (!user) return;
      const loadData = async () => {
         await fetchUser();
         await fetchBills();
      };

      loadData();

      const subscription = supabase // ouvir mudanças em tempo real do banco, e trazer novos dados
         .channel('realtime-bills')
         .on(
            'postgres_changes',
            {
               event: '*',
               schema: 'public',
               table: 'bills',
               filter: `user_id=eq.${user.id}`,
            },
            (payload) => {
               if (
                  payload.eventType === 'INSERT' ||
                  payload.eventType === 'UPDATE' ||
                  payload.eventType === 'DELETE'
               ) {
                  setBills((prev) => [...prev, payload.new]);
               }
            }
         )
         .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
               // console.log('📡 Subscrito ao canal realtime-bills');
            }
         });

      // Cleanup do canal ao desmontar ou mudar o usuário
      return () => {
         supabase.removeChannel(subscription);
      };
   }, [user]);

   if (loading) {
      return (
         <SafeAreaView style={styles.loading}>
            <Text>Carregando...</Text>
         </SafeAreaView>
      );
   }

   return (
      <SafeAreaView style={styles.container}>
         <FlatList
            data={[]}
            renderItem={null}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListHeaderComponent={
               <>
                  {/* Header */}
                  <View style={styles.header}>
                     <View>
                        <Text style={styles.greeting}>Olá, {nameUser}</Text>
                     </View>
                     <Image
                        source={{ uri: user?.user_metadata.avatar_url }}
                        style={styles.avatar}
                     />
                  </View>
                  {/*  Organize suas contas.{'\n'}Simplifique sua vida */}
                  <Text style={styles.subtitle}>Área de Gerenciamento</Text>

                  {/* Campo de busca */}
                  <View style={styles.searchContainer}>
                     <Input
                        title="Nome da Conta:"
                        placeholder="Digite o nome da conta..."
                        onChangeText={setSearchName}
                     />
                  </View>

                  {/* Filtros de data + botão */}
                  <View style={styles.filterContainer}>
                     <View style={styles.dateInputs}>
                        <Input
                           title="Data Início:"
                           width={'100%'}
                           placeholder="dd/mm/aaaa"
                           placeholderTextColor="#9CA3AF"
                           iconRight={<EvilIcons name="calendar" size={24} color="#666" />}
                           value={startDate}
                           onChangeText={(masked, unmasked) => {
                              setStartDate(masked);
                           }}
                           keyboardType="numeric"
                           render={(props) => (
                              <MaskInput {...props} mask={dateMask} placeholder="dd/mm/aaaa" />
                           )}
                        />
                        <Input
                           title="Data Final:"
                           width={'100%'}
                           placeholder="dd/mm/aaaa"
                           placeholderTextColor="#9CA3AF"
                           iconRight={<EvilIcons name="calendar" size={24} color="#666" />}
                           value={endDate}
                           onChangeText={(masked, unmasked) => {
                              setEndDate(masked);
                           }}
                           keyboardType="numeric"
                           render={(props) => (
                              <MaskInput {...props} mask={dateMask} placeholder="dd/mm/aaaa" />
                           )}
                        />
                     </View>

                     <View style={{ marginTop: 15, marginBottom: 15, alignItems: 'flex-end' }}>
                        <Button
                           icon={<Feather name="search" size={18} color="#fff" />}
                           text="Buscar"
                           backgroundColor="#B3B823" /* 9ca3af */ /* #222222 */
                           width={130}
                           height={40}
                           borderRadius={12}
                           fontSize={16}
                           onPress={handleSearch}
                        />
                     </View>
                  </View>
               </>
            }
            ListFooterComponent={
               <StatusTabs
                  pendingData={bills.pending}
                  overdueData={bills.overdue}
                  paidData={bills.paid}
                  fetchBills={fetchBills}
               />
            }
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.scrollContent}
         />
      </SafeAreaView>
   );
}
