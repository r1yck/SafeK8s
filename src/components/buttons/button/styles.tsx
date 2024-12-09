import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    width: 170,
    height: 30, // Manter a altura original para os outros botões
    padding: 3,
    flexShrink: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFECD1', // Cor padrão do botão
  },
  transparentButton: {
    backgroundColor: 'transparent', // Torna o fundo transparente
    borderColor: 'transparent', // Torna a borda transparente
    height: 50, // Aumenta a altura apenas do botão transparente
  },
  buttonText: {
    color: '#000', // Cor do texto padrão
    fontSize: 16,
    textAlign: 'center',
  },
  transparentText: {
    color: 'white', // Cor do texto para o botão transparente
    fontFamily: 'Inter-Regular',
    fontSize: 20, // Aumentei o tamanho da fonte apenas para o botão transparente
    textAlign: 'center',
    flexWrap: 'wrap', // Permite que o texto quebre para a próxima linha
  },

  // Estilo ajustado para o botão negativo conforme solicitado
  negativeButton: {
    display: 'flex',
    width: 121, // Largura ajustada
    height: 30, // Altura ajustada
    paddingVertical: 3,  // Padding vertical ajustado
    paddingHorizontal: 27, // Padding horizontal ajustado
    flexShrink: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000', // Cor da borda
    backgroundColor: '#78290F', // Cor de fundo do botão
  },

  positiveButton: {
    display: 'flex',
    width: 121, // Largura ajustada
    height: 30, // Altura ajustada
    paddingVertical: 3,  // Padding vertical ajustado
    paddingHorizontal: 27, // Padding horizontal ajustado
    flexShrink: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000', // Cor da borda
    backgroundColor: '#FF7D00', // Cor de fundo do botão
  },
});

export default styles;
