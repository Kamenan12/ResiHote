import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import tw from 'twrnc'
import InfoNewResi from "./InfoNewResi";



const ChambreView = () => {
    // initialsation des constante 
    const [step, setStep] = useState(1); // initalisation des etape

    // Intialisation des champ a controller par useForm 
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
          nom: '',
          description: '',
          
        }
      });



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
                            <View>
                            <Text style={[{ fontSize: 50, fontWeight:"600", fontFamily:"serif"}, tw``]}> Localite dans </Text>
                                           <View style={[tw`pt-10`]}>
                                               <View>
                                                   <Text style={[tw``, {color: "#7C8593", fontSize: 20}]}> Nom  </Text>
                                                   <Controller 
                                                   control={control}
                                                   render={({field: {onChange, onBlur, value}}) => (
                                                       <TextInput   
                                                           style={styles.Input}
                                                           onBlur={onBlur}
                                                           onChangeText={value => onChange(value)}
                                                           value={value}

                                                       />
                                                   
                                                   )}
                                                   name="nom"
                                                   rules={{ required: true, maxLength: 50}}
                                                   />
                                               </View>
                                               {errors.nom?.type === "required" && <Text style={{ color: "white", fontSize: 18}}>*Le nom est obligatoire*</Text>}
                                               {errors.nom?.type === "minLength" && <Text style={{ color: "white", fontSize: 18}}>*Minimum de caractere 2 * </Text>}
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
                                               
                                               <Text style={tw`bg-blue-300`} onPress={()=> Suivant()}> Suivant </Text>
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
        
        width: 350
    }
})