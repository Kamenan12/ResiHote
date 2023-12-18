import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon, Button } from "@rneui/themed";
import tw from "twrnc"


const Equipement = (props) => {

    const Navigation = useNavigation(); 


    const ModifEquip = (idDoc, IdDocUser) => {
        Navigation.navigate('ModifEquipement', {
            idDoc: idDoc,
            idDocUser: IdDocUser
        });
    }

    return (
        <>
                <View style={tw`pt-5`}>
                    <Text style={[{ fontSize: 24, fontWeight: "700", fontFamily: "serif"}]}>Equipement </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={tw` flex-row`}>
                                {props.EquiBase.map((equip, index) => (
                                    <View key={index} style={tw`p-2`}>
                                        <Equip equip={equip} />
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={tw` flex-row`}>
                                {props.EquiExtra.map((equip, index) => (
                                    <View key={index} style={tw`p-2`}>
                                        <Equip equip={equip} />
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                        <View style={tw`items-end pt-5 px-5 absolute left-75`}>
                        <Button onPress={() => ModifEquip(props.idDoc, props.idDocUser)}
                            buttonStyle={tw`bg-transparent border rounded-xl`}
                            titleStyle={{
                                color: "red"
                            }}
                            icon={{
                                name: "edit",
                                type: "feather",
                                size: 15,
                                color: "red"
                                
                            }}
                            
                            // iconRight
                        /> 
                        </View>
                </View>

                
        </>
    )
}




const Equip = (props) => {
    return (
        <>
        
         <View style={tw`items-center`}>
            <View style={tw`bg-gray-300 h-11 w-11 shadow-xl items-center flex-row p-2 rounded-xl`}>
                { props.equip === "Wifi" ? 
                    <Icon  name="wifi" color="black" type="materiallcons" size={27}/> : <Text></Text>
                }
                {props.equip === "Climatiseur" ?
                    <Icon  name="air-filter" color="black" type="material-community" size={27}/> : <Text></Text>
                }
                {props.equip === "Refrigerateur" ?
                    <Icon  name="fridge-alert-outline" color="black" type="material-community" size={27}/> : <Text></Text>
                }
                {props.equip === "piscine" ?
                    <Icon  name="pool" color="black" type="materiallcons" size={27}/> : <Text></Text>
                }
                {props.equip === "Televison" ?
                    <Icon  name="tv-outline" color="black" type="ionicon" size={27}/> : <Text></Text>
                }
                {props.equip === "garage" ?
                    <Icon  name="garage" color="black" type="material-community" size={27}/> : <Text></Text>
                }
                {props.equip === "Jaridin" ?
                    <Icon  name="trees" color="black" type="foundation" size={27}/> : <Text></Text>
                }
            </View>
            <View style={tw`pt-3`}>
                 <Text>{props.equip}</Text>
            </View>
           
         </View>
        </>
    )
}

export default Equipement;


const styles = StyleSheet.create({

})