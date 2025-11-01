import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Image } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import StatusTabs from '../../components/StatusTabs/Index';

interface Bill {
   id: string;
   name: string;
   amount: number;
   status: 'pending' | 'overdue' | 'paid';
   due_date: string;
   user_id: string;
}
interface BillsState {
   pending: Bill[];
   overdue: Bill[];
   paid: Bill[];
}

export function Home() {
   const { setAuth, user } = useAuth();
   const [nameUser, setNameUser] = useState('');
   const [bills, setBills] = useState<BillsState>({
      pending: [],
      overdue: [],
      paid: [],
   });
   const [loading, setLoading] = useState(true);

   const fetchUser = async () => {
      if (user) {
         try {
            const { data, error } = await supabase
               .from('users')
               .select('name')
               .eq('id', user.id)
               .single();

            if (error) {
               // console.log('Erro ao buscar usuário:', error);
               setNameUser('Caro Usuário');
               return;
            }

            if (data) {
               setNameUser(data.name);
            } else {
               setNameUser('Caro Usuário');
            }
         } catch (error) {
            // console.log('Erro no fetchUser:', error);
            setNameUser('Caro Usuário');
         }
      }
   };

   const fetchBills = async () => {
      try {
         setLoading(true);
         // console.log('🔄 Iniciando busca de contas...');

         if (!user?.id) {
            // console.log('❌ Usuário não disponível');
            return;
         }

         // console.log('👤 ID do usuário:', user.id);

         const { data, error } = await supabase
            .from('bills')
            .select('*')
            .eq('user_id', user.id)
            .order('due_date', { ascending: true });

         if (error) {
            // console.log('❌ Erro ao buscar contas:', error);
            return;
         }

         if (data && data.length > 0) {
            const pending = data.filter((bill) => bill.status === 'pending');
            const overdue = data.filter((bill) => bill.status === 'overdue');
            const paid = data.filter((bill) => bill.status === 'paid');

            setBills({ pending, overdue, paid });
         } else {
            setBills({ pending: [], overdue: [], paid: [] });
         }
      } catch (error) {
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (!user) return;

      // console.log('🚀 Usuário disponível, carregando dados...');

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
         <View style={styles.scrollView}>
            {/* Header */}
            <View style={styles.header}>
               <View>
                  <Text style={styles.greeting} numberOfLines={1} ellipsizeMode="tail">
                     Opa, {nameUser}👋
                  </Text>
                  <Text style={styles.subtitle}>Gerencie suas contas</Text>
               </View>
               <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
            </View>

            {/* Campo de busca */}
            <View style={styles.searchContainer}>
               <Input placeholder="Nome da conta" />
            </View>

            {/* Filtros de data + botão */}
            <View style={styles.filterContainer}>
               <View style={styles.dateInputs}>
                  <Input
                     title="Data Início:"
                     width={200}
                     placeholder="dd/mm/aaaa"
                     iconRight={<EvilIcons name="calendar" size={24} color="#666" />}
                  />
                  <Input
                     title="Data Final:"
                     width={200}
                     placeholder="dd/mm/aaaa"
                     iconRight={<EvilIcons name="calendar" size={24} color="#666" />}
                  />
               </View>

               <View style={{ marginRight: 20 }}>
                  <Button
                     icon={<Feather name="search" size={18} color="#fff" />}
                     text="Buscar"
                     backgroundColor="#C3C83C"
                     width={130}
                     height={45}
                     borderRadius={12}
                     fontSize={16}
                  />
               </View>
            </View>

            {/* Tabs com dados reais */}
            <StatusTabs
               pendingData={bills.pending}
               overdueData={bills.overdue}
               paidData={bills.paid}
               fetchBills={fetchBills}
            />
         </View>
      </SafeAreaView>
   );
}
