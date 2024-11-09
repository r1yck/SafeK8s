import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
        width: '100%',
    },
    title: {
        fontWeight: 'bold',
        color: '#FFECD1',
    },
    containerForm: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '60%',
        width: '100%',
        paddingBottom: 50,
    },
    containerButtons: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '20%',
    },
});

export default styles;
