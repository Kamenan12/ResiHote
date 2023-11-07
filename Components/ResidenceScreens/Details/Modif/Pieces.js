import { useState } from "react";

import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form';
import { Icon, Button, BottomSheet, ListItem, Input, CheckBox, Dialog } from "@rneui/themed";
import { auth } from "../../../../firebase";
import { db } from '../../../../firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { query, addDoc, collection, onSnapshot, where, getDocs, doc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

import tw from "twrnc"





const PiecesModif  = (props) => {

    const Navigation = useNavigation();

    const idDoc = props.route.params.idDoc
    const idDocUser = props.route.params.idDocUser
    const Type = props.route.params.type
    const Chambre = props.route.params.Chambre
    const Salon = props.route.params.Salon
    const Prix = props.route.params.Prix
    const bain = props.route.params.bain
    const capacite = props.route.params.capacite
    // Intialisation des champ a controller par useForm 
        const { register, watch, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
            defaultValues: {
            type_residence: Type,
            Nbre_chambre: Chambre,
            Nbre_salon: Salon,
            Nbre_bain: bain,
            Capacite_acceuil: capacite,
            Prix: Prix,
            } 
        });

        const WatchType_residence = watch('type_residence');


        // constante des ouverture Types Residences
        const [typeResi, setTypeResi] = useState(false)

        // liste de residences 
        const ListeResi = [
            {   title: 'Villa',
                value: 'villa',
                icon: <Icon name='home' type='material' size={20} />

            },
            {   title: 'Appartement',
                value: 'Appartement',
                icon: <Icon name='apartment' type='material' size={20} />

            },
            {   title: 'Studio',
                value: 'Studio',
                icon: <Icon name='bed' type='material-community' size={20} />

            },
            {   title: 'Annuler',
                containerStyle: {backgroundColor: 'red'},
                titleStyle: {color: 'white'},
                onPress: () => setTypeResi(false)
            },
        ]


        const ModificationPieces = async(data) => {
            // console.log("data" , data)
        
    
            // console.log("IdDOcUser", idDocUser);
            // console.log("Id DOc", idDoc)
            try {
                    
                if (data) {
                    
                    
                   await updateDoc(doc(db, `residences`, idDoc),{
                    Type_residence: data.type_residence,
                    chambre: data.Nbre_chambre,
                    salon: data.Nbre_salon,
                    bain: data.Nbre_bain, 
                    Prix: data.Prix,
                    Capacite: data.Capacite_acceuil,
                    date_update: serverTimestamp()
                     })
                   console.log("Pieces ajouter")
                }
    
           
         
    
                } catch (e) {
                    console.log(e)
                }
            
    
    
            Navigation.navigate('Residence')
           }
    
           const annuler = () => {
            Navigation.goBack()
        }
        console.log("idDoc", idDoc)

    return (
        <>
        <KeyboardAwareScrollView extraHeight={15}  >
            <View style={tw`bg-white pb-10`}>
                <View>
                    <Text> Info sur residences</Text>
                </View>
                <View>
                    <Button 
                        title={WatchType_residence ? WatchType_residence : Type}
                        onPress={() => setTypeResi(!typeResi)}
                        buttonStyle={{
                            backgroundColor: 'rgb(221, 221, 221)',
                            height: 50,
                        }}
                        icon={{
                            name: "arrow-alt-circle-right",
                            type: "font-awesome-5",
                            size: 15
                        }}
                        iconContainerStyle={{
                            right: 70
                        }}
                        iconRight
                    />
                    <BottomSheet modalProps={{}} isVisible={typeResi}>
                        <Controller 
                        control={control}
                        render={({field: {onBlur, onChange, value}}) => (
                            ListeResi.map((l, i) => (
                                <ListItem 
                                key={i}
                                containerStyle={l.containerStyle}
                                onPress={value => [onChange(l.value), setTypeResi(false)]}
                                >
                                    <ListItem.Content>
                                        <ListItem.Title style={l.titleStyle}>
                                            {l.title}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                            ))
                        )}
                        
                        name="type_residence"
                        // rules={{required: true}}
                        />
                    </BottomSheet>
                </View>

                <View>
                    <Text> Nombre de chambre</Text>
                        <Controller   
                        control={control}
                        render={({field: {onChange, onBlur,value}}) => (
                            <Input
                            placeholder="nombre de chambres"
                            rightIcon={{
                                type:"ionicon",
                                name: "bed-outline",
                                size: 50
                            }}
                            keyboardType="numeric"
                            
                            onChangeText={value => onChange(value)}
                            defaultValue={Chambre}
                        />
                        )}
                        name="Nbre_chambre"
                        // rules={{required: true}}

                        />
                </View>

                <View>
                    {
                        WatchType_residence === "Studio" ? 
                            <View></View>
                            : (
                                <View>
                                <Text>Nombre de Salon</Text>
                                    <Controller   
                                        control={control}
                                        render={({field: {onChange, onBlur,value}}) => (
                                            <Input
                                            placeholder={"nombre de salons"}
                                            rightIcon={{
                                                type:"font-awesome-5",
                                                name: "chair",
                                                size: 40
                                            }}
                                            keyboardType="numeric"
                                            
                                            onChangeText={value => onChange(value)}
                                            
                                            defaultValue={Salon}
                                        />
                                        )}
                                        name="Nbre_salon"
                                        // rules={{required: true}}
                                        />
                            </View>
                            )
                    }
                </View>


                <View>
                    <Text> Nombre de salle de bain</Text>

                    <Controller   
                        control={control}
                        render={({field: {onChange, onBlur,value}}) => (
                            <Input
                            placeholder={"nombre de salle de bain"}
                            rightIcon={{
                                type:"font-awesome",
                                name: "bathtub",
                                size: 40
                            }}
                            keyboardType="numeric"
                            
                            onChangeText={value => onChange(value)}
                            defaultValue={bain}
                        />
                        )}
                        name="Nbre_bain"
                        rules={{required: true}}
                        />
                </View>

                <View>
                    <Text> Capacite d'accueil</Text>
                                
                        <Controller   
                            control={control}
                            render={({field: {onChange, onBlur,value}}) => (
                                <Input
                                placeholder={"nombre de personnes"}
                                rightIcon={{
                                    type:"foundation",
                                    name: "torsos-all",
                                    size: 40
                                }}
                                keyboardType="numeric"
                                
                                onChangeText={value => onChange(value)}
                                defaultValue={capacite}
                                
                            />
                            )}
                            name="Capacite_acceuil"
                            rules={{required: true}}
                        />
                </View>

                <View >
                    <Text> Prix/24h</Text>
                        <Controller   
                        control={control}
                        render={({field: {onChange, onBlur,value}}) => (
                            <Input
                            placeholder="Prix"
                            rightIcon={{
                                type:"ionicon",
                                name: "md-pricetag",
                                size: 30
                            }}
                            keyboardType="numeric"
                            
                            onChangeText={value => onChange(value)}
                            defaultValue={Prix}
                        />
                    )}
                    name="Prix"
                    rules={{required: true}}

                    />
                </View>

                <View style={tw`items-center`}>

                    <View style={[tw`pt-15 flex-row justify-between w-80 items-center`]}>

                        <Button title=" Annuler" onPress={() => annuler()} 
                            buttonStyle={tw`bg-transparent border rounded-xl`}
                            titleStyle={{
                                color: "red"
                            }}
                            icon={{
                                name: "",
                                type: "antdesign",
                                size: 15,
                                color: "red"
                                
                            }}
                            
                            iconRight
                            />
                        <Button title=" Valider" onPress={handleSubmit(ModificationPieces) } 
                            buttonStyle={tw`bg-transparent border rounded-xl`}
                            titleStyle={{
                                color: "green"
                            }}
                            icon={{
                                name: "",
                                type: "antdesign",
                                size: 15,
                                color: "red"
                                
                            }}
                            
                            iconRight
                            />
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
        </>
    )
}







export default PiecesModif;




const styles = StyleSheet.create({

})