import { Dimensions, StyleSheet } from 'react-native';
import { fonts } from '../../fonts/fonts';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
   },

   boxTop: {
      height: Dimensions.get('window').height / 3,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      backgroundColor: colors.bgScreen,
      paddingTop: 20,
      marginBottom: 30,
   },

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
      fontSize: 16,
      color: colors.dark,
      marginTop: 5,
   },

   boxMid: {
      height: Dimensions.get('window').height / 4,
      width: '100%',
      paddingHorizontal: 37,
      justifyContent: 'center',

      marginTop: 30,
   },
   boxBottom: {
      height: Dimensions.get('window').height / 3.5,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
   },

   textToRegister: {
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
