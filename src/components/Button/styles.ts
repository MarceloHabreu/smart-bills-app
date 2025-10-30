import { StyleSheet } from 'react-native';
import { fonts } from '../../fonts/fonts';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
   button: {
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      flexDirection: 'row',
      gap: 8,
   },

   disabled: {
      opacity: 0.6,
   },
});
