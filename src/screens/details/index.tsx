import React, { useContext, useLayoutEffect, useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import styles from './styles';
import global from '../../styles/global';
import { FontAwesome } from '@expo/vector-icons';
import { PasswordsContext } from '../../context/PasswordsContext';
import { RouteProp } from '@react-navigation/native';
import { RoutesParams } from '../../navigation/routesParams';
import { StackNavigationProp } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import * as Clipboard from 'expo-clipboard';

type DetailsScreenNavigationProp = StackNavigationProp<RoutesParams, 'Details'>;
type DetailsScreenRouteProp = RouteProp<RoutesParams, 'Details'>;

export default function DetailsScreen() {
    const navigation = useNavigation<DetailsScreenNavigationProp>();
    const route = useRoute<DetailsScreenRouteProp>();
    
    const { passwordData } = route.params;
    const { deletePassword } = useContext(PasswordsContext);

    const { id, title, link, email, password, description = '' } = passwordData;

    const [decryptedPassword, setDecryptedPassword] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Função para descriptografar a senha
    const decryptPassword = async () => {
        setLoading(true);
        try {
            console.log('Tentando recuperar a senha usando a chave:', id); // Corrigido para usar `id` como chave
            const decrypted = await SecureStore.getItemAsync(id);

            if (decrypted) {
                setDecryptedPassword(decrypted);
                console.log('Senha descriptografada com sucesso:', decrypted);
            } else {
                console.error('Erro ao descriptografar a senha: Nenhum valor encontrado');
                setDecryptedPassword(null);
            }
        } catch (error) {
            console.error('Erro ao recuperar a senha:', error);
            setDecryptedPassword(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        decryptPassword();
    }, []);

    const handleCopyToClipboard = (text: string) => {
        if (text) {
            Clipboard.setString(text);
            Alert.alert('Copiado!', 'O texto foi copiado para a área de transferência.');
        } else {
            Alert.alert('Erro', 'Nada para copiar!');
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: title || 'Details',
            headerStyle: { backgroundColor: '#001524' },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
        });
    }, [navigation, title]);

    const handleDelete = () => {
        Alert.alert(
            'Confirmar Exclusão',
            'Você tem certeza que deseja excluir essa senha?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => {
                        deletePassword(id);
                        navigation.goBack();
                    },
                },
            ]
        );
    };

    const handleEdit = () => {
        navigation.navigate('EditScreen', {
            passwordData: { id, title, link, email, password, description },
        });
    };

    return (
        <ScrollView contentContainerStyle={[global.container, styles.container]}>
            <View style={styles.inputRow}>
                <Input title="" placeholder="EMAIL" editable={false} value={email} style={styles.inputStyle} />
                <TouchableOpacity style={styles.iconButton} onPress={() => handleCopyToClipboard(email)}>
                    <FontAwesome name="copy" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.inputRow}>
                <Input
                    title="Password"
                    placeholder="PASSWORD"
                    editable={false}
                    secureTextEntry={!showPassword}
                    value={loading ? "Carregando..." : decryptedPassword || "Senha não encontrada"}
                    style={[styles.inputStyle, { paddingRight: 40 }]}
                />
                <TouchableOpacity
                    style={styles.iconButtonPassword}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => handleCopyToClipboard(decryptedPassword || password)}>
                    <FontAwesome name="copy" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.movedInputRow}>
                <Input title="" placeholder="LINK" editable={false} value={link} style={styles.inputStyle} />
            </View>

            <View style={styles.movedInputRow}>
                <Input title="" placeholder="DESCRIPTION" editable={false} multiline numberOfLines={4} value={description} style={styles.inputStyle} />
            </View>

            <View style={styles.buttonsContainer}>
                <Button title="Editar" className="positive" onPress={handleEdit} />
                <Button title="Excluir" className="negative" onPress={handleDelete} />
            </View>
        </ScrollView>
    );
}
