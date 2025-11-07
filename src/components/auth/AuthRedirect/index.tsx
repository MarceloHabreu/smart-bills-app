import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type Props = {
   message?: string;
   linkText?: string;
   targetScreen: string;
};
export function AuthRedirect({ message, linkText, targetScreen }: Props) {
   const navigation = useNavigation<NavigationProp<any>>();
   return (
      <>
         <View style={styles.textAuth}>
            <Text style={styles.text}>{message}</Text>
            <TouchableOpacity onPress={() => navigation.navigate(targetScreen)}>
               <Text style={styles.textLink}>{linkText}</Text>
            </TouchableOpacity>
         </View>
      </>
   );
}
