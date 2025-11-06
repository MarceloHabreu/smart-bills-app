import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { Button } from '../../../components/Button';
import PreScheduleModal from '../../../components/PreScheduleModal';

interface Bill {
   id: string;
   name: string;
   amount: number;
   status: 'pending' | 'overdue' | 'paid';
   due_date: string;
   user_id: string;
}
interface PaidListProps {
   data: Bill[];
   fetchBills: () => Promise<void>;
}

export default function PaidList({ data, fetchBills }: PaidListProps) {
   const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
   const [modalVisible, setModalVisible] = useState(false);

   const handlePreSchedule = (bill: Bill) => {
      setSelectedBill(bill);
      setModalVisible(true);
   };
   const handleSave = async (newDate: string) => {
      console.log(`Conta ${selectedBill?.name} pré-agendada para ${newDate}`);
      // Aqui você pode chamar sua API para atualizar a data
      await fetchBills();
   };

   const renderItem = ({ item }: { item: Bill }) => (
      <View style={[styles.billCard, { borderLeftColor: '#23AEB8', borderLeftWidth: 4 }]}>
         <View style={styles.billHeader}>
            <Text style={styles.billType}>{item.name}</Text>
            <Text style={styles.billAmount}>R$ {item.amount.toFixed(2).split('.').join(',')}</Text>
         </View>
         <Text style={styles.billDueDate}>
            Pago em {item.due_date.split('-').reverse().join('/')}
         </Text>
         <Button
            text="Pré-Agendar"
            backgroundColor={'#23AEB8'}
            width="100%"
            height={40}
            borderRadius={10}
            fontSize={16}
            onPress={() => handlePreSchedule(item)}
         />
      </View>
   );

   return (
      <>
         <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.billsContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
               <Text style={{ textAlign: 'center', color: '#aaa', marginTop: 30 }}>
                  Nenhuma conta paga
               </Text>
            }
         />
         <PreScheduleModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSave={handleSave}
            initialDate={selectedBill?.due_date}
         />
      </>
   );
}
