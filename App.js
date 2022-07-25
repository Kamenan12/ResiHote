import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc'

export default function App() {
  return (
    <View >
      <View style={[styles.ViewHome, tw`bg-red-200`]}>
        <Text>Bienvenue sur le proejet Resi Hiote!</Text>
        <Text> Le projet de tout les hote des residences!</Text>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  ViewHome: {
    // backgroundColor: "red",

  }
});
