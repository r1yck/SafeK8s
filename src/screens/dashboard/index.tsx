import React, { useContext, useState, useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { RoutesParams } from '../../navigation/routesParams';
import global from '../../styles/global';
import styles from './styles';
import CardList from '../../components/cards/cardslist';
import Button from '../../components/buttons/button';
import { PasswordsContext } from '../../context/PasswordsContext'; 

type dashboardParamsList = NativeStackNavigationProp<RoutesParams, 'Dashboard'>;

export default function DashboardScreen() {
    const navigation = useNavigation<dashboardParamsList>();
    const { passwords, searchPasswords } = useContext(PasswordsContext); 
    const [searchQuery, setSearchQuery] = useState('');

    const handleCardPress = (cardId: string) => {
        const passwordData = passwords.find(password => password.id === cardId);
        if (passwordData) {
            navigation.navigate('Details', { passwordData });
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query); 
    };

    useFocusEffect(
        useCallback(() => {
            searchPasswords(searchQuery); 
        }, [searchQuery, searchPasswords])
    );

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView contentContainerStyle={global.container} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Image source={require('../../../assets/App-Logo.png')} style={styles.logo} />
                    <Button
                        title="Logout"
                        className="negative"
                        style={styles.logoutButton}
                        onPress={() => navigation.navigate('Login')}
                    />
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                    <TouchableOpacity>
                        <MaterialIcons name="search" size={35} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTitle}>
                    <Text style={[global.title, styles.title]}>My Passwords</Text>
                </View>

                {/* Card List */}
                <CardList
                    cards={passwords.map(item => ({
                        title: item.title,
                        onPress: () => handleCardPress(item.id)
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
    );
}
