import { StyleSheet } from 'react-native';
import global from '../../styles/global';

const styles = StyleSheet.create({
    form: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      width: '100%',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 40,
      width: '100%',
      bottom: -100,
    },
    row: {
      flexDirection: 'row',  // Garante que os inputs fiquem lado a lado
      justifyContent: 'space-between',
      gap: 20,
    },
  });
  
  export default styles;
  