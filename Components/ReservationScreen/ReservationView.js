import { View, Text, StyleSheet } from "react-native";
import MesReservation from "./MesReservation";

import tw from "twrnc"




const ReservationView = () => {

    return (
        <>

        <View style={[tw`pt-10`]}>
            <View>
                <Text style={[{ fontSize: 25, fontWeight: "600"}]}> Mes reservations </Text>
            </View>
            {/* <Text> Page resevativvvvon </Text> */}
            <MesReservation />
        </View>
        </>
    )
}


export default ReservationView;



const styles = StyleSheet.create({
    
})