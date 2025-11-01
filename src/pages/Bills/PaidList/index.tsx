import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { styles } from './styles';
import { Button } from '../../../components/Button';

interface Bill {
   id: string;
   name: string;
   amount: number;
   status: 'pending' | 'overdue' | 'paid';
   due_date: Date;
   user_id: string;
}

interface PaidListProps {
   data: Bill[];
   fetchBills: () => Promise<void>;
}

export default function PaidList({ data, fetchBills }: PaidListProps) {
   const [refreshing, setRefreshing] = useState(false);

   const onRefresh = async () => {
      setRefreshing(true);
      await fetchBills(); // ou qualquer função que atualize os dados
      setRefreshing(false);
   };
   const renderItem = ({ item }: { item: Bill }) => (
      <View style={[styles.billCard, { borderLeftColor: '#23AEB8', borderLeftWidth: 4 }]}>
         <View style={styles.billHeader}>
            <Text style={styles.billType}>{item.name}</Text>
            <Text style={styles.billAmount}>R$ {item.amount.toFixed(2)}</Text>
         </View>
         <Text style={styles.billDueDate}>
            Pago em {new Date(item.due_date).toLocaleDateString()}
         </Text>
         <Button
            text="Pré-Agendar"
            backgroundColor={'#23AEB8'}
            width="100%"
            height={40}
            borderRadius={10}
            fontSize={16}
         />
      </View>
   );

   return (
      <FlatList
         data={data}
         renderItem={renderItem}
         keyExtractor={(item) => item.id}
         contentContainerStyle={styles.billsContainer}
         showsVerticalScrollIndicator={false}
         refreshing={refreshing}
         onRefresh={onRefresh}
         ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: '#aaa', marginTop: 30 }}>
               Nenhuma conta paga
            </Text>
         }
      />
   );
}
