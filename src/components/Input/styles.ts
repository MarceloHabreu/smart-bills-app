import { StyleSheet } from 'react-native';
import colors from '@/constants/colors';
import { fonts } from '@/fonts/fonts';

export const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      width: '100%',
   },
   title: {
      fontFamily: fonts.body_poppins600,
      fontSize: 14,
      color: colors.gray_text,
      marginBottom: 5,
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderRadius: 12,
      borderColor: '#ccc',

      overflow: 'hidden',
   },
   input: {
      flex: 1,
      fontFamily: fonts.body_poppins400,
      fontSize: 16,
      color: '#1F2937',

      paddingHorizontal: 16,
   },

   inputRender: {
      flex: 1,
      fontFamily: fonts.body_poppins500,
      fontSize: 14,
      color: colors.gray_text,
      paddingHorizontal: 16,
   },
   paddingLeft: {
      paddingLeft: 8,
   },
   paddingRight: {
      paddingRight: 8,
   },
   iconLeft: {
      paddingLeft: 16,
      paddingRight: 8,
   },
   iconRight: {
      paddingLeft: 8,
      paddingRight: 16,
   },
   disabled: {
      opacity: 0.6,
   },
   errorText: {
      fontSize: 12,
      color: '#EF4444',
      marginTop: 4,
      fontFamily: fonts.body_poppins400,
   },
});
