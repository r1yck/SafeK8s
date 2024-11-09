import { StyleSheet } from 'react-native';

const global = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#15616D', // Cor de fundo do contêiner padrão
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        justifyContent: 'center', // Centraliza o conteúdo verticalmente
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFECD1', // Cor padrão para os títulos
        textAlign: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: '#FFECD1', // Cor de texto padrão
    },
    input: {
        width: '100%',
        height: 48,
        backgroundColor: '#FFECD1',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#000000',
        fontSize: 16,
        marginVertical: 10,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        backgroundColor: '#005f6b',
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default global;