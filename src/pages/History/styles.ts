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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      borderRadius: 14,
      padding: 16,
      marginBottom: 12,
      marginHorizontal: 16,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
      borderWidth: 1,
      borderColor: '#f0f0f0',
   },
   cardLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
   },
   iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#E8F5E9',
      alignItems: 'center',
      justifyContent: 'center',
   },
   cardRight: {
      alignItems: 'flex-end',
   },
   paymentName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
   },
   paymentDate: {
      fontSize: 13,
      color: '#888',
      marginTop: 2,
   },
   paymentAmount: {
      fontSize: 16,
      fontWeight: '600',
      color: '#e53935',
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
