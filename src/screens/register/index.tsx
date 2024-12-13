import React, { useRef } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutesParams } from '../../navigation/routesParams';
import styles from './styles';
import global from '../../styles/global';
import { Formik } from 'formik';
import RegisterSchema from '../../validators/register';
import { useAuth } from '../../context/authContext';

type registerParamsList = NativeStackNavigationProp<RoutesParams, 'Register'>;

export default function RegisterScreen() {
    const navigation = useNavigation<registerParamsList>();
    const fullNameRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);
    const { register } = useAuth();

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
                        initialValues={{ username: '', fullName: '', password: '', confirmPassword: '' }}
                        validationSchema={RegisterSchema}
                        onSubmit={async (values) => {
                            try {
                                await register(values.username, values.fullName, values.password);
                                Alert.alert('Success', 'Registration successful!');
                                navigation.navigate('Dashboard');
                            } catch (error: any) {
                                Alert.alert('Error', error.message);
                            }
                        }}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched }) => (
                            <View>
                                <View style={styles.containerForm}>
                                    <Input
                                        title=""
                                        placeholder="USERNAME"
                                        returnKeyType="next"
                                        onSubmitEditing={() => fullNameRef.current?.focus()}
                                        autoCapitalize="none"
                                        value={values.username}
                                        onChangeText={handleChange('username')}
                                    />
                                    {touched.username && errors.username && (
                                        <Text style={{ color: 'red', marginTop: 5 }}>{errors.username}</Text>
                                    )}

                                    <Input
                                        title=""
                                        placeholder="FULL NAME"
                                        ref={fullNameRef}
                                        returnKeyType="next"
                                        onSubmitEditing={() => passwordRef.current?.focus()}
                                        autoCapitalize="words"
                                        value={values.fullName}
                                        onChangeText={handleChange('fullName')}
                                    />
                                    {touched.fullName && errors.fullName && (
                                        <Text style={{ color: 'red', marginTop: 5 }}>{errors.fullName}</Text>
                                    )}

                                    <Input
                                        title=""
                                        placeholder="PASSWORD"
                                        secureTextEntry
                                        ref={passwordRef}
                                        returnKeyType="next"
                                        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                    />
                                    {touched.password && errors.password && (
                                        <Text style={{ color: 'red', marginTop: 5 }}>{errors.password}</Text>
                                    )}

                                    <Input
                                        title=""
                                        placeholder="CONFIRM PASSWORD"
                                        secureTextEntry
                                        ref={confirmPasswordRef}
                                        returnKeyType="done"
                                        value={values.confirmPassword}
                                        onChangeText={handleChange('confirmPassword')}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <Text style={{ color: 'red', marginTop: 5 }}>{errors.confirmPassword}</Text>
                                    )}
                                </View>

                                <View style={styles.containerButtons}>
                                    <Button title="Register" className="primary" onPress={() => handleSubmit()} />
                                    <Button
                                        title="Already have an account?"
                                        className="transparent"
                                        onPress={() => navigation.navigate('Login', { resetFields: true })}
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
