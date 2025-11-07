import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Octicons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '@/constants/colors';
import { styles } from './styles';

export default ({ state, navigation }: any) => {
   const go = (ScreenName: string) => {
      navigation.navigate(ScreenName);
   };

   const isActive = (index: number) => state.index === index;

   return (
      <View style={styles.tabArea}>
         {/* Home */}
         <TouchableOpacity style={styles.tabItem} onPress={() => go('Home')}>
            <View style={styles.iconContainer}>
               <Octicons name="home-fill" size={24} color="Black" />
               {isActive(0) && <View style={styles.activeDot} />}
            </View>
         </TouchableOpacity>

         {/* History */}
         <TouchableOpacity style={styles.tabItem} onPress={() => go('History')}>
            <View style={styles.iconContainer}>
               <Octicons name="history" size={24} color="Black" />
               {isActive(1) && <View style={styles.activeDot} />}
            </View>
         </TouchableOpacity>

         {/* CreateBill - Ícone maior */}
         <TouchableOpacity style={styles.tabItemCenter} onPress={() => go('BillsCreate')}>
            <Ionicons
               name="add-circle"
               size={70}
               color={colors.primary}
               style={{ marginTop: -20 }}
            />
         </TouchableOpacity>

         {/* Dashboard */}
         <TouchableOpacity style={styles.tabItem} onPress={() => go('Dashboard')}>
            <View style={styles.iconContainer}>
               <MaterialCommunityIcons name="view-dashboard-outline" size={24} color="black" />
               {isActive(3) && <View style={styles.activeDot} />}
            </View>
         </TouchableOpacity>

         {/* Profile */}
         <TouchableOpacity style={styles.tabItem} onPress={() => go('Profile')}>
            <View style={styles.iconContainer}>
               <Octicons name="person" size={24} color="Black" />
               {isActive(4) && <View style={styles.activeDot} />}
            </View>
         </TouchableOpacity>
      </View>
   );
};
