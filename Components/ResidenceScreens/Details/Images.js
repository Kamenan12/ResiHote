import { View, Image, Text, StyleSheet,  } from "react-native";

import { Icon } from "@rneui/themed";
// import { useNavigation } from "@react-navigation/native";

import tw from "twrnc"




const Images = (props) => {

    const Img = props.img
    console.log("Navigation", props.Goback)
    return (
        <View>
            
            <View style={ tw`bg-white h-full`}>
                <View style={tw` h-100, bg-white shadow-2xl`}>
                    {
                        Img.map((img, index) => (
                            <Image source={{uri: img.url}} style={[tw`h-100`]} key={index}/>
                        ))
                    }
                </View>
                <View style={tw` absolute top-20 p-2`} >   
                    <Icon  name="arrow-left-circle" color="white" type="feather" size={32} onPress={() => props.retour()} />
                </View>
            </View>
        </View>
    )
}



export default Images;

const  styles = StyleSheet.create({

})