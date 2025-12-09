// screens/QuestionsScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation";
import { getChampions, RawChampion } from "../services/riotApi";

type QuestionsNavProp = NativeStackNavigationProp<RootStackParamList, "Questions">;

export default function QuestionsScreen() {
  const navigation = useNavigation<QuestionsNavProp>();

  const [loading, setLoading] = useState(true);
  const [champ, setChamp] = useState<RawChampion | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  async function loadQuestion() {
    setLoading(true);
    try {
      const champions = await getChampions();
      if (!Array.isArray(champions) || champions.length === 0) {
        throw new Error("Lista de campeões vazia");
      }

      const randomChampion = champions[Math.floor(Math.random() * champions.length)];
      const correctRole = Array.isArray(randomChampion.tags) && randomChampion.tags.length > 0
        ? randomChampion.tags[0]
        : "Unknown";

      const allRoles = ["Mage", "Fighter", "Tank", "Assassin", "Marksman", "Support"];
      const wrongRoles = allRoles.filter((r) => r !== correctRole);
      const randomWrong = wrongRoles.sort(() => 0.5 - Math.random()).slice(0, 3);
      const finalOptions = [...randomWrong, correctRole].sort(() => Math.random() - 0.5);

      setChamp(randomChampion);
      setOptions(finalOptions);
    } catch (err: any) {
      console.error("Erro ao carregar questão:", err);
      Alert.alert("Erro", err?.message ?? "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuestion();
  }, []);

  function handleAnswer(selected: string) {
    const isCorrect = selected === (champ?.tags?.[0] ?? "");
    const newScore = score + (isCorrect ? 1 : 0);
    // navega para tela de resultado com score (ou atualize lógica conforme desejar)
    navigation.navigate("Result", { score: newScore });
  }

  if (loading || !champ) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Carregando pergunta...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionLabel}>Qual é o papel do campeão:</Text>
      <Text style={styles.champName}>{champ.name}</Text>

      {options.map((op) => (
        <View key={op} style={{ marginVertical: 8 }}>
          <Button title={op} onPress={() => handleAnswer(op)} />
        </View>
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title="Próxima pergunta" onPress={() => loadQuestion()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, padding: 20, justifyContent: "center" },
  questionLabel: { fontSize: 18, marginBottom: 8 },
  champName: { fontSize: 28, fontWeight: "700", marginBottom: 18 },
});
