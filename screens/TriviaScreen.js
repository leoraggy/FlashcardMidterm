import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useState } from "react";
import FlashCardList from "../components/FlashCardList";
import Config from "react-native-config";

export default function TriviaScreen({ route }) {
  const { flashcards } = route.params;
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={{ flex: 1 }}>
      <Text>Toggle Multiple Choice</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <FlashCardList flashcards={flashcards} isEnabled={isEnabled} />
    </View>
  );
}
