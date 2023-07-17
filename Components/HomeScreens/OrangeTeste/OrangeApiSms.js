import { View, Text, StyleSheet } from "react-native";

import tw from "twrnc"





const OrangeApiSms = () => {

    const orangeAuthorization = "Basic N1ZIeWJaTk9FYXRnVlZNZ3lkVklnUFR0MnZaR2pDbEE6dVpBSFdyY2ZCd1gyaHJMNg=="




    const getToken = () =>{

        const fetch = require(`node-fetch`)

        // const url = 'https://api.orange.com/oauth/v3/token'

        // const options = {
        //     method: 'POST',
        //     headers: {
        //         Accept: "application/json",
        //         Authorization: 'Basic N1ZIeWJaTk9FYXRnVlZNZ3lkVklnUFR0MnZaR2pDbEE6dVpBSFdyY2ZCd1gyaHJMNg==',
        //         "Content-Type": "application/x-www-form-urlencoded",
        //         'Content-Length': Buffer.byteLength(postData)
                
        //     },
        //     body: 
        // }

        // fetch('https://api.orange.com/oauth/v3/token', {
        //                 method: "POST",
        //                 body: "grant_type=client_credentials",
        //                 headers: {
        //                 Accept: "application/json",
        //                 Authorization: {orangeAuthorizationHeader},
        //                 "Content-Type": "application/x-www-form-urlencoded"
        //                 },
        //             })
        //             .then(res => res.json())
        //             .then(json => console.log(json))
        //             .catch(err => console.error('error:' + err))
        //             ;


        // fetch('https://api.orange.com/oauth/v3/token', {
        //             method: 'POST',
        //             headers: {
        //                 'Authorization': 'Basic N1ZIeWJaTk9FYXRnVlZNZ3lkVklnUFR0MnZaR2pDbEE6dVpBSFdyY2ZCd1gyaHJMNg==',
        //                 'Accept': 'application/json',
        //                 "Content-Type": "application/x-www-form-urlencoded"
        //             },
        //             body: new URLSearchParams({
        //                 'grant_type': 'client_credentials'
        //             })
        //         })
        //         .then(res => res.json())
        //         .then(json => console.log(json))
        //         .catch(err => console.error('error:' + err))
        //         ;







        fetch('https://api.orange.com/oauth/v3/token', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic N1ZIeWJaTk9FYXRnVlZNZ3lkVklnUFR0MnZaR2pDbEE6dVpBSFdyY2ZCd1gyaHJMNg==',
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'grant_type': 'client_credentials'
                })
                })
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(err => console.error('error:' + err))





        //         // console.log("tokkk", tok)
        // return new Promise(async(resolve)=>{
        //     console.log("lancement api orange")
        // //   const https = require('https');
        //   let credentials= orangeAuthorizationHeader;
        //   let postData = "";
        //   postData += "grant_type=client_credentials";
        //     let options = {
        //         host: 'api.orange.com',
        //         path: '/oauth/v3/token'
        //     };
        //     options['method'] = 'POST';
        //     options['headers'] = {
        //         'Authorization': credentials,
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Content-Length': Buffer.byteLength(postData)
        //     };
        //     let req = https.request (options, (response)=> {
        //         response.setEncoding('utf8');
        //         let responseData = '';
        //         response.on ('data', (data)=> { responseData += data; });
        //         response.on ('end', ()=> {
        //           responseData = JSON.parse(responseData);
        //           resolve(responseData.access_token);
        //         });
        //    })
        //    .on('error', (e)=> { console.log(e); });
        //    req.write(postData);
        //    req.end();
        // });
    };



    return (
        <View style={tw`items-center`}>

        <View style={tw`bg-blue-200 p-2 `}>
            <Text onPress={() => getToken(orangeAuthorization)}>Orange </Text>
        </View>
        </View>
    )
}




export default OrangeApiSms ;





const styles = StyleSheet.create({

})