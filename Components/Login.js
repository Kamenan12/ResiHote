import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import GlobalStyle from "./Styles/GlobalStyle";
import { LinearGradient } from 'expo-linear-gradient';
import tw from "twrnc"



const Login = () => {
    
    return (
            <View style={[tw`h-full`]}>
                <LinearGradient 
                 colors={['#FF2A2A','#FF6D21']}
                 style={styles.backGround}
                 >
                    <View style={[tw`p-5 mt-10`]}>
                        <View>
                            <Text style={[tw``, { fontSize: 65, color: "white", fontWeight: "700"}]}>Bienvenue</Text>
                        </View>
                        <View>
                            <Text style={[tw``, { color: "white", fontSize: 20, fontWeight: "400"}]}>Etes vous nouveau ?  </Text>
                            <Text style={[tw``, { color: "white", fontSize: 20, fontWeight: "400"}]}>Inscrivez vous maintenant</Text>
                        </View>
                        <View style={[tw` items-center mt-5`, ]}>
                            <TouchableOpacity style={[tw` p-4 rounded-full w-80 items-center mt-4 shadow-md shadow-black `, { backgroundColor: "#FF5D2A",}]}> 
                                <Text style={[tw``, {fontSize: 22, color: "white", fontWeight: "600"}]}>Inscrivez-vous </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[tw` mt-10`, {}]}>
                            <View>
                                <Text style={[tw``, { color: "white", fontSize: 20}]}>Votre Adresse E-mail</Text>
                                <View style={[tw``]}>
                                    <TextInput placeholder="Entrez votre E-mail" 
                                    placeholderTextColor="white"
                                    style={styles.Input}
                                    ri
                                    />
                                    <View style={[tw`absolute right-5 top-5`]}>

                                        <Text>Icone</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
    )
}


export default Login;


const styles = StyleSheet.create({
    backGround: {
        left: 0,
        right: 0,
        top: 0,
        height: 800,
    },
    Input: {
        borderBottomWidth: 2,
        borderBottomColor: "white",
        height: 55,


    }
});