import { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon, Button, BottomSheet, ListItem } from "@rneui/themed";
import tw from 'twrnc'
import InfoNewResi from "./InfoNewResi";
import { itemsTypeResi } from "../Data/Data";



const ChambreView = () => {
    // initialsation des constante 
    const [step, setStep] = useState(1); // initalisation des etape
    // const [valeur, setValeur] = useState()

    // constante pour les ouverture de modal
    const [typeResi, setTypeResi] = useState(false)

    // Intialisation des champ a controller par useForm 
    const { register, watch, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
          type_residence: '',
          Nbre_chambre: '',
          Nbre_salon:'',
          Nbre_bain:''
          
        }
      });


      const WatchType_residence = watch('type_residence')


    //   donner pour type de residances
     
    

    // code des foncions 
    const Suivant = () => {
        setStep(step + 1)
    }

    const Precedent = () => {
        setStep(step - 1)
    }


    /// ICi les donnees de chaque composant

    const list2 = [
        { title: 'Villa',
          value: 'villa',
          icon: <Icon  name='home' type='material' size={20}/>,
        //   onPress: () => TapTypeResi('Villa')
    
        },
        { title: 'Appartement',
          value: 'Appartement',
          icon: <Icon name='apartment' type='material' size={20} />,
        //   onPress: () => TapTypeResi('Appartement')
        },
        {
          title: 'Studio',
          value: 'studio',
          icon: <Icon name='bed' type='material-community' size={20} />,
        //   onPress: () => TapTypeResi('studio')
        },
        {
            title: 'Annuler',
            containerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'white' },
            onPress: () => setTypeResi(false),
        },
       ]

    return (
        <>
            {(() => {
                switch (step) {
                    // code de la premiere etape 
                    case 1:
                        return (
                            <View style={tw`bg-white`}>
                                <View>
                                    <View> 
                                        <Text> Info sur la Residences</Text>
                                    </View>
                                    <View>
                                    <Button 
                                        title={WatchType_residence ? WatchType_residence : "Type de Residences"}
                                        onPress={() => setTypeResi(!typeResi)}
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
                                    <BottomSheet modalProps={{}} isVisible={typeResi}>
                                                <Controller 
                                                control={control}
                                                render={({field: {onBlur, onChange, value}}) => (
                                                list2.map((l, i) => (
                                                    <ListItem 
                                                        key={i}
                                                        containerStyle={l.containerStyle}
                                                        onPress={value => [onChange(l.value), setTypeResi(false)]}
                                                    >
                                                        <ListItem.Content>
                                                            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                                                        </ListItem.Content>
                                                    </ListItem>
                                                ))
                                                )}
                                                name="type_residence"
                                                rules={{required: true}}
                                                />
                                            </BottomSheet>

                                    </View>
                                </View>
                            </View>
                        );
                    case 2: 
                        return (
                            <View style={[tw`bg-white items-center`]}>
                            <Text >  les champ de chambre etape {step}</Text>
                            <View>
                                <View>
                                    <Text style={[tw``, {color: "#7C8593", fontSize: 20}]}> Nom  </Text>
                                    <TextInput   style={[styles.Input, {height: 40}]}/>
                                </View>
                                <View>
                                    <Text style={[tw`pt-6`, {color: "#7C8593", fontSize: 20}]}> Description  </Text>
                                    <TextInput   style={[tw``, styles.Input, {}]} multiline={ true}/>
                                </View>
                                <View>
                                    <Text style={[tw`pt-6`, {color: "#7C8593", fontSize: 20}]}> Prix  </Text>
                                    <TextInput   style={[tw``, styles.Input, {}]} keyboardType={"number-pad"} />
                                </View>
                            </View>
                            <View style={tw`flex-row justify-evenly w-60`}>
                                
                                <Text style={tw`bg-blue-300`} onPress={()=> Precedent()}> precedent </Text>
                                <Text style={tw`bg-blue-300`} onPress={()=> Suivant()}> Suivant </Text>
                            </View>
                        </View> 
                        )
                
                    default:
                        return (
                            <View>

                            <Text> 0</Text>

                            <View style={tw`flex-row justify-evenly w-60`}>
                                
                                <Text style={tw`bg-blue-300`} onPress={()=> precedent()}> precedent </Text>
                                <Text style={tw`bg-blue-300`} onPress={()=> Suivant()}> Suivant </Text>
                            </View>
                            </View>
                        )
                }
            })() }
        
            {/* <View style={[tw`bg-white items-center`]}>
                
                <Text > ici ajouter les champ de chambre</Text>
                <View>
                    <View>
                        <Text style={[tw``, {color: "#7C8593", fontSize: 20}]}> Nom  </Text>
                        <TextInput   style={[styles.Input, {height: 40}]}/>
                    </View>
                    <View>
                        <Text style={[tw`pt-6`, {color: "#7C8593", fontSize: 20}]}> Description  </Text>
                        <TextInput   style={[tw``, styles.Input, {}]} multiline={ true}/>
                    </View>
                    <View>
                        <Text style={[tw`pt-6`, {color: "#7C8593", fontSize: 20}]}> Prix  </Text>
                        <TextInput   style={[tw``, styles.Input, {}]} keyboardType={"number-pad"} />
                    </View>
                </View>
                
            </View> */}
        </>
    )
}


export default ChambreView;
 


const styles = StyleSheet.create({
    Input: {
        borderWidth: 1,
        borderColor: "black",
        height: 50,
        fontSize: 20,
        fontWeight: "500",
        
       
    }
})