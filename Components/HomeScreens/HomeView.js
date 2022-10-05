import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { signOut, getAuth } from "firebase/auth";
import GlobalStyle from "../Styles/GlobalStyle";
import tw from "twrnc"
import BarEntete from "./BarEntete";
import StatGen from "./StatGen";




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
        <>
        <View style={[tw`bg-white`]}>
                     <BarEntete />
                     <StatGen />
                    <Text>Bienvenue cher Reservation plus </Text> 
                    {/* <Text style={[tw`bg-red-500 w-30`]} onPress={()=> Decon()}> Deconnnection</Text>    */}
        </View>
               
        </>

         
    )
}


export default Home;

const Styles = StyleSheet.create({

})