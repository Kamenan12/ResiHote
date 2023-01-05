import { View, Text, StyleSheet } from "react-native";
import Images from "./Details/Images";
import Info from "./Details/Info";
import Piece from "./Details/Piece";



const DetailsView = (props) => {


    const Detail = props.route.params
    const retour = props.navigation.goBack
    console.log('details,', props.route.params)

    return (
        <View>
            <Images img={Detail.residences.Images} retour={retour}/>
            <Info Titre={Detail.residences.Titre} Localite={Detail.residences.Location} Description={Detail.residences.Description} />
            <Piece Type={Detail.residences.Type_residence} Chambre={Detail.residences.chambre} Salon={Detail.residences.salon} Prix={Detail.residences.Prix}/>
        </View>
    )
}







export default DetailsView;



const styles = StyleSheet.create({

})