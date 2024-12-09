import React, { useLayoutEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup'; // Caso queira validar os campos
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import styles from './styles';
import global from '../../styles/global';

// Schema de validação (opcional)
const NewSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    link: Yup.string().url('Enter a valid URL').required('Link is required'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    description: Yup.string(),
});

export default function NewScreen() {
    const navigation = useNavigation();

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

    const handleSave = (values: any) => {
        console.log('Form values:', values);
        // Adicione lógica para salvar os dados aqui
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
                                {/* Usando flexGrow para empurrar os botões para baixo */}
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