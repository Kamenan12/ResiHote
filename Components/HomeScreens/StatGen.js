import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image,  } from "react-native";
import {useNetInfo} from '@react-native-community/netinfo';
import { db } from "../../firebase";
import { collection, onSnapshot, query, where,orderBy } from "firebase/firestore";

import tw from  "twrnc"
import PasConnexion from "../Connexion/PasConnexion";
// import { query } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";



 


const StatGen = () => {

    const [resi, setResi] = useState([])
    const [reser, setReser] = useState([])
    const NetInfo = useNetInfo();
    const HoteDocId = useSelector((state) => state.hote.idDoc)
    const userhoteId = useSelector((state) => state.hote.userhote)
    const NbreResi = useSelector((state) => state.hote.resi)





    const getData = async() => {

        // let r = query(collection(db,"residences"), where("userHote", "==", userhoteId));
        // const unResi = onSnapshot(r, (queryResi) => {
        //     const re = []
        //     queryResi.forEach((doc) => {
        //         re.push({
        //             idDoc: doc.id, 
        //             data: [doc.data()]
        //         })
        //         // console.log("ID du Doc", doc.id)
        //     })
        //     console.log("les Resss", re)
        //     setResi(re)
        // });
        // let residences = query(collection(db,"reservations"), where("userHoteIdDoc", "==", HoteDocId));
        // const unReser = onSnapshot(residences, (queryReser) => {
        //     const rs = []
        //     queryReser.forEach((doc) => {
        //         rs.push({
        //             idDoc: doc.id,
        //             data: doc.data()
        //         })
        //     })
        //     console.log(" Les Reserrr", rs)
        //     setReser(rs)
        // })
    }




    useEffect( () => {
        getData();
    }, [])
    return (
        <View style={[tw`flex px-2`]}>
           <View>
            <View style={[tw` h-38 w-86 rounded-xl justify-between flex-row shadow-2xl`, { backgroundColor: "#f78f54"}]}>
                <View style={[tw` py-5 px-2`]}>
                    <Text style={[ tw``, { fontSize: 20, color: "white"}]}> Balance</Text>
                    <Text style={[tw``, {fontSize: 35, color: "white", fontWeight: "900", fontFamily: "sans-serif"}]}>663750 Fr</Text>
                    {/* <Text style={[tw``, {fontSize: 35, color: "white", fontWeight: "900", fontFamily: "sans-serif"}]}></Text> */}
                   
                </View>  
                <View style={[tw`px-2 py-3`]}>
                    <Image source={require("../images/wallet/001-wallet-1.png")} style={{ height: 120, width: 120}} />
                </View>
            </View>
            {
                NetInfo.isConnected ? 
                null : 
                <View style={tw`pt-3`}>
                    <PasConnexion />
                </View> 
            }
            
            <View style={[tw`flex flex-row justify-between pt-3`]}>
                
                    {/* ajouter le composant chanbre */}
                    <NbChambre nombre={NbreResi}/>
                    {/* fin de composant chambre  */}

                    {/* debur de composant nombre de vu */}
                    <NbVues />
                    {/* fin de nombre de vue  */}
            </View>
            <View style={[tw`pt-4`]}>
                <Ajourdhui />
            </View>
            <View style={[tw`pt-4`]}>
                <MoisActu />
            </View>
           </View>
        </View>
    )
}





            const NbChambre = (props) => {
                    return (
                        <>
                            <View style={[tw` h-27 w-42 rounded-xl   shadow-2xl`, {backgroundColor: "#3A86FF"}]}>
                                <View style={[tw` items-center`]}>
                                    <Text style={[tw``,{fontSize: 20, color: "white", fontWeight: "400"}]}>Chambres</Text>
                                </View>
                                <View style={[tw`flex-row justify-evenly items-center`]}>
                                    <Text style={[tw``, {fontSize: 30, color: "white", fontWeight: "700"}]}> {props.nombre}</Text> 
                                    <Image source={require("../images/house/003-homepage.png")} style={{ height: 70, width: 70}} />
                                </View>
                            </View>
                        </>
                        
                    )
            }

            const NbVues = () => {
                return (
                        <>
                             <View style={[tw` h-27 w-42 rounded-xl shadow-2xl`, {backgroundColor: "#E698A6"}]}>
                                 <View style={[tw` items-center`]}>
                                    <Text style={[tw``,{fontSize: 20, color: "white", fontWeight: "400"}]}>Vues</Text>
                                </View>
                                <View style={[tw` flex-row items-center justify-evenly`]}>
                                    <Text style={[tw``, {fontSize: 30, color: "white", fontWeight: "700"}]}> 167 </Text> 
                                    <Image source={require("../images/eyes/003-eye-care.png")} style={{ height: 70, width: 70}} />
                                </View>
                             </View>
                        </>
                )
            }


            const Ajourdhui = () => {
                return (
                    <>
                        <View style={[tw` `, {}]}>
                            <View style={[tw`items-center`]}>
                                <Text style={[tw``, {fontSize: 25, color: "black", fontWeight: "600" }]}> Aujourd'Hui</Text>
                            </View>
                            <View style={[tw``, {}]}>
                                <View style={[tw`flex-row justify-between px-5`]}>
                                    <Image source={require("../images/eyes/002-eye-1.png")} style={{ height: 30, width: 30}} />
                                    <Text style={[tw``, {fontSize: 22, }]}> 12 </Text>
                                </View>
                                <View style={[tw`flex-row justify-between px-5 `]}>
                                    <Image source={require("../images/wallet/002-wallet.png")} style={{ height: 40, width: 40}} />
                                    <Text style={[tw``, {fontSize: 22, }]}> 12000 fr </Text>
                                </View>
                                
                            </View>
                        </View>
                    </>   
                )
            }


            const MoisActu = () => {
                return (
                    <>
                             <View style={[tw` `, {}]}>
                            <View style={[tw`items-center`]}>
                                <Text style={[tw``, {fontSize: 25, color: "black", fontWeight: "600" }]}> Aout </Text>
                            </View>
                            <View style={[tw``, {}]}>
                                <View style={[tw`flex-row justify-between px-5`]}>
                                    <Image source={require("../images/eyes/002-eye-1.png")} style={{ height: 30, width: 30}} />
                                    <Text style={[tw``, {fontSize: 22, fontWeight: "500"}]}> 44  </Text>
                                </View>
                                <View style={[tw`flex-row justify-between px-5 `]}>
                                    <Image source={require("../images/wallet/002-wallet.png")} style={{ height: 40, width: 40}} />
                                    <Text style={[tw``, {fontSize: 22, fontWeight: "500"}]}>72 000fr  </Text>
                                </View>
                                
                            </View>
                        </View>
                    </>
                )
            }

export default StatGen;



const styles = StyleSheet.create({

})