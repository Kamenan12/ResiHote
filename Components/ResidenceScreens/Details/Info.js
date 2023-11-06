import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase";
import { db } from '../../../firebase';
import { query, addDoc, collection, onSnapshot, where, getDocs, doc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import {Button, Icon, Input} from '@rneui/themed'
import tw from "twrnc"






const Info = (props) => {

    const Navigation = useNavigation();

    const idDoc = props.idDoc
    const idDocUser = props.idDocUser

    const { register, watch, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
          Titre: '',
          Description: '',
        } 
      });
    const [modif, SetModif] = useState(false)

    
    const ValInfo = async (data) => {
        
    
        try {
                
                     if (data) {
                         
                         
                        await updateDoc(doc(db, `residences`, idDoc),{
                            Titre: data.Titre,
                            Description: data.Description,
                            date_update: serverTimestamp()
                          })
                        console.log("Residence ajouter")
                     }

                
              

                     } catch (e) {
                         console.log(e)
                     }
                 

     
     Navigation.navigate('Residence')
      }


    return (

        modif === false ? (

        <>
            <View style={tw`px-5`}>
                <View style={tw`flex-row justify-between`}>
                            <Text style={[{ fontSize: 33, fontWeight: "700", fontFamily: "serif"}]}>{props.Titre} </Text>
                </View>
                <View style={tw`flex-row`}>
                            
                            <View style={tw`flex-row`}>
                                <Icon  name="location" color="black" type="entypo" size={25}/>
                                <Text style= {[{fontSize: 17, fontWeight: "700", fontFamily:"sans-serif", color: "black"}]}> {props.Localite.ville}</Text>
                            </View>
                            <View style={tw`flex-row`}>
                                    
                                <Text style= {[{fontSize: 17, fontWeight: "700", fontFamily:"sans-serif", color: "black"}]}> {props.Localite.commune}</Text>
                                {/* <Text style={[{color:"gray"}]}> un bon quatier près</Text> */}
                            </View>
                        </View>
                            <View style={tw`flex-row`}>
                            <Icon  name="location-pin" color="black" type="entypo" size={25}/> 
                                <Text style={[{fontSize: 15, fontWeight: '500'}]}> {props.Localite.description}</Text>
                            </View>
                
                        <View style={tw`pt-5`}>
                            <Text style={[{color: "gray", fontWeight: "700", fontSize: 15}]}> {props.Description} </Text>
                        </View>
                        <View style={tw`items-end pt-5 px-5`}>
                            <Button title="modifier" onPress={() => SetModif(true)}
                                buttonStyle={tw`bg-transparent border rounded-xl`}
                                titleStyle={{
                                    color: "red"
                                }}
                                // icon={{
                                //     name: "cancel",
                                //     type: "material",
                                //     size: 15,
                                //     color: "red"
                                    
                                // }}
                                
                                // iconRight
                            />
                        </View>
            </View>
        </>
        ) :  (

            <View style={tw`py-5 px-2`}>
                    <View>
                        <Text> Titre de l'annonce</Text>
                        <Controller   
                            control={control}
                            render={({field: {onChange, onBlur,value}}) => (
                                <Input
                                    placeholder="Titre de l'annonce "
                                    
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                            )}
                            name="Titre"
                            rules={{ required: true, minLength: 10}}
                            />

                            {/* {errors.Titre?.type === "required" && <Text style={{  fontSize: 18}}>*Le Titre est obligatoire*</Text>} */}
                            {/* {errors.nom?.type === "pattern" && <Text style={{ color: "white", fontSize: 18}}>* Pas de caractere special * </Text>} */}
                            {errors.Titre?.type === "minLength" && <Text style={{ fontSize: 15}}>*Minimum de caractere 10 * </Text>}
                            {errors.Titre?.type === "required" && <Text style={{  fontSize: 18}}>*Le Titre est obligatoire*</Text>}
                            
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
                            rules={{required: true, maxLength: 250, minLength: 30}}
                            />

                            {errors.Description?.type === "required" && <Text style={{  fontSize: 18}}>*La Description est obligatoire*</Text>}
                            {errors.Description?.type === "minLength" && <Text style={{ fontSize: 15}}>*Minimum de caractere 30 * </Text>}
                            {errors.Description?.type === "maxLength" && <Text style={{  fontSize: 18}}>*Le Maximun de caractere est 250*</Text>}
                    </View>
                    <View style={tw`flex-row w-80 justify-between pt-5 px-5`}>
                        <Button title="annueler" onPress={() => SetModif(false)}
                            buttonStyle={tw`bg-transparent border rounded-xl`}
                            titleStyle={{
                                color: "red"
                            }}
                            icon={{
                                name: "cancel",
                                type: "material",
                                size: 15,
                                color: "red"
                                
                            }}
                            
                            iconRight
                        /> 
                        <Button title="Valder" onPress={handleSubmit(ValInfo)}
                            buttonStyle={tw`bg-transparent border rounded-xl`}
                            titleStyle={{
                                color: "red"
                            }}
                            icon={{
                                name: "checkcircle",
                                type: "antdesign",
                                size: 15,
                                color: "red"
                                
                            }}
                            
                            iconRight
                        /> 
                    </View>
            </View>
        )
    )
}





