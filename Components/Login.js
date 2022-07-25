import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import GlobalStyle from "./Styles/GlobalStyle";



const Login = () => {
    
    return (
        <SafeAreaView style={GlobalStyle.SafeAreaViewAndroid}>
            <View>
                <Text>Bienvenu chez ResiPlus Login</Text>
            </View>
        </SafeAreaView>
    )
}


export default Login;


const styles = StyleSheet.create({

});