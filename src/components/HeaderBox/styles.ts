import { StyleSheet } from 'react-native';
import { fonts } from '../../fonts/fonts';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
   logo: {
      width: 120,
      height: 120,
      marginBottom: -18,
   },
   logoText: {
      fontFamily: fonts.title,
      fontSize: 42,
      color: themes.colors.dark,
   },

   welcomeText: {
      fontFamily: fonts.body_poppins600,
      fontSize: 18,
      color: themes.colors.dark,
      marginTop: 5,
   },
});
