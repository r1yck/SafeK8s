import { Pressable, Text, View} from "react-native";
type StyleKeys = 'primary' | 'warning' | 'error' | 'transparent';

type ButtonProps = PressableProps &{
    title: string;
    className?: StyleKeys;
}

export default function Button({title, ...rest}) {
    const styleText = className == 'transparent' 
    ? [styles.buttonText, styles.transparentText]
    : styles.buttonText;
    return (
        <View>
            <Pressable>
                <Text>{title}</Text>
            </Pressable>
        </View>
    );
}