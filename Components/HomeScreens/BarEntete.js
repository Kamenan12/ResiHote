import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase";
// import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import tw from 'twrnc'

import { collection, getDoc, where, query, onSnapshot, doc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { getHote } from "../Store/getHoteSlice";





const BarEntete = () => {
        // const auth = getAuth();
    const Navigation = useNavigation();
    const user = auth.currentUser;
    const [userDoc, setUserDoc] = useState();
    const UserNom = useSelector((state) => state.hote.nom)
    const dispatch = useDispatch()

    // console.log("userConec IUD", user.uid)
    // console.log("userNom ", UserNom)

    const getHoteDoc = async() => {
        // const q = query(collection(db, "hotes"), where("userHote", "==", user.uid));
        const h = doc(db, `hotes`, user.uid)
        // let dc = []; 
        const hote = await getDoc(h)
        if(hote.exists()){
            console.log("doc hote", hote.id)
            dispatch(getHote({
                // idDoc: dc[0].id,
                // user: dc[0].data.userHote,
                nom: hote.data().nom,
                prenom: hote.data().prenom,
                pseudo: hote.data().pseudo, 
                email: hote.data().email,
                hote: hote.id,
                
            }))
        }   
         
            // dispatch(getHote({
            //     idDoc: dc[0].id,
            //     user: dc[0].data.userHote,
            //     nom: dc[0].data.nom,
            //     prenom: dc[0].data.prenom,
            //     pseudo: dc[0].data.pseudo, 
            //     email: dc[0].data.email,
            //     hote: dc[0].data.hote,
                
            // }))
            // if (dc.length >= 1 ) {
            //     const resi = query(collection(db, "residences"), where("idDocHote", "==", dc[0].id));
            //     const subscribe = onSnapshot(resi, (querySnapshot) => {
            //         const r = [];
            //         querySnapshot.forEach((doc) => {
            //             r.push({
            //                 idDoc: doc.id,
            //                 data: doc.data()
            //             })
            //         })
            //         if (r.length >= 1 ) {
            //             const reser = query(collection(db, "reservations"), where("userHoteIdDoc", "==", dc[0].id));
            //             const scribre = onSnapshot(reser, (querySnapshot) => {
            //                 const rs = [];
            //                 querySnapshot.forEach((doc) => {
            //                     rs.push({
            //                         id: doc.id,
            //                         data: doc.data()
            //                     })
            //                 })
            //                 console.log("Resrvations", rs)
            //                 // let aff = 0
            //                 if (rs.length >= 1) {
            //                     let aff = 0
            //                     rs.map(R1 => {
            //                         // R1.data.map(R => {
            //                             aff = aff + R1.data.coutSejour
            //                         // })
            //                     })
            //                     // console.log("affaire,", aff)

            //                     dispatch(getHote({
            //                         idDoc: dc[0].id,
            //                         user: dc[0].data.userHote,
            //                         nom: dc[0].data.nom,
            //                         prenom: dc[0].data.prenom,
            //                         pseudo: dc[0].data.pseudo, 
            //                         email: dc[0].data.email,
            //                         hote: dc[0].data.hote,
            //                         residences: r.length,
            //                         reservations: rs.length,
            //                         affaire: aff
            //                     }))
            //                 }
            //             })
            //         }
            //         // setUserDoc(dc[0]); 
            //         // dispatch(getHote({ 
            //         //     idDoc: dc[0].id,
            //         //     user: dc[0].data.userHote,
            //         //     nom: dc[0].data.nom,
            //         //     prenom: dc[0].data.prenom,
            //         //     pseudo: dc[0].data.pseudo, 
            //         //     email: dc[0].data.email,
            //         //     hote: dc[0].data.hote,
            //         //     resi: r.length
            //         // }))
            //     })
            // }
            

          
        // console.log("Doc user", userDoc);
    }

    // const getHoteDoc = async() => {
    //     const q = query(collection(db, "hotes"), where("userHote", "==", user.uid));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         const dc = []; 
    //         querySnapshot.forEach((doc) => {
    //             dc.push({
    //                 id: doc.id,
    //                 data: doc.data()
    //             })
    //             // console.log("les doc", dc)
    //             //Essayons de recuperer directement les information au fure et a mesur
    //         });  
    //         dispatch(getHote({
    //             idDoc: dc[0].id,
    //             user: dc[0].data.userHote,
    //             nom: dc[0].data.nom,
    //             prenom: dc[0].data.prenom,
    //             pseudo: dc[0].data.pseudo, 
    //             email: dc[0].data.email,
    //             hote: dc[0].data.hote,
                
    //         }))
    //         if (dc.length >= 1 ) {
    //             const resi = query(collection(db, "residences"), where("idDocHote", "==", dc[0].id));
    //             const subscribe = onSnapshot(resi, (querySnapshot) => {
    //                 const r = [];
    //                 querySnapshot.forEach((doc) => {
    //                     r.push({
    //                         idDoc: doc.id,
    //                         data: doc.data()
    //                     })
    //                 })
    //                 if (r.length >= 1 ) {
    //                     const reser = query(collection(db, "reservations"), where("userHoteIdDoc", "==", dc[0].id));
    //                     const scribre = onSnapshot(reser, (querySnapshot) => {
    //                         const rs = [];
    //                         querySnapshot.forEach((doc) => {
    //                             rs.push({
    //                                 id: doc.id,
    //                                 data: doc.data()
    //                             })
    //                         })
    //                         console.log("Resrvations", rs)
    //                         // let aff = 0
    //                         if (rs.length >= 1) {
    //                             let aff = 0
    //                             rs.map(R1 => {
    //                                 // R1.data.map(R => {
    //                                     aff = aff + R1.data.coutSejour
    //                                 // })
    //                             })
    //                             // console.log("affaire,", aff)

    //                             dispatch(getHote({
    //                                 idDoc: dc[0].id,
    //                                 user: dc[0].data.userHote,
    //                                 nom: dc[0].data.nom,
    //                                 prenom: dc[0].data.prenom,
    //                                 pseudo: dc[0].data.pseudo, 
    //                                 email: dc[0].data.email,
    //                                 hote: dc[0].data.hote,
    //                                 residences: r.length,
    //                                 reservations: rs.length,
    //                                 affaire: aff
    //                             }))
    //                         }
    //                     })
    //                 }
    //                 // setUserDoc(dc[0]); 
    //                 // dispatch(getHote({ 
    //                 //     idDoc: dc[0].id,
    //                 //     user: dc[0].data.userHote,
    //                 //     nom: dc[0].data.nom,
    //                 //     prenom: dc[0].data.prenom,
    //                 //     pseudo: dc[0].data.pseudo, 
    //                 //     email: dc[0].data.email,
    //                 //     hote: dc[0].data.hote,
    //                 //     resi: r.length
    //                 // }))
    //             })
    //         }
            

    //     });  
    //     // console.log("Doc user", userDoc);
    // }



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
                 <Text style={{ color: "gray", fontSize: 20, fontWeight: "400"}}>Heee! {UserNom} </Text>
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