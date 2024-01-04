// ViewStatsScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { useWorkout } from './WorkoutContext'; // Ensure this path is correct
import { useNavigation } from '@react-navigation/native'; // If not already imported


// Import your method of getting the past workouts data
// import { getPastWorkouts } from './storage';

const ViewStatsScreen = () => {
  const { getPastWorkouts } = useWorkout();
  const [pastWorkouts, setPastWorkouts] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    const workouts = getPastWorkouts();
    setPastWorkouts(workouts);
  }, [getPastWorkouts]);

  const renderWorkoutItem = ({ item }) => {
    // Convert Date object to a string
  // Specify options for date and time format
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  // Convert Date object to a string including the time
  const workoutDateTime = new Date(item.date).toLocaleString('en-US', dateOptions); // Use appropriate locale

  const handleEditPress = (workoutId) => {
    // Pass the selected workout ID to the EditStatsScreen
    navigation.navigate('EditStatsScreen', { workoutId });
  };
  
    return (
      <View style={styles.workoutContainer}>
        <Text style={styles.dateText}>Workout Date: {workoutDateTime}</Text>
        {item.exerciseSets.map((set, index) => (
          <View key={index} style={styles.exerciseDetail}>
            <Text style={styles.exerciseName}>{set.exerciseName}</Text>
            {set.details.map((detail, detailIndex) => (
              <Text key={detailIndex} style={styles.setDetail}>
                Set {detailIndex + 1}: {detail.reps} reps, Weight: {detail.weight} lbs/kg
              </Text>
            ))}
          </View>
        ))}
        <TouchableOpacity style={styles.editButton} onPress={() => handleEditPress(item.id)}>
        <Text style={styles.editButtonText}>Edit</Text> 
      </TouchableOpacity>
      </View>
    );
  };
  

  return (
    <View style={styles.screen}>
      <FlatList
        data={pastWorkouts}
        renderItem={renderWorkoutItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 10,
    },
    workoutContainer: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginBottom: 10,
    },
    dateText: {
      fontWeight: 'bold',
      marginBottom: 8,
    },
    exerciseDetail: {
      marginBottom: 5,
    },
    exerciseName: {
      fontWeight: '500',
    },
    setDetail: {
      marginLeft: 10,
    },
    editButton: {
        backgroundColor: 'transparent',
        position: 'absolute',
        right: 10,
        top: 10,
        padding: 8,
      },
      editButtonText: {
        fontSize: 16,
        color: '#007bff',  // Use a color that matches your app theme
      },
    // ... (other styles as required)
  });

export default ViewStatsScreen;
