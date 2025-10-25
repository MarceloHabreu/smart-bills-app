import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
   tabArea: {
      position: 'absolute', // faz flutuar
      bottom: 30,

      /* left: 10,
      right: 10,
      height: 60, */
      left: 20,
      right: 20,
      height: 60,
      backgroundColor: '#fff',
      elevation: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: 30,
      paddingHorizontal: 25,
   },
   tabItem: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
   },
   tabItemCenter: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   activeDot: {
      width: 6,
      height: 6,
      backgroundColor: colors.primary,
      borderRadius: 3,
      marginTop: 4,
   },
});
