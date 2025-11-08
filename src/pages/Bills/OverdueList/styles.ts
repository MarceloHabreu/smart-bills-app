import { fonts } from '@/fonts/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      gap: 12,
   },
   billsContainer: {
      gap: 20,
      paddingBottom: 100,
      paddingHorizontal: 16,
   },
   billCard: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#F1F1F1',
      borderLeftWidth: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
      marginBottom: 30,
   },

   topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 4,
   },
   bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   menuButton: {
      padding: 4,
      borderRadius: 20,
      backgroundColor: '#F8F9FA',
   },
   billType: {
      fontSize: 16,
      fontFamily: fonts.body_poppins600,
      color: '#1E1E1E',
      flex: 1,
   },
   billAmount: {
      fontSize: 16,
      fontFamily: fonts.body_poppins600,
      color: '#1E1E1E',
   },
   billDueDate: {
      fontSize: 14,
      color: '#6B7280',
      fontFamily: fonts.body_poppins400,
      flex: 1,
   },

   // Menu styles (mantidos os mesmos)
   menuContainer: {
      backgroundColor: '#fff',
      borderRadius: 12,
      marginTop: 12,
      borderWidth: 1,
      borderColor: '#E8E8E8',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 12,
      elevation: 5,
      paddingVertical: 8,
      position: 'relative',
   },
   menuArrow: {
      position: 'absolute',
      top: -6,
      right: 12,
      width: 12,
      height: 12,
      backgroundColor: '#fff',
      borderLeftWidth: 1,
      borderTopWidth: 1,
      borderColor: '#E8E8E8',
      transform: [{ rotate: '45deg' }],
   },
   menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 10,
      paddingHorizontal: 16,
   },
   menuIcon: {
      width: 32,
      height: 32,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
   },
   menuText: {
      fontFamily: fonts.body_poppins500,
      color: '#333',
      fontSize: 14,
      flex: 1,
   },
   deleteText: {
      color: '#E74C3C',
   },
   menuDivider: {
      height: 1,
      backgroundColor: '#F0F0F0',
      marginHorizontal: 16,
   },
   emptyText: {
      textAlign: 'center',
      color: '#aaa',
      marginTop: 30,
      fontFamily: fonts.body_poppins400,
   },

   // Paginação styles
   footerLoader: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      gap: 8,
   },
   footerText: {
      fontSize: 14,
      color: '#666',
      fontFamily: fonts.body_poppins400,
   },
});
