import { StyleSheet } from 'react-native';

// styles.ts
export const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#FAFAFA',
      padding: 20,
      paddingTop: 50,
   },
   loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   header: {
      alignItems: 'flex-end',
      marginBottom: 20,
   },
   logo: {
      width: 70,
      height: 70,
   },
   title: {
      fontSize: 24,
      fontWeight: '700',
      textAlign: 'center',
      color: '#1F2937',
      marginBottom: 30,
   },
   monthRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
   },
   sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#374151',
   },
   selectWrapper: {
      borderWidth: 1.5,
      borderColor: '#E5E7EB',
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: '#fff',
   },
   picker: {
      height: 60,
      width: 180,
   },
   mainCard: {
      backgroundColor: '#fff',
      padding: 28,
      borderRadius: 20,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
   },
   amount: {
      fontSize: 36,
      fontWeight: '800',
      color: '#DC2626',
      textAlign: 'center',
      marginBottom: 24,
   },
   row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
   },
   icon: {
      marginRight: 12,
   },
   infoText: {
      fontSize: 16,
      color: '#374151',
      fontWeight: '500',
   },
});
