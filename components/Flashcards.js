import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { useState, useMemo, useRef } from "react";
import he from "he";

export default function FlashCards({ flashcard, isEnabled }) {
  const [flip, setFlip] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const flipToFrontStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const flipToBackStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const flipCard = () => {
    if (flip) {
      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 9,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnimation, {
        toValue: 180,
        friction: 9,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setFlip(!flip);
  };

  const options = useMemo(() => {
    const allOptions = [
      ...flashcard.incorrect_answers,
      flashcard.correct_answer,
    ];
    allOptions.sort(() => Math.random() - 0.5);
    return allOptions;
  }, [flashcard]);

  const decodedOptions = options.map((opt) => he.decode(opt));
  const decodedQuestion = he.decode(flashcard.question);
  const decodedAnswer = he.decode(flashcard.correct_answer);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={flipCard}>
        <View style={styles.cardContainer}>
          <Animated.View style={[styles.front, styles.card, flipToFrontStyle]}>
            <Text style={styles.boldText}>{decodedQuestion}</Text>
            {isEnabled && (
              <View>
                {decodedOptions.map((option, index) => (
                  <Text style={styles.text}>{option}</Text>
                ))}
              </View>
            )}
          </Animated.View>
          <Animated.View style={[styles.back, styles.card, flipToBackStyle]}>
            <Text style={styles.text}>{decodedAnswer}</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  cardContainer: {
    width: width - 50,
    height: 200,
  },
  card: {
    borderWidth: 1,
    color: "white",
    width: width - 50,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    position: "absolute",
    backfaceVisibility: "hidden",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    padding: 5,
  },
  boldText: {
    textAlign: "center",
    fontSize: 16,
    padding: 5,
    fontWeight: "bold",
  },
});
