import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    width: 170,
    height: 30,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFECD1',
  },
  transparentButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  transparentText: {
    color: 'black',
  },
});

export default styles;