import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { collection, onSnapshot, query, where,orderBy } from "firebase/firestore";
import tw from 'twrnc';
import { Icon } from "@rneui/themed";




const ResidenceView = () => {
    // recuperer Id de user
    const CurrentUser = auth.currentUser.uid;
    const [userDoc, setUserDoc] = useState()

    const Navigation = useNavigation();

    const [resi, setResi] = useState([]);

    const getMesResi = async() => {
        // const q = query(collection(db, "users"));
        // const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //     const us = [];
        //     querySnapshot.forEach((doc) => {
        //         us.push(doc.id);
        //         // const ResiID = us[0] 

        //         let r = query(collection(db,`users/${us}/residences`));
        //         const unResi = onSnapshot(r, (queryResi) => {
        //                 const rs = [];
        //                 queryResi.forEach((doc) => {
        //                     // let tab = [];
        //                     // tab.push(doc.data())
        //                     rs.push({ 
        //                         id: doc.id,
        //                         doc:[doc.data()]});
        //                     console.log("id resi: ", doc.id)
        //                 })
        //                 console.log("LEs residence", rs);
        //                 setResi(rs);
        //         })
        //     })
        // })   le

            let q = query(collection(db, "users"), where("user", "==", CurrentUser));

                const unUser = onSnapshot(q, (queryUser) => {
                    const us = []
                    queryUser.forEach((doc) => {
                        // us.push(
                        //     doc.id
                        // )
                        let r = query(collection(db,`users/${doc.id}/residences`));
                        const unResi = onSnapshot(r, (queryResi) => {
                            const re = []
                            queryResi.forEach((doc) => {
                                re.push(doc.data())
                            })
                            console.log("les Resss", re)
                            setResi(re)
                        })
                    })
                    // console.log("les Resi de user ID", us)
                    //  setUserDoc(us[0])
                })

                // let r = query(collection(db,`users/${CurrentUser.uid}/residences`));
                // const unResi = onSnapshot(r, (queryResi) => {
                //         const rs = [];
                //         queryResi.forEach((doc) => {
                //             // let tab = [];
                //             // tab.push(doc.data())
                //             rs.push({ 
                //                 id: doc.id,
                //                 doc:[doc.data()]});
                //             console.log("id resi: ", doc.id)
                //         })
                //         console.log("LEs residence", rs);
                //         setResi(rs);
                // })

        //     const q = query(collection(db, "residences"), where("Resi", "==", CurrentUser));
        //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //         const rs = [];
        //         querySnapshot.forEach((doc) => {
        //             rs.push(doc.data()) 
        //         });
        //         // setResi(rs);
        //         console.log(rs)
        //         setResi(rs);
        //     })
        //    console.log("les Resi", resi)  
        
    }






    const AjoutChambre = () => {
        Navigation.navigate('Chambres')
    }

    console.log("Id user:", CurrentUser)


    useEffect( () => {
        getMesResi()
    }, [])
    return (
        <View style={tw`pt-15`}> 
            <View>
                <Text style={[{ fontSize: 25, fontWeight: "600"}]}> Mes residences </Text>
            </View>
            <Text> ov av ajouert les bouton pour ajout de residences  </Text>
            <Button 
            title='Ajout de residences'
            color='secondary'
            onPress={() => AjoutChambre()}
                />

                <View>

                    <Text> texte ici mettre les residences!</Text>
                    { resi ? 
                        resi.map((Resi, index) => (
                            <View key={index} style={[tw`items-center`]}>
                                <Residence residence={Resi} />
                            </View>
                            )) : 
                            <View> 
                                <Text> Aucune residences</Text>
                            </View>
                    }
                    {/* {console.log("resi", resi)} */}
                    
                </View>
        </View>
    )   
}


export default ResidenceView; 



const Residence = (props) => {
    const residen = props.residence
    return (
        // <View style={tw`bg-white flex`}>
        //     <View style={tw`h-40 w-80`}>
        //         <Image source={{uri: residen.Images[0].url}} style={[styles.img]} />
        //     </View>
        //     <Text>{residen.Titre} </Text>
        // </View>
        <View style={[tw` p-3`, ]}>
            <View style={tw`flex-row bg-white rounded-3xl p-3 w-85 `}>
                <View>
                    <Image source={{uri: residen.Images[0].url}} style={[{width:120, height: 120}, tw`rounded-3xl`]}   />
                </View>

                <View style={tw`pl-4`}>
                    
                <View>
                    <Text style={{fontSize: 22, fontWeight: "900", fontFamily: "sans-serif",}}>{residen.Titre} </Text>
                    </View>
                    <View style={tw`flex-row `}>
                        <Text style={[{fontSize: 16, fontWeight: "500", fontFamily: "sans-serif", color:"black"}, tw``]}>{residen.Nombre_chambre} Chambre(s)</Text>
                        <Text style={[{fontSize: 16, fontWeight: "500", fontFamily: "sans-serif", color:"black"}, tw`pl-2`]}>{residen.Nombre_salon} Salon(s) </Text>
                    </View>
                    <View style={tw`flex-row `}>
                        <View style={tw`flex-row`}>
                            <Icon  name="location" color="black" type="entypo" size={25}/>
                            <Text style={[{fontSize: 16, fontWeight: "500", fontFamily: "sans-serif", color:"black"}, tw``]}>{residen.Type_residences}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        // aspectRatio: 1,
         width: '100%',
         height: '100%',
        // flex: 1,
        resizeMode: 'cover'
    }
})