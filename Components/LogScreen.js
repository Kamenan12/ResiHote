import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import tw from "twrnc";




const LogScreen = () => {


    return (
        <View style={[ tw` h-full`, styles.logBack]}>
            <LinearGradient 
            colors={['#FF2A2A','#EF5D10','#FF6D21']}
           style={styles.backGround}
            >
            <Text>la page d"accueil</Text> 
            </LinearGradient>
        </View>
    )
}



export default LogScreen;

const styles = StyleSheet.create({
    logBack: {
        backgroundColor: "red",
    },
    backGround: {
        left: 0,
        right: 0,
        top: 0,
        height: 800,
    }

});