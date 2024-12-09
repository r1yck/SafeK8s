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
    { id: '1', title: 'Password for Email' },
    { id: '2', title: 'Password for Banking' },
    { id: '3', title: 'Social Media Password' }
];

export default function DashboardScreen() {
    const navigation = useNavigation<dashboardParamsList>();

    const handleCardPress = (cardId: string, cardTitle: string) => {
        navigation.navigate('Details', { id: cardId, title: cardTitle });
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
                        <Button title="Logout" className="negative" style={styles.logoutButton} onPress={() => navigation.navigate('Login')} />
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <TextInput style={styles.searchInput} placeholder="Search" />
                        <TouchableOpacity>
                            <MaterialIcons name="search" size={35} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerTitle}>
                        <Text style={[global.title, styles.title]}>My Passwords</Text>
                    </View>

                    {/* Card List */}
                    <CardList 
                        cards={data.map(item => ({
                            title: item.title,
                            onPress: () => handleCardPress(item.id, item.title)
                        }))}
                    />

                    {/* Add Button */}
                    <TouchableOpacity 
                        style={styles.addButton} 
                        onPress={() => navigation.navigate('New')}
                    >
                        <MaterialIcons name="add" size={45} color="#000" />
                    </TouchableOpacity>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
