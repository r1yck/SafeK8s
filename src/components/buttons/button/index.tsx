import { Pressable, Text, StyleSheet, PressableProps } from "react-native";
import styles from "./styles"; // Certifique-se de importar os estilos corretamente.

type StyleKeys = 'primary' | 'warning' | 'error' | 'transparent';

interface ButtonProps extends PressableProps {
  title: string;
  className: StyleKeys;
}

export default function Button({ title, className, ...rest }: ButtonProps) {
  // Lógica para aplicar os estilos do botão dependendo do tipo (transparente ou não)
  const buttonStyle = className === 'transparent' 
    ? [styles.button, styles.transparentButton]
    : styles.button;

  const textStyle = className === 'transparent' 
    ? [styles.buttonText, styles.transparentText] 
    : styles.buttonText;

  return (
    <Pressable style={buttonStyle} {...rest}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}
