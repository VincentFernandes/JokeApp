import { useLocalSearchParams, usePathname } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  card: {
    width: '95%',
    height: 50,
    alignSelf: 'center',
    marginTop: 5,
    backgroundColor: 'white'
  }
});

const jokeCard = () => {

  return (
    <View style={styles.card}>

    </View>
  );
};

export default jokeCard;
