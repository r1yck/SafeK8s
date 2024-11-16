import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./styles"; // Importando os estilos

type CardProps = {
  title: string;
  onPress: () => void; // Função para abrir as informações do card
};

export default function Card({ title, onPress }: CardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.arrow}>{'>>'}</Text>
    </TouchableOpacity>
  );
}
