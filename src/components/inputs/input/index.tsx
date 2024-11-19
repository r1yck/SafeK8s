import React, { forwardRef } from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import styles from './styles';

interface InputProps extends TextInputProps {
  title: string;
  error?: string;
}

const Input = forwardRef<TextInput, InputProps>(({ title, error, ...props }, ref) => {
  const invalid = Boolean(error);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <TextInput ref={ref} style={styles.input} {...props} />
      {invalid && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
});

export default Input;
