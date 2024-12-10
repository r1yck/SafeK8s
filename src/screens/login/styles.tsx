import { StyleSheet } from 'react-native';
import global from '../../styles/global';

const styles = StyleSheet.create({
    containerTitle: {
        position: 'absolute',
        justifyContent: 'center',
        width: 369,
        height: 116,
        left: 14,
        top: 283,
    },
    image: {
        display: 'flex',
        width: 171, 
        height: 171, 
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        position: 'absolute', 
        left: 110,
        right: 0,
        top: 80,
        bottom: 0,
    },
    title: {
        fontFamily: 'Inter-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 90,
        lineHeight: 109,
        color: '#FFECD1',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
        textAlign: 'center',
    },
    containerForm: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '70%',
        width: '90%',
        paddingBottom: 30,
    },
    containerButtons: {
        ...global.centerAlign,
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '20%',
        top: 20,
    },
    containerCheckbox: {
        top: -25,
    },
});

export default styles;
