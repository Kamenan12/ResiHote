import { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Image } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon, Button, BottomSheet, ListItem, Input, CheckBox } from "@rneui/themed";
import tw from 'twrnc'
import InfoNewResi from "./InfoNewResi";
import { itemsTypeResi } from "../Data/Data";
import MapScreen from "./MapScreen";
import Img from "./Img";



const ChambreView = () => {
    // initialsation des constante 
    const [step, setStep] = useState(1); // initalisation des etape
    // const [valeur, setValeur] = useState()

    // constante pour les ouverture de modal
    const [typeResi, setTypeResi] = useState(false)
    const [equipBase, setEquipBase] = useState(false)
    const [equipExtra, setEquipExtra] = useState(false)

    // state de equipement de basee
    const [tv, setTv] = useState(false);
    const [refrigerateur, setRefrigerateur] = useState(false);
    const [climatiseur, setClimatiseur] = useState(false)
    // Equipement extra 
    const [jardin, setJardin] = useState(false)
    const [garage, setGarage] = useState(false)

    // pour la selection desimage de residences
    const [openImage, setOpenImage] = useState(false);
 
    // Intialisation des champ a controller par useForm 
    const { register, watch, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
          type_residence: '',
          Nbre_chambre: '',
          Nbre_salon:'',
          Nbre_bain:'',
          Capacite_acceuil: '',
          Equipement_bases: [],
          Equipement_extra: [],
          Prix: '',
          Localisation: [],
          Images: [],
          Titre: '',
          Description: ''
        }
      });


      const WatchType_residence = watch('type_residence');
      const WatchNbre_chambre = watch('Nbre_chambre');
      const WatchNbre_salon = watch('Nbre_salon');
      const WatchNbre_bain = watch('Nbre_bain');
      const WatchCapacite_acceuil = watch('Capacite_acceuil');
      const WatchEquipement_bases = watch('Equipement_bases');
      const WatchEquipement_extra = watch('Equipement_extra');
      const WatchLocalisation = watch('Localisation');
      const WatchImage = watch('Images');

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

       //// fin des donneees 

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
                        <View >
                            <View>
                                <Text>Etape 2</Text>
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
                                        
                                    />
                                )}
                                name="Prix"
                                rules={{required: true}}

                                />
                            </View>
                            <View style={tw`flex-row justify-evenly w-60`}>
                                
                                <Button title="suivant"
                                    onPress={() => Suivant()} 
                                />
                                <Button title="precedent"
                                    onPress={() => Precedent()} 
                                />
                            </View>
                        </View> 
                        );
                    case 3: 
                    return (
                        <View style={[tw`bg-white`]}>
                            {/* <Text> 3eme etape </Text> */}

                            <View style={[tw` `]}> 
                                <Controller
                                control={control} 
                                render={({ field: {onChange, onBlur, value}}) => (

                                    // <Localite onChange={onChange}/>
                                    <MapScreen onChange={onChange}/>
                                )}
                                name="Localisation"
                                /> 
                                {console.log('lcalisation', WatchLocalisation)}
                            </View>
                            {/* <MapScreen /> */}
                            <View style={[tw`flex-row justify-around w-95`, {position: "absolute", top: 550}]}>
                                    
                                   
                                    <Button title="precedent"
                                    onPress={() => Precedent()} 
                                    />
                                     <Button title="suivant"
                                    onPress={() => Suivant()} 
                                    />
                                    {/* <Button title="handle"
                                    onPress={handleSubmit(tapContro)}
                                        /> */}
                                </View>
                        </View>
                    );
                    case 4: 
                    return (
                        
                              
                        openImage === false ? (
                                      
                            <View style={[tw``]}>
                                <View>
                                <Button title='bouton ouvre Image' 
                                    onPress={() => setOpenImage(!openImage)}
                                    color='green'
                                 />
                                 {
                                    WatchImage ? (
                                        <ScrollView horizontal>
                                            <View  style={[tw`flex-row`]}>
                                               { WatchImage.map((img, index) => (
                                                <View key={index} >
                                                    <Image source={{uri: img.uri}} style={{ height: 250, width: 250}} />
                                                </View>
                                                ))}
                                            </View>
                                        </ScrollView>
                                    ) :
                                    (null)
                                 }
                                </View>
                                <View>
                                    <Text> Titre de l'annonce</Text>
                                    <Controller   
                                        control={control}
                                        render={({field: {onChange, onBlur,value}}) => (
                                            <Input
                                            placeholder="Titre de l'annonce "
                                                                                                    
                                            onChangeText={value => onChange(value)}
                                            
                                        />
                                        )}
                                        name="Titre"
                                        rules={{required: true}}
                                        />
                                </View>
                                <View>
                                    <Text> Description de la chambre</Text>
                                    <Controller   
                                        control={control}
                                        render={({field: {onChange, onBlur,value}}) => (
                                            <Input
                                            placeholder="Description Resumee de la chambre"
                                            multiline
                                            numberOfLines={6}
                                            maxLength={250}
                                            onChangeText={value => onChange(value)}
                                            // containerStyle={{
                                            //     height: 120,
                                            // }}
                                            rightIcon={
                                                <View style={{ width: 28, height: 40, top: 40}}>
                                                    <Text style={{ fontSize: 15, color: "gray"}}> 250</Text>
                                                </View>
                                            }
                                        />
                                        // <TextArea />
                                        )}
                                        name="Description"
                                        rules={{required: true}}
                                        />
                                </View>
                                
                                 <View style={[tw`flex-row justify-around w-95`]}>
                                     <Button title="suivant"
                                         onPress={() => Suivant()} 
                                         />
                                         <Button title="precedent"
                                         onPress={() => Precedent()} 
                                         /> 
                                 </View>
                                {/* {console.log("les inage selectionnes", WatchImage)} */}
                            </View>
                        ) : (
                            <Controller 
                                control={control}
                                render={({field: {onChange, onBlur, value }}) => (

                                    <Img open={setOpenImage} onChange={onChange}/>
                                )}
                                name="Images"
                            />
                            
                            // <View>
                            //     <Text>OUIIIIII</Text>
                            //     <Button title="bou ferme image" 
                            //         onPress={() => setOpenImage(!openImage)}
                            //     />
                            // </View>
                        )
                        
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