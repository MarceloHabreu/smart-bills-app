import colors from '@/constants/colors';
import { fonts } from '@/fonts/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginTop: 5,
      marginBottom: 50,
   },
   scrollContent: {
      flexGrow: 1,

      paddingHorizontal: 24,
      paddingVertical: 30,
   },
   contentBody: {},
   header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 35,
   },

   logo: {
      width: 70,
      height: 70,

      resizeMode: 'contain',
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
      fontSize: 15.5,
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
   textArea: {
      height: 100,
      textAlignVertical: 'top',
   },
   statusText: {
      fontSize: 16,
      color: '#333',
   },
   buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
   },
   button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 10,
      marginHorizontal: 5,
      alignItems: 'center',
   },
   cancelButton: {
      backgroundColor: colors.gray,
   },
   saveButton: {
      backgroundColor: colors.primary,
   },
   buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
   },
});
