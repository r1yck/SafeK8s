import React from "react";
import { ScrollView, View } from "react-native";
import Card from "../card"; // Importando o componente Card
import styles from "./styles";

type CardListProps = {
  cards: Array<{ title: string; onPress: () => void }>; // Lista de cards
};

export default function CardList({ cards }: CardListProps) {
  return (
    <View style={styles.cardListContainer}>
      <ScrollView>
        {cards.map((card, index) => (
          <Card key={index} title={card.title} onPress={card.onPress} />
        ))}
      </ScrollView>
    </View>
  );
}
