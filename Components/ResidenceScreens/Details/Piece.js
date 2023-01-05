import { View, Text, StyleSheet } from "react-native";

import { Icon } from "@rneui/themed";

import tw from "twrnc"




const Piece = (props) => {
    return (
        <>
        <View style={tw`flex-row pt-5 justify-between`}>
               {/* <View style={tw`items-center`}>
                   <Text style= {[{fontSize: 20, fontWeight: "700", fontFamily:"sans-serif", color: "gray"}]}>Prix </Text>
                   <Text style= {[{fontSize: 20, fontWeight: "700", fontFamily:"sans-serif", color: "black"}]}>{ResiDetail.prix} Fr</Text>
               </View> */}
               <View style={tw` items-center`}>
                   <Text style= {[{fontSize: 17, fontWeight: "700", fontFamily:"sans-serif", color: "black"}]}>Type</Text>
                   <Text style= {[{fontSize: 17, fontWeight: "700", fontFamily:"sans-serif", color: "gray"}]}>{props.Type}</Text>
               </View>
               <View style={tw`pl-3 items-center`}>
                   <Text style= {[{fontSize: 17, fontWeight: "700", fontFamily:"sans-serif", color: "black"}]}>Chambres</Text>
                   <Text style= {[{fontSize: 17, fontWeight: "700", fontFamily:"sans-serif", color: "gray"}]}>{props.Chambre}</Text>
               </View>
               <View style={tw`pl-3 items-center`}>
                   <Text style= {[{fontSize: 17, fontWeight: "700", fontFamily:"sans-serif", color: "black"}]}>Salons</Text>
                   <Text style= {[{fontSize: 17, fontWeight: "700", fontFamily:"sans-serif", color: "gray"}]}>{props.Salon}</Text>
               </View>
               <View style={tw`pl-3 items-center`}>
                   <Text style= {[{fontSize: 17, fontWeight: "700", fontFamily:"sans-serif", color: "black"}]}>Prix/24h</Text>
                   <Text style= {[{fontSize: 17, fontWeight: "700", fontFamily:"sans-serif", color: "gray"}]}>{props.Prix}fcfa</Text>
               </View>

           </View>
</>
    )
}



export default Piece; 


const styles = StyleSheet.create({


})