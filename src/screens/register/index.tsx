import React, { useRef } from 'react';
import { View, Text, TextInput, Image, Alert } from 'react-native';
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutesParams } from '../../navigation/routesParams';
import { useAuth } from '../../context/authContext';
import styles from './styles';
import global from '../../styles/global';

type RegisterParamsList = NativeStackNavigationProp<RoutesParams, 'Register'>;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterParamsList>();
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const { register } = useAuth();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      await register(username, password, fullName);
      Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
      navigation.navigate('Login'); // Navega para a tela de login após o registro
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao registrar o usuário.');
    }
  };


  return (
    <View style={global.container}>
      <Image source={require('../../../assets/App-Logo.png')} style={styles.image} />
      <View style={styles.containerTitle}>
        <Text style={[global.title, styles.title]}>SafeK8s</Text>
      </View>
      <View style={styles.containerForm}>
        <Input
          title=""
          placeholder="USER"
          returnKeyType="next"
          value={username}
          onChangeText={setUsername}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <Input
          title=""
          placeholder="PASSWORD"
          returnKeyType="next"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />
        <Input
          title=""
          placeholder="CONFIRM PASSWORD"
          secureTextEntry
          ref={confirmPasswordRef}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Input
          title=""
          placeholder="FULL NAME"
          value={fullName}
          onChangeText={setFullName}
          returnKeyType="done"
        />
      </View>
      <View style={styles.containerButtons}>
        <Button title="Register" className="primary" onPress={handleRegister} />
        <Button
          title="Already have an account?"
          className="transparent"
          onPress={() => navigation.navigate('Login')}
          style={{ height: 75 }}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
