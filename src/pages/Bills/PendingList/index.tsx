import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button } from '../../../components/Button';
import { styles } from './styles';

interface Bill {
   id: string;
   name: string;
   amount: number;
   due_date: Date;
}

interface PendingListProps {
   data: Bill[];
}

export default function PendingList({ data }: PendingListProps) {
   const renderItem = ({ item }: { item: Bill }) => (
      <View style={[styles.billCard, { borderLeftColor: '#4CAF50', borderLeftWidth: 4 }]}>
         <View style={styles.billHeader}>
            <Text style={styles.billType}>{item.name}</Text>
            <Text style={styles.billAmount}>R$ {item.amount.toFixed(2)}</Text>
         </View>
         <Text style={styles.billDueDate}>
            Vence em {new Date(item.due_date).toLocaleDateString()}
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
   );

   return (
      <FlatList
         data={data}
         renderItem={renderItem}
         keyExtractor={(item) => item.id}
         contentContainerStyle={styles.billsContainer}
         showsVerticalScrollIndicator={false}
         ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: '#aaa', marginTop: 30 }}>
               Nenhuma conta pendente
            </Text>
         }
      />
   );
}
