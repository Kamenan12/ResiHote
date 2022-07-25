
import { StyleSheet, Text, View } from 'react-native';
import Login from "./Components/Login"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogScreen from './Components/LogScreen';
import tw from 'twrnc'






const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogScreen" component={LogScreen} options={{ headerShown: false, }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});
