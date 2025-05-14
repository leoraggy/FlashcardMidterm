import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import FlashCards from "./Flashcards";

export default function FlashCardList({ flashcards, isEnabled }) {
  function renderItem({ item, index }) {
    return <FlashCards flashcard={item} isEnabled={isEnabled} />;
  }
  return (
    <FlatList
      data={flashcards}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 100 }} // Add padding to avoid cut-off
    />
  );
}

const styles = StyleSheet.create({});
