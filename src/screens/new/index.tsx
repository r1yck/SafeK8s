import React, { useContext, useLayoutEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup'; // Validação
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import styles from './styles';
import global from '../../styles/global';
import { PasswordsContext } from '../../context/PasswordsContext';
import uuid from 'react-native-uuid'; // Para gerar IDs únicos
import * as SecureStore from 'expo-secure-store';

// Schema de validação
const NewSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  link: Yup.string().url('Enter a valid URL').required('Link is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  description: Yup.string(),
});

export default function NewScreen() {
  const navigation = useNavigation();
  const { addPassword } = useContext(PasswordsContext);

  // Customizando o cabeçalho
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'New Password', // Alterando o título
      headerStyle: {
        backgroundColor: '#001524', // Cor de fundo do cabeçalho
      },
      headerTitleAlign: 'center', // Centralizando o título
      headerTintColor: '#fff', // Cor do texto do título
    });
  }, [navigation]);

  const handleSave = async (values: any) => {
    const newPassword = {
      ...values,
      id: uuid.v4(), // Gerando um ID único para a senha
    };

    try {
      // Armazenar a senha de forma segura no SecureStore
      await SecureStore.setItemAsync(newPassword.id, values.password);

      // Chamar o addPassword do contexto, para adicionar a senha no estado global
      addPassword(newPassword);

      Alert.alert('Success', 'Password saved successfully!');
      navigation.goBack(); // Voltando à tela anterior
    } catch (error) {
      console.error('Erro ao salvar a senha:', error);
      Alert.alert('Error', 'Failed to save the password.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={global.container} keyboardShouldPersistTaps="handled">
          <View style={styles.header}></View>
          <Formik
            initialValues={{
              title: '',
              link: '',
              email: '',
              password: '',
              description: '',
            }}
            validationSchema={NewSchema}
            onSubmit={handleSave}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                <View style={styles.row}>
                  <Input
                    title=""
                    placeholder="TITLE"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    error={touched.title && errors.title ? errors.title : undefined}
                    style={[global.input, { width: 161 }]}
                  />
                  <Input
                    title=""
                    placeholder="LINK"
                    value={values.link}
                    onChangeText={handleChange('link')}
                    error={touched.link && errors.link ? errors.link : undefined}
                    style={[global.input, { width: 161 }]}
                  />
                </View>
                <Input
                  title=""
                  placeholder="EMAIL"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={touched.email && errors.email ? errors.email : undefined}
                />
                <Input
                  title=""
                  placeholder="PASSWORD"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange('password')}
                  error={touched.password && errors.password ? errors.password : undefined}
                />
                <Input
                  title=""
                  placeholder="DESCRIPTION"
                  multiline
                  numberOfLines={4}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  error={touched.description && errors.description ? errors.description : undefined}
                />
                <View style={styles.buttonsContainer}>
                  <Button
                    title="Cancel"
                    className="negative"
                    onPress={() => navigation.goBack()}
                  />
                  <Button
                    title="Save"
                    className="positive"
                    onPress={() => handleSubmit()}
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
