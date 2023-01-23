import { View, Text, StyleSheet, TouchableOpacity} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Icon, Divider } from "@rneui/themed";
import tw from "twrnc"



const MenuParametre = () => {
    const Navigation = useNavigation();

    return (
        <>
        <View style={tw`pt-10 bg-gray-100 h-full`}>
            <View style={tw`py-2 px-3 bg-white justify-between flex-row items-center`}>
               <Icon type="antdesign" name="arrowleft" color="black" />
               <Text style={{ fontSize: 25, fontWeight: "500"}}> Paramètre</Text>
               <Text></Text>
               {/* <Icon type="font-awesome-5" name="user-circle" color="black" /> */}
            </View>
            <View style={tw`mt-2 bg-white px-4`}>
               <Text style={{ fontSize: 20, fontWeight: "500", }}> Gestion de compte</Text>
                <TouchableOpacity>
                    <View style={tw`flex-row py-3 px-4`}>
                            <Icon type="font-awesome-5" name="user-circle" color="blue" size={21}/>
                            <Text style={{ fontSize: 15, fontWeight: "500"}}> Informations personnelles</Text>
                    </View>
                </TouchableOpacity>

               <Divider />
            <TouchableOpacity>
               <View style={tw`flex-row py-3 px-4`}>
                    <Icon type="simple-line-icon" name="lock" color="blue" size={21}/>
                    <Text style={{ fontSize: 15, fontWeight: "500"}}> Modifier mot de passe</Text>
               </View>
            </TouchableOpacity>
               <Divider />
               <TouchableOpacity>
               <View style={tw`flex-row py-3 px-4`}>
                    <Icon type="material-community" name="logout" color="red" size={21}/>
                    <Text style={{ fontSize: 15, fontWeight: "500"}}> Déconnexion</Text>
               </View>
               </TouchableOpacity>
               <Divider />
                 
            </View>
        </View>
        </>
    )
}



export default MenuParametre; 


const styles = StyleSheet.create({

})