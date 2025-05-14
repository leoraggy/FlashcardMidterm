import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Config from "react-native-config";
const Options = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const navigation = useNavigation();

  const difficulties = ["easy", "medium", "hard"];

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(Config.API_URL, {
        params: {
          amount: 10,
          type: "multiple",
          category: selectedCategory,
          difficulty,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      setLoading(false);
      setButtonDisabled(true);
      setTimeout(() => setButtonDisabled(false), 5000);
    }
  };
  const goToCreateScreen = async () => {
    const cards = await fetchQuestions();
    console.log(cards);
    if (cards) {
      navigation.navigate("TriviaScreen", {
        flashcards: cards,
      });
    } else {
      alert("Failed to load questions. Try again.");
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(Config.API_CATEGORIES);
        setCategories(response.data.trivia_categories);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const getButtonColor = (level) => {
    if (selectedDifficulty !== level) return "#ccc";
    switch (level) {
      case "easy":
        return "#4CAF50";
      case "medium":
        return "#FFC107";
      case "hard":
        return "#F44336";
      default:
        return "#ccc";
    }
  };

  const onSelectDifficulty = (level) => {
    setSelectedDifficulty(level);
    setDifficulty(level);
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: "#007AFF", borderWidth: 2 },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={categories}
        maxHeight={300}
        labelField="name"
        valueField="name"
        placeholder={!isFocus ? "Any Category" : "..."}
        searchPlaceholder="Search..."
        value={selectedCategoryName}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setSelectedCategory(item.id);
          setSelectedCategoryName(item.name);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "#007AFF" : "black"}
            name="Safety"
            size={20}
          />
        )}
      />

      <Text style={styles.label}>Select Difficulty:</Text>

      <View style={styles.buttonGroup}>
        {difficulties.map((level) => (
          <TouchableOpacity
            key={level}
            style={[styles.button, { backgroundColor: getButtonColor(level) }]}
            onPress={() => onSelectDifficulty(level)}
          >
            <Text style={styles.buttonText}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={goToCreateScreen}
        disabled={loading || buttonDisabled}
        style={[
          styles.touchableOpacity,
          { backgroundColor: loading || buttonDisabled ? "#aaa" : "#007AFF" },
        ]}
      >
        <Text style={styles.buttonText}>
          {loading
            ? "Loading..."
            : buttonDisabled
            ? "Please wait 5 seconds"
            : "Generate"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 12,
    margin: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  label: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
  },
  touchableOpacity: {
    padding: 14,
    borderRadius: 10,
  },
});
