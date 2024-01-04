//NewWorkoutScreen.tsx

import React, { useState, useMemo } from 'react'; 
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { exercises } from './Utility'; // Make sure this path is correct
import { useWorkout } from './WorkoutContext';

const NewWorkoutScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { workout, finishWorkout } = useWorkout();

  const handleSaveWorkout = () => {
    if (workout && workout.exerciseSets.length > 0) {
      // Submits the workout and clears the current state
      finishWorkout();
      alert('Workout saved successfully!'); // Give user feedback or navigate to another screen
      navigation.navigate('Options');
    } else {
      alert('No exercises added to the workout!'); // Inform the user if no exercises have been added
    }
  };

  // Memoized filtered exercises list to prevent unnecessary computation
  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleExerciseSelect = (exercise) => {
    // Pass the selected exercise's ID, name, and category ID to the Sets screen
    navigation.navigate('Sets', {
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      categoryId: exercise.category,// Ensure the property name is consistent
    });
  };



  return (
    <View style={styles.container}>
      {/* Search bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for an exercise"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Scrollable list of exercises */}
      <FlatList
        data={filteredExercises}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.exerciseItem}
            onPress={() => handleExerciseSelect(item)}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.exerciseName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        horizontal
      />
      {/* Save Workout Button*/}
        <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveWorkout}
            >
        <Text style={styles.saveButtonText}>Save Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
  },
  exerciseItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  icon: {
    fontSize: 40,
    marginBottom: 5,
  },
  exerciseName: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#1E6738',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default NewWorkoutScreen;
