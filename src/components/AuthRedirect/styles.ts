import { StyleSheet } from 'react-native';
import { fonts } from '../../fonts/fonts';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
   textAuth: {
      alignItems: 'center',
      textAlign: 'center',
      fontFamily: fonts.body_poppins400,
   },

   text: {
      color: '#374151',
      marginTop: 10,
      fontFamily: fonts.body_poppins500,
   },

   textLink: {
      color: colors.dark,
      fontFamily: fonts.body_poppins700,
   },
});
