import React, { useRef } from 'react';
import { View, Text, TextInput } from 'react-native';
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutesParams } from '../../navigation/routesParams';
import styles from './styles';
import global from '../../styles/global';

type resetPasswordParamsList = NativeStackNavigationProp<RoutesParams, 'ResetPassword'>;

const ResetPasswordScreen: React.FC = () => {
  const navigation = useNavigation<resetPasswordParamsList>();
  const emailRef = useRef<TextInput>(null);

  return (
    <View style={global.container}>
      <View style={styles.containerTitle}>
        <Text style={[global.title, styles.title]}>Redefinir Senha</Text>
      </View>
      <View style={styles.containerForm}>
        <Input
          title="E-mail"
          placeholder="Informe seu e-mail"
          keyboardType="email-address"
          returnKeyType="done"
          ref={emailRef}
        />
        <Button title="Enviar Link de Redefinição" className="primary" />
      </View>
      <View style={styles.containerButtons}>
        <Button title="Voltar para Login" className="transparent" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

export default ResetPasswordScreen;
