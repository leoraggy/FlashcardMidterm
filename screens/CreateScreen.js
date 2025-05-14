import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { saveFlashcards } from "../storage";

export default function CreateScreen({ route }) {
  const { fetchFlashcards, parentFlashcards } = route.params;
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [incorrectAnswer1, setIncorrectAnswer1] = useState("");
  const [incorrectAnswer2, setIncorrectAnswer2] = useState("");
  const [incorrectAnswer3, setIncorrectAnswer3] = useState("");
  const [error, setError] = useState(false);
  const [flashcards, setFlashcards] = useState(parentFlashcards);

  const validateForm = () => {
    if (!question || !answer) {
      setError(true);
      return false;
    }
    setQuestion("");
    setAnswer("");
    setIncorrectAnswer1("");
    setIncorrectAnswer2("");
    setIncorrectAnswer3("");
    setError(false);
    return true;
  };

  const addFlashcard = async (newFlashcard) => {
    const updatedFlashcards = [...flashcards, newFlashcard];
    await saveFlashcards(updatedFlashcards);
    fetchFlashcards();
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const fc = {
        question: question,
        correct_answer: answer,
        incorrect_answers: [
          incorrectAnswer1,
          incorrectAnswer2,
          incorrectAnswer3,
        ],
      };
      addFlashcard(fc);
    }
  };

  const deleteAllFlashcards = async () => {
    setFlashcards([]);
    await saveFlashcards([]);
    fetchFlashcards();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create a New Flashcard</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Question *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter question"
            value={question}
            onChangeText={setQuestion}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Correct Answer *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter correct answer"
            value={answer}
            onChangeText={setAnswer}
          />
        </View>

        <Text style={styles.label}>Incorrect Answers</Text>
        <TextInput
          style={styles.input}
          placeholder="Incorrect answer 1"
          value={incorrectAnswer1}
          onChangeText={setIncorrectAnswer1}
        />
        <TextInput
          style={styles.input}
          placeholder="Incorrect answer 2"
          value={incorrectAnswer2}
          onChangeText={setIncorrectAnswer2}
        />
        <TextInput
          style={styles.input}
          placeholder="Incorrect answer 3"
          value={incorrectAnswer3}
          onChangeText={setIncorrectAnswer3}
        />

        {error && (
          <Text style={styles.errorText}>Please fill in required fields.</Text>
        )}

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Flashcard</Text>
        </Pressable>

        <Pressable style={styles.deleteButton} onPress={deleteAllFlashcards}>
          <Text style={styles.buttonText}>Delete All</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#e53935",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
});
