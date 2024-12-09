import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    width: 336,
    height: 36,
    padding: 6,
    paddingLeft: 10,
    paddingRight: 13,
    gap: 240,
    flexShrink: 0,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFECD1',
    flexDirection: 'row',
  },
  cardTitle: {
    color: '#000',
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
  },
  arrow: {
    color: '#000',
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
  },
});

export default styles;
