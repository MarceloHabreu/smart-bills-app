import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button } from '../../../components/Button';
import { styles } from './styles';

interface Bill {
   id: string;
   name: string;
   amount: number;
   status: 'pending' | 'overdue' | 'paid';
   due_date: string;
   user_id: string;
}

interface PendingListProps {
   data: Bill[];
   fetchBills: () => Promise<void>;
}

export default function PendingList({ data, fetchBills }: PendingListProps) {
   const [refreshing, setRefreshing] = useState(false);

   const onRefresh = async () => {
      setRefreshing(true);
      await fetchBills(); // ou qualquer função que atualize os dados
      setRefreshing(false);
   };
   const renderItem = ({ item }: { item: Bill }) => (
      console.log(item.due_date),
      (
         <View style={[styles.billCard, { borderLeftColor: '#4CAF50', borderLeftWidth: 4 }]}>
            <View style={styles.billHeader}>
               <Text style={styles.billType}>{item.name}</Text>
               <Text style={styles.billAmount}>
                  R$ {item.amount.toFixed(2).split('.').join(',')}
               </Text>
            </View>
            <Text style={styles.billDueDate}>
               Vence em {item.due_date.split('-').reverse().join('/')}
            </Text>
            <Button
               text="Pagar"
               backgroundColor="#4CAF50"
               width="100%"
               height={40}
               borderRadius={10}
               fontSize={16}
            />
         </View>
      )
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
               Nenhuma conta pendente
            </Text>
         }
      />
   );
}
