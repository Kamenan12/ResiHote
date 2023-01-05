import { View, Text, StyleSheet } from "react-native";

import {Icon} from '@rneui/themed'
import tw from "twrnc"





const Info = (props) => {

    return (
        <>
             <View style={tw`flex-row justify-between`}>
                        <Text style={[{ fontSize: 33, fontWeight: "700", fontFamily: "serif"}]}>{props.Titre} </Text>
             </View>
             <View style={tw`flex-row`}>
                        
                        <View style={tw`flex-row`}>
                            <Icon  name="location" color="black" type="entypo" size={25}/>
                            <Text style= {[{fontSize: 17, fontWeight: "700", fontFamily:"sans-serif", color: "black"}]}> {props.Localite.ville}</Text>
                        </View>
                        <View style={tw`flex-row`}>
                            <Icon  name="location-pin" color="black" type="entypo" size={25}/>       
                            <Text style= {[{fontSize: 17, fontWeight: "700", fontFamily:"sans-serif", color: "black"}]}> {props.Localite.commune}</Text>
                            {/* <Text style={[{color:"gray"}]}> un bon quatier près</Text> */}
                        </View>
                    </View>
             
                    <View style={tw`pt-5`}>
                        <Text style={[{color: "gray", fontWeight: "700", fontSize: 15}]}> {props.Description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus expedita aperiam at praesentium odit magni! Voluptatem voluptas dolore cum maxime dolorum repellendus cumque, atque tempora doloremque, tenetur necessitatibus, soluta quos.</Text>
                    </View>
        </>
    )
}



export default Info;



const styles = StyleSheet.create({


})