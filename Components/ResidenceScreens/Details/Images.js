import { useState } from "react";
import { View, Image, Text, StyleSheet, ScrollView,  } from "react-native";

import { Button, Icon } from "@rneui/themed";
import { ImagePicker } from "expo-image-multiple-picker";
// import { useNavigation } from "@react-navigation/native";

import tw from "twrnc"




const Images = (props) => {

    const [modif, SetModif] = useState(false)

    const Img = props.img
    console.log("Navigation", props.Goback)
    return (
        modif === false ? (

        <View>
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
            <Button title="modifier" onPress={() => SetModif(!modif)} />
        </View>
        ) : <ModifImg modif={SetModif}/>
    )
}





    const ModifImg = (props) => {

        return (
            <>

                <ImagePicker
                onSave={(assets) => {console.log(assets)
                    // props.onChange(assets)
                    // props.open(false)
                }
                }
                onCancel={() => {console.log('no permissions or user go back')
                props.modif(false)
                    }
                }
                multiple

                />
            </>


        )
    }

export default Images;

const  styles = StyleSheet.create({

})