import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { getDefaultSets } from './Utility';

const SetsScreen = ({ route, navigation }) => {
  const { exerciseId, exerciseName, categoryId } = route.params;
  const defaultSets = getDefaultSets(categoryId);
  const [setCount, setSetCount] = useState(defaultSets.toString()); // Initialize with default sets

  const submitSets = () => {
    const parsedSets = parseInt(setCount, 10);
    if (!isNaN(parsedSets)) {
      // Navigate to RepsScreen with the selected number of sets
      navigation.navigate('Reps', {
        exerciseId,
        exerciseName,
        categoryId,
        selectedSets: parsedSets,
      });
    } else {
      // Do some error handling here
      console.warn('Please enter a valid number of sets');
    }
  };

  return (
    <View style={styles.screen}>
      <Text>Enter number of sets for {exerciseName}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={setCount}
        onChangeText={setSetCount} />
      <Button title="Next" onPress={submitSets} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    width: '80%',
    textAlign: 'center',
  },
});

export default SetsScreen;
