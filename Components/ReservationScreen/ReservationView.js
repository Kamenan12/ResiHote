import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, where,orderBy, doc, getDoc, } from "firebase/firestore";
import MesReservation from "./MesReservation";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@rneui/themed";
import moment from "moment";
import tw from "twrnc"
import { db } from "../../firebase";




const ReservationView = () => {

    const hotedocid = useSelector((state) => state.hote.idDoc)
    const [reser, setReser] = useState([])
    const minDay = new Date();
    const Today = moment(minDay).format("DD/MM/YYYY")



    const getReser = async() => {
        const reser = query(collection(db, "reservations"), where("userHoteIdDoc", "==", hotedocid), orderBy("date_create", "desc"))
        const unReser = onSnapshot(reser, (queryonSnap) => {
            let rss = [];
            queryonSnap.forEach(async(reserv) => {
                let rs = []
                const r = doc(db, `residences`, `${reserv.data().idResidence}`)
                const resi =  await getDoc(r)
                if (resi.exists()){
                    rs.push({
                        idReservation: reserv.id,
                        Reservation: reserv.data(),
                        idResidence: resi.id,
                        Residence: resi.data()
                    })
                    // console.log("les serrr dans ifff",rs.length)
                    rss = [...rss, rs]
                }
                // console.log("les serrr hooo ifff",rs.length)
                // console.log("les serrr  queeerrr",rss)
                setReser(rss)
            })
        })
    }





    useEffect(() => {
        getReser();
    }, [])
    return (
        <>

        <View style={[tw`pt-5`]}>
            <View style={tw`items-center pb-4`}>
                <Text style={[{ fontSize: 25, fontWeight: "600"}]}> Mes reservations </Text>
                {/* <Text>{rs}</Text> */}
                {/* <Text>{Today}</Text> */}
            </View>
            {/* <View style={tw``}> */}
                <ScrollView style={tw`h-160`}>

                    {/* <Text>{reser.length}</Text> */}
                    {
                        reser.map((R, index) => (
                            R.map((re, index2) => (

                                <Reservation id={re.idReservation} data={re.Reservation} resi={re.Residence} key={index} />
                            ))
                        //    <Text>{re.length}</Text>
                        ))
                    }
                    {/* <Text> {reser.length}</Text> */}
                </ScrollView>
            {/* </View> */}
            {/* <Text> Page resevativvvvon </Text> */}
            {/* <MesReservation /> */}
        </View>
        </>
    )
}


const Reservation = (props) => {

    const id = props.id
    const infoReser = props.data 
    const resi = props.resi
    // const hote = props.hote

    const Navigation = useNavigation()
    const minDay = new Date();
    // const Today = moment(minDay).format("DD/MM/YYYY")
    // const Today = moment()
    const TodayFor = moment().format("MM/DD/YYYY")
    const JourFin = moment(infoReser.finSejour).format("DD/MM/YYYY")
    const JourDeb = moment(infoReser.debutSejour).format("DD/MM/YYYY")
    const Jequ =  moment(JourFin).diff(TodayFor, "days")                   //moment(JourFin).diff(JourDeb, "day")

    const DetailReservation = (id, infoReser, resi) => {
        Navigation.navigate("DetailReservation", {
            id: id,
            infoReser: infoReser,
            resi: resi,
            
        })
    }
    
    // const reser = props.rese


    
    // console.log("ttttt", resi) props.details(id, infoReser,resi, hote)
    return (
        <TouchableOpacity onPress={() => DetailReservation(id, infoReser,resi)}>
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
                    {
                        Jequ < 0 ? (
                        <View style={tw`bg-red-500 p-2 rounded-full`}>

                            <Text>Termine </Text>
                        </View>
                        ):
                        (<View style={tw`bg-yellow-500 p-2 rounded-full`}>

                            <Text>en cours </Text>
                        </View>)
                    }
                    {/* <Text>{Jequ}</Text> */}
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