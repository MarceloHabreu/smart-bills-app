import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { styles } from './styles';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import colors from '@/constants/colors';
import { Image } from 'react-native';

export function HistoryPayments() {
   const { user } = useAuth();
   const [payments, setPayments] = useState<any[]>([]);
   const [filter, setFilter] = useState('24h');
   const [refreshing, setRefreshing] = useState(false);

   async function fetchPayments() {
      setRefreshing(true);

      let fromDate = new Date();
      if (filter === 'semana') fromDate.setDate(fromDate.getDate() - 7);
      else if (filter === 'mes') fromDate.setMonth(fromDate.getMonth() - 1);
      else fromDate.setDate(fromDate.getDate() - 1); // 24h

      const { data, error } = await supabase
         .from('payments') // substitua pelo nome da sua tabela
         .select('*')
         .eq('user_id', user?.id)
         .gte('payment_date', fromDate.toISOString())
         .order('payment_date', { ascending: false });

      if (error) {
         console.log(error);
      } else {
         setPayments(data || []);
      }

      setRefreshing(false);
   }

   useEffect(() => {
      fetchPayments();
   }, [filter]);

   return (
      <ScrollView
         style={{ flex: 1, backgroundColor: '#fff' }}
         refreshControl={
            <RefreshControl
               refreshing={refreshing}
               onRefresh={fetchPayments}
               colors={[colors.primary]}
            />
         }
      >
         {/* Cabeçalho */}
         <View style={styles.header}>
            <Image
               source={require('@/assets/smartBills_second_logo.png')}
               style={styles.logo}
               resizeMode="contain"
            />
         </View>

         {/* Título */}
         <Text style={styles.title}>Histórico de Pagamentos</Text>

         {/* Filtros */}
         <View style={styles.filters}>
            <TouchableOpacity
               style={[styles.filterButton, filter === '24h' && styles.filterActive]}
               onPress={() => setFilter('24h')}
            >
               <Text style={[styles.filterText, filter === '24h' && styles.filterTextActive]}>
                  Últimas 24h
               </Text>
            </TouchableOpacity>

            <TouchableOpacity
               style={[styles.filterButton, filter === 'semana' && styles.filterActive]}
               onPress={() => setFilter('semana')}
            >
               <Text style={[styles.filterText, filter === 'semana' && styles.filterTextActive]}>
                  Última semana
               </Text>
            </TouchableOpacity>

            <TouchableOpacity
               style={[styles.filterButton, filter === 'mes' && styles.filterActive]}
               onPress={() => setFilter('mes')}
            >
               <Text style={[styles.filterText, filter === 'mes' && styles.filterTextActive]}>
                  Último mês
               </Text>
            </TouchableOpacity>
         </View>

         {/* Lista de pagamentos */}
         <View style={styles.list}>
            {payments.length === 0 ? (
               <Text style={styles.emptyText}>Nenhum pagamento encontrado.</Text>
            ) : (
               payments.map((item) => (
                  <View key={item.id} style={styles.card}>
                     <View style={styles.cardHeader}>
                        <Text style={styles.paymentName}>{item.name}</Text>
                        <Text style={styles.paymentDate}>
                           {new Date(item.payment_date).toLocaleDateString()} •{' '}
                           {new Date(item.payment_date).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                           })}
                        </Text>
                     </View>

                     <View style={styles.cardFooter}>
                        <Text style={styles.paymentAmount}>
                           -R$ {item.amount.toFixed(2).replace('.', ',')}
                        </Text>
                        <Text style={styles.paymentStatus}>Prestação Paga</Text>
                     </View>
                  </View>
               ))
            )}
         </View>
      </ScrollView>
   );
}
