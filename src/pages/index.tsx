import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from '@/constants/colors';

export function Index() {
   return (
      <View style={styles.container}>
         <ActivityIndicator size={44} color={colors.primary} />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.bgScreen,
      justifyContent: 'center',
      alignItems: 'center',
   },
});
