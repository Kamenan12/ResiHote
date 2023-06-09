import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase";
// import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import tw from 'twrnc'

import { collection, getDocs, where, query, onSnapshot } from "firebase/firestore";






const BarEntete = () => {
        // const auth = getAuth();
    const Navigation = useNavigation();
    const user = auth.currentUser;
    const [userDoc, setUserDoc] = useState();


    const getUserDoc = async() => {
        const q = query(collection(db, "users"), where("user", "==", user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const dc = []; 
            querySnapshot.forEach((doc) => {
                dc.push(doc.data())
                // console.log("les doc", dc)
            }); 
            setUserDoc(dc[0]); 
        });  
        console.log("Doc user", userDoc);
    }



 const ProfilMenu = () => {
    Navigation.navigate('Profil');
 }

    useEffect(() => {
        getUserDoc();
    }, []) 
    return (
        <>
        <View style={[tw`pt-18 flex flex-row justify-between px-7`]}> 
            <View>
                 <Text style={{ color: "gray", fontSize: 20, fontWeight: "400"}}>Heee! {userDoc ? userDoc.nom : "rien"} </Text>
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