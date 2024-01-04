import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useWorkout } from './WorkoutContext';

const RepsScreen = ({ route, navigation }) => {
  const { exerciseId, exerciseName, categoryId, selectedSets } = route.params;
  const { addExerciseSet } = useWorkout();

  // Initialize states for reps and weight for each set
  const [repsArray, setRepsArray] = useState(Array(selectedSets).fill(''));
  const [weightsArray, setWeightsArray] = useState(Array(selectedSets).fill(''));

  const handleSubmit = () => {
    let allValid = true;
    const setsData = repsArray.map((reps, index) => {
      const repsCount = parseInt(reps, 10);
      const weightAmount = parseFloat(weightsArray[index]);

      // Check if reps count is valid
      if (isNaN(repsCount) || repsCount <= 0) {
        console.warn(`Please enter a valid number of reps for set ${index + 1}`);
        allValid = false;
        return null;
      }
      // Check if weight is valid
      if (isNaN(weightAmount) || weightAmount < 0) {
        console.warn(`Please enter a valid weight for set ${index + 1}`);
        allValid = false;
        return null;
      }

      return { reps: repsCount, weight: weightAmount };
    });

    if (allValid) {
        addExerciseSet(
          exerciseId,
          exerciseName,
          categoryId,
          setsData // This now passes the array of sets
        );

      navigation.navigate('NewWorkout'); // Navigate directly to the home screen
    }
  };

  return (
    <View style={styles.screen}>
      <Text>Enter reps and weight for each set:</Text>
      {repsArray.map((reps, index) => (
        <View key={index} style={styles.setContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={reps}
            onChangeText={(text) => {
              const newArray = [...repsArray];
              newArray[index] = text;
              setRepsArray(newArray);
            }}
            placeholder={`Reps for set ${index + 1}`}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={weightsArray[index]}
            onChangeText={(text) => {
              const newArray = [...weightsArray];
              newArray[index] = text;
              setWeightsArray(newArray);
            }}
            placeholder={`Weight for set ${index + 1}`}
          />
        </View>
      ))}
      <Button title="Finish" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginVertical: 5,
    width: '40%',
    textAlign: 'center',
  },
  setContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingVertical: 5,
  },
});

export default RepsScreen;
