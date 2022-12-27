import { View, Text, StyleSheet } from "react-native";
import Images from "./Details/Images";



const DetailsView = (props) => {


    const Detail = props.route.params
    const retour = props.navigation.goBack
    console.log('details,', props.route.params)

    return (
        <View>
            <Images img={Detail.residences.Images} retour={retour}/>
        </View>
    )
}







export default DetailsView;



const styles = StyleSheet.create({

})