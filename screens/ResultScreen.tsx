import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ResultScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Parabéns! Você concluiu o Quiz 🎉
      </Text>

      <Button 
        title="Voltar ao início"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
