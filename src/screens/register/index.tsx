import React, { useRef } from 'react';
import { View, Text, TextInput } from 'react-native';
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutesParams } from '../../navigation/routesParams';
import styles from './styles';
import global from '../../styles/global';

type registerParamsList = NativeStackNavigationProp<RoutesParams, 'Register'>;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<registerParamsList>();
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  return (
    <View style={global.container}>
      <View style={styles.containerTitle}>
        <Text style={[global.title, styles.title]}>Cadastro SafeK8s</Text>
      </View>
      <View style={styles.containerForm}>
        <Input
          title="Usuário"
          placeholder="Escolha seu nome de usuário"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <Input
          title="Senha"
          placeholder="Escolha uma senha"
          secureTextEntry
          ref={passwordRef}
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />
        <Input
          title="Confirmar Senha"
          placeholder="Confirme sua senha"
          secureTextEntry
          ref={confirmPasswordRef}
          returnKeyType="done"
        />
        <Button title="Cadastrar" className="primary" />
      </View>
      <View style={styles.containerButtons}>
        <Button title="Já tem uma conta?" className="transparent" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

export default RegisterScreen;
