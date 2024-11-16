import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    width: 338,
    height: 36,
    padding: 6, // Apliquei um valor numérico para padding
    paddingLeft: 10,  // Especificando padding individualmente para cada lado
    paddingRight: 13,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 233, // Verifique se esse valor é necessário
    flexShrink: 0,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFECD1', // Cor de fundo do card
    flexDirection: 'row', // Organiza os elementos em linha
  },
  cardTitle: {
    color: '#000',
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24, // Usei um valor numérico para lineHeight
  },
  arrow: {
    color: '#000',
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24, // Usei um valor numérico para lineHeight
  },
});

export default styles;
