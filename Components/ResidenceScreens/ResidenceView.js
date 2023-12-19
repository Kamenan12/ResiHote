import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { collection, onSnapshot, query, where,orderBy } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import tw from 'twrnc';
import { Icon } from "@rneui/themed";




const ResidenceView = () => {
    // recuperer Id de user
    // const CurrentUser = auth.currentUser.uid;
    const hotedoc = useSelector((state) => state.hote.idDoc)
    const userhote = useSelector((state) => state.hote.hote)
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

            // let q = query(collection(db, "users"), where("user", "==", CurrentUser));

                // const unUser = onSnapshot(q, (queryUser) => {
                //     const us = []
                //     queryUser.forEach((docUser) => { 
                        // us.push(
                        //     doc.id
                        // )
                        let r = query(collection(db,"residences"), where("Hote", "==", userhote));
                        const unResi = onSnapshot(r, (queryResi) => {
                            const re = []
                            queryResi.forEach((doc) => {
                                re.push({
                                    idDoc: doc.id, 
                                    data: [doc.data()]
                                })
                                // console.log("ID du Doc", doc.id)
                            })
                            console.log("les Resss", re)
                            setResi(re)
                        })
                    // })
                    // console.log("les Resi de user ID", us)
                    //  setUserDoc(us[0])
                // })

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
        // Navigation.reset({
        //     index: 1,
        //     routes: [
        //         {
                        // name: 'Chambres'
                    // },
                    // { name: 'ResultRecherche',  // le liens de la page enfant
                    // params: {
                    // data: data,
                    // details: details}
                    // },
        //     }]
        //     })
    }


    const AfficheDetail = (residence, id, docUser) => {
        Navigation.navigate('DetailsResidences', {
            residences: residence,
            resiID: id,
            idDocUser: docUser
        });
    }
    // console.log("Id user:", CurrentUser)


    useEffect( () => {
        getMesResi()
    }, [])


    return (
        <View style={tw`pt-6`}> 
            <View>
                <Text style={[{ fontSize: 25, fontWeight: "600"}]}> Mes residences </Text>
            </View>
            <View style={tw`py-2`}>
                <Text> ov av ajouert les bouton pour ajout de residences  </Text>
                    <Button 
                    title='Ajout de residences'
                    color='secondary'
                    onPress={() => AjoutChambre()}
                        />
            </View>

                <View>
                    <ScrollView style={tw`mb-50`}>
                        
                        {/* <Text> texte ici mettre les residences!</Text> */}
                        { resi ? 
                            resi.map((R, index) => (
                                R.data.map((Resi, index) => (
                                    <View key={index} style={[tw`items-center`]}>
                                        <Residence residence={Resi} detail={AfficheDetail} idDoc={R.idDoc} docHote={hotedoc}/>
                                    </View>
                                ))
                            )) : 
                                <View> 
                                    <Text> Aucune residences</Text>
                                </View>
                        }
                        {/* {console.log("resi", resi)} */}
                    </ScrollView>

                    
                </View>
        </View>
    )   
}


export default ResidenceView; 



const Residence = (props) => {
    const residen = props.residence
    const Id = props.idDoc
    const docUser = props.docHote
    return (
        // <View style={tw`bg-white flex`}>
        //     <View style={tw`h-40 w-80`}>
        //         <Image source={{uri: residen.Images[0].url}} style={[styles.img]} />
        //     </View>
        //     <Text>{residen.Titre} </Text>
        // </View>
        <TouchableOpacity onPress={() => props.detail(residen, Id, docUser)}>
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
                            <Text style={[{fontSize: 16, fontWeight: "500", fontFamily: "sans-serif", color:"black"}, tw``]}>{residen.chambre} Chambre(s)</Text>
                            <Text style={[{fontSize: 16, fontWeight: "500", fontFamily: "sans-serif", color:"black"}, tw`pl-2`]}>{residen.salon} Salon(s) </Text> 
                        </View>
                        <View style={tw`flex-row `}>
                            <View style={tw`flex-row`}>
                                <Icon  name="location" color="black" type="entypo" size={25}/>
                                <Text style={[{fontSize: 16, fontWeight: "500", fontFamily: "sans-serif", color:"black"}, tw``]}>{residen.Location.ville}</Text>
                            </View>
                            <View style={tw`flex-row`}>
                                <Icon  name="location-pin" color="black" type="entypo" size={25}/>
                                <Text style={[{fontSize: 16, fontWeight: "500", fontFamily: "sans-serif", color:"black"}, tw``]}>{residen.Location.commune}</Text>
                            </View>
                        </View>
                        <View style={tw`flex-row pl-2 pt-2 justify-between`}>
                                    <View style={tw`flex-row`}>
                                    {residen.Equipement_bases.map((equip, index)=> (
                                        <View key={index} style={tw` flex-row`}>
                                            { equip === "Wifi" ? 
                                            <Icon  name="wifi" color="#9CA3AF" type="materiallcons" size={25}/> : <Text></Text>
                                            }
                                            
                                            {equip === "Televison" ?
                                                <Icon  name="tv-outline" type="ionicon" color="#9CA3AF" size={25}/> : <Text></Text>
                                            }
                                            {equip === "Refrigerateur" ?
                                                <Icon  name="fridge-alert-outline" type="material-community" color="#9CA3AF" size={25}/> : <Text></Text>
                                            }
                                            {/* {equip === "piscine" ?
                                                <Icon  name="pool" color="#9CA3AF" type="materiallcons" size={25}/> : <Text></Text>
                                            } */}
                                        </View>
                                        
                                    ))}
                                    </View>
                                    
                                    <View style={tw`bg-black p-2 rounded-2xl ml-3`}>
                                    <Text style={[{fontSize: 16, fontWeight: "700", fontFamily: "sans-serif", color:"white"}, tw``]}>{residen.Prix}/jour</Text>
                                    </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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