import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { signOut, getAuth } from "firebase/auth";
import GlobalStyle from "../Styles/GlobalStyle";
import tw from "twrnc"




const Home =() => {
    const auth = getAuth();
    const Curentuser = auth.currentUser;
    const navigation = useNavigation();

    const Decon = () => {
        signOut(auth)
        .then(() => {
            console.log('User deconnecté');
            navigation.navigate("Login")
        }); 
    }
    
    return (
        <SafeAreaView style={GlobalStyle.SafeAreaViewAndroid}>
            <View>
                <Text>Bienvenue cher Reservation plus </Text>

                <Text style={[]}> {Curentuser.email}</Text>
           <TouchableOpacity
           onPress={() => Decon()}
           >

            <Text style={[tw`bg-red-500 p-2`]}> Deconnexion </Text>
           </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


export default Home;

const Styles = StyleSheet.create({

})