import React, { forwardRef, useMemo } from 'react';
import {
   TextInput,
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   StyleProp,
   ViewStyle,
   TextStyle,
   TextInputProps,
   NativeSyntheticEvent,
   TextInputFocusEventData,
} from 'react-native';
import colors from '../../constants/colors';
import { fonts } from '../../fonts/fonts';
import { styles } from './styles';

interface InputProps extends Omit<TextInputProps, 'ref'> {
   title?: string;
   titleStyle?: StyleProp<TextStyle>;
   containerStyle?: StyleProp<ViewStyle>;
   inputStyle?: StyleProp<TextStyle>;

   // Ícones como ReactNode (totalmente customizável)
   iconLeft?: React.ReactNode;
   onIconLeftPress?: () => void;

   iconRight?: React.ReactNode;
   onIconRightPress?: () => void;

   // Dimensões
   width?: ViewStyle['width'];
   height?: number;

   // Estados
   error?: boolean | string;
   disabled?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
   (
      {
         title,
         titleStyle,
         containerStyle,
         inputStyle,

         iconLeft,
         onIconLeftPress,
         iconRight,
         onIconRightPress,

         width = '100%',
         height = 56,

         error = false,
         disabled = false,

         style,
         onFocus,
         onBlur,
         ...rest
      },
      ref
   ) => {
      const [isFocused, setIsFocused] = React.useState(false);

      const handleFocus = (e: any) => {
         setIsFocused(true);
         onFocus?.(e);
      };

      const handleBlur = (e: any) => {
         setIsFocused(false);
         onBlur?.(e);
      };

      // Cores dinâmicas
      const borderColor = error
         ? colors.error || '#EF4444'
         : isFocused
         ? colors.primary || '#3B82F6'
         : '#E5E7EB';

      const hasLeftIcon = !!iconLeft;
      const hasRightIcon = !!iconRight;

      const inputContainerStyle = useMemo(
         () => [
            styles.inputContainer,
            { width, height, borderColor },
            ...(disabled ? [styles.disabled] : []),
            containerStyle,
         ],
         [width, height, borderColor, disabled, containerStyle]
      );

      return (
         <View style={styles.wrapper}>
            {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}

            <View style={inputContainerStyle}>
               {/* Ícone Esquerdo */}
               {hasLeftIcon && (
                  <TouchableOpacity
                     onPress={onIconLeftPress}
                     disabled={!onIconLeftPress || disabled}
                     style={styles.iconLeft}
                  >
                     {iconLeft}
                  </TouchableOpacity>
               )}

               {/* Input */}
               <TextInput
                  ref={ref}
                  style={[
                     styles.input,
                     hasLeftIcon && styles.paddingLeft,
                     hasRightIcon && styles.paddingRight,
                     { height },
                     inputStyle,
                  ]}
                  placeholderTextColor="#9CA3AF"
                  editable={!disabled}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  {...rest}
               />

               {/* Ícone Direito */}
               {hasRightIcon && (
                  <TouchableOpacity
                     onPress={onIconRightPress}
                     disabled={!onIconRightPress || disabled}
                     style={styles.iconRight}
                  >
                     {iconRight}
                  </TouchableOpacity>
               )}
            </View>

            {/* Mensagem de erro */}
            {typeof error === 'string' && error ? (
               <Text style={styles.errorText}>{error}</Text>
            ) : null}
         </View>
      );
   }
);

Input.displayName = 'Input';
