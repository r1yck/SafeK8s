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
    width: 206,          
    height: 36,          
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,      
    color: '#FFF',       
    fontFamily: 'Inter-Regular', 
    fontSize: 30,        
    fontStyle: 'normal', 
    fontWeight: '400',   
    lineHeight: 36,      
    textAlign: 'center', 
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
