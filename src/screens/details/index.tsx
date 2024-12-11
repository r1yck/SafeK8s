import React, { useContext, useLayoutEffect, useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Alert} from 'react-native';
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
    const [loading, setLoading] = useState(false); // Estado de carregamento

    // Função para descriptografar a senha
    const decryptPassword = async (encryptedPassword: string) => {
        setLoading(true); // Começar carregamento
        try {
            console.log('Tentando recuperar a senha usando a chave:', encryptedPassword); // Log para depuração
            const decrypted = await SecureStore.getItemAsync(encryptedPassword);

            if (decrypted) {
                setDecryptedPassword(decrypted);
                console.log('Senha descriptografada com sucesso:', decrypted); // Log para depuração
            } else {
                console.error('Erro ao descriptografar a senha: Nenhum valor encontrado');
                setDecryptedPassword(null); // Se não encontrar, mantemos null
            }
        } catch (error) {
            console.error('Erro ao recuperar a senha:', error);
            setDecryptedPassword(null); // Caso ocorra erro
        } finally {
            setLoading(false); // Fim do carregamento
        }
    };

    // Descriptografando a senha assim que os dados do passwordData são recebidos
    useEffect(() => {
        if (password) {
            decryptPassword(password); // Passando a chave da senha
        }
    }, [password]);

    const handleCopyToClipboard = (text: string) => {
        Clipboard.setString(text);
        Alert.alert('Copied!', 'The text has been copied to the clipboard.');
    };
    
    

    // Configuração do cabeçalho
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
            'Confirm Delete',
            'Are you sure you want to delete this password?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        deletePassword(id); // Delete password using the context
                        navigation.goBack(); // Navigate back after deletion
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
            {/* EMAIL */}
            <View style={styles.inputRow}>
                <Input title="" placeholder="EMAIL" editable={false} value={email} style={styles.inputStyle} />
                <TouchableOpacity style={styles.iconButton} onPress={() => handleCopyToClipboard(email)}>
                    <FontAwesome name="copy" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {/* PASSWORD */}
            <View style={styles.inputRow}>
                <Input
                    title="Password"
                    placeholder="PASSWORD"
                    editable={false}
                    secureTextEntry={!showPassword} // Muda a visibilidade com base no estado showPassword
                    value={loading ? "Loading..." : decryptedPassword || "PASSWORD"} // Exibe a senha descriptografada ou um texto de carregamento
                    style={[styles.inputStyle, { paddingRight: 40 }]} // Adiciona um espaço à direita para o ícone
                />
                <TouchableOpacity
                    style={styles.iconButtonPassword} // Usando um estilo específico para o ícone da senha
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => handleCopyToClipboard(decryptedPassword || password)}>
                    <FontAwesome name="copy" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {/* LINK */}
            <View style={styles.movedInputRow}>
                <Input title="" placeholder="LINK" editable={false} value={link} style={styles.inputStyle} />
            </View>

            {/* DESCRIPTION */}
            <View style={styles.movedInputRow}>
                <Input title="" placeholder="DESCRIPTION" editable={false} multiline numberOfLines={4} value={description} style={styles.inputStyle} />
            </View>

            {/* BOTÕES */}
            <View style={styles.buttonsContainer}>
                <Button title="Edit" className="positive" onPress={handleEdit} />
                <Button title="Delete" className="negative" onPress={handleDelete} />
            </View>
        </ScrollView>
    );
}