// const ModifInfo = (props) => {

    

      
//     return (

//         <View style={tw`py-5 px-2`}>
//             <View>
//                 <Text> Titre de l'annonce</Text>
//                 <Controller   
//                     control={control}
//                     render={({field: {onChange, onBlur,value}}) => (
//                         <Input
//                             placeholder="Titre de l'annonce "
                            
//                             onChangeText={value => onChange(value)}
//                             value={value}
//                         />
//                     )}
//                     name="Titre"
//                     rules={{ required: true, minLength: 10}}
//                     />

//                     {/* {errors.Titre?.type === "required" && <Text style={{  fontSize: 18}}>*Le Titre est obligatoire*</Text>} */}
//                     {/* {errors.Titre?.type === "minLength" && <Text style={{ color: "red", fontSize: 18}}>*Minimum de caractere 10 * </Text>} */}
//                     {/* {errors.nom?.type === "pattern" && <Text style={{ color: "white", fontSize: 18}}>* Pas de caractere special * </Text>} */}
//                      <View>
//                         {errors.Titre?.type === "required" && <Text style={{  fontSize: 18}}>*Le Titre est obligatoire*</Text>}
//                      </View>
//             </View>
//             <View>
//                 <Text> Description de la chambre</Text>
//                 <Controller   
//                     control={control}
//                     render={({field: {onChange, onBlur,value}}) => (
//                         <Input
//                         placeholder="Description Resumee de la chambre"
//                         multiline
//                         numberOfLines={6}
//                         maxLength={250}
//                         onChangeText={value => onChange(value)}
//                         // containerStyle={{
//                         //     height: 120,
//                         // }}
//                         rightIcon={
//                             <View style={{ width: 28, height: 40, top: 40}}>
//                                 <Text style={{ fontSize: 15, color: "gray"}}> 250</Text>
//                             </View>
//                         }
//                     />
//                     // <TextArea />
//                     )}
//                     name="Description"
//                     rules={{required: true}}
//                     />
//             </View>
//             <View style={tw`flex-row w-80 justify-between pt-5 px-5`}>
//                 <Button title="annueler" onPress={() => props.modif(false)}
//                     buttonStyle={tw`bg-transparent border rounded-xl`}
//                     titleStyle={{
//                         color: "red"
//                     }}
//                     icon={{
//                         name: "cancel",
//                         type: "material",
//                         size: 15,
//                         color: "red"
                        
//                     }}
                    
//                     iconRight
//                 /> 
//                 <Button title="Valder" onPress={() => [ handleSubmit(ValideInfo)]}
//                     buttonStyle={tw`bg-transparent border rounded-xl`}
//                     titleStyle={{
//                         color: "red"
//                     }}
//                     icon={{
//                         name: "checkcircle",
//                         type: "antdesign",
//                         size: 15,
//                         color: "red"
                        
//                     }}
                    
//                     iconRight
//                 /> 
//             </View>
//         </View>
//     )
// }


export default Info;



const styles = StyleSheet.create({


})