import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from './styles';
import OverdueList from '../../pages/Bills/OverdueList';
import PaidList from '../../pages/Bills/PaidList';
import PendingList from '../../pages/Bills/PendingList';
export default function StatusTabs({ pendingData, overdueData, paidData }: any) {
   const [activeTab, setActiveTab] = useState('pending');
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
                  onPress={() => setActiveTab(tab.id)}
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

                     <View
                        style={[
                           styles.badge,
                           activeTab === tab.id ? styles.badgeActive : styles.badgeInactive,
                        ]}
                     >
                        <Text style={styles.badgeText}>{tab.count}</Text>
                     </View>
                  </View>

                  {activeTab === tab.id && <View style={styles.underline} />}
               </TouchableOpacity>
            ))}
         </View>
         {/* --- TABS CONTENT (LISTAS) --- */}
         <View>
            {activeTab === 'pending' && <PendingList data={pendingData} />}
            {activeTab === 'overdue' && <OverdueList data={overdueData} />}
            {activeTab === 'paid' && <PaidList data={paidData} />}
         </View>
      </View>
   );
}
