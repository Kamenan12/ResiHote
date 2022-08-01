import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { auth } from "../firebase";
import { db } from "../firebase";
import tw from 'twrnc'

import { collection, getDocs, where, query, onSnapshot } from "firebase/firestore";






const BarEntete = () => {
        
    const user = auth.currentUser;
    const [userDoc, setUserDoc] = useState();


    const getUserDoc = async() => {
        const q = query(collection(db, "users"), where("user", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const dc = [];
        querySnapshot.forEach((doc) => {
            dc.push(doc.data())
        });
        setUserDoc(dc[0]);
        console.log("Doc user", userDoc);
    }





    useEffect(() => {
        getUserDoc()
    }, [])
    return (
        <>
        <View style={[tw`pt-20 flex flex-row justify-between px-5`]}> 
            <View>
                <Text style={{ color: "gray", fontSize: 20, fontWeight: "400"}}>Hee. {userDoc.nom} </Text>
                <Text style={{ fontSize: 25, fontWeight: "bold", fontFamily: "sans-serif"}}>Bienvenue chez R+ </Text>
            </View>
            <View >
                <View style={[tw`border border-slate-300 rounded-lg p-2 shadow-`,]}>

                    <Image source={require("./images/profil/002-man.png")} style={{ height: 30, width: 30, resizeMode: 'contain'}} />
                </View>
                
            </View>
        </View>
        </>
    )
}


export default BarEntete;


const styles = StyleSheet.create({

})