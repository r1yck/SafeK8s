import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SafeK8s</Text>
      <TextInput 
        style={styles.input} 
        placeholder="USER" 
        placeholderTextColor="#000000B3"
      />
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
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontStyle: 'normal',
    fontWeight: '400',  
    fontSize: 90,
    lineHeight: 109, 
    color: '#FFECD1', // Cor do texto
    // Efeito de sombra
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
  },
  input: {
    width: 340,
    height: 48,
    backgroundColor: '#FFECD1',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000000',
    fontSize: 16,
    marginTop: 20, // para dar espaço abaixo do título
  },
});
