// src/pages/Dashboard/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import colors from '@/constants/colors';
import { styles } from './styles';

const MONTHS = [
   'Janeiro',
   'Fevereiro',
   'Março',
   'Abril',
   'Maio',
   'Junho',
   'Julho',
   'Agosto',
   'Setembro',
   'Outubro',
   'Novembro',
   'Dezembro',
];

export function Dashboard() {
   const { user } = useAuth();
   const [selectedMonth, setSelectedMonth] = useState(MONTHS[new Date().getMonth()]);
   const [total, setTotal] = useState(0);
   const [count, setCount] = useState(0);
   const [paidCount, setPaidCount] = useState(0);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!user?.id) return;
      loadData();
   }, [user, selectedMonth]);

   const loadData = async () => {
      setLoading(true);
      try {
         const monthIndex = MONTHS.indexOf(selectedMonth);
         const year = new Date().getFullYear();
         const startDate = new Date(year, monthIndex, 1);
         const endDate = new Date(year, monthIndex + 1, 0);

         const { data: bills, error } = await supabase
            .from('bills')
            .select('amount, status')
            .eq('user_id', user?.id)
            .gte('due_date', startDate.toISOString().split('T')[0])
            .lte('due_date', endDate.toISOString().split('T')[0]);

         if (error) throw error;

         const totalAmount = (bills ?? []).reduce((sum, b) => sum + b.amount, 0);
         const totalCount = bills?.length || 0;
         const paid = (bills ?? []).filter((b) => b.status === 'paid').length;

         setTotal(totalAmount);
         setCount(totalCount);
         setPaidCount(paid);
      } catch (err) {
         console.error('Erro:', err);
      } finally {
         setLoading(false);
      }
   };

   const formatCurrency = (value: number) =>
      `R$ ${value
         .toFixed(2)
         .replace('.', ',')
         .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

   if (loading) {
      return (
         <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
         </View>
      );
   }

   return (
      <View style={styles.container}>
         {/* Header */}
         <View style={styles.header}>
            <Image
               source={require('@/assets/smartBills_second_logo.png')}
               style={styles.logo}
               resizeMode="contain"
            />
         </View>

         {/* Título */}
         <Text style={styles.title}>Visão Geral</Text>

         {/* Seletor de mês */}
         <View style={styles.monthRow}>
            <Text style={styles.sectionTitle}>Mês Selecionado</Text>
            <View style={styles.selectWrapper}>
               <Picker
                  selectedValue={selectedMonth}
                  onValueChange={setSelectedMonth}
                  style={styles.picker}
               >
                  {MONTHS.map((m) => (
                     <Picker.Item key={m} label={m} value={m} />
                  ))}
               </Picker>
            </View>
         </View>

         {/* Card principal */}
         <View style={styles.mainCard}>
            <Text style={styles.amount}>{formatCurrency(total)}</Text>

            <View style={styles.row}>
               <MaterialIcons name="receipt" size={24} color="#555" style={styles.icon} />
               <Text style={styles.infoText}>{count} contas</Text>
            </View>

            <View style={styles.row}>
               <Feather name="check-circle" size={24} color="#4CAF50" style={styles.icon} />
               <Text style={styles.infoText}>
                  {paidCount} pagas • {count - paidCount} pendentes
               </Text>
            </View>
         </View>
      </View>
   );
}
