import { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon, Button, BottomSheet, ListItem, Input } from "@rneui/themed";
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
          Nbre_bain:'',
          Capacite_acceuil: '',
          
        }
      });


      const WatchType_residence = watch('type_residence');
      const WatchNbre_chambre = watch('Nbre_chambre');
      const WatchNbre_salon = watch('Nbre_salon');
      const WatchNbre_bain = watch('Nbre_bain');
      const WatchCapacite_acceuil = watch('Capacite_acceuil')


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
                                    {/* View sur les type de residencs  */}
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
                                    <View>
                                        <Text> Nombre de chambre</Text>
                                            <Controller   
                                            control={control}
                                            render={({field: {onChange, onBlur,value}}) => (
                                                <Input
                                                placeholder="nombre de Chambre"
                                                rightIcon={{
                                                    type:"ionicon",
                                                    name: "bed-outline",
                                                    size: 50
                                                }}
                                                keyboardType="numeric"
                                                
                                                onChangeText={value => onChange(value)}
                                                
                                            />
                                            )}
                                            name="Nbre_chambre"
                                            rules={{required: true}}

                                            />
                                    </View>

                                    <View>
                                    {
                                        WatchType_residence === "studio" ? 
                                            <View></View>
                                            : (
                                                <View>
                                                <Text>Nombre de Salon</Text>
                                                    <Controller   
                                                        control={control}
                                                        render={({field: {onChange, onBlur,value}}) => (
                                                            <Input
                                                            placeholder="nombre de salons"
                                                            rightIcon={{
                                                                type:"font-awesome-5",
                                                                name: "chair",
                                                                size: 40
                                                            }}
                                                            keyboardType="numeric"
                                                            
                                                            onChangeText={value => onChange(value)}
                                                            
                                                        />
                                                        )}
                                                        name="Nbre_salon"
                                                        rules={{required: true}}

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
                                                placeholder="nombre de salle de bain"
                                                rightIcon={{
                                                    type:"font-awesome",
                                                    name: "bathtub",
                                                    size: 40
                                                }}
                                                keyboardType="numeric"
                                                
                                                onChangeText={value => onChange(value)}
                                                
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
                                                    placeholder="nombre de personnes"
                                                    rightIcon={{
                                                        type:"foundation",
                                                        name: "torsos-all",
                                                        size: 40
                                                    }}
                                                    keyboardType="numeric"
                                                    
                                                    onChangeText={value => onChange(value)}
                                                    
                                                />
                                                )}
                                                name="Capacite_acceuil"
                                                rules={{required: true}}
                                            />
                                    </View>
                                    <View>
                                    {
                                        WatchType_residence === '' | WatchNbre_chambre === '' | WatchCapacite_acceuil === '' | WatchNbre_salon === '' ?

                                        <Button title="suivant" 
                                        disabled={true}
                                        /> :

                                        <Button 
                                        title="suivant" 
                                        onPress={() => Suivant()}
                                        />
                                    }
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