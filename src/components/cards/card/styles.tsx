import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    width: 336,
    height: 36,
    padding: 6,
    paddingLeft: 10,
    paddingRight: 13,
    flexShrink: 0,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFECD1',
    flexDirection: 'row',
    position: 'relative', // Importante para que o posicionamento absoluto funcione dentro do card
  },
  cardTitle: {
    color: '#000',
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
    flex: 1, // Faz com que o título ocupe todo o espaço disponível à esquerda
  },
  arrow: {
    position: 'absolute', // Posiciona a seta de forma absoluta
    right: 10, // Ajusta o valor conforme necessário para se alinhar ao seu gosto
    color: '#000',
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
    top: 4,
  },
});

export default styles;
