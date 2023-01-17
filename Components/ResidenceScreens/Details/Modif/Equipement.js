import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form';
import { Icon, Button, BottomSheet, ListItem, Input, CheckBox, Dialog } from "@rneui/themed";
import { auth } from "../../../../firebase";
import { db } from '../../../../firebase';
import { query, addDoc, collection, onSnapshot, where, getDocs, doc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

import tw from "twrnc"
import { async } from "@firebase/util";

const EquipementModif = (props) => {

    const Navigation = useNavigation();
    // recuperation des donnes de route 
    const idDoc = props.route.params.idDoc
    const idDocUser = props.route.params.idDocUser

     // Intialisation des champ a controller par useForm 
     const { register, watch, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
          Equipement_bases: [],
          Equipement_extra: [],
        } 
      });

    const [equipBase, setEquipBase] = useState(false)
    const [equipExtra, setEquipExtra] = useState(false)


    // state de equipement de basee
    const [tv, setTv] = useState(false);
    const [refrigerateur, setRefrigerateur] = useState(false);
    const [climatiseur, setClimatiseur] = useState(false)

     // Equipement extra 
     const [jardin, setJardin] = useState(false)
     const [garage, setGarage] = useState(false)


    //  donnees des equipements a selectinnee

     const ItemsEquipBase = [
        {
            title: 'Tv',
            value: 'Televison',
            checked: tv,
            onPressed:  setTv,
            // containerStyle: {
            //     borderWidth: 2,
            //     borderColor: "red",
            //     paddingVertical: 0
            // }
    
        },
        {
            title: 'Refrigerateur',
            value: 'Refrigerateur',
            checked: refrigerateur,
            onPressed: setRefrigerateur,
    
        },
        {
            title: 'Climatiseur',
            value: 'Climatiseur',
            checked: climatiseur,
            onPressed: setClimatiseur,
        },
        {
            title: 'Validez',
            containerStyle: { backgroundColor: 'orange' },
            titleStyle: { color: 'white' },
            onPressed: () => setEquipBase(false),
        },
       ]

    const ItemsEquiExtra = [
        {
            title: 'Jardin',
            value: 'Jaridin',
            checked: jardin,
            onPressed: setJardin
        },
        {
            title: 'Garage',
            value: 'garage',
            checked: garage,
            onPressed: setGarage,
        },
        {
            title: 'Validez',
            containerStyle: { backgroundColor: 'orange' },
            titleStyle: { color: 'white' },
            onPressed: () => setEquipExtra(false),
        },
       ]


       const WatchEquipement_bases = watch('Equipement_bases');
       const WatchEquipement_extra = watch('Equipement_extra');


       const ModificationEquip = async(data) => {
        // console.log("data" , data)
    

        // console.log("IdDOcUser", idDocUser);
        // console.log("Id DOc", idDoc)
        try {
                
            if (data) {
                
                
               await updateDoc(doc(db, `users/${idDocUser}/residences/`, idDoc),{
                    Equipement_bases: data.Equipement_bases,
                    Equipement_extra: data.Equipement_extra,
                    date_update: serverTimestamp()
                 })
               console.log("Equipement ajouter")
            }

       
     

            } catch (e) {
                console.log(e)
            }
        


        Navigation.navigate('Residence')
       }

       const annuler = () => {
        Navigation.goBack()
    }

    return (
        <View>
            <View style={[tw`flex px-2 py-15`, { justifyContent: "center"}]}>
                            <View>
                                <Text style={{ fontSize: 25, fontWeight: "600"}}>Choisir les Equipements </Text>
                            </View>
                            <View>
                                <Text> Equipement de base </Text>
                                    <Button 
                                    title="equipement de base"
                                    onPress={() => setEquipBase(!equipBase)}
                                    buttonStyle={{
                                        backgroundColor: 'rgb(221, 221, 221)',
                                        height:  50,

                                    }}
                                    icon={{
                                        name: "arrow-alt-circle-right",
                                        type: "font-awesome-5",
                                        size: 15,
                                        
                                    }}
                                    iconContainerStyle={{
                                        right: 70
                                    }}
                                    iconRight
                                    />

                                        <BottomSheet modalProps={{}} isVisible={equipBase}>
                                            <Controller 
                                            control={control}
                                            render={({field: {onChange, onBlur, value}}) => (
                                                
                                                    ItemsEquipBase.map((l, i) => (
                                                        <ListItem
                                                        key={i}
                                                        containerStyle={l.containerStyle}
                                                        
                                                        >
                                                            
                                                                {
                                                                    l.title === 'Validez' ? 
                                                                    <ListItem.Content
                                                                     >
                                                                    <ListItem.Title style={l.titleStyle} onPress={l.onPressed}>{l.title}</ListItem.Title>
                                                                </ListItem.Content> :
                                                                <ListItem.Content>
                                                                    <CheckBox 
                                                                    center
                                                                    title={l.title}
                                                                    onPress={() => [l.onPressed(!l.checked), 
                                                                        l.checked ? 
                                                                        
                                                                        onChange(WatchEquipement_bases.filter(chek => chek !== l.value))
                                                                        
                                                                        : 
                                                                         onChange([...WatchEquipement_bases, l.value]) ]}
                                                                    checked={l.checked}
                                                                    />
                                                                </ListItem.Content>
                                                                }
                                                                
                                                            
                                                        </ListItem>
                                                    ))
                                                
                                             )} 
                                            
                                            name="Equipement_bases"
                                            
                                            /> 
                                        </BottomSheet>

                                        <View>
                                        <View>
                                        {WatchEquipement_bases.map((e, i) => (
                                                <Text key={i}>-{e}</Text>
                                            ))}
                                        </View>
                                        </View>
                            </View>
                            <View>
                            <Text> Equipement extra </Text>
                                <Button 
                                title="equipement Extra"
                                onPress={() => setEquipExtra(!equipExtra)}
                                buttonStyle={{
                                    backgroundColor: 'rgb(221, 221, 221)',
                                    height:  50,

                                }}
                                icon={{
                                    name: "arrow-alt-circle-right",
                                    type: "font-awesome-5",
                                    size: 15,
                                    
                                }}
                                iconContainerStyle={{
                                    right: 70
                                }}
                                iconRight
                                />

                                <BottomSheet modalProps={{}} isVisible={equipExtra}>
                                    <Controller 
                                    control={control}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        
                                            ItemsEquiExtra.map((l, i) => (
                                                <ListItem
                                                key={i}
                                                containerStyle={l.containerStyle}
                                                
                                                >
                                                    
                                                        {
                                                            l.title === 'Validez' ? 
                                                            <ListItem.Content
                                                                >
                                                            <ListItem.Title style={l.titleStyle} onPress={l.onPressed}>{l.title}</ListItem.Title>
                                                        </ListItem.Content> :
                                                        <ListItem.Content>
                                                            <CheckBox 
                                                            center
                                                            title={l.title}
                                                            onPress={() => [l.onPressed(!l.checked), 
                                                                l.checked ? 
                                                                
                                                                onChange(WatchEquipement_extra.filter(chek => chek !== l.value))
                                                                
                                                                : 
                                                                    onChange([...WatchEquipement_extra, l.value]) ]}
                                                            checked={l.checked}
                                                            />
                                                        </ListItem.Content>
                                                        }
                                                        
                                                    
                                                </ListItem>
                                            ))
                                        
                                        )} 
                                    
                                    name='Equipement_extra'
                                    
                                    /> 
                                </BottomSheet>
                                <View>
                                    {WatchEquipement_extra.map((e, i) => (
                                            <Text key={i}>-{e}</Text>
                                        ))}
                                </View>
                            </View>
                            <View style={[tw`pt-15 flex-row justify-between w-80`]}>

                            <Button title=" Annuler" onPress={() => annuler()} 
                                buttonStyle={tw`bg-transparent border rounded-xl`}
                                titleStyle={{
                                    color: "red"
                                }}
                                icon={{
                                    name: "delete",
                                    type: "antdesign",
                                    size: 15,
                                    color: "red"
                                    
                                }}
                                
                                iconRight
                                />
                            <Button title=" Valider" onPress={handleSubmit(ModificationEquip) } 
                                buttonStyle={tw`bg-transparent border rounded-xl`}
                                titleStyle={{
                                    color: "red"
                                }}
                                icon={{
                                    name: "delete",
                                    type: "antdesign",
                                    size: 15,
                                    color: "red"
                                    
                                }}
                                
                                iconRight
                                />
                            </View>
                        </View> 
        </View>
    )
}





export default EquipementModif;


const styles = StyleSheet.create({


}) 