import { useLocalSearchParams, usePathname } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    alignSelf: "center",
    backgroundColor: "#0091ff",
    paddingLeft: '2.5%',
    justifyContent: 'center'

  },
  title: {
    fontSize: 24,
    color: 'white'
  }
});

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Application</Text>
    </View>
  );
};

export default Header;
