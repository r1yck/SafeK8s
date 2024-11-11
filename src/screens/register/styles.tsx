import { StyleSheet } from 'react-native';
import global from '../../styles/global';

const styles = StyleSheet.create({
  image: {
    display: 'flex',
    width: 171,
    height: 171,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    position: 'absolute',
    left: 110,
    top: 80,
  },
  containerTitle: {
    position: 'absolute',
    justifyContent: 'center',
    width: 369,
    height: 116,
    left: 14,
    top: 283,
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
  },
  containerForm: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '90%',
    width: '90%',
    paddingBottom: 0,
  },
  containerButtons: {
    ...global.centerAlign,
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '20%',
  },
});

export default styles;
