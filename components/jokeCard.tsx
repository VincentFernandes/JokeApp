import { getJokes } from "@/services/api";
import { useLocalSearchParams, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 7,
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  },
  mainContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  number: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#181818",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    fontSize: 17,
    fontWeight: "bold",
  },
  top: {},
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fdcf0b",
  },
  btnTop: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: "#fdcf0b",
    borderRadius: 7,
    borderWidth: 2,
    position: "absolute",
    right: 20,
    color: "fdcf0b",
  },
  btngoTopText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0091FF",
  },
  btngoTop: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: "#0091FF",
    borderRadius: 7,
    borderWidth: 2,
    position: "absolute",
    right: 20,
  },
  childListContainer: {
    borderTopWidth: 1,
    borderColor: "rgba(238, 238, 238, 1)",
    paddingTop: 10,
    paddingBottom: 10,
  },
  childText: {
    fontSize: 17,
    paddingHorizontal: 20,
  },
  icon: {
    height: 20,
    width: 20,
  },
});

type JokeCardProps = {
  index: number;
  data: string;
  refresh: boolean;
  onGoTop: (index: number) => void;
  showDialog: React.Dispatch<React.SetStateAction<boolean>>;
  msg: React.Dispatch<React.SetStateAction<string>>;
};

type Flags = {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
};

type Joke = {
  category: string;
  type: string;
  joke: string;
  flags: Flags;
  id: number;
  safe: boolean;
  lang: string;
};

const JokeCard: React.FC<JokeCardProps> = ({ index, data, refresh, onGoTop, showDialog, msg }) => {
  const [childData, setChildData] = useState<Joke[]>([]);
  const [childOpen, setChildOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    reset();
    firstFetchCategories();
  }, [refresh])

  useEffect(() => {
    if(amount > 0){
      fetchCategories();
    }
  }, [amount]);

  const firstFetchCategories = async () => {
    const res = await getJokes(data);
    if (Array.isArray(res)) {
      setChildData([...childData, ...res]);
    }
  };

  const fetchCategories = async () => {
    const res = await getJokes(data);
    if (Array.isArray(res)) {
      setChildData([...childData, ...res]);
    }
  };

  const handleClickChild = (joke: string) => {
    msg(joke);
    showDialog(true);
  }

  const addMoreJokes = () => {
    setAmount(amount + 1);
  };

  const reset = () => {
    setChildData([]);
    setAmount(0);
    setChildOpen(false);
  }

  return (
    <View style={styles.card}>
      <View style={styles.mainContainer}>
        <Text style={styles.number}>{index}</Text>
        <Text style={styles.title}>{data}</Text>
        {index === 1 ? (
          <View style={styles.btnTop}>
            <Text style={styles.btnText}>Top</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={() => {onGoTop(index)}} style={styles.btngoTop}>
            <Text style={styles.btngoTopText}>Go Top</Text>
          </TouchableOpacity>
        )}
      </View>

      {childOpen && (
        <View>
          {childData.map((d, i) => {
            return (
              <TouchableOpacity onPress={() => {handleClickChild(d.joke)}} key={i} style={styles.childListContainer}>
                <Text style={styles.childText}>{d.joke}</Text>
              </TouchableOpacity>
            );
          })}

          {
            childData.length === 0 && 
            <View style={styles.childListContainer}>
                <Text style={styles.childText}>No Joke</Text>
              </View>
          }

          {amount < 2 && childData.length > 0 && (
            <TouchableOpacity
              onPress={addMoreJokes}
              style={{
                marginVertical: 10,
                borderRadius: 6,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                width: "95%",
                backgroundColor: "#00cc99",
                paddingVertical: 7,
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "white" }}
              >
                Add More Data
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <TouchableOpacity
        onPress={() => {
          setChildOpen(!childOpen);
        }}
        style={{ width: "100%", alignItems: "center", paddingBottom: 10 }}
      >
        <Image
          source={
            childOpen
              ? require("../assets/images/arrowup.png")
              : require("../assets/images/arrowdown.png")
          }
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default JokeCard;
