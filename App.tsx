// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WorkoutProvider } from './WorkoutContext';

import HomeScreen from './HomeScreen'; // Your initial screen with the Welcome message and Start button
import OptionsScreen from './OptionsScreen'; // The new screen you just created
import NewWorkoutScreen from './NewWorkoutScreen'; // Update the path according to your file structure
import SetsScreen from './SetsScreen';
import RepsScreen from './RepsScreen';
import ViewStatsScreen from './ViewStatsScreen';
import EditStatsScreen from './EditStatsScreen'; // Make sure this path is correct


const Stack = createNativeStackNavigator();

function App() {
  return (
    <WorkoutProvider> 
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Options" component={OptionsScreen} />
        <Stack.Screen name="ViewStatsScreen" component={ViewStatsScreen} />
        <Stack.Screen name="NewWorkout" component={NewWorkoutScreen} />
        <Stack.Screen name="Sets" component={SetsScreen} />
        <Stack.Screen name="Reps" component={RepsScreen} />
        <Stack.Screen name="EditStatsScreen" component={EditStatsScreen} />
    </Stack.Navigator>
    </NavigationContainer>
    </WorkoutProvider>
  );
}

export default App;
