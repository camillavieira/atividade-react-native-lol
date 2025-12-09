import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import QuestionsScreen from './screens/QuestionsScreen';
import ResultScreen from './screens/ResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{ title: 'Início' }}
        />

        <Stack.Screen 
          name="Questions"
          component={QuestionsScreen}
          options={{ title: 'Perguntas' }}
        />

        <Stack.Screen 
          name="Result"
          component={ResultScreen}
          options={{ title: 'Resultado' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
