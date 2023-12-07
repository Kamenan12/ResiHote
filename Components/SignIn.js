import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import { Icon, Button } from "@rneui/themed";
import { auth } from "../firebase";
import { db } from "../firebase";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "twrnc"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";
import OneSignal from 'react-native-onesignal';
import Loading from './Loading';




const SignIn = () => {

    const navigation = useNavigation();
    const [step, setStep] = useState(1)
    const [chargement, setChargement] = useState(false)

    const { register, getValues, setValue, handleSubmit,setError, control ,reset, formState: { errors } } = useForm({
        defaultValues: {
          nom: '',
          prenom: '',
          pseudo: '',
          email: '',
          passWord: '',
          confirmPassWord: ''
          
        },
        mode: "onChange"
      });

    const Login = () => {
        navigation.navigate("Login")
    }
    // fonction de suivant 
    const Suivant = () => {
        // setError("nom", {
        //     types: {
        //       required: "This is required",
        //       minLength: "This is minLength",
        //     },
        //   })
        setStep(step + 1 )
        
    }
    //  fonction de precedent 
    const Precedent = () => {
        setStep(step - 1 )
    }

    // const showToast = () => {
    //     Toast.show({
    //         type: 'error',
    //         text1: 'This is an info message'
    //     })
    // }

    const inscription = async(data) => {
        if (errors.nom || errors.prenom || errors.pseudo) {
            alert("veuiller remplir tout les champ")
        } else (
            createUserWithEmailAndPassword(auth, data.email, data.passWord).then( async( userCredential) => {
                setChargement(true)
                const user = userCredential.user;
    
                // try {
                //     const docRef  = await addDoc(collection(db, "hotes"), {
                //         userHote: user.uid,
                //         nom: data.nom,
                //         prenom: data.prenom,
                //         pseudo: data.pseudo,
                //         email: data.email,
                //         date_create: serverTimestamp()
     
     
                //     })
                try {
                    // const myCollection = doc(collection(db, "hotes"), `${user.uid}`);
                    const docRef  = await setDoc(doc(db, "hotes", user.uid), {
                        // userHote: user.uid,
                        nom: data.nom,
                        prenom: data.prenom,
                        pseudo: data.pseudo,
                        email: data.email,
                        date_create: serverTimestamp()
     
     
                    })
                    console.log("User ajouter a la collection")
                    AddExternalUserIdOneSignal(user.uid)
                    navigation.navigate("Home-G")
                } catch (e) {
                    console.log("erreur d'ajout de user en collection", e)
                }
                setChargement(false)
            }
    
            ).catch((e) => {
                if (e.code == "auth/email-already-in-use") {
                    alert("Mail deja utilise")
                }
                // console.log("Error firebaseCode", e.code)
                // console.log("Error firebaseMessage", e.message)
            })
        )
    }

     // ******** Ajout du code de oneSignale pour lier le External_user_id avec Id de user 
     const AddExternalUserIdOneSignal = async(idUser) => {
        OneSignal.setExternalUserId(idUser, (results) => {
        // The results will contain push and email success statuses
        console.log('Results of setting external user id');
        console.log(results);
        
        // Push can be expected in almost every situation with a success status, but
        // as a pre-caution its good to verify it exists
        if (results.push && results.push.success) {
        console.log('Results of setting external user id push status:');
        console.log(results.push.success);
        }
        
        // Verify the email is set or check that the results have an email success status
        if (results.email && results.email.success) {
        console.log('Results of setting external user id email status:');
        console.log(results.email.success);
        }
    
        // Verify the number is set or check that the results have an sms success status
        if (results.sms && results.sms.success) {
        console.log('Results of setting external user id sms status:');
        console.log(results.sms.success);
        }
    });
}

// ******* fin de code oneSignal pour External_user_id 

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             navigation.navigate("Home-G")
    //         }
    //     })
    //     return unsubscribe 
    // })

    return (
        <>
            {
                ( () => {
                    switch (step) {
                        case 1: 
                            return (
                                <LinearGradient 
                                colors={['#FF2A2A','#FF6D21']}
                                style={styles.backGround}
                                >
                                    <View style={[tw` `]}>
                                        <View style={[tw`p-6 items-center`]}>
                                            <View>
                                                <Text style={[tw``, { fontSize: 65, color: "white", fontWeight: "700"}]}>Bienvenue</Text>
                                            </View>
                                            <View>
                                                <Text style={[tw``, { color: "white", fontSize: 20, fontWeight: "400"}]}>Etes vous deja un compte ?  </Text>
                                                <Text style={[tw``, { color: "white", fontSize: 20, fontWeight: "400"}]}>Connectez maintenant</Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* {
                                                errors.pseudo?.type === "required" &&
                                                <View style={tw`bg-black m-2`}>
                                                    <Text style={{color: "white"}}> Erreur des Champs pseudo</Text>
                                                    <Text style={{color: "white"}}> Veuillez Verifier si tout les champs sont correct</Text>
                                                </View>
                                                
                                            } */}

                                    <View style={[tw` mt-5 p-6`, {}]}>
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
                                    </View>
                                    
                                    <View style={tw`flex-row justify-center `}>
                                    {/* {
                                        (errors.nom? 
                                        <Button title="suivant"
                                            onPress={() => Suivant()}
                                            disabled
                                            buttonStyle={[tw`bg-transparent border-2 border-white p-4 rounded-full w-40 items-center mt-4`]} 
                                        /> :
                                        <Button title="suivant"
                                            onPress={() => Suivant()}
                                            
                                            buttonStyle={[tw`bg-transparent border-2 border-white p-4 rounded-full w-40 items-center mt-4`]} 
                                        />

                                    } */}
                                    {
                                        errors.nom?.type === "minLength" | errors.nom?.type === "pattern" | errors.nom?.type === "required" | errors.prenom?.type === "required"  | errors.prenom?.type === "minLength" | errors.prenom?.type === "pattern" ? 
                                        <Button title="suivant"
                                            onPress={() => Suivant()}
                                            disabled
                                            buttonStyle={[tw`bg-transparent border-2 border-white p-4 rounded-full w-40 items-center mt-4`]} 
                                        /> :
                                        <Button title="suivant"
                                            onPress={() => Suivant()}
                                            buttonStyle={[tw`bg-transparent border-2 border-white p-4 rounded-full w-40 items-center mt-4`]} 
                                        />
                                    }
                                        {/* <Button title="suivant"
                                            onPress={() => Suivant()}
                                            buttonStyle={[tw`bg-transparent border-2 border-white p-4 rounded-full w-40 items-center mt-4`]} 
                                        /> */}
                                        {/* <Button title="precedent"
                                            onPress={() => Precedent()} 
                                        /> */}
                                    </View>
                    </LinearGradient>
                            )
                            case 2: 
                            return (
                                <LinearGradient 
                                    colors={['#FF2A2A','#FF6D21']}
                                    style={[styles.backGround]}
                                    >
                                    
                                    {/* {
                                        errors.pseudo?.type === "required" &&  
                                        <View style={tw`bg-black m-2`}>
                                            <Text style={{color: "white"}}> Erreur des Champs nom</Text>
                                            <Text style={{color: "white"}}> Veuillez Verifier si tout les champs sont correct</Text>
                                        </View>
                                                
                                    } */}
                                    {/* debut de champ Pseudo  */}
                                        <View style={[tw` mt-40 px-6`]}>
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
                                    <View style={[tw`pt-15 px-6`]}>
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
                                    <View style={tw`flex-row justify-between pt-10 px-5 `}>
                                        
                                        <Button title="precedent"
                                            onPress={() => Precedent()} 
                                            buttonStyle={[tw`bg-transparent border-2 border-white p-4 rounded-full w-40 items-center mt-4`]}
                                        />
                                        {
                                            errors.pseudo?.type === "required" | errors.pseudo?.type === "minLength" | errors.pseudo?.type === "pattern" | errors.email?.type === "required" | errors.email?.type === "minLength" | errors.email?.type === "pattern"? 

                                            <Button title="suivant"
                                                onPress={() => Suivant()}
                                                disabled
                                                buttonStyle={[tw`bg-transparent border-2 border-white p-4 rounded-full w-40 items-center mt-4`]} 
                                            /> :
                                            <Button title="suivant"
                                                onPress={() => Suivant()}
                                                buttonStyle={[tw`bg-transparent border-2 border-white p-4 rounded-full w-40 items-center mt-4`]} 
                                            />
                                        }
                                    </View>
                                </LinearGradient>
                            )
                            case 3: 
                            return (
                                <>
                                    <LinearGradient 
                                        colors={['#FF2A2A','#FF6D21']}
                                        style={[styles.backGround]}
                                        >
                                            <Loading visi={chargement} />
                                            {/* {
                                                errors  &&
                                                <View style={tw`bg-black m-2`}>
                                                    <Text style={{color: "white"}}> Erreur des Champs nom</Text>
                                                    <Text style={{color: "white"}}> Veuillez Verifier si tout les champs sont correct</Text>
                                                </View>
                                                
                                            } */}
                                            {/* {
                                                errors.nom?.type === "required" &&
                                                <View style={tw`bg-black m-2`}>
                                                    <Text style={{color: "white"}}> Erreur des Champs nom</Text>
                                                    <Text style={{color: "white"}}> Veuillez Verifier si tout les champs sont correct</Text>
                                                </View>
                                                
                                            } */}
                                            {
                                                  errors.nom?.type === "required" | errors.nom?.type === "minLength" | errors.nom?.type === "pattern" | 
                                                  errors.prenom?.type === "required" | errors.prenom?.type === "minLength" | errors.prenom?.type === "pattern" | 
                                                  errors.pseudo?.type === "required" | errors.pseudo?.type === "minLength" | errors.pseudo?.type === "pattern"|
                                                  errors.email?.type === "required" | errors.email?.type === "minLength" | errors.email?.type === "pattern" |
                                                  errors.passWord?.type === "required" | errors.passWord?.type === "pattern" |
                                                  errors.confirmPassWord?.type === "required" | errors.confirmPassWord?.type === "validate" ?
                                                <View style={tw`bg-black m-2 rounded-lg p-4 flex-row`}>
                                                    <View>
                                                        <Icon name='dangerous' type="materialicon" color="red" />
                                                    </View>
                                                    <View>
                                                        <Text style={{color: "white"}}> Erreur des Champs nom</Text>
                                                        <Text style={{color: "white"}}> Veuillez Verifier si tout les champs sont correct !</Text>
                                                    </View>
                                                </View> :
                                                null
                                                
                                            }
                                            
                                            
                                            
                                            {/* debut de champ de mot de passe  */}
                                                <View style={[tw`mt-30 px-6`]}>
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
                                                <View style={[tw`mt-15 px-6`]}>
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
                                            <View style={[tw`mt-10 items-center mb-50`]}>
                                            <Button title="Precedent"
                                                onPress={() => Precedent()}
                                                buttonStyle={[tw`bg-transparent border-2 border-white p-4 rounded-full w-40 items-center mb-4`]} 
                                            />
                                            {
                                                errors.passWord?.type === "required" | errors.passWord?.type === "pattern" | errors.confirmPassWord?.type === "required" | errors.confirmPassWord?.type === "validate" ?

                                                <Button title="Inscription"
                                                    onPress={handleSubmit(inscription)}
                                                    disabled
                                                    buttonStyle={[tw`bg-transparent border-2 border-white p-4 rounded-full w-60 items-center mb-4`]} 
                                                /> :
                                                <Button title="Inscription"
                                                    onPress={handleSubmit(inscription)}
                                                    buttonStyle={[tw`bg-transparent border-2 border-white p-4 rounded-full w-60 items-center mb-4`, {fontSize: 56}]} 
                                                />
                                                // <TouchableOpacity style={[tw`border-2 border-white p-4 rounded-full w-60 items-center`]} 
                                                //     onPress={handleSubmit(inscription)}> 
                                                //     <Text style={[tw``, {fontSize: 22, color: "white", fontWeight: "600"}]}>Inscription</Text>
                                                // </TouchableOpacity>

                                            }
                                            </View>
                                            {/* {errors && showToast()} */}
                                    </LinearGradient>
                                    
                                </>
                            )
                        default: (
                            <>
                                <LinearGradient 
                    colors={['#FF2A2A','#FF6D21']}
                    style={styles.backGround}
                    >
                        <View>
                            <Text> La pagne n'est pas disponible </Text>
                        </View>
                    </LinearGradient>
                            </>
                        )
                    }
                }) ()
            }
        </>
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