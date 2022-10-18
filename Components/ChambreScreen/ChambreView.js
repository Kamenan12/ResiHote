import { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from "@rneui/themed";
import tw from 'twrnc'
import InfoNewResi from "./InfoNewResi";
import { itemsTypeResi } from "../Data/Data";



const ChambreView = () => {
    // initialsation des constante 
    const [step, setStep] = useState(1); // initalisation des etape
    const [valeur, setValeur] = useState()

    // Intialisation des champ a controller par useForm 
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
          type_residence: '',
          Nbre_chambre: '',
          Nbre_salon:'',
          Nbre_bain:''
          
        }
      });


    //   donner pour type de residances
      const [openTypeResi, setOpenTypeResi] = useState(false)
      
   
    const [openNbreChambre, setOpenNbreChambre] = useState(false)
    

    // code des foncions 
    const Suivant = () => {
        setStep(step + 1)
    }

    const Precedent = () => {
        setStep(step - 1)
    }

    return (
        <>
            {(() => {
                switch (step) {
                    // code de la premiere etape 
                    case 1:
                        return (
                            <View style={tw`bg-white`}>
                                <ScrollView nestedScrollEnabled={true}>
                            <Text style={[{ fontSize: 22, fontWeight:"600", fontFamily:"serif"}, tw``]}> Localite dans </Text>
                                           <View style={[tw`pt-10`]}>
                                            {/* Type de Residences a choisir  */}
                                               <View style={[tw`px-3`]}>
                                                   <Text style={[tw`pb-4`, {color: "black", fontSize: 20}]}> Type de residence </Text>
                                                   <Controller 
                                                   control={control}
                                                   render={({field: {onChange, onBlur, value}}) => (
                                                    <DropDownPicker 
                                                            open={openTypeResi}
                                                            value={value}
                                                            items={itemsTypeResi }
                                                            setOpen={setOpenTypeResi}
                                                            setValue={value => onChange(value)}
                                                            placeholder="Type de residences"
                                                            dropDownDirection="AUTO"
                                                            listMode="MODAL"
                                                            style={{
                                                                borderRadius: 0,
                                                            }}
                                                    />
                                                   
                                                   )}
                                                   name="type_residence"
                                                   rules={{ required: true, maxLength: 50}}
                                                   />
                                               </View>
                                               {errors.nom?.type === "required" && <Text style={{ color: "white", fontSize: 18}}>*Le Type obligatoire*</Text>}
                                               {/* {errors.nom?.type === "minLength" && <Text style={{ color: "white", fontSize: 18}}>*Minimum de caractere 2 * </Text>} */}
                                               {/* Type de Residences a choisir  */}
                                               <View style={[tw`px-3`]}>
                                                   <Text style={[tw`pt-6`, {color: "#7C8593", fontSize: 25, color: "black"}]}> Nombre de pieces  </Text>
                                                   <View style={[tw` py-3`]}>
                                                            <View style={[tw`py-3`]}>
                                                                <Text style={[tw``, {fontSize: 19,}]}> Nombre de Chambre :</Text>
                                                            </View>
                                                            <Controller 
                                                            control={control}
                                                            render={({field: {onChange, onBlur, value}}) => (
                                                                <TextInput   style={[tw``, styles.Input, {}]} keyboardType={"number-pad"} />
                                                            
                                                         )}
                                                            name="Nbre_chambre"
                                                            rules={{ required: true, maxLength: 50}}
                                                            /> 
                                                   </View>
                                                   {/* <TextInput   style={[tw``, styles.Input, {}]} multiline={ true}/> */}
                                               </View>
                                               <View>
                                                   <Text style={[tw`pt-6`, {color: "#7C8593", fontSize: 20}]}> Prix  </Text>
                                                   <TextInput   style={[tw``, styles.Input, {}]} keyboardType={"number-pad"} />
                                               </View>
                                               <View>
                                                   <Text style={[tw`pt-6`, {color: "#7C8593", fontSize: 20}]}> Prix  </Text>
                                                   <TextInput   style={[tw``, styles.Input, {}]} keyboardType={"number-pad"} />
                                               </View>
                                             
                                              
                                               
                                           </View>
                                           <View style={tw`flex-row justify-evenly w-60`}>
                                               
                                               <Text style={tw`bg-blue-300`} onPress={()=> Suivant()}> Suivant </Text>
                                           </View>
                                           </ScrollView>
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