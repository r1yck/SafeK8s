import { StyleSheet } from 'react-native';
import global from '../../styles/global';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 20,
  },
  logo: {
    display: 'flex',
    width: 98,
    height: 98,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  logoutButton: {
    width: 100,
    height: 40,
  },
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 116,
    marginTop: 50,
  },
  title: {
    display: 'flex',
    width: 206,          // Largura especificada
    height: 36,          // Altura especificada
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,       // Impede o encolhimento do texto
    color: '#FFF',       // Cor do texto
    fontFamily: 'Inter-Regular', // Fonte Inter
    fontSize: 30,        // Tamanho da fonte
    fontStyle: 'normal', // Estilo normal
    fontWeight: '400',   // Peso da fonte
    lineHeight: 36,      // Altura da linha como número
    textAlign: 'center', // Alinha o texto no centro
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 16,
    height: 40,
  },
  searchInput: {
    flex: 1,
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#ff8000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;