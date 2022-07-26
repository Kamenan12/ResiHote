import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from "@rneui/themed";

import tw from "twrnc"




const SignIn = () => {
    return (
        <ScrollView>

            <View style={[tw` h-full `]}>
                <LinearGradient 
                    colors={['#FF2A2A','#FF6D21']}
                    style={styles.backGround}
                    >
                        <View style={[tw`p-6 items-center`]}>
                            <View>
                                <Text style={[tw``, { fontSize: 65, color: "white", fontWeight: "700"}]}>Bienvenue</Text>
                            </View>
                            <View>
                                <Text style={[tw``, { color: "white", fontSize: 20, fontWeight: "400"}]}>Etes vous deja un compte ?  </Text>
                                <Text style={[tw``, { color: "white", fontSize: 20, fontWeight: "400"}]}>Connectez maintenant</Text>
                            </View>
                            <View style={[tw` `, ]}>
                                <TouchableOpacity style={[tw` p-4 rounded-full w-80 items-center mt-4 shadow-md shadow-black `, { backgroundColor: "#FF5D2A",}]}
                                > 
                                    <Text style={[tw``, {fontSize: 22, color: "white", fontWeight: "600"}]}>Connexion </Text>
                                </TouchableOpacity>

                                <View style={[tw` mt-10`, {}]}>
                                    {/* Debut de champ nom  */}
                            <View>
                                <Text style={[tw``, { color: "white", fontSize: 22, fontWeight: "500"}]}>Votre Adresse E-mail</Text>
                                <View style={[tw``]}>
                                    <TextInput placeholder="Entrez votre E-mail" 
                                    placeholderTextColor="white"
                                    
                                    style={[styles.Input]}
                                    ri
                                    />
                                    <View style={[tw`absolute right-5 top-5`]}>

                                        <Icon name="mail-unread-outline" type="ionicon" color="white" size={28} />
                                    </View>
                                </View>
                            </View>
                            <View style={[tw`mt-5`]}>
                                <Text style={[tw``, { color: "white", fontSize: 22, fontWeight: "500"}]}>Votre mot de passe</Text>
                                <View style={[tw``]}>
                                    <TextInput placeholder="Entrez votre mot de passe" 
                                    placeholderTextColor="white"
                                    
                                    style={[styles.Input]}
                                    ri
                                    />
                                    <View style={[tw`absolute right-5 top-5`]}>

                                        <Icon name="md-key-outline" type="ionicon" color="white" size={28} />
                                    </View>
                                </View>
                            </View>

                            <View style={[tw`mt-6 items-center`]}>
                            <TouchableOpacity style={[tw`border-2 border-white p-4 rounded-full w-60 items-center`]} 
                                ess={() => {Login()}}> 
                                 <Text style={[tw``, {fontSize: 22, color: "white", fontWeight: "600"}]}>Connexion</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                            </View>
                        </View>

                        
                    </LinearGradient>
            </View>
        </ScrollView>
    )
}


export default SignIn;

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
        color: "white"

    }
});