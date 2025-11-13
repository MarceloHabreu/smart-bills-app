import { StyleSheet } from 'react-native';
import colors from '@/constants/colors';

export const styles = StyleSheet.create({
   header: {
      marginTop: 40,
      alignItems: 'flex-end',
      paddingHorizontal: 20,
   },
   logo: {
      width: 70,
      height: 70,

      resizeMode: 'contain',
   },
   title: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      textAlign: 'center',
      marginTop: 30,
   },
   filters: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
   },
   filterButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ccc',
   },
   filterText: {
      color: '#555',
      fontSize: 13,
   },
   filterActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
   },
   filterTextActive: {
      color: '#fff',
      fontWeight: '600',
   },
   list: {
      marginTop: 25,
      paddingHorizontal: 20,
   },
   card: {
      backgroundColor: '#fff',
      borderRadius: 14,
      padding: 16,
      marginBottom: 12,
      marginHorizontal: 16,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
      borderWidth: 1,
      borderColor: '#f0f0f0',
   },

   cardTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
   },

   cardInfo: {
      flex: 1,
   },

   cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
   },

   cardSub: {
      fontSize: 13,
      color: '#888',
      marginTop: 2,
   },

   iconCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#E8F5E9',
      alignItems: 'center',
      justifyContent: 'center',
   },

   cardBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },

   cardAmount: {
      fontSize: 16,
      fontWeight: '600',
      color: '#e53935',
   },

   cardTag: {
      fontSize: 13,
      color: '#4caf50',
      fontWeight: '500',
   },
   paymentStatus: {
      fontSize: 12,
      color: '#4CAF50',
      marginTop: 2,
      fontWeight: '500',
   },

   emptyText: {
      textAlign: 'center',
      color: '#999',
      marginTop: 40,
      fontSize: 14,
   },
});
