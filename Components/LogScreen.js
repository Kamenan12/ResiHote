import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from 'expo-linear-gradient';
import GlobalStyle from "./Styles/GlobalStyle";

import tw from "twrnc";




const LogScreen = () => {

        const navigation = useNavigation();

    const Login = () => {
       
        navigation.navigate('Login')
    }


    return (
        <View style={[ tw`flex h-full`]}>
            <LinearGradient 
            colors={['#FF2A2A','#FF6D21']}
           style={styles.backGround}
            >
                <View style={[tw`items-center`]}>

                    <View style={[tw`mt-70 `, ]}>
                        <Text style={[tw``, {fontSize: 80, color: "white", fontWeight: "600"}]}>Resi +</Text>
                        <View style={[{marginTop: -15,}]}>
                            <Text style={[tw``, { fontSize:19 ,color: "white"}]}> Reservation plus </Text>
                        </View>
                    </View>
                    <View style={[tw`mt-5`]}>
                       <TouchableOpacity style={[tw`border-2 border-white p-4 rounded-full w-60 items-center`]} 
                       onPress={() => {Login()}}> 
                            <Text style={[tw``, {fontSize: 18, color: "white", fontWeight: "600"}]}>Connexion</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={[tw`border-2 border-white p-4 rounded-full w-60 items-center mt-4`]}> 
                            <Text style={[tw``, {fontSize: 18, color: "white", fontWeight: "600"}]}>Inscription</Text>
                       </TouchableOpacity>
                    </View>
                    </View>
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
    },

});