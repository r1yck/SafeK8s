import React, { useContext, useLayoutEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import styles from './styles';
import global from '../../styles/global';
import { PasswordsContext } from '../../context/PasswordsContext';
import { RoutesParams } from '../../navigation/routesParams';
import { StackNavigationProp } from '@react-navigation/stack';

type EditScreenNavigationProp = StackNavigationProp<RoutesParams, 'EditScreen'>;

// Corrigir a tipagem para a rota
type EditScreenRouteParams = RouteProp<RoutesParams, 'EditScreen'>;

const EditSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  link: Yup.string().url('Enter a valid URL').required('Link is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  description: Yup.string(),
});

export default function EditScreen() {
  const navigation = useNavigation<EditScreenNavigationProp>();  // Tipagem correta para navigation
  const route = useRoute<EditScreenRouteParams>();  // Tipagem correta para route
  const { id, title, link, email, password, description } = route.params.passwordData;  // Acessa os parâmetros corretamente
  const { editPassword } = useContext(PasswordsContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Edit Password',
      headerStyle: { backgroundColor: '#001524' },
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
    });
  }, [navigation]);

  const handleSave = (values: any) => {
    editPassword(id, values); // Chama a função editPassword do contexto
    alert('Senha editada com sucesso!'); // Exibe mensagem de sucesso
    navigation.navigate('Dashboard'); // Navega normalmente para a tela Dashboard
};


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={global.container} keyboardShouldPersistTaps="handled">
          <Formik
            initialValues={{ title, link, email, password, description }}
            validationSchema={EditSchema}
            onSubmit={handleSave}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                <View style={styles.row}>
                  <Input
                    title="TITLE"
                    placeholder="TITLE"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    error={touched.title && errors.title ? errors.title : undefined}
                    style={[global.input, { width: 161 }]}
                  />
                  <Input
                    title="LINK"
                    placeholder="LINK"
                    value={values.link}
                    onChangeText={handleChange('link')}
                    error={touched.link && errors.link ? errors.link : undefined}
                    style={[global.input, { width: 161 }]}
                  />
                </View>
                <Input
                  title="EMAIL"
                  placeholder="EMAIL"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={touched.email && errors.email ? errors.email : undefined}
                />
                <Input
                  title="PASSWORD"
                  placeholder="PASSWORD"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange('password')}
                  error={touched.password && errors.password ? errors.password : undefined}
                />
                <Input
                  title="DESCRIPTION"
                  placeholder="DESCRIPTION"
                  multiline
                  numberOfLines={4}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  error={touched.description && errors.description ? errors.description : undefined}
                />
                <View style={styles.buttonsContainer}>
                  <Button title="Cancel" className="negative" onPress={() => navigation.goBack()} />
                  <Button title="Save" className="positive" onPress={() => handleSubmit()} />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
