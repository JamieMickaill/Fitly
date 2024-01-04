//HomeScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity, // We'll use TouchableOpacity for the Start button
  useColorScheme,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


function HomeScreen() {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#0D0D0D' : '#F5FCFF',
  };

  const handleStart = () => {
    navigation.navigate('Options');
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Fitly</Text>
        <Text style={styles.subtitle}>Your personal fitness companion</Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStart}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700', // Bold font weight
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400', // Regular font weight
    marginBottom: 32,
  },
  startButton: {
    backgroundColor: '#1E6738',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3, // For a little shadow on Android
    shadowOffset: { width: 1, height: 1 }, // For a slight shadow on iOS
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  startButtonText: {
    fontSize: 20,
    color: '#FFFFFF', // White color for the text inside the button
    fontWeight: '600',
  },
});

export default HomeScreen;
