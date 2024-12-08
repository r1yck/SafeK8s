import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
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

type loginParamsList = NativeStackNavigationProp<RoutesParams, 'Login'>;

export default function LoginScreen() {
    const navigation = useNavigation<loginParamsList>();
    const passwordRef = useRef<TextInput>(null);
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(prevState => !prevState);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView contentContainerStyle={global.container} keyboardShouldPersistTaps="handled">
                    <Image source={require('../../../assets/App-Logo.png')} style={styles.image} />
                    <View style={styles.containerTitle}>
                        <Text style={[global.title, styles.title]}>SafeK8s</Text>
                    </View>
                    <View style={styles.containerForm}>
                        <Formik
                            initialValues={{ username: '', password: '', keepConnected: false }}
                            validationSchema={LoginSchema}
                            onSubmit={(values) => alert("Submit Login: " + JSON.stringify(values))}
                        >
                            {({ handleChange, handleSubmit, values, errors }) => (
                                <View>
                                    <Input
                                        title=""
                                        placeholder="USER"
                                        returnKeyType="next"
                                        onSubmitEditing={() => passwordRef.current?.focus()}
                                        autoCapitalize="none"
                                        value={values.username}
                                        onChangeText={handleChange('username')}
                                        onBlur={handleChange}
                                    />
                                    <Input
                                        title=""
                                        placeholder="PASSWORD"
                                        secureTextEntry
                                        ref={passwordRef}
                                        returnKeyType="done"
                                        value={values.password} 
                                        onChangeText={handleChange('password')}
                                        onBlur={handleChange}
                                    />
                                </View>
                            )}
                        </Formik>
                    </View>
                    <View style={styles.containerCheckbox}>
                        <Select isSelected={isChecked} onToggle={toggleCheckbox} />
                    </View>
                    <View style={styles.containerButtons}>
                        {/* Corrigido a forma de chamar handleSubmit */}
                        <Button title="Login" className="primary" onPress={() => navigation.navigate('Dashboard')} />
                        <Button title="Forgot password" className="transparent" onPress={() => navigation.navigate('ResetPassword')} />
                        <Button title="Register" className="primary" onPress={() => navigation.navigate('Register')} />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
