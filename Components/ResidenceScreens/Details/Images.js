import { useState } from "react";
import { View, Image, Text, StyleSheet, ScrollView,  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/themed";
import { ImagePicker } from "expo-image-multiple-picker";
// import { useNavigation } from "@react-navigation/native";

import tw from "twrnc"




const Images = (props) => {

    // const [modif, SetModif] = useState(false)
    const Navigation = useNavigation()

    const ModifImg = (idDoc, IdDocUser) => {
        Navigation.navigate('ModifImage',{
            idDoc: idDoc,
            idDocUser: IdDocUser
        } )
    }
    const Img = props.img
    // console.log("Navigation", )
    return (
    

        <View style={tw`pb-5`}>
            <ScrollView  horizontal style={tw` h-100, bg-white shadow-2xl`}>
                <View style={ tw`bg-white h-full`}>
                    <View style={ tw`flex-row`}>
                        {
                            Img.map((img, index) => (
                                <Image source={{uri: img.url}} style={[tw`h-100 w-93`]} key={index}/>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
            <View style={tw` absolute top-10 p-2`} >   
                <Icon  name="arrow-left-circle" color="white" type="feather" size={32} onPress={() => props.retour()} />
                
            </View>
            {/* <View style={ tw`bg-white h-full`}>
                <View style={tw` h-100, bg-white shadow-2xl`}>
                    
                </View>
                <View style={tw` absolute top-20 p-2`} >   
                    <Icon  name="arrow-left-circle" color="white" type="feather" size={32} onPress={() => props.retour()} />
                </View>
            </View> */}
            <View style={tw`items-end pt-5 px-5 absolute left-75`}>
                
                <Button onPress={() => ModifImg(props.idDoc, props.idDocUser)} 
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
         
    )
}





    
export default Images;

const  styles = StyleSheet.create({

})