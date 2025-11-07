import React from 'react';
import { styles } from './styles';
import {
   TouchableOpacity,
   ActivityIndicator,
   Text,
   TouchableOpacityProps,
   ViewStyle,
} from 'react-native';
import colors from '@/constants/colors';
import { fonts } from '@/fonts/fonts';

type Dimension = ViewStyle['width'];

type Props = TouchableOpacityProps & {
   text: string;
   loading?: boolean;
   backgroundColor?: string;
   width?: Dimension;
   height?: Dimension;
   icon?: React.ReactNode;
   iconPosition?: 'left' | 'right';
   textColor?: string;
   fontSize?: number;
   fontFamily?: string;
   borderRadius?: number;
   disabled?: boolean;
   disabledBackgroundColor?: string;
};

export function Button({
   text,
   loading = false,
   backgroundColor,
   width = '85%',
   height = 55,
   icon,
   iconPosition = 'left',
   textColor,
   fontSize = 20,
   fontFamily,
   borderRadius = 20,
   disabled = false,
   disabledBackgroundColor,
   ...rest
}: Props) {
   const buttonStyle = [
      styles.button,
      {
         backgroundColor:
            disabled && disabledBackgroundColor
               ? disabledBackgroundColor
               : backgroundColor || colors.primary,
         width,
         height,
         borderRadius,
      },
      disabled && styles.disabled,
   ];

   const textStyle = [
      {
         color: textColor || colors.txtWhite,
         fontSize,
         fontFamily: fontFamily || fonts.body_poppins600,
      },
   ];

   const renderContent = () => {
      if (loading) {
         return <ActivityIndicator size="small" color="#fff" />;
      }

      return (
         <>
            {icon && iconPosition === 'left' && icon}
            <Text style={textStyle}>{text}</Text>
            {icon && iconPosition === 'right' && icon}
         </>
      );
   };

   return (
      <TouchableOpacity
         style={buttonStyle}
         {...rest}
         activeOpacity={0.6}
         disabled={disabled || loading}
      >
         {renderContent()}
      </TouchableOpacity>
   );
}
