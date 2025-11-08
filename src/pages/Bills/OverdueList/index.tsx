import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { useState } from 'react';
import ModalPayment from '@/components/ModalPayment';
import { Bill } from '@/interfaces';
import { deleteBill } from '@/services/billService';
import { Feather } from '@expo/vector-icons';

interface OverdueListProps {
   data: Bill[];
   fetchBills: () => Promise<void>;
}

export default function OverdueList({ data, fetchBills }: OverdueListProps) {
   const [openMenuId, setOpenMenuId] = useState<string | null>(null);

   const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
   const [modalVisible, setModalVisible] = useState(false);

   const handlePay = (bill: Bill) => {
      setSelectedBill(bill);
      setModalVisible(true);
   };

   const handleMenuToggle = (id: string) => {
      setOpenMenuId(openMenuId === id ? null : id);
   };

   const handleView = (bill: Bill) => {
      console.log('Visualizar:', bill);
   };

   const handleEdit = (bill: Bill) => {
      console.log('Editar:', bill);
   };

   const handleDelete = async (bill: Bill) => {
      await deleteBill(bill.id);
      await fetchBills();
   };

   const renderItem = ({ item }: { item: Bill }) => (
      <View style={[styles.billCard, { borderLeftColor: '#EF4444', borderLeftWidth: 4 }]}>
         {/* Linha Superior: Nome e Valor */}
         <View style={styles.topRow}>
            <Text style={styles.billType}>{item.name}</Text>
            <Text style={styles.billAmount}>R$ {item.amount.toFixed(2).split('.').join(',')}</Text>
         </View>
         {/* Linha Inferior: Due Date e 3 Pontinhos */}
         <View style={styles.bottomRow}>
            <Text style={styles.billDueDate}>
               Vence em {item.due_date.split('-').reverse().join('/')}
            </Text>

            <TouchableOpacity style={styles.menuButton} onPress={() => handleMenuToggle(item.id)}>
               <Feather name="more-vertical" size={20} color="#666" />
            </TouchableOpacity>
         </View>

         <View style={{ marginTop: 12 }}>
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

         {/* Menu de opções */}
         {openMenuId === item.id && (
            <View style={styles.menuContainer}>
               <View style={styles.menuArrow} />

               <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                     handleView(item);
                     setOpenMenuId(null);
                  }}
               >
                  <View style={[styles.menuIcon, { backgroundColor: '#E8F5E8' }]}>
                     <Feather name="eye" size={16} color="#4CAF50" />
                  </View>
                  <Text style={styles.menuText}>Visualizar</Text>
               </TouchableOpacity>

               <View style={styles.menuDivider} />

               <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                     handleEdit(item);
                     setOpenMenuId(null);
                  }}
               >
                  <View style={[styles.menuIcon, { backgroundColor: '#FEF9E6' }]}>
                     <Feather name="edit-2" size={16} color="#F39C12" />
                  </View>
                  <Text style={styles.menuText}>Editar</Text>
               </TouchableOpacity>

               <View style={styles.menuDivider} />

               <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                     handleDelete(item);
                     setOpenMenuId(null);
                  }}
               >
                  <View style={[styles.menuIcon, { backgroundColor: '#FBEAEA' }]}>
                     <Feather name="trash-2" size={16} color="#E74C3C" />
                  </View>
                  <Text style={[styles.menuText, styles.deleteText]}>Excluir</Text>
               </TouchableOpacity>
            </View>
         )}
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
