// EditStatsScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { useWorkout } from './WorkoutContext';

const EditStatsScreen = ({ route, navigation }) => {
  const { workoutId } = route.params;
  const { updateWorkout, getWorkoutById } = useWorkout();
  // Initialize with a default blank workout structure
  const [editableWorkout, setEditableWorkout] = useState({
    id: '', date: '', biometrics: {}, exerciseSets: [],
  });

  useEffect(() => {
    const workoutToEdit = getWorkoutById(workoutId);
    // Check if workout exists before updating the state
    if (workoutToEdit) {
      setEditableWorkout(workoutToEdit);
    }
  }, [workoutId, getWorkoutById]);



  const handleSave = () => {
    // Assuming validation is done elsewhere
    updateWorkout(editableWorkout);
    navigation.goBack();
  };


  // When changing the details of each set, the function needs to update the state correctly.
  const handleSetDetailChange = (setIndex, detailIndex, field, value) => {

    const parsedValue = value === '' ? '' : parseInt(value, 10);

    const updatedExerciseSets = editableWorkout.exerciseSets.map((set, sIndex) => {
      if (sIndex === setIndex) {
        const updatedDetails = set.details.map((detail, dIndex) => {
          if (dIndex === detailIndex) {
            return { ...detail, [field]: parsedValue };
          }
          return detail;
        });
        return { ...set, details: updatedDetails };
      }
      return set;
    });

    setEditableWorkout({ ...editableWorkout, exerciseSets: updatedExerciseSets });
  };

  if (!editableWorkout) {
    return <View style={styles.screen}><Text>Loading...</Text></View>;
  }

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.label}>Workout Date:</Text>
      {/* Example input for workout date; use a date picker for better UX */}
      <TextInput
        style={styles.input}
        value={editableWorkout.date}
        onChangeText={(newDate) => {
          setEditableWorkout({ ...editableWorkout, date: newDate });
        }}
      />
      {editableWorkout.exerciseSets.map((exerciseSet, setIndex) => (
        <View key={`set-${setIndex}`}>
          <Text style={styles.exerciseName}>{exerciseSet.exerciseName}</Text>
          {exerciseSet.details.map((detail, detailIndex) => (
            <View key={`detail-${setIndex}-${detailIndex}`} style={styles.setDetailContainer}>
              <TextInput
                style={styles.input}
                value={detail.reps.toString()}
                onChangeText={(newReps) => 
                  handleSetDetailChange(setIndex, detailIndex, 'reps', newReps)
                }
              />
              <TextInput
                style={styles.input}
                value={detail.weight.toString()}
                onChangeText={(newWeight) => 
                  handleSetDetailChange(setIndex, detailIndex, 'weight', newWeight)
                }
              />
            </View>
          ))}
        </View>
      ))}
      <Button title="Save Changes" onPress={handleSave} />
    </ScrollView>
  );
};


// Style definition

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff', // Change to your preferred background color
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      fontSize: 16,
      marginBottom: 15,
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#007bff', // Bootstrap primary color, change as needed
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    editButton: {
      backgroundColor: 'transparent', // Specify if you want a background on the edit icon
      padding: 8, // Adjust the padding as needed
    },
    editButtonText: {
      fontSize: 18,
      color: '#007bff', // Match the edit icon color with your theme
    },
    setDetailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    addButton: {
      backgroundColor: '#28a745', // Bootstrap success color, change as needed
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 18,
    },
    // Add any additional styles for other elements
  });
// ... (Your StyleSheet and component export)
export default EditStatsScreen;
