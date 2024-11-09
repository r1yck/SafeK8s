import { Pressable, Text, StyleSheet, PressableProps } from "react-native";

type StyleKeys = 'primary' | 'warning' | 'error' | 'transparent';

interface ButtonProps extends PressableProps {
  title: string;
  className: StyleKeys;
}


export default function Button({ title, className, ...rest }: ButtonProps) {
  const styleText = className === 'transparent'
    ? [styles.buttonText, styles.transparentText]
    : styles.buttonText;

  return (
    <Pressable {...rest}>
      <Text style={styleText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 16, 
  },
  transparentText: {
    color: 'black', 
  },
});
