import { StyleSheet } from 'react-native';
import { fonts } from '../../../fonts/fonts';
import colors from '../../../constants/colors';

export const styles = StyleSheet.create({
   container: {},
   button: {
      backgroundColor: colors.primary,
      height: 55,
      width: '85%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
   },

   textButton: {
      color: colors.txtWhite,
      fontFamily: fonts.body_poppins600,
      fontSize: 20,
   },
});
