import { StyleSheet } from 'react-native';
import colors from '@/constants/colors';
import { fonts } from '@/fonts/fonts';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: 'fff',
      paddingTop: 50,
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   backButton: {
      backgroundColor: '#f0f0f0',
      borderRadius: 50,
      padding: 8,
   },
   logo: {
      width: 70,
      height: 70,

      resizeMode: 'contain',
   },
   title: {
      textAlign: 'center',
      fontSize: 23.5,
      fontFamily: fonts.body_poppins700,

      marginBottom: 20,
      color: colors.gray_text,
   },
   contentBody: {
      flex: 1,
      justifyContent: 'center',
   },
   card: {
      minHeight: 400,
      width: '100%', // ocupa toda a largura disponível
      justifyContent: 'space-between',

      marginBottom: 20,

      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
   },
   row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
   },
   rowColumn: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
   },
   label: {
      fontSize: 20,
      color: colors.gray_text,
      flex: 1,
      fontFamily: fonts.body_poppins600,
   },
   value: {
      color: '#6B7280',
      fontSize: 20,
      fontFamily: 'Poppins_400Regular',
   },
   statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
   },
   statusText: {
      color: '#fff',
      fontFamily: 'Poppins_500Regular',
      fontSize: 15,
   },
   description: {
      color: '#6B7280',
      marginTop: 4,
      flex: 1,
      fontSize: 15,
      fontFamily: 'Poppins_400Regular',
      textAlign: 'right',
   },
   buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
   },
});
