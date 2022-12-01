import  React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import tw from "twrnc"


const PasConnexion = () => {



    
    return (
        <View style={[tw`items-center`]}>
            <View style={[tw`bg-slate-600 p-4 h-15 w-80 rounded-lg flex-row`]}>
                <View>
                    <Icon type='materialicons' name='wifi-off' size={29}   color="white" />
                </View>
                <View>
                    <Text style={[{color: "white", fontSize: 18}]}> Veuillez verifier votre connexion</Text>
                </View>
            </View>
        </View>
    )
}



export default PasConnexion;


const styles = StyleSheet.create({

})