import { StyleSheet } from 'react-native';
import global from '../../styles/global';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 0,
    height: 120, 
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain', 
    left: -50,
  },
  logoutButton: {
    display: 'flex',
    width: 121,
    height: 30, 
    paddingVertical: 3,  
    paddingHorizontal: 27,
    flexShrink: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000', 
    backgroundColor: '#EC0000', 
    right: -50,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  containerTitle: {
    justifyContent: 'flex-start',
    marginBottom: 20,
    left: -65,
    bottom: -30,
  },
  title: {
    color: '#FFF',
    fontFamily: 'Inter-Regular',
    fontSize: 30,
    fontWeight: '400',
    textAlign: 'left'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFECD1',
    borderRadius: 8,
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginVertical: 16,
    height: 48,
    width: 340,
  },
  searchInput: {
    fontSize: 20,
    flex: 1,
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 28,
    width: 50,
    height: 50,
    backgroundColor: '#0CDA01',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default styles;
