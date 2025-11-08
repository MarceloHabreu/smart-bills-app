import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import PreScheduleModal from '@/components/PreScheduleModal';
import { Bill } from '@/interfaces';
import { deleteBill } from '@/services/billService';
import { Feather } from '@expo/vector-icons';

interface PaidListProps {
   data: Bill[];
   fetchBills: () => Promise<void>;
}

export default function PaidList({ data, fetchBills }: PaidListProps) {
   const [openMenuId, setOpenMenuId] = useState<string | null>(null);
   const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
   const [modalVisible, setModalVisible] = useState(false);

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
         {/* Botão de pagar */}
         <View style={{ marginTop: 12 }}>
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
