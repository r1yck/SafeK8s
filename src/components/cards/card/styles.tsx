import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    width: 338,
    height: 36,
    padding: 6,
    paddingLeft: 10,
    paddingRight: 13,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 233,
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
