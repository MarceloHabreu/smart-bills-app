import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from '../../../components/Button';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';

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
   hasMore?: boolean;
   onLoadMore?: () => void;
   loadingMore?: boolean;
}

export default function PendingList({
   data,
   fetchBills,
   hasMore = false,
   onLoadMore,
   loadingMore = false,
}: PendingListProps) {
   const [openMenuId, setOpenMenuId] = useState<string | null>(null);

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
      console.log('Excluir:', bill);
      await fetchBills();
   };
   // Função para carregar mais itens quando chegar no final
   const handleEndReached = () => {
      if (hasMore && onLoadMore && !loadingMore) {
         onLoadMore();
      }
   };

   // Componente de loading para paginação
   const renderFooter = () => {
      if (!loadingMore) return null;

      return (
         <View style={styles.footerLoader}>
            <ActivityIndicator size="small" color="#4CAF50" />
            <Text style={styles.footerText}>Carregando mais contas...</Text>
         </View>
      );
   };

   const renderItem = ({ item }: { item: Bill }) => (
      <View style={[styles.billCard, { borderLeftColor: '#4CAF50', borderLeftWidth: 4 }]}>
         {/* Linha Superior: Nome e Valor */}
         <View style={styles.topRow}>
            <Text style={styles.billType}>{item.name}</Text>
            <Text style={styles.billAmount}>R$ {item.amount.toFixed(2).replace('.', ',')}</Text>
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
               backgroundColor="#4CAF50"
               width="100%"
               height={40}
               borderRadius={10}
               fontSize={16}
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
      <FlatList
         data={data}
         renderItem={renderItem}
         keyExtractor={(item) => item.id}
         contentContainerStyle={styles.billsContainer}
         showsVerticalScrollIndicator={true} // Mantém o indicador de rolagem
         onEndReached={handleEndReached} // Chama quando chega no final
         onEndReachedThreshold={0.1} // Carrega mais quando faltar 10% para o final
         ListFooterComponent={renderFooter} // Loading no final
         ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma conta pendente</Text>}
      />
   );
}
