import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveFlashcards = async (flashcards) => {
  try {
    await AsyncStorage.setItem("@flashcards", JSON.stringify(flashcards));
  } catch (error) {
    console.error("Error saving flashcards: ", error);
  }
};

export const loadFlashcards = async () => {
  try {
    const flashcards = await AsyncStorage.getItem("@flashcards");
    return flashcards != null ? JSON.parse(flashcards) : [];
  } catch (error) {
    console.error("Error loading flashcards: ", error);
    return [];
  }
};
