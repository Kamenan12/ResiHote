import { View, Text, StyleSheet, ScrollView } from "react-native";
import Calendrier from "./Details/Calendrier";
import Equipement from "./Details/Equipement";
import Images from "./Details/Images";
import Info from "./Details/Info";
import Piece from "./Details/Piece";



const DetailsView = (props) => {


    const Detail = props.route.params
    const retour = props.navigation.goBack
    console.log('details,', props.route.params)

    return (
        
        <>
        <ScrollView showsVerticalScrollIndicator={false}>

            <View>
                <Images img={Detail.residences.Images} retour={retour} idDoc={Detail.resiID} idDocUser={Detail.idDocUser}/>
                <Info Titre={Detail.residences.Titre} Localite={Detail.residences.Location} Description={Detail.residences.Description} idDoc={Detail.resiID} idDocUser={Detail.idDocUser}/>
                <Piece Type={Detail.residences.Type_residence} Chambre={Detail.residences.chambre} Salon={Detail.residences.salon} Prix={Detail.residences.Prix}/>
                <Equipement EquiBase={Detail.residences.Equipement_bases} EquiExtra={Detail.residences.Equipement_extra} idDoc={Detail.resiID} idDocUser={Detail.idDocUser}/>
                <Calendrier Calendrier={Detail.residences.Calendrier} idDoc={Detail.resiID} idDocUser={Detail.idDocUser}/> 
            </View>
        </ScrollView>
        </>
        
    )
}







export default DetailsView;



const styles = StyleSheet.create({

})