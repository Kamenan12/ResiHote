import { View, Text, StyleSheet } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

import moment from "moment";


const Calendrier = () => {

    
    return (
        <View>
            <Text style={[{ fontSize: 24, fontWeight: "700", fontFamily: "serif"}]}>Disponibilite </Text>
            <View>
                <CalendarPicker 
                previousTitle="Precedent"
                nextTitle="Suivant"
                weekdays={['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'sam', 'Dim']}
                months={['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Otobre', 'Novembre', 'Decembre']}
                />
            </View>
        </View>
    )
}



export default Calendrier;




const styles = StyleSheet.create({

})