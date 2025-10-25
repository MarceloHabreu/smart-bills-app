import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
   tabArea: {
      height: 60,
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#eee',
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
