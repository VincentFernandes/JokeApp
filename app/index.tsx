import Header from "@/components/header";
import JokeCard from "@/components/jokeCard";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCategories } from "../services/api";
import Dialog from "react-native-dialog";

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    alignItems: "center",
    backgroundColor: "#0091ff",
  },
  scroll: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  jokesContainer: {
    gap: 10,
    marginBottom: 50
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "191919",
    marginTop: 10,
  },
});

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMsg, setDialogMsg] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await getCategories();
    setCategories(res);
  };

  const onRefresh = async () => {
    setRefresh(true);
    await fetchCategories();
    setRefresh(false)
  }

  const goTop = (index: number) => {
    if(index > 0){
      const temp = [...categories];
      const [current] = temp.splice(index - 1, 1);
      temp.splice(index - 2, 0, current);
      setCategories(temp);
    }
  }

  const handleClose = () => {
    setShowDialog(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0091ff" />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
        <Text style={styles.subtitle}>All Jokes</Text>
        <View style={styles.jokesContainer}>
          {categories.map((d, i) => {
            return <JokeCard key={d} index={i+1} data={d} refresh={refresh} onGoTop={goTop} showDialog={setShowDialog} msg={setDialogMsg} />;
          })}
        </View>
      </ScrollView>

      <Dialog.Container visible={showDialog}>
        <Dialog.Description style={{ color: '#181818' }}>{dialogMsg}</Dialog.Description>
        <Dialog.Button label='Close' onPress={handleClose} />
      </Dialog.Container>
    </SafeAreaView>
  );
};

export default Index;
