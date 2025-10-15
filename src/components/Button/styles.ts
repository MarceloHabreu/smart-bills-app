import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';
import { fonts } from '../../fonts/fonts';

export const styles = StyleSheet.create({
   container: {},
   button: {
      backgroundColor: themes.colors.primary,
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
      color: themes.colors.txtBtn,
      fontFamily: fonts.body_poppins600,
      fontSize: 20,
   },
});
