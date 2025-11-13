import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Octicons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '@/constants/colors';
import { styles } from './styles';

export default ({ state, navigation }: any) => {
   const go = (ScreenName: string) => {
      navigation.navigate(ScreenName);
   };

   const currentRoute = state.routes[state.index]?.name;
   const isActive = (routeName: string) => currentRoute === routeName;

   return (
      <View style={styles.tabArea}>
         {/* Home */}
         <TouchableOpacity style={styles.tabItem} onPress={() => go('Home')}>
            <View style={styles.iconContainer}>
               <Octicons name="home-fill" size={24} color="Black" />
               {isActive('Home') && <View style={styles.activeDot} />}
            </View>
         </TouchableOpacity>

         {/* History */}
         <TouchableOpacity style={styles.tabItem} onPress={() => go('History')}>
            <View style={styles.iconContainer}>
               <Octicons name="history" size={24} color="Black" />
               {isActive('History') && <View style={styles.activeDot} />}
            </View>
         </TouchableOpacity>

         {/* CreateBill - Ícone maior */}
         <TouchableOpacity style={styles.tabItemCenter} onPress={() => go('BillsCreate')}>
            <View style={styles.iconContainer}>
               <Ionicons
                  name="add-circle"
                  size={70}
                  color={colors.primary}
                  style={{ marginTop: -30 }}
               />
               {isActive('BillsCreate') && <View style={styles.activeDot} />}
            </View>
         </TouchableOpacity>

         {/* Dashboard */}
         <TouchableOpacity style={styles.tabItem} onPress={() => go('Dashboard')}>
            <View style={styles.iconContainer}>
               <MaterialCommunityIcons name="view-dashboard-outline" size={24} color="black" />
               {isActive('Dashboard') && <View style={styles.activeDot} />}
            </View>
         </TouchableOpacity>

         {/* Profile */}
         <TouchableOpacity style={styles.tabItem} onPress={() => go('Profile')}>
            <View style={styles.iconContainer}>
               <Octicons name="person" size={24} color="Black" />
               {isActive('Profile') && <View style={styles.activeDot} />}
            </View>
         </TouchableOpacity>
      </View>
   );
};
