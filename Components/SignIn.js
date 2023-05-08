import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import { Icon } from "@rneui/themed";
import { auth } from "../firebase";
import { db } from "../firebase";

import tw from "twrnc"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { async } from "@firebase/util";




const SignIn = () => {

    const navigation = useNavigation();


    const { register, getValues, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
          nom: '',
          prenom: '',
          pseudo: '',
          email: '',
          passWord: '',
          confirmPassWord: ''
          
        }
      });

    const Login = () => {
        navigation.navigate("Login")
    }

    const inscription = async(data) => {
        createUserWithEmailAndPassword(auth, data.email, data.passWord).then( async( userCredential) => {
            const user = userCredential.user;

            try {
                const docRef  = await addDoc(collection(db, "hotes"), {
                    userHote: user.uid,
                    nom: data.nom,
                    prenom: data.prenom,
                    pseudo: data.pseudo,
                    email: data.email,
                    date_create: serverTimestamp()


                })
                console.log("User ajouter a la collection", docRef.id)
            } catch (e) {
                console.log("erreur d'ajout de user en collection", e.code)
            }
            // navigation.navigate("Home")
        }

        ).catch((e) => {
            console.log("Error firebaseCode", e.code)
            console.log("Error firebaseMessage", e.message)
        })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Home-G")
            }
        })
        return unsubscribe
    })

    return (
        
        <View style={[tw` h-full `]}>
                <LinearGradient 
                    colors={['#FF2A2A','#FF6D21']}
                    style={styles.backGround}
                    >
                <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={[tw`p-6 items-center`]}>
                            <View>
                                <Text style={[tw``, { fontSize: 65, color: "white", fontWeight: "700"}]}>Bienvenue</Text>
                            </View>
                            <View>
                                <Text style={[tw``, { color: "white", fontSize: 20, fontWeight: "400"}]}>Etes vous deja un compte ?  </Text>
                                <Text style={[tw``, { color: "white", fontSize: 20, fontWeight: "400"}]}>Connectez maintenant</Text>
                            </View>
                            <View style={[tw` `, ]}>
                                <TouchableOpacity style={[tw` p-4 rounded-full w-80 items-center mt-4 shadow-md shadow-black `, { backgroundColor: "#FF5D2A",}]}
                                onPress={() => {Login()}}
                                > 
                                    <Text style={[tw``, {fontSize: 22, color: "white", fontWeight: "600"}]}>Connexion </Text>
                                </TouchableOpacity>

                                <View style={[tw` mt-10`, {}]}>
                                    {/* Debut de champ nom  */}
                            <View>
                                <Text style={[tw``, { color: "white", fontSize: 26, fontWeight: "500"}]}>Votre Nom</Text>
                                <View style={[tw``]}>
                                    <Controller 
                                    control={control}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <TextInput placeholder="Entrez votre Nom" 
                                        placeholderTextColor="white"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                        style={[styles.Input]}
                                        ri
                                        />
                                    )}
                                    name="nom"
                                    rules={{ required: true, minLength: 2, pattern: /^[A-Za-z]+$/i}}
                                    />
                                  
                                    <View style={[tw`absolute right-5 top-5`]}>

                                        <Icon name="person" type="ionicon" color="white" size={28} />
                                    </View>
                                    {errors.nom?.type === "required" && <Text style={{ color: "white", fontSize: 18}}>*Le nom est obligatoire*</Text>}
                                    {errors.nom?.type === "minLength" && <Text style={{ color: "white", fontSize: 18}}>*Minimum de caractere 2 * </Text>}
                                    {errors.nom?.type === "pattern" && <Text style={{ color: "white", fontSize: 18}}>* Pas de caractere special * </Text>}
                                </View>
                            </View>
                            {/* fin de champ nnom */}
                            {/* debut de champ prenom  */}
                            <View style={[tw`mt-5`]}>
                                <Text style={[tw``, { color: "white", fontSize: 26, fontWeight: "500"}]}>Votre prenom</Text>
                                <View style={[tw``]}>
                                    <Controller 
                                    control={control}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <TextInput placeholder="Entrez votre prenom" 
                                        placeholderTextColor="white"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                        style={[styles.Input]}
                                        
                                        />
                                    )}
                                    name="prenom"
                                    rules={{ required: true, minLength: 2, pattern: /^[A-Za-z]+$/i}}
                                    />
                                   
                                    <View style={[tw`absolute right-5 top-5`]}>

                                        <Icon name="person-add" type="ionicon" color="white" size={28} />
                                    </View>
                                    {errors.prenom?.type === "required" && <Text style={{ color: "white", fontSize: 18}}>*Prenom obligatoire * </Text>}
                                    {errors.prenom?.type === "minLength" && <Text style={{ color: "white", fontSize: 18}}>*caractere Minimum 2 * </Text>}
                                    {errors.prenom?.type === "pattern" && <Text style={{ color: "white", fontSize: 18}}>* Pas de caractere special * </Text>}
                                </View>
                            </View>
                            {/* fin de champ de prenom  */}

                            {/* debut de champ Pseudo  */}
                            <View style={[tw`mt-5`]}>
                                <Text style={[tw``, { color: "white", fontSize: 26, fontWeight: "500"}]}>Votre Pseudo</Text>
                                <View style={[tw``]}>
                                    <Controller 
                                    control={control}
                                    render={({field: {onChange,onBlur, value}}) => (
                                        <TextInput placeholder="Entrez votre Pseudo" 
                                            placeholderTextColor="white"
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                            style={[styles.Input]}
                                    
                                    />
                                    )}
                                    name="pseudo"
                                    rules={{ required: true, minLength: 3,pattern: /^[A-Za-z-0-9]+$/i}}
                                    /> 
                                    
                                    <View style={[tw`absolute right-5 top-5`]}>

                                        <Icon name="ios-person-circle-outline" type="ionicon" color="white" size={28} />
                                    </View>
                                    {errors.pseudo?.type === "required" && <Text style={{ color: "white", fontSize: 18}}>*Pseudo obligatoire * </Text>}
                                    {errors.pseudo?.type === "pattern" && <Text style={{ color: "white", fontSize: 18}}>*Lettre et chiffre * </Text>}
                                    {errors.pseudo?.type === "minLength" && <Text style={{ color: "white", fontSize: 18}}>*Minimum de caratere 3* </Text>}
                                </View>
                            </View>
                            {/* fin de champ Pseudo  */}

                            {/* debut de champ email  */}
                            <View style={[tw`mt-5`]}>
                                <Text style={[tw``, { color: "white", fontSize: 26, fontWeight: "500"}]}>Votre Adresse E-mail</Text>
                                <View style={[tw``]}>
                                    <Controller 
                                    control={control}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <TextInput placeholder="Entrez votre E-mail" 
                                        placeholderTextColor="white"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                        style={[styles.Input]}
                                        
                                    />
                                    )}
                                    name="email"
                                    rules={{ required: true, minLength: 4, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }}
                                    />
                                    
                                    <View style={[tw`absolute right-5 top-5`]}>

                                        <Icon name="ios-mail-unread" type="ionicon" color="white" size={28} />
                                    </View>
                                    {errors.email?.type === "minLength" && <Text style={{ color: "white", fontSize: 18}}>*Minimum de caratere 4* </Text>}
                                    {errors.email?.type === "required" && <Text style={{ color: "white", fontSize: 18}}>*E-mail obligatoire* </Text>}
                                    {errors.email?.type === "pattern" && <Text style={{ color: "white", fontSize: 18}}>*Entrez un E-mail valide* </Text>}
                                </View>
                            </View>
                            {/* fin de champ de email   */}

                            {/* debut de champ de mot de passe  */}
                            <View style={[tw`mt-5`]}>
                                <Text style={[tw``, { color: "white", fontSize: 26, fontWeight: "500"}]}>Votre mot de passe</Text>
                                <View style={[tw``]}>
                                    <Controller 
                                    control={control}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <TextInput placeholder="Entrez votre mot de passe" 
                                        placeholderTextColor="white"
                                        secureTextEntry
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                        style={[styles.Input]}
                                    
                                    />
                                    )}
                                    name="passWord"
                                    rules={{ required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/}}
                                    />
                                    
                                    <View style={[tw`absolute right-5 top-5`]}>

                                        <Icon name="md-key-outline" type="ionicon" color="white" size={28} />
                                    </View>
                                    {errors.passWord?.type === "required" && <Text style={{ color: "white", fontSize: 18}}>*Mot de passe obligatoire* </Text>}
                                    {errors.passWord?.type === "pattern" && <Text style={{ color: "white", fontSize: 18}}>*Majuscule, minuscule, Chiffre, entre 6-15* </Text>}
                                </View>
                            </View>

                            {/* fin de champ de mot de passe  */}

                            {/* Debut de champ de verification de mot de passe  */}
                            <View style={[tw`mt-5`]}>
                                <Text style={[tw``, { color: "white", fontSize: 26, fontWeight: "500"}]}>Verification de mot de passe</Text>
                                <View style={[tw``]}>
                                    <Controller 
                                    control={control}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <TextInput placeholder="Entrez votre mot de passe " 
                                        placeholderTextColor="white"
                                        secureTextEntry
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                        style={[styles.Input]}
                                        
                                        />
                                    )}
                                    name="confirmPassWord"
                                    rules={{ required: true, 
                                        validate: (val) => {
                                            const { passWord } = getValues();
                                            return passWord === val 
                                    } }}
                                    />
                                    
                                    <View style={[tw`absolute right-5 top-5`]}>

                                        <Icon name="md-key-outline" type="ionicon" color="white" size={28} />
                                    </View>
                                    {errors.confirmPassWord?.type === "required" && <Text style={{ color: "white", fontSize: 18}}>*confirmation obligatoire </Text>}
                                    {errors.confirmPassWord?.type === "validate" && <Text style={{ color: "white", fontSize: 18}}>*mot de passe Different*</Text>}
                                </View>
                            </View>
                            {/* Fin de champ de verification de mot de passe  */}

                            <View style={[tw`mt-10 items-center mb-5`]}>
                            <TouchableOpacity style={[tw`border-2 border-white p-4 rounded-full w-60 items-center`]} 
                                onPress={handleSubmit(inscription)}> 
                                 <Text style={[tw``, {fontSize: 22, color: "white", fontWeight: "600"}]}>Inscription</Text>
                            </TouchableOpacity>
                           
                            </View>
                        </View>
                            </View>
                        </View>

                        
        </ScrollView>
                    </LinearGradient>
            </View>
    )
}


export default SignIn;

const styles = StyleSheet.create({
    backGround: {
        left: 0,
        right: 0,
        top: 0,
        height: 800,
    },
    Input: {
        borderBottomWidth: 2,
        borderBottomColor: "white",
        height: 55,
        color: "white",
        fontSize: 20,
        fontWeight: "500",
    }
});