import { View, Text, StyleSheet } from "react-native";

import tw from "twrnc";




const LogScreen = () => {


    return (
        <View style={[ tw` h-full`, styles.logBack]}>
            <Text>la page d"accueil</Text> 
        </View>
    )
}



export default LogScreen;

const styles = StyleSheet.create({
    logBack: {
        backgroundColor: "#FF2A2A",
    }

});