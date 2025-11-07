import { Image, Text } from 'react-native';
import { styles } from './styles';
import Logo from '@/assets/smartbills_logo.png';

type Props = {
   title?: string;
   subtitle?: string;
};
export function HeaderBox({ ...Props }: Props) {
   return (
      <>
         <Image source={Logo} style={styles.logo} resizeMode="contain" />
         <Text style={[styles.logoText]}>{Props.title}</Text>
         <Text style={styles.welcomeText}>{Props.subtitle}</Text>
      </>
   );
}
