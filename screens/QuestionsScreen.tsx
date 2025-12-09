import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function QuestionsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Aqui vai a pergunta e os botões de resposta 🙂
      </Text>

      <Button 
        title="Responder e ir para o resultado"
        onPress={() => navigation.navigate('Result')}
      />
    </View>
  );
}
