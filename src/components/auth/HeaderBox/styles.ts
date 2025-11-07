import { StyleSheet } from 'react-native';
import { fonts } from '@/fonts/fonts';
import colors from '@/constants/colors';

export const styles = StyleSheet.create({
   logo: {
      width: 120,
      height: 120,
      marginBottom: -18,
   },
   logoText: {
      fontFamily: fonts.title,
      fontSize: 42,
      color: colors.dark,
   },

   welcomeText: {
      fontFamily: fonts.body_poppins600,
      fontSize: 18,
      color: colors.dark,
      marginTop: 5,
      textAlign: 'center',
      marginBottom: 35,
   },
});
