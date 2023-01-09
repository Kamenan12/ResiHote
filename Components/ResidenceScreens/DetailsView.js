import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { ImagePicker } from "expo-image-multiple-picker";

import Calendrier from "./Details/Calendrier";
import Equipement from "./Details/Equipement";
// import Images from "./Details/Images";
import Info from "./Details/Info";
import Piece from "./Details/Piece";

import { Icon } from "@rneui/themed";
import tw from 'twrnc'
import { Button } from "@rneui/base";


const DetailsView = (props) => {

        const [modiImg, SetModifImg] = useState(false)

    const Detail = props.route.params
    const retour = props.navigation.goBack
    console.log('details,', props.route.params)

    return (
        modiImg === false ? (

        <>
        <ScrollView showsVerticalScrollIndicator={false}>

            <View>
                <View>

                    <ScrollView  horizontal style={tw` h-100, bg-white shadow-2xl`}>
                        <View style={ tw`bg-white h-full`}>
                            <View style={ tw`flex-row`}>
                                {
                                    Detail.residences.Images.map((img, index) => (
                                        <Image source={{uri: img.url}} style={[tw`h-100 w-93`]} key={index}/>
                                    ))
                                }
                            </View>
                        </View>
                    </ScrollView>
                    <View style={tw` absolute top-10 p-2`} >   
                     <Icon  name="arrow-left-circle" color="white" type="feather" size={32} onPress={() => retour()} />
                    </View>
                    <Button title="modifier" onPress={() => SetModifImg(true)}/>
                </View>
                {/* <Images img={Detail.residences.Images} retour={retour}/> */}
                <Info Titre={Detail.residences.Titre} Localite={Detail.residences.Location} Description={Detail.residences.Description} />
                <Piece Type={Detail.residences.Type_residence} Chambre={Detail.residences.chambre} Salon={Detail.residences.salon} Prix={Detail.residences.Prix}/>
                <Equipement EquiBase={Detail.residences.Equipement_bases} EquiExtra={Detail.residences.Equipement_extra}/>
                <Calendrier Calendrier={Detail.residences.Calendrier}/>
            </View>
        </ScrollView>
        </>
        ) : <ModifImage openModifImg={SetModifImg}/>
        
    )
}






const ModifImage = (props) => {

    return (
        <>

            <ImagePicker
            onSave={(assets) => {console.log(assets)
                // props.onChange(assets)
                // props.open(false)
            }
            }
            onCancel={() => {console.log('no permissions or user go back')
            props.openModifImg(false)
                }
            }
            multiple

            />
        </>


    )
}



export default DetailsView;



const styles = StyleSheet.create({

})