import { View, Text, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import tw from 'twrnc';




const ResidenceView = () => {

    const Navigation = useNavigation();







    const AjoutChambre = () => {
        Navigation.navigate('Chambres')
    }

    return (
        <View style={tw`pt-15`}> 
            <View>
                <Text style={[{ fontSize: 25, fontWeight: "600"}]}> Mes residences </Text>
            </View>
            <Text> ov av ajouert les bouton pour ajout de residences  </Text>
            <Button 
            title='Ajout de residences'
            color='secondary'
            onPress={() => AjoutChambre()}
                />
        </View>
    )   
}


export default ResidenceView; 



const styles = StyleSheet.create({

})