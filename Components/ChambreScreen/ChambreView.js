import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import tw from 'twrnc'
import InfoNewResi from "./InfoNewResi";



const ChambreView = () => {
    const [step, setStep] = useState(1)


    const Suivant = () => {
        setStep(step + 1)
    }

    const Precedent = () => {
        setStep(step - 1)
    }

    return (
        <>
            {(() => {
                switch (step) {
                    case 1:
                        return (
                        <View style={[tw`bg-white items-center`]}>
                           <InfoNewResi  suivant={Suivant} />
                        </View> 
                        );
                    case 2: 
                        return (
                            <View style={[tw`bg-white items-center`]}>
                            <Text >  les champ de chambre etape {step}</Text>
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
                            <View style={tw`flex-row justify-evenly w-60`}>
                                
                                <Text style={tw`bg-blue-300`} onPress={()=> Precedent()}> precedent </Text>
                                <Text style={tw`bg-blue-300`} onPress={()=> Suivant()}> Suivant </Text>
                            </View>
                        </View> 
                        )
                
                    default:
                        return (
                            <View>

                            <Text> 0</Text>

                            <View style={tw`flex-row justify-evenly w-60`}>
                                
                                <Text style={tw`bg-blue-300`} onPress={()=> precedent()}> precedent </Text>
                                <Text style={tw`bg-blue-300`} onPress={()=> Suivant()}> Suivant </Text>
                            </View>
                            </View>
                        )
                }
            })() }
        
            {/* <View style={[tw`bg-white items-center`]}>
                
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
                
            </View> */}
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