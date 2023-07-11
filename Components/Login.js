import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import GlobalStyle from "./Styles/GlobalStyle";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from "@rneui/themed";
import { useForm, Controller } from 'react-hook-form';
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import tw from "twrnc"
import OneSignal from 'react-native-onesignal';


const Login = () => {

    const navigation = useNavigation();

    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
          email: '',
          passWord: '',
          
        }
      });

      
    
    const SignIn = () => {
        navigation.navigate('SignIn')
    }

    const Connexion = (data) => {
        signInWithEmailAndPassword(auth, data.email, data.passWord).then((
            (userCredentials) => {
                const user = userCredentials.user;
                console.log( "est conncete", user.uid);
                AddExternalUserIdOneSignal(user.uid)
                navigation.navigate('Home-G')
            }
        ))
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

    return (
            <View style={[tw`h-full`]}>
                <LinearGradient 
                 colors={['#FF2A2A','#FF6D21']}
                 style={styles.backGround}
                 >
                    <View style={[tw`p-5 mt-10`]}>
                        <View>
                            <Text style={[tw``, { fontSize: 65, color: "white", fontWeight: "700"}]}>Bienvenue</Text>
                        </View>
                        <View>
                            <Text style={[tw``, { color: "white", fontSize: 20, fontWeight: "400"}]}>Etes vous nouveau ?  </Text>
                            <Text style={[tw``, { color: "white", fontSize: 20, fontWeight: "400"}]}>Inscrivez vous maintenant</Text>
                        </View>
                        <View style={[tw` items-center mt-5`, ]}>
                            <TouchableOpacity style={[tw` p-4 rounded-full w-80 items-center mt-4 shadow-md shadow-black `, { backgroundColor: "#FF5D2A",}]}
                            onPress={() => {SignIn();}}> 
                                <Text style={[tw``, {fontSize: 22, color: "white", fontWeight: "600"}]}>Inscrivez-vous </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[tw` mt-10`, {}]}>
                            <View>
                                <Text style={[tw``, { color: "white", fontSize: 22, fontWeight: "500"}]}>Votre Adresse E-mail</Text>
                                <View style={[tw``]}>
                                    <Controller 
                                    control={control}
                                    render={({field: { onChange, onBlur, value}}) => (
                                        <TextInput placeholder="Entrez votre E-mail" 
                                        placeholderTextColor="white"
                                        
                                        style={[styles.Input]}
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                        />
                                    )}
                                    name="email"
                                    rules={{ required: true, minLength: 2, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }}
                                    />
                                   
                                    <View style={[tw`absolute right-5 top-5`]}>

                                        <Icon name="mail-unread-outline" type="ionicon" color="white" size={28} />
                                    </View>
                                    {errors.email?.type === "required" && <Text style={{ color: "white", fontSize: 17}}>*Email est obligatoire *</Text>}
                                    {errors.email?.type === "pattern" && <Text style={{ color: "white", fontSize: 17}}>  *Entrez un mail valide</Text>}
                                </View>
                            </View>
                            <View style={[tw`mt-5`]}>
                                <Text style={[tw``, { color: "white", fontSize: 22, fontWeight: "500"}]}>Votre mot de passe</Text>
                                <View style={[tw``]}>
                                    <Controller 
                                    control={control}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <TextInput placeholder="Entrez votre mot de passe" 
                                        placeholderTextColor="white"
                                        secureTextEntry={true}
                                        style={[styles.Input]}
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                        />
                                    )}
                                    name="passWord"
                                    rules={{ required: true, minLength: 4 }}
                                    />
                                   
                                    <View style={[tw`absolute right-5 top-5`]}>

                                        <Icon name="md-key-outline" type="ionicon" color="white" size={28} />
                                    </View>
                                    {errors.passWord?.type === "required" && <Text style={{ color: "white", fontSize: 17}}>* Mot de passe obligatoire *</Text>}
                                </View>
                            </View>

                            <View style={[tw`mt-6 items-center`]}>
                            <TouchableOpacity style={[tw`border-2 border-white p-4 rounded-full w-60 items-center`]} 
                                onPress={handleSubmit(Connexion)}> 
                                 <Text style={[tw``, {fontSize: 22, color: "white", fontWeight: "600"}]}>Connexion</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
    )
}


export default Login;


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
        color: "white"

    }
});