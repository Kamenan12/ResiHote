import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase";
// import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import tw from 'twrnc'

import { collection, getDocs, where, query, onSnapshot } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { getHote } from "../Store/getHoteSlice";





const BarEntete = () => {
        // const auth = getAuth();
    const Navigation = useNavigation();
    const user = auth.currentUser;
    const [userDoc, setUserDoc] = useState();
    const UserNom = useSelector((state) => state.hote.nom)
    const dispatch = useDispatch()


    const getHoteDoc = async() => {
        const q = query(collection(db, "hotes"), where("userHote", "==", user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const dc = []; 
            querySnapshot.forEach((doc) => {
                dc.push({
                    id: doc.id,
                    data: doc.data()
                })
                // console.log("les doc", dc)
            }); 
            if (dc.length >= 1 ) {
                const resi = query(collection(db, "residences"), where("idDocHote", "==", dc[0].id));
                const subscribe = onSnapshot(resi, (querySnapshot) => {
                    const r = [];
                    querySnapshot.forEach((doc) => {
                        r.push({
                            idDoc: doc.id,
                            data: doc.data()
                        })
                    })
                    // setUserDoc(dc[0]); 
                    dispatch(getHote({
                        idDoc: dc[0].id,
                        user: dc[0].data.userHote,
                        nom: dc[0].data.nom,
                        prenom: dc[0].data.prenom,
                        pseudo: dc[0].data.pseudo, 
                        email: dc[0].data.email,
                        hote: dc[0].data.hote,
                        resi: r.length
                    }))
                })
            }
            

        });  
        // console.log("Doc user", userDoc);
    }



 const ProfilMenu = () => {
    Navigation.navigate('Profil');
 }

    useEffect(() => {
        getHoteDoc();
    }, []) 
    return (
        <>
        <View style={[tw`pt-7 flex flex-row justify-between px-7`]}> 
            <View>
                 <Text style={{ color: "gray", fontSize: 20, fontWeight: "400"}}>Heee! {UserNom == "" ? "" : UserNom} </Text>
                 <Text style={{ fontSize: 25, fontWeight: "bold", fontFamily: "sans-serif"}}>Bienvenue chez R+ </Text> 

            </View>
            <View >
            <TouchableOpacity onPress={() => ProfilMenu()}>

                <View style={[tw`border border-slate-300 rounded-lg p-2 shadow-`,]}>
                    <Image source={require("../images/profil/002-man.png")} style={{ height: 30, width: 30, resizeMode: 'contain'}} />
                </View>
            </TouchableOpacity>
                
            </View>
        </View>
        </>
    )
}


export default BarEntete;


const styles = StyleSheet.create({


})