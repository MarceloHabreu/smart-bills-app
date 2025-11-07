import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from './styles';
import OverdueList from '@/pages/Bills/OverdueList';
import PaidList from '@/pages/Bills/PaidList';
import PendingList from '@/pages/Bills/PendingList';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Bill {
   id: string;
   name: string;
   amount: number;
   status: 'pending' | 'overdue' | 'paid';
   due_date: string;
   user_id: string;
}

export default function StatusTabs({
   pendingData,
   overdueData,
   paidData,
   fetchBills,
}: {
   pendingData: Bill[];
   overdueData: Bill[];
   paidData: Bill[];
   fetchBills: () => Promise<void>;
}) {
   const [activeTab, setActiveTab] = useState('pending');
   const handleTabChange = async (tabId: string) => {
      setActiveTab(tabId); // muda visivelmente a aba e set o id da aba ativa
      await AsyncStorage.setItem('activeTab', tabId); // salva localmente o id da aba ativa
   };

   useEffect(() => {
      // ao ser usado um refresh da pagina
      const loadActiveTab = async () => {
         const savedTab = await AsyncStorage.getItem('activeTab'); // traz o id da aba salva localmente q o usuario estava por ultimo
         if (savedTab) {
            setActiveTab(savedTab); // seta o id da aba ativa novamente e mantém o usuário na mesma aba
         }
      };
      loadActiveTab();
   }, []);

   const tabs = [
      {
         id: 'pending',
         label: 'Pendentes',
         count: pendingData?.length || 0,
      },
      {
         id: 'overdue',
         label: 'Vencidas',
         count: overdueData?.length || 0,
      },
      {
         id: 'paid',
         label: 'Pagas',
         count: paidData?.length || 0,
      },
   ];
   return (
      <View>
         {/* --- TABS HEADER --- */}
         <View style={styles.tabsContainer}>
            {tabs.map((tab) => (
               <TouchableOpacity
                  key={tab.id}
                  style={styles.tabItem}
                  onPress={() => handleTabChange(tab.id)}
                  activeOpacity={0.8}
               >
                  <View style={styles.tabInner}>
                     <Text
                        style={[
                           styles.tabText,
                           activeTab === tab.id ? styles.tabTextActive : styles.tabTextInactive,
                        ]}
                     >
                        {tab.label}
                     </Text>

                     {tab.count > 0 && (
                        <View
                           style={[
                              styles.badge,
                              activeTab === tab.id ? styles.badgeActive : styles.badgeInactive,
                           ]}
                        >
                           <Text style={styles.badgeText}>{tab.count}</Text>
                        </View>
                     )}
                  </View>

                  {activeTab === tab.id && <View style={styles.underline} />}
               </TouchableOpacity>
            ))}
         </View>
         {/* --- TABS CONTENT (LISTAS) --- */}
         <View>
            {activeTab === 'pending' && <PendingList data={pendingData} fetchBills={fetchBills} />}
            {activeTab === 'overdue' && <OverdueList data={overdueData} fetchBills={fetchBills} />}
            {activeTab === 'paid' && <PaidList data={paidData} fetchBills={fetchBills} />}
         </View>
      </View>
   );
}
