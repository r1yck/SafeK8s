import { StyleSheet } from 'react-native';
import global from '../../styles/global';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconButton: {
        marginLeft: 10,
        backgroundColor: '#FFECD1', // Cor do botão de copiar
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        top: 10,
    },
    inputStyle: {
        width: 283, // Largura em px
        height: 51, // Altura em px
        borderWidth: 1, // Borda para destaque, ajuste se necessário
        borderColor: '#000',
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#FFECD1', // Cor de fundo para contraste
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '90%',
        bottom: -100,
    },
    movedInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft: -20, 
        width: 283, 
        right: 16,
    },
    
    
});

export default styles;
