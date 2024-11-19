import { Pressable, Text, StyleSheet, PressableProps } from "react-native";
import styles from "./styles";

type StyleKeys = 'primary' | 'negative' | 'positive' | 'transparent';

interface ButtonProps extends PressableProps {
  title: string;
  className: StyleKeys;
}

export default function Button({ title, className, ...rest }: ButtonProps) {
  const buttonStyle = className === 'transparent' 
    ? [styles.button, styles.transparentButton]
    : className === 'negative' 
      ? [styles.button, styles.negativeButton]
      : className === 'positive' 
        ? [styles.button, styles.positiveButton]
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
