// Utility.tsx

//TODO Add excercise list to this file

const exerciseCategories = {
    1: { defaultSets: 5, defaultReps: 5 },   // Category for compound exercises like deadlifts
    2: { defaultSets: 3, defaultReps: 10 },  // Category for isolation exercises like bicep curls
    // ... other categories
};
   //Categories (1: Bodyweight/calves, 2:Compound, 3:isolation )
     //TODO: User preference, Auto rank by frequency if no preference, add alternative names for search, 
  //TODO: Excercise based set/rep/minute etc decision
   //todo Add basic list and include alternative variant screen
export const exercises = [
    { id: 1,  category: 1, name: "Push-up", icon: "💪" },
    { id: 2,  category: 1, name: "Squat", icon: "🏋️" },
    { id: 3,  category: 1, name: "Sit-up", icon: "🧘‍♂️" },
    { id: 4,  category: 1, name: "Dip", icon: "🏋️‍♂️" },
    { id: 5,  category: 1, name: "Pull-up", icon: "🧗" },
    { id: 6,  category: 1, name: "Chin-up", icon: "🧗" },

    { id: 7,  category: 2, name: "Bench Press", icon: "🏋️‍♂️" },
    { id: 8,  category: 2, name: "Incline Bench Press", icon: "🏋️‍♂️" },
    { id: 9,  category: 2, name: "Close Grip Bench Press", icon: "🏋️‍♂️" },
    { id: 10, category: 2, name: "Deadlift", icon: "🏋️‍♀️" },
    { id: 11, category: 2, name: "Overhead Press", icon: "🏋️" },
    { id: 12, category: 2, name: "Barbell Back Squat", icon: "🏋️‍♀️" },
    { id: 13, category: 2, name: "Barbell Front Squat", icon: "🏋️‍♀️" },
    { id: 14, category: 2, name: "Military Press", icon: "🪖" },
    { id: 15, category: 2, name: "Sumo Deadlift", icon: "🏋️‍♀️" },
    { id: 16, category: 2, name: "Romanian Deadlift", icon: "🏋️‍♀️" },

    { id: 17, category: 3, name: "Dumbbell Curl", icon: "💪" },
    { id: 18, category: 3, name: "Incline Dumbbell Curl", icon: "💪" },
    { id: 19, category: 3, name: "Decline Dumbbell Curl", icon: "💪" },
    { id: 20, category: 3, name: "Barbell Curl", icon: "💪" },
    { id: 21, category: 3, name: "Preacher Curl", icon: "💪" },
    { id: 22, category: 3, name: "EZ Bar Curl", icon: "💪" },
    { id: 23, category: 3, name: "Bent-over Row", icon: "🚣" },
    { id: 24, category: 3, name: "Skull Crusher", icon: "💀" },
    { id: 25, category: 3, name: "Tricep Extensions", icon: "💪" },
    { id: 26, category: 3, name: "Tricep Kickbacks", icon: "💪" },
    { id: 27, category: 3, name: "Dumbbell Bench Press", icon: "🏋️‍♂️" },

    { id: 28, category: 1, name: "Jump Squat", icon: "🤾‍♂️" },
    { id: 29, category: 1, name: "Box Jump", icon: "📦" },
    { id: 30, category: 1, name: "Calf Raises", icon: "🦵" },
    { id: 31, category: 1, name: "Lunges", icon: "🏋️‍♂️" },
    { id: 32, category: 1, name: "Diamond Push-ups", icon: "💎" },
    { id: 33, category: 1, name: "Muscle Up", icon: "💪" },
    { id: 34, category: 1, name: "Handstand Pushup", icon: "🤸‍♂️" },
// ... Other exercises with their variations
];
  


  
export  const getDefaultSets = (category) => {
    return exerciseCategories[category].defaultSets;};
  
export  const getDefaultReps = (category) => {
    return exerciseCategories[category].defaultReps;
};
  