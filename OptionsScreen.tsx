// OptionsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWorkout } from './WorkoutContext';

function OptionsScreen() {

    //Initialise context
    const navigation = useNavigation();
    const { startNewWorkout, workout } = useWorkout();


  // Functions to handle each option could go here
  const handleNewWorkout = () => {
    // Check if there is an ongoing workout session
    if (workout) {
      // Handle the existing workout (show alert, prompt user, etc.)
      console.warn('A workout session is already in progress.');
    } else {
      // No ongoing workout, proceed to start a new one
      const initialBiometrics = { weight: 70, bodyFatPercentage: 15 };
      startNewWorkout(initialBiometrics);
      navigation.navigate('NewWorkout');
    }
  };
  
//TODO
  const handleViewStats = () => {navigation.navigate('ViewStatsScreen');};
  const handleUpdateProfile = () => { /* ... */ };
  
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Options</Text>
      <TouchableOpacity onPress={handleNewWorkout}>
        <Text style={styles.optionItem}>New Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleViewStats}>
        <Text style={styles.optionItem}>View Stats</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUpdateProfile}>
        <Text style={styles.optionItem}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionItem: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default OptionsScreen;
