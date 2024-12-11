import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import { useAuth } from '../../context/authContext';
import RegisterSchema from '../../validators/register';
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutesParams } from '../../navigation/routesParams';
import styles from './styles';
import global from '../../styles/global';

type registerParamsList = NativeStackNavigationProp<RoutesParams, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<registerParamsList>();
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const { register } = useAuth();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={global.container}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require('../../../assets/App-Logo.png')}
            style={styles.image}
          />
          <View style={styles.containerTitle}>
            <Text style={[global.title, styles.title]}>SafeK8s</Text>
          </View>
          <Formik
            initialValues={{
              username: '',
              fullName: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={async (values) => {
              try {
                await register(values.username, values.password, values.fullName);
                navigation.navigate('Dashboard');
              } catch (error: any) {
                Alert.alert('Erro', error.message);
              }
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <View>
                <View style={styles.containerForm}>
                  <Input
                    title=""
                    placeholder="Username"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    autoCapitalize="none"
                    value={values.username}
                    onChangeText={handleChange('username')}
                  />
                  <Input
                    title=""
                    placeholder="Full Name"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    autoCapitalize="words"
                    value={values.fullName}
                    onChangeText={handleChange('fullName')}
                  />
                  <Input
                    title=""
                    placeholder="Password"
                    secureTextEntry
                    ref={passwordRef}
                    returnKeyType="next"
                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                    value={values.password}
                    onChangeText={handleChange('password')}
                  />
                  <Input
                    title=""
                    placeholder="Confirm Password"
                    secureTextEntry
                    ref={confirmPasswordRef}
                    returnKeyType="done"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                  />
                </View>
                <View style={styles.containerButtons}>
                  <Button
                    title="Register"
                    className="primary"
                    onPress={() => handleSubmit()}
                  />
                  <Button
                    title="Already have an account?"
                    className="transparent"
                    onPress={() => navigation.navigate('Login')}
                  />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
