import React, { useRef } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutesParams } from '../../navigation/routesParams';
import styles from './styles';
import global from '../../styles/global';

type loginParamsList = NativeStackNavigationProp<RoutesParams, 'Login'>;

export default function LoginScreen() {
    const navigation = useNavigation<loginParamsList>();
    const passwordRef = useRef<TextInput>(null);

    return (
        <View style={global.container}>
            <Image source={require('../../../assets/App-Logo.png')} style={styles.image} />
            <View style={styles.containerTitle}>
                <Text style={[global.title, styles.title]}>SafeK8s</Text>
            </View>
            <View style={styles.containerForm}>
                <Input 
                    placeholder="USER" 
                    returnKeyType="next" 
                    onSubmitEditing={() => passwordRef.current?.focus()} 
                />
                <Input 
                    placeholder="PASSWORD" 
                    secureTextEntry 
                    ref={passwordRef} 
                    returnKeyType="done" 
                />
                <Button title="Login" className="primary" />
            </View>
            <View style={styles.containerButtons}>
                <Button title="Esqueci minha senha" className="transparent" onPress={() => navigation.navigate('ResetPassword')} />
                <Button title="Cadastrar" className="warning" onPress={() => navigation.navigate('Register')} />
            </View>
        </View>
    );
}
