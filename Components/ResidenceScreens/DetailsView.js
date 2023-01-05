import { View, Text, StyleSheet } from "react-native";
import Images from "./Details/Images";
import Info from "./Details/Info";



const DetailsView = (props) => {


    const Detail = props.route.params
    const retour = props.navigation.goBack
    console.log('details,', props.route.params)

    return (
        <View>
            <Images img={Detail.residences.Images} retour={retour}/>
            <Info Titre={Detail.residences.Titre} Localite={Detail.residences.Location} Description={Detail.residences.Description} />
        </View>
    )
}







export default DetailsView;



const styles = StyleSheet.create({

})