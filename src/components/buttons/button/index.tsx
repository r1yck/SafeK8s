import { Pressable, Text, StyleSheet, PressableProps } from "react-native";
import styles from "./styles"; // Certifique-se de importar os estilos corretamente.

type StyleKeys = 'primary' | 'negative' | 'positive' | 'transparent'; // Alterado para 'negative' e 'positive'

interface ButtonProps extends PressableProps {
  title: string;
  className: StyleKeys;
}

export default function Button({ title, className, ...rest }: ButtonProps) {
  // Lógica para aplicar os estilos do botão dependendo do tipo (transparente ou não)
  const buttonStyle = className === 'transparent' 
    ? [styles.button, styles.transparentButton]
    : className === 'negative' 
      ? [styles.button, styles.negativeButton] // Estilo para o botão negativo
      : className === 'positive' 
        ? [styles.button, styles.positiveButton] // Estilo para o botão positivo
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
