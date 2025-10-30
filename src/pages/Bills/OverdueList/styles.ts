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
      elevation: 5,
   },
   overdueCard: {
      backgroundColor: '#FFF',
      borderColor: '#E0E0E0',
      borderLeftColor: '#EF4444',
   },
   billHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
   },
   billType: {
      fontSize: 16,
      fontFamily: 'Poppins_600SemiBold',
      color: '#1E1E1E',
   },
   billAmount: {
      fontSize: 16,
      fontFamily: 'Poppins_600SemiBold',
      color: '#1E1E1E',
   },
   billDueDate: {
      fontSize: 14,
      color: '#6B7280',
      fontFamily: 'Poppins_400Regular',
      marginBottom: 12,
   },
});
