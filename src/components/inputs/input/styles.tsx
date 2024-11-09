import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10, // Espaçamento entre os componentes
  },
  label: {
    fontSize: 16, // Tamanho da fonte do título
    color: '#FFECD1', // Cor do texto do título
    marginBottom: 5, // Espaçamento entre o título e o input
  },
  input: {
    height: 48, // Altura do campo de texto
    backgroundColor: '#FFECD1', // Cor de fundo do input
    borderColor: '#000', // Cor da borda
    borderWidth: 1, // Largura da borda
    borderRadius: 5, // Borda arredondada
    paddingHorizontal: 10, // Espaçamento dentro do campo de texto
    color: '#000', // Cor do texto dentro do input
  },
});

export default styles;
