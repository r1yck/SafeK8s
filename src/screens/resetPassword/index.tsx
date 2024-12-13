import React, { useRef } from 'react';
import { View, Text, TextInput, Image, Alert } from 'react-native';
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutesParams } from '../../navigation/routesParams';
import styles from './styles';
import global from '../../styles/global';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/authContext';

type resetPasswordParamsList = NativeStackNavigationProp<RoutesParams, 'ResetPassword'>;

const ResetPasswordScreen: React.FC = () => {
  const navigation = useNavigation<resetPasswordParamsList>();
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const { updatePassword } = useAuth(); 

  const validationSchema = Yup.object().shape({
    user: Yup.string().required('User is required'),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleResetPassword = async (values: { user: string, newPassword: string }) => {
    try {
    
      await updatePassword(values.user, values.newPassword); 
      Alert.alert('Success', 'Password successfully changed');
      navigation.navigate('Login', { resetFields: true }); 
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred while updating the password');
    }
  };

  return (
    <View style={global.container}>
      <Image source={require('../../../assets/App-Logo.png')} style={styles.image} />
      <View style={styles.containerTitle}>
        <Text style={[global.title, styles.title]}>SafeK8s</Text>
      </View>
      <Formik
        initialValues={{ user: '', newPassword: '', confirmPassword: '' }} 
        validationSchema={validationSchema}
        onSubmit={handleResetPassword}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={styles.containerForm}>
            {/* Campo para o nome do usuário */}
            <Input
              title=""
              placeholder="USERNAME"
              value={values.user}
              onChangeText={handleChange('user')}
            />
            {touched.user && errors.user && <Text style={{ color: 'red', marginTop: 5 }}>{errors.user}</Text>}

            {/* Campo para nova senha */}
            <Input
              title=""
              placeholder="NEW PASSWORD"
              secureTextEntry
              ref={passwordRef}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              value={values.newPassword}
              onChangeText={handleChange('newPassword')}
            />
            {touched.newPassword && errors.newPassword && <Text style={{ color: 'red', marginTop: 5 }}>{errors.newPassword}</Text>}

            {/* Campo para confirmar a nova senha */}
            <Input
              title=""
              placeholder="CONFIRM NEW PASSWORD"
              secureTextEntry
              ref={confirmPasswordRef}
              returnKeyType="done"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
            />
            {touched.confirmPassword && errors.confirmPassword && <Text style={{ color: 'red', marginTop: 5 }}>{errors.confirmPassword}</Text>}

            <View style={styles.containerButtons}>
              <Button
                title="Change"
                className="primary"
                onPress={() => handleSubmit()}
              />
              <Button title="Cancel" className="transparent" onPress={() => navigation.navigate('Login', { resetFields: true })} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ResetPasswordScreen;
