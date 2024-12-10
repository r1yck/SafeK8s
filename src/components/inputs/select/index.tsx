import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

interface SelectProps {
  isSelected: boolean;
  onToggle: () => void;
}

const Select: React.FC<SelectProps> = ({ isSelected, onToggle }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
        <View style={styles.checkbox}>
          {isSelected && <Text style={styles.checkmark}>✔</Text>}
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>Keep me logged in</Text>
    </View>
  );
};

export default Select;
