import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import colors from '@/constants/colors';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

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
         .from('payments')
         .select(
            `
             *,
              bills (name)`
         )
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
                  <View style={styles.card}>
                     {/* Linha superior */}
                     <View style={styles.cardTop}>
                        <View style={styles.cardInfo}>
                           <Text style={styles.cardTitle}>{item.bills.name}</Text>
                           <Text style={styles.cardSub}>
                              Pago em {new Date(item.payment_date).toLocaleDateString('pt-BR')} •{' '}
                              {new Date(item.payment_date).toLocaleTimeString(['pt-BR'], {
                                 hour: '2-digit',
                                 minute: '2-digit',
                              })}
                           </Text>
                        </View>

                        <View style={styles.iconCircle}>
                           <Ionicons name="checkmark-circle" size={24} color="#2ecc71" />
                        </View>
                     </View>

                     {/* Linha inferior */}
                     <View style={styles.cardBottom}>
                        <Text style={styles.cardAmount}>
                           - R$ {item.amount.toFixed(2).replace('.', ',')}
                        </Text>
                        <Text style={styles.cardTag}>Pagamento confirmado</Text>
                     </View>
                  </View>
               ))
            )}
         </View>
      </ScrollView>
   );
}
