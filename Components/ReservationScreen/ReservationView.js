import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, where,orderBy, doc, getDoc, } from "firebase/firestore";
import MesReservation from "./MesReservation";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@rneui/themed";
import tw from "twrnc"
import { db } from "../../firebase";




const ReservationView = () => {

    const hotedocid = useSelector((state) => state.hote.idDoc)
    const [reser, setReser] = useState([])




    const getReser = async() => {
        const reser = query(collection(db, "reservations"), where("userHoteIdDoc", "==", hotedocid))
        const unReser = onSnapshot(reser, (queryonSnap) => {
            const rs = []
            queryonSnap.forEach(async(reserv) => {
                const r = doc(db, `residences`, `${reserv.data().idResidence}`)
                const resi =  await getDoc(r)
                rs.push({
                    idReservation: reserv.id,
                    Reservation: reserv.data(),
                    idResidence: resi.id,
                    Residence: resi.data()
                })
                console.log("les ssressser",rs)
                setReser(rs)
            })
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
                {/* <Text>{rs}</Text> */}
            </View>
            <View>
                {/* <Text>{reser.length}</Text> */}
                {/* {
                    reser.map((re, index) => (
                        <Reservation rese={re} key={index}/>
                    ))
                } */}
            </View>
            {/* <Text> Page resevativvvvon </Text> */}
            {/* <MesReservation /> */}
        </View>
        </>
    )
}


const Reservation = (props) => {
    
    const reser = props.rese


    // const id = props.id
    // const infoReser = props.data 
    // const resi = props.resi
    // const hote = props.hote
    // console.log("ttttt", resi) props.details(id, infoReser,resi, hote)
    return (
        <TouchableOpacity onPress={() => props.details(id, infoReser,resi, hote)}>
            <View style={tw`flex-row p-4 border-b border-gray-300 `}>
                <View>
                    <Image source={{uri: resi.Images[0].url}} style={[tw`rounded-lg`,{ width: 80, height: 80}]}/>
                </View>
                <View style={tw`px-2`}>
                    <Text style={[{fontWeight: "500", fontSize: 22}]} >{resi.Titre}</Text>
                    <Text>Debut : {infoReser.debutSejour}</Text>
                    <Text>Fin : {infoReser.finSejour}</Text>
                </View>
                <View style={tw`pt-10 `}>
                    <View style={tw`bg-yellow-500 p-2 rounded-full`}>

                        <Text>en cours</Text>
                    </View>
                </View>
                <View>
                    <View style={tw`pt-5 pl-5`}>
                        <Icon type="antdesign" name="right"/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        
    )
}

export default ReservationView;



const styles = StyleSheet.create({
    
})