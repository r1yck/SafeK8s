import React, { useRef } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
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
      <Image source={require('../../../assets/App-Logo.png')} style={styles.image} />
      <View style={styles.containerTitle}>
        <Text style={[global.title, styles.title]}>SafeK8s</Text>
      </View>
      <View style={styles.containerForm}>
        <Input
          title=""
          placeholder="USER"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <Input
          title=""
          placeholder="PASSWORD"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <Input
          title=""
          placeholder="CONFIRM PASSWORD"
          secureTextEntry
          ref={passwordRef}
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />
        <Input
          title=""
          placeholder="FULL NAME"
          ref={confirmPasswordRef}
          returnKeyType="done"
        />
      </View>
      <View style={styles.containerButtons}>
        <Button title="Register" className="primary" />
        <Button title="Already have an account?" className="transparent" onPress={() => navigation.navigate('Login')}
          style={{ height: 75 }} />
      </View>
    </View>
  );
};

export default RegisterScreen;
