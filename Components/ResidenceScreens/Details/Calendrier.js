import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CalendarPicker from "react-native-calendar-picker";
import { Icon, Button } from "@rneui/themed";
import tw from "twrnc"
import moment from "moment";


const Calendrier = (props) => {

    const Navigation = useNavigation();



    const jourIndispo = []

    props.Calendrier.map((tab) => (
        tab.Tab.map((d) => (
            jourIndispo.push(d.jour)
        ))
    ))


    const ModifCalendrier = (idDoc, idDocUser) => {
        Navigation.navigate('ModifCalendrier', {
            idDoc: idDoc,
            idDocUser: idDocUser
        });
    }

    const jourJ = new Date();
    return (
        <View style={tw`mb-10`}>
            <Text style={[{ fontSize: 24, fontWeight: "700", fontFamily: "serif"}]}>Disponibilite </Text>
            <View>
                {/* <View>
                    {jourIndispo.map((j, index) => (
                        <Text key={index}>{j}</Text>
                    ))}
                </View> */}
                <CalendarPicker 
                minDate={jourJ}
                enableDateChange={false}
                startFromMonday={true}
                previousTitle="Precedent"
                nextTitle="Suivant"
                weekdays={['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'sam', 'Dim']}
                months={['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Otobre', 'Novembre', 'Decembre']}
                disabledDates={jourIndispo}
                />
            </View>
            <View style={tw`items-end pt-5 px-5 absolute left-75 bottom-75`}>
                        <Button onPress={() => ModifCalendrier(props.idDoc, props.idDocUser)}
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



export default Calendrier;




const styles = StyleSheet.create({

})