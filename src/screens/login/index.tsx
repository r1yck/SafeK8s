import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutesParams } from '../../navigation/routesParams';
import styles from './styles';
import global from '../../styles/global';
import Select from '../../components/inputs/select';
import LoginSchema from '../../validators/login';
import { Formik } from 'formik';
import { useAuth } from '../../context/authContext';

type loginParamsList = NativeStackNavigationProp<RoutesParams, 'Login'>;

export default function LoginScreen() {
    const navigation = useNavigation<loginParamsList>();
    const passwordRef = useRef<TextInput>(null);
    const [isChecked, setIsChecked] = useState(false);
    const { login, user } = useAuth();

    const toggleCheckbox = () => {
        setIsChecked((prevState) => !prevState);
    };

    useEffect(() => {
        if (user) {
            navigation.navigate('Dashboard');
        }
    }, [user, navigation]);

    const validateUsername = (username: string) => {
        if (username.trim() === "") {
            return "Nome de usuário não pode estar vazio.";
        }
        if (/[^a-zA-Z0-9]/.test(username)) {
            return "Nome de usuário pode conter apenas letras e números.";
        }
        return "";
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={[global.container, { flexGrow: 1 }]}
                    keyboardShouldPersistTaps="handled"
                >
                    <Image source={require('../../../assets/App-Logo.png')} style={styles.image} />
                    <View style={styles.containerTitle}>
                        <Text style={[global.title, styles.title]}>SafeK8s</Text>
                    </View>
                    <Formik
                        initialValues={{ username: '', password: '', keepConnected: false }}
                        validationSchema={LoginSchema}
                        onSubmit={async (values) => {
                            try {
                                await login(values.username, values.password, values.keepConnected);
                                navigation.navigate('Dashboard');
                            } catch (error: any) {
                                Alert.alert('Erro', error.message);
                            }
                        }}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
                            <View>
                                <View style={styles.containerForm}>
                                    <Input
                                        title=""
                                        placeholder="USER"
                                        returnKeyType="next"
                                        onSubmitEditing={() => passwordRef.current?.focus()}
                                        autoCapitalize="none"
                                        value={values.username}
                                        onChangeText={handleChange('username')}
                                    />
                                    {touched.username && errors.username && (
                                        <Text style={{ color: 'red', marginTop: 5 }}>{errors.username}</Text>
                                    )}

                                    <Input
                                        title=""
                                        placeholder="PASSWORD"
                                        secureTextEntry
                                        ref={passwordRef}
                                        returnKeyType="done"
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                    />
                                    {touched.password && errors.password && (
                                        <Text style={{ color: 'red', marginTop: 5 }}>{errors.password}</Text>
                                    )}
                                </View>

                                <View style={styles.containerCheckbox}>
                                    <Select
                                        isSelected={values.keepConnected}
                                        onToggle={() => setFieldValue('keepConnected', !values.keepConnected)}
                                    />
                                </View>
                                <View style={styles.containerButtons}>
                                    <Button title="Login" className="primary" onPress={() => handleSubmit()} />
                                    <Button
                                        title="Forgot password"
                                        className="transparent"
                                        onPress={() => navigation.navigate('ResetPassword')}
                                    />
                                    <Button
                                        title="Register"
                                        className="primary"
                                        onPress={() => navigation.navigate('Register')}
                                    />
                                </View>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}
