import { Dimensions, StyleSheet } from 'react-native';
import { themes } from '../../global/themes';
import { fonts } from '../../fonts/fonts';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },

   boxTop: {
      height: Dimensions.get('window').height / 3,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      backgroundColor: themes.colors.bgScreen,
      paddingTop: 20,
   },

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
      fontSize: 20,
      color: themes.colors.dark,
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
      color: themes.colors.dark,
      fontFamily: fonts.body_poppins700,
   },
});
