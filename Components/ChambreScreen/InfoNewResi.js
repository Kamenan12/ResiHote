import {View, Text, StyleSheet, TextInput} from "react-native";
import tw from "twrnc"









const InfoNewResi = (props) => {





    return (
        <View>
             <Text style={[{ fontSize: 50, fontWeight:"600", fontFamily:"serif"}, tw``]}> Localite dans </Text>
                            <View style={[tw`pt-10`]}>
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
                            <View style={tw`flex-row justify-evenly w-60`}>
                                
                                <Text style={tw`bg-blue-300`} onPress={()=> props.suivant()}> Suivant </Text>
                            </View>
        </View>
    )
}




export default InfoNewResi;

const styles = StyleSheet.create({

})