import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SafeK8s</Text>
      {/* Outros componentes serão adicionados aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15616D', // Cor de fundo do contêiner
    alignItems: 'center', // Alinhamento horizontal
    justifyContent: 'center', // Alinhamento vertical
  },
  title: {
    position: 'absolute',
    left: 41, // Coordenada X
    top: 283, // Coordenada Y
    width: 369, // Largura
    height: 116, // Altura
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 90,
    lineHeight: 109, // idêntico à altura da caixa
    color: '#FFECD1', // Cor do texto
  },
});
