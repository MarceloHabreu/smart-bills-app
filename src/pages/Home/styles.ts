import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      backgroundColor: '#fff',
      flex: 1,
   },
   loading: {
      backgroundColor: '#fff',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 30,
      paddingVertical: 40,
      paddingBottom: 120, // espaço razoável no final
   },

   /** HEADER */
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,
   },
   greeting: {
      fontSize: 30,
      color: '#1E1E1E',
      maxWidth: '94%',
      fontFamily: 'Poppins_600SemiBold',
   },
   subtitle: {
      fontSize: 20,
      color: '#8E8E8E',
      fontFamily: 'Poppins_400Regular',
   },
   avatar: {
      width: 45,
      height: 45,
      borderRadius: 25,
   },

   /** BUSCA E FILTROS */
   searchContainer: {
      marginTop: 15,
      marginBottom: 10,
   },
   filterContainer: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: 20,
      marginBottom: 10,
      gap: 15,
   },
   dateInputs: {
      flexDirection: 'row',
      gap: 10,
   },

   /** TABS */
   tabsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 20,
   },
   tabText: {
      fontSize: 16,
      fontFamily: 'Poppins_500Medium',
      color: '#8E8E8E',
   },
   tabActive: {
      color: '#4CAF50',
      borderBottomWidth: 2,
      borderBottomColor: '#4CAF50',
      paddingBottom: 4,
   },
   tabBadge: {
      color: '#fff',
      backgroundColor: '#4CAF50',
      borderRadius: 10,
      paddingHorizontal: 5,
   },
   tabBadgeInactive: {
      color: '#fff',
      backgroundColor: '#E74C3C',
      borderRadius: 10,
      paddingHorizontal: 5,
   },
});
