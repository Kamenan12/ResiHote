
import { StyleSheet, Text, View } from 'react-native';
import Login from "./Components/Login"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogScreen from './Components/LogScreen';
import SignIn from './Components/SignIn';
import Home from './Components/HomeScreen/Home';
import tw from 'twrnc'






const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LogScreen'>
        <Stack.Screen name="LogScreen" component={LogScreen} options={{ headerShown: false, }} />
        <Stack.Screen name="Login" component={Login}  options={{ headerShown: false, }} />
        <Stack.Screen name="SignIn" component={SignIn}  options={{ headerShown: false, }} />
        <Stack.Screen name="Home" component={Home}  options={{ headerBackVisible: false, }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});
