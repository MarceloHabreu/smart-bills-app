import { forwardRef, LegacyRef } from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';
import { fonts } from '../../../fonts/fonts';
import colors from '../../../constants/colors';

type IconComponent =
   | React.ComponentType<React.ComponentProps<typeof MaterialIcons>>
   | React.ComponentType<React.ComponentProps<typeof FontAwesome>>
   | React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
   IconLeft?: IconComponent;
   IconRigth?: IconComponent;
   iconLeftName?: string;
   iconRigthName?: string;
   title?: string;
   onIconLeftPress?: () => void;
   onIconRigthPress?: () => void;
};
export const Input = forwardRef((Props: Props, ref: LegacyRef<TextInput> | null) => {
   const {
      IconLeft,
      IconRigth,
      iconRigthName,
      iconLeftName,
      title,
      onIconLeftPress,
      onIconRigthPress,
      ...rest
   } = Props;

   const calculateSizeWidth = () => {
      if (IconLeft && IconRigth) {
         return '80%';
      } else if (IconLeft || IconRigth) {
         return '90%';
      } else {
         return '100%';
      }
   };

   const calculateSizePaddingLeft = () => {
      if (IconLeft && IconRigth) {
         return 10;
      } else if (IconLeft || IconRigth) {
         return 10;
      } else {
         return 20;
      }
   };

   return (
      <>
         {title && <Text style={styles.titleInput}>{title}</Text>}
         <View style={[styles.boxInput, { paddingLeft: calculateSizePaddingLeft() }]}>
            {IconLeft && iconLeftName && (
               <TouchableOpacity onPress={onIconLeftPress}>
                  <IconLeft name={iconLeftName as any} size={20} color={colors.gray} />
               </TouchableOpacity>
            )}

            <TextInput
               style={[
                  styles.input,
                  {
                     width: calculateSizeWidth(),
                     fontFamily: fonts.body_poppins300,
                     color: colors.gray,
                  },
               ]}
               {...rest}
            />

            {IconRigth && iconRigthName && (
               <TouchableOpacity onPress={onIconRigthPress}>
                  <IconRigth name={iconRigthName as any} size={20} color={colors.gray} />
               </TouchableOpacity>
            )}
         </View>
      </>
   );
});
