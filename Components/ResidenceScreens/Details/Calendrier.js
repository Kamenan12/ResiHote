import { View, Text, StyleSheet } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Icon, Button } from "@rneui/themed";
import tw from "twrnc"
import moment from "moment";


const Calendrier = (props) => {
    const jourIndispo = []

    props.Calendrier.map((tab) => (
        tab.Tab.map((d) => (
            jourIndispo.push(d.jour)
        ))
    ))

    const jourJ = new Date();
    return (
        <View>
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
            <View style={tw`items-end pt-5 px-5`}>
                        <Button title="modifier" onPress={() => SetModif(true)}
                            buttonStyle={tw`bg-transparent border rounded-xl`}
                            titleStyle={{
                                color: "red"
                            }}
                            // icon={{
                            //     name: "cancel",
                            //     type: "material",
                            //     size: 15,
                            //     color: "red"
                                
                            // }}
                            
                            // iconRight
                        />
                    </View>
        </View>
    )
}



export default Calendrier;




const styles = StyleSheet.create({

})