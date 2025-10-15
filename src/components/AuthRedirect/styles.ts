import { StyleSheet } from 'react-native';
import { fonts } from '../../fonts/fonts';
import { themes } from '../../global/themes';

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
      color: themes.colors.dark,
      fontFamily: fonts.body_poppins700,
   },
});
