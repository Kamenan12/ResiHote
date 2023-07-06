import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, where,orderBy } from "firebase/firestore";
import MesReservation from "./MesReservation";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@rneui/themed";
import tw from "twrnc"
import { db } from "../../firebase";




const ReservationView = () => {

    const hotedocid = useSelector((state) => state.hote.idDoc)
    const [reser, setReser] = useState()




    const getReser = async() => {
        const reser = query(collection(db, "reservations"), where("userHoteIdDoc", "==", hotedocid))
        const unReser = onSnapshot(reser, (queryonSnap) => {
            const rs = []
            queryonSnap.forEach((doc) => {
                rs.push({
                    idDoc: doc.id,
                    data: doc.data()
                })
            })
            console.log("les ressser",rs)
        })
    }





    useEffect(() => {
        getReser();
    }, [])
    return (
        <>

        <View style={[tw`pt-10`]}>
            <View>
                <Text style={[{ fontSize: 25, fontWeight: "600"}]}> Mes reservations </Text>
            </View>
            {/* <Text> Page resevativvvvon </Text> */}
            {/* <MesReservation /> */}
        </View>
        </>
    )
}


export default ReservationView;



const styles = StyleSheet.create({
    
})