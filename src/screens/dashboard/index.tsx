import React from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Keyboard, 
    KeyboardAvoidingView, 
    Platform, 
    TextInput, 
    TouchableOpacity, 
    Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { RoutesParams } from '../../navigation/routesParams';
import global from '../../styles/global';
import styles from './styles';
import CardList from '../../components/cards/cardslist';
import Button from '../../components/buttons/button';

type dashboardParamsList = NativeStackNavigationProp<RoutesParams, 'Dashboard'>;

const data = [
    { id: '1', title: 'TITLE' },
    { id: '2', title: 'TITLE' },
    { id: '3', title: 'TITLE' }
];

export default function DashboardScreen() {
    const navigation = useNavigation<dashboardParamsList>();

    const handleCardPress = (cardTitle: string) => {
        console.log(`Card Pressed: ${cardTitle}`);
        // Lógica para abrir as informações do card ou navegar para outra tela
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView contentContainerStyle={global.container} keyboardShouldPersistTaps="handled">
                    <View style={styles.header}>
                        <Image source={require('../../../assets/App-Logo.png')} style={styles.logo} />
                        <Button title="Logout" className="negative" />
                    </View>

                    <View style={styles.containerTitle}>
                        <Text style={[global.title, styles.title]}>My Passwords</Text>
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <TextInput style={styles.searchInput} placeholder="Search" />
                        <TouchableOpacity>
                            <MaterialIcons name="search" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* Card List */}
                    <CardList 
                        cards={data.map(item => ({
                            title: item.title,
                            onPress: () => handleCardPress(item.title)
                        }))}
                    />

                    {/* Add Button */}
                    <TouchableOpacity style={styles.addButton}>
                        <MaterialIcons name="add" size={30} color="#fff" />
                    </TouchableOpacity>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
