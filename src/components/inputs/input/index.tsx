import React, { forwardRef } from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import styles from './styles'; // Importando os estilos externos

interface InputProps extends TextInputProps {
  title: string;
}

const Input = forwardRef<TextInput, InputProps>(({ title, ...props }, ref) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <TextInput ref={ref} style={styles.input} {...props} />
    </View>
  );
});

export default Input;
