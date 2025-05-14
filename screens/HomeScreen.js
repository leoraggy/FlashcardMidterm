import {
  StyleSheet,
  Text,
  View,
  Switch,
  Pressable,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import FlashCardList from "../components/FlashCardList";
import { loadFlashcards } from "../storage";
import { useNavigation } from "@react-navigation/native";
export default function HomeScreen() {
  const [flashcards, setFlashcards] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const navigation = useNavigation();
  const goToCreateScreen = () => {
    navigation.navigate("Create", {
      fetchFlashcards: fetchFlashcards,
      parentFlashcards: flashcards,
    });
  };

  async function fetchFlashcards() {
    const storedFlashcards = await loadFlashcards();
    setFlashcards(storedFlashcards);
    console.log(flashcards);
  }

  useEffect(() => {
    fetchFlashcards();
  }, []);

  return (
    <ScrollView>
      {flashcards.length == 0 ? (
        <View>
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            No flashcards found.
          </Text>
          <Pressable onPress={goToCreateScreen} style={styles.touchableOpacity}>
            <Text style={styles.buttonText}>Add flashcard</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView>
          <Pressable onPress={goToCreateScreen} style={styles.touchableOpacity}>
            <Text style={styles.buttonText}>Add flashcard</Text>
          </Pressable>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <FlashCardList flashcards={flashcards} isEnabled={isEnabled} />
        </ScrollView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
  },
});
