import colors from '@/constants/colors';
import { fonts } from '@/fonts/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
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
      paddingHorizontal: 25,
      paddingVertical: 50,
      paddingBottom: 120, // espaço razoável no final
   },

   /** HEADER */
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',

      /* marginTop: 20, */
      marginBottom: 10,
   },
   greeting: {
      textAlign: 'left',
      fontSize: 30,
      color: '#1E1E1E',
      fontFamily: 'Poppins_600SemiBold',
   },
   subtitle: {
      textAlign: 'left',
      fontSize: 20,
      color: colors.gray,
      /* marginTop: -6, */
      marginTop: 1,
      marginBottom: 10,
      fontFamily: 'Poppins_400Regular',
   },
   avatar: {
      width: 45,
      height: 45,
      borderRadius: 25,
      marginTop: 5,
   },

   /** BUSCA E FILTROS */
   searchContainer: {
      marginTop: 10,
   },
   filterContainer: {
      marginTop: 10,
      marginRight: 10,
   },
   dateInputs: {
      flexDirection: 'column',
      gap: 10,
   },

   title: {
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      color: '#0C2E5C',
      marginBottom: 24,
   },
   label: {
      fontFamily: fonts.body_poppins600,
      fontSize: 14,
      color: colors.gray_text,
      marginBottom: 5,
   },
   input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: '#333',
      marginBottom: 16,
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
