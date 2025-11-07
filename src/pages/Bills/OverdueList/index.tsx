import { View, FlatList, Text } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { useState } from 'react';
import ModalPayment from '@/components/ModalPayment';
import { Bill } from '@/interfaces';

interface OverdueListProps {
   data: Bill[];
   fetchBills: () => Promise<void>;
}

export default function OverdueList({ data, fetchBills }: OverdueListProps) {
   const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
   const [modalVisible, setModalVisible] = useState(false);

   const handlePay = (bill: Bill) => {
      setSelectedBill(bill);
      setModalVisible(true);
   };

   const renderItem = ({ item }: { item: Bill }) => (
      <View style={[styles.billCard, { borderLeftColor: '#EF4444', borderLeftWidth: 4 }]}>
         <View style={styles.billHeader}>
            <Text style={styles.billType}>{item.name}</Text>
            <Text style={styles.billAmount}>R$ {item.amount.toFixed(2).split('.').join(',')}</Text>
         </View>
         <Text style={styles.billDueDate}>
            Vencido em {item.due_date.split('-').reverse().join('/')}
         </Text>
         <Button
            text="Pagar"
            backgroundColor={'#DC2626'}
            width="100%"
            height={40}
            borderRadius={10}
            fontSize={16}
            onPress={() => {
               handlePay(item);
            }}
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
                  Nenhuma conta atrasada
               </Text>
            }
         />
         {/* Modal de Pagamento */}
         <ModalPayment
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            bill={selectedBill}
         />
      </>
   );
}
