import React, { useRef } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
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
          placeholder="NEW PASSWORD"
          secureTextEntry
          ref={passwordRef}
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />
        <Input
          title=""
          placeholder="CONFIRM NEW PASSWORD"
          secureTextEntry
          ref={confirmPasswordRef}
          returnKeyType="done"
        />
      </View>
      <View style={styles.containerButtons}>
        <Button title="Change" className="primary" />
        <Button title="Cancel" className="transparent" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

export default ResetPasswordScreen;
