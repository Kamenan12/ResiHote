import { View, Text, StyleSheet, TextInput } from "react-native";

import tw from 'twrnc'



const ChambreView = () => {

    return (
        <>
            <View style={[tw`bg-white items-center`]}>
                
                <Text > ici ajouter les champ de chambre</Text>
                <View>
                    <View>
                        <Text style={[tw``, {color: "#7C8593", fontSize: 20}]}> Nom  </Text>
                        <TextInput   style={[styles.Input, {height: 40}]}/>
                    </View>
                    <View>
                        <Text style={[tw`pt-6`, {color: "#7C8593", fontSize: 20}]}> Description  </Text>
                        <TextInput   style={[tw``, styles.Input, {}]} multiline={ true}/>
                    </View>
                    <View>
                        <Text style={[tw`pt-6`, {color: "#7C8593", fontSize: 20}]}> Prix  </Text>
                        <TextInput   style={[tw``, styles.Input, {}]} keyboardType={"number-pad"} />
                    </View>
                </View>
                
            </View>
        </>
    )
}


export default ChambreView;
 


const styles = StyleSheet.create({
    Input: {
        borderBottomWidth: 2,
        borderBottomColor: "#f2f2f2",
        
        
        fontSize: 20,
        fontWeight: "500",
        
        width: 350
    }
})