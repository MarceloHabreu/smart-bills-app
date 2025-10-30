import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
   tabsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 16,
   },
   tabItem: {
      alignItems: 'center',
   },
   tabInner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
   },
   tabText: {
      fontSize: 16,
      fontWeight: '600',
   },
   tabTextActive: {
      color: colors.greenTabs, // verde ativo
   },
   tabTextInactive: {
      color: colors.grayTabs, // cinza inativo
   },
   badge: {
      minWidth: 22,
      height: 22,
      borderRadius: 11,
      justifyContent: 'center',
      alignItems: 'center',
   },
   badgeActive: {
      backgroundColor: colors.red,
   },
   badgeInactive: {
      backgroundColor: colors.red,
      opacity: 0.6,
   },
   badgeText: {
      color: colors.txtWhite,
      fontWeight: 'bold',
      fontSize: 12,
   },
   underline: {
      marginTop: 4,
      height: 3,
      backgroundColor: colors.underlineTabs,
      width: '100%',
      borderRadius: 2,
   },
});
