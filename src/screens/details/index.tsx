import React, { useLayoutEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import styles from './styles';
import global from '../../styles/global';
import { FontAwesome } from '@expo/vector-icons';

export default function DetailsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id, title } = route.params as { id: string; title: string };

    // Configuração do cabeçalho
    useLayoutEffect(() => {
        navigation.setOptions({
            title: title || 'Details', // Usa o título do card
            headerStyle: {
                backgroundColor: '#001524',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
        });
    }, [navigation, title]);

    return (
        <ScrollView contentContainerStyle={[global.container, styles.container]}>
            {/* EMAIL */}
            <View style={styles.inputRow}>
                <Input
                    title=""
                    placeholder="EMAIL"
                    editable={false}
                    value="user@example.com"
                    style={styles.inputStyle}
                />
                <TouchableOpacity style={styles.iconButton}>
                    <FontAwesome name="copy" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {/* PASSWORD */}
            <View style={styles.inputRow}>
                <Input
                    title=""
                    placeholder="PASSWORD"
                    editable={false}
                    secureTextEntry
                    value="********"
                    style={styles.inputStyle}
                />
                <TouchableOpacity style={styles.iconButton}>
                    <FontAwesome name="copy" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {/* LINK */}
            <View style={styles.movedInputRow}>
                <Input
                    title=""
                    placeholder="LINK"
                    editable={false}
                    value="https://example.com"
                    style={styles.inputStyle} // Aplica o estilo da largura e altura
                />
            </View>

            {/* DESCRIPTION */}
            <View style={styles.movedInputRow}>
                <Input
                    title=""
                    placeholder="DESCRIPTION"
                    editable={false}
                    multiline
                    numberOfLines={4}
                    value="This is a sample description for the password details."
                    style={styles.inputStyle} // Aplica o estilo da largura e altura
                />
            </View>



            {/* BOTÕES */}
            <View style={styles.buttonsContainer}>
                <Button title="Edit" className="positive" onPress={() => console.log('Edit Pressed')} />
                <Button title="Delete" className="negative" onPress={() => console.log('Delete Pressed')} />
            </View>
        </ScrollView>
    );
}
