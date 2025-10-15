import React from 'react';
import { styles } from './styles';
import { TouchableHighlightProps, TouchableOpacity, ActivityIndicator, Text } from 'react-native';

type Props = TouchableHighlightProps & {
   text: string;
   loading?: boolean;
};

export function Button({ ...rest }: Props) {
   return (
      <TouchableOpacity style={styles.button} {...rest} activeOpacity={0.6}>
         {rest.loading ? <ActivityIndicator /> : <Text style={styles.textButton}>{rest.text}</Text>}
      </TouchableOpacity>
   );
}
