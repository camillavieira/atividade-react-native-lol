import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Champion = {
  id: string;
  name: string;
  title: string;
  tags: string[];
};

const API_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/champion.json";

export default function App() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");

  async function load() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const champsArray = Object.values(data.data) as Champion[];

      setChampions(champsArray);
    } catch (err) {
      console.error("Erro carregando campeões:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = query
    ? champions.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )
    : champions;

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.muted}>Carregando campeões...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Buscar campeão..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={load}
        ListEmptyComponent={
          <Text style={styles.muted}>Nenhum campeão encontrado.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${item.id}.png`,
              }}
              style={styles.avatar}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>{item.title}</Text>
              <Text style={styles.role}>{item.tags.join(" / ")}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F7F9" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  muted: { color: "#666", marginTop: 10 },

  input: {
    margin: 16,
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    borderColor: "#DDD",
    borderWidth: StyleSheet.hairlineWidth,
  },

  card: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 10,
    borderColor: "#EEE",
    borderWidth: StyleSheet.hairlineWidth,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },

  cardTitle: { fontWeight: "700", fontSize: 16 },
  cardSubtitle: { color: "#444", fontSize: 14 },
  role: {
    marginTop: 4,
    color: "#777",
    fontSize: 12,
  },
});
