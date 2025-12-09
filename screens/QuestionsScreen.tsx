import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { getChampions } from '../services/riotApi';

type QuestionsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'Questions'
>;

export default function QuestionsScreen() {
  const navigation = useNavigation<QuestionsNavProp>();

  const [loading, setLoading] = useState(true);
  const [champ, setChamp] = useState<any>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  async function loadQuestion() {
    setLoading(true);

    const champions = await getChampions();

    const randomChampion =
      champions[Math.floor(Math.random() * champions.length)];

    const correctRole = randomChampion.tags[0];

    const allRoles = ["Mage", "Fighter", "Tank", "Assassin", "Marksman", "Support"];

    const wrongRoles = allRoles.filter((r) => r !== correctRole);
    const randomWrong = wrongRoles.sort(() => 0.5 - Math.random()).slice(0, 3);

    const finalOptions = [...randomWrong, correctRole].sort(
      () => Math.random() - 0.5
    );

    setChamp(randomChampion);
    setOptions(finalOptions);
    setLoading(false);
  }

  useEffect(() => {
    loadQuestion();
  }, []);

  function handleAnswer(selected: string) {
    if (selected === champ.tags[0]) {
      setScore(score + 1);
    }

    navigation.navigate("Result", { score: score + 1 });
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Qual é o papel do campeão:
      </Text>

      <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
        {champ.name}
      </Text>

      {options.map((op) => (
        <View key={op} style={{ marginVertical: 8 }}>
          <Button title={op} onPress={() => handleAnswer(op)} />
        </View>
      ))}
    </View>
  );
}
