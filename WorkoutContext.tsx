//WorkoutContext.tsx
import React, { createContext, useState, useContext } from 'react';


type SetDetail = {
  reps: number;
  weight: number;
};

type ExerciseSet = {
  exerciseId: number;
  exerciseName: string;
  categoryId: number;
  details: SetDetail[]; // Array to hold details for each set

};

type Biometrics = {
  weight?: number;
  age?: number;
  bodyFatPercentage?: number;
};

type Workout = {
  id: string;
  date: Date;
  biometrics: Biometrics;
  exerciseSets: ExerciseSet[];
};

type WorkoutContextType = {
  workout: Workout | null;
  pastWorkouts: Workout[]; // Added missing property
  startNewWorkout: (biometrics: Biometrics) => void;
  addExerciseSet: (exerciseId: number, exerciseName: string, categoryId: number, details: SetDetail[]) => void;
  finishWorkout: () => void;
  updateWorkout: (updatedWorkout: Workout) => void; // Corrected the type signature
  getPastWorkouts: () => Workout[];
  getWorkoutById: (id: string) => Workout | undefined; // Added return type
};


// Providing a default context value matching the WorkoutContextType shape
const defaultContextValue: WorkoutContextType = {
    workout: null,
    pastWorkouts: [],
    startNewWorkout: () => {},
    addExerciseSet: () => {},
    finishWorkout: () => {},
    updateWorkout: () => {},
    getPastWorkouts: () => [],
    getWorkoutById: () => undefined,
  };

export function useWorkout() {
    return useContext(WorkoutContext);
}

export const WorkoutContext = createContext<WorkoutContextType>(defaultContextValue);

export const WorkoutProvider: React.FC = ({ children }) => {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [pastWorkouts, setPastWorkouts] = useState<Workout[]>([]);

  const startNewWorkout = (biometrics: Biometrics) => {
    const newWorkout: Workout = {
      id: Math.random().toString(), // in a real application, use a robust method for ID generation
      date: new Date(),
      biometrics,
      exerciseSets: [],
    };
    setWorkout(newWorkout);
  };

  const addExerciseSet = (exerciseId: number, exerciseName: string, categoryId: number, details: SetDetail[]) => {
    if (workout) {
      const newExerciseSet = {
        exerciseId,
        exerciseName,
        categoryId,
        details
      };
      
    setWorkout(prevWorkout => ({
        ...prevWorkout,
        exerciseSets: [...prevWorkout.exerciseSets, newExerciseSet],
      }));
    }
  };


  
  const getPastWorkouts = () => {
        return pastWorkouts;
    };

  const finishWorkout = () => {
    // Here you would normally save the workout to a server or local storage
    // For now, we'll just log it and clear the current workout
    if (workout) {
      console.log('Final workout data:', workout);
      setPastWorkouts(prevPastWorkouts => [...prevPastWorkouts, { ...workout, exerciseSets: [...workout.exerciseSets] }]);
      // Save workout logic here

      // Clear the current workout
      setWorkout(null);
    }
    };

    const updateWorkout = (updatedWorkout) => {
        setPastWorkouts(pastWorkouts.map(workout => 
            workout.id === updatedWorkout.id ? updatedWorkout : workout));
        };
    
      const getWorkoutById = (id) => {
            return pastWorkouts.find(workout => workout.id === id);
          };

    return (
    <WorkoutContext.Provider value={{ 
        workout, 
        pastWorkouts,
        startNewWorkout, 
        addExerciseSet, 
        finishWorkout, 
        updateWorkout,
        getPastWorkouts,
        getWorkoutById,
        }}>
        {children}
    </WorkoutContext.Provider>
    );
    };
