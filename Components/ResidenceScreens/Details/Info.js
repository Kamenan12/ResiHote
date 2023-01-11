import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import {Button, Icon, Input} from '@rneui/themed'
import tw from "twrnc"






const Info = (props) => {
    const [modif, SetModif] = useState(false)
    return (

        modif === false ? (

        <>
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
                        <Text style={[{color: "gray", fontWeight: "700", fontSize: 15}]}> {props.Description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus expedita aperiam at praesentium odit magni! Voluptatem voluptas dolore cum maxime dolorum repellendus cumque, atque tempora doloremque, tenetur necessitatibus, soluta quos.</Text>
                    </View>
                    <Button title="modifier" onPress={() => SetModif(true)}/>
        </>
        ) : <ModifInfo  modif={SetModif}/>
    )
}





const ModifInfo = (props) => {

    const { register, watch, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
          
          Titre: '',
          Description: '',
        } 
      });
    return (

        <View>
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

            <Button title="annueler" onPress={() => props.modif(false)}/> 
        </View>
    )
}


export default Info;



const styles = StyleSheet.create({


})