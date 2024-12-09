import React, { useLayoutEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Agora, usamos useRoute para pegar os dados da senha
import { Formik } from 'formik';
import * as Yup from 'yup'; // Schema de validação
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import styles from './styles';
import global from '../../styles/global';

// Schema de validação (opcional)
const EditSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    link: Yup.string().url('Enter a valid URL').required('Link is required'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    description: Yup.string(),
});

export default function EditScreen() {
    const navigation = useNavigation();
    const route = useRoute();  // Usamos useRoute para pegar os parâmetros passados, como a senha a ser editada
    const { passwordData } = route.params; // Aqui assumimos que você está passando os dados da senha através dos parâmetros

    // Customizando o cabeçalho
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Edit Password', // Alterando o título para 'Edit Password'
            headerStyle: {
                backgroundColor: '#001524', // Cor de fundo do cabeçalho
            },
            headerTitleAlign: 'center', // Centralizando o título
            headerTintColor: '#fff', // Cor do texto do título
        });
    }, [navigation]);

    const handleSave = (values: any) => {
        console.log('Updated values:', values);
        // Adicione lógica para salvar os dados aqui, como enviar para o backend
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
                            title: passwordData.title, // Preenche os dados existentes
                            link: passwordData.link,
                            email: passwordData.email,
                            password: passwordData.password,
                            description: passwordData.description,
                        }}
                        validationSchema={EditSchema}
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
                                        errorMessage={touched.title && errors.title}
                                        style={[global.input, { width: 161 }]}
                                    />
                                    <Input
                                        title=""
                                        placeholder="LINK"
                                        value={values.link}
                                        onChangeText={handleChange('link')}
                                        errorMessage={touched.link && errors.link}
                                        style={[global.input, { width: 161 }]}
                                    />
                                </View>
                                <Input
                                    title=""
                                    placeholder="EMAIL"
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    errorMessage={touched.email && errors.email}
                                />
                                <Input
                                    title=""
                                    placeholder="PASSWORD"
                                    secureTextEntry
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    errorMessage={touched.password && errors.password}
                                />
                                <Input
                                    title=""
                                    placeholder="DESCRIPTION"
                                    multiline
                                    numberOfLines={4}
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                    errorMessage={touched.description && errors.description}
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
                                        onPress={handleSubmit}
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
