import JokeCard from "@/components/jokeCard";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  safeArea: {
    height: '100%',
    backgroundColor: '#F8F8F8',
    alignItems: 'center'
  },
  scroll: {
    height: '100%',
    width: '100%',
    padding: 10
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: '2.5%'
  }
})

const Index = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <Text style={styles.title}>My Application</Text>

        <Text style={styles.subtitle}>All Jokes</Text>
        <JokeCard />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Index;