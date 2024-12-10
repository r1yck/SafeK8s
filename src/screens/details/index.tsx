import React, { useContext, useLayoutEffect } from 'react';
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

type DetailsScreenNavigationProp = StackNavigationProp<RoutesParams, 'Details'>;
type DetailsScreenRouteProp = RouteProp<RoutesParams, 'Details'>;

export default function DetailsScreen() {
    const navigation = useNavigation<DetailsScreenNavigationProp>();
    const route = useRoute<DetailsScreenRouteProp>();
    
    // Acessando os dados passados via navegação
    const { passwordData } = route.params; // Certificando-se que passwordData foi passado corretamente

    const { deletePassword } = useContext(PasswordsContext);

    const { id, title, link, email, password, description = '' } = passwordData;

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
                <TouchableOpacity style={styles.iconButton}>
                    <FontAwesome name="copy" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {/* PASSWORD */}
            <View style={styles.inputRow}>
                <Input title="" placeholder="PASSWORD" editable={false} secureTextEntry value={password} style={styles.inputStyle} />
                <TouchableOpacity style={styles.iconButton}>
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
