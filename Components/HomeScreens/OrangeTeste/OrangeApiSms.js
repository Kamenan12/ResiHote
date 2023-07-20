import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Buffer } from 'buffer';

import tw from "twrnc"





const OrangeApiSms = () => {
    const [token, setToken] = useState()
    const orangeAuthorization = "Basic N1ZIeWJaTk9FYXRnVlZNZ3lkVklnUFR0MnZaR2pDbEE6dVpBSFdyY2ZCd1gyaHJMNg=="
    global.Buffer = Buffer;



    const EnvoiSMS = async() => {

    //  await getToken()
     
    //  if (token !== null) {
    //     console.log("envoie",token)
    //  } else{
    //     console.log("pas disponible")
    //  }
                    fetch('https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B2250000/requests', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token.access_token}`,
                            'Content-Type': 'application/json'
                        },
                        // body: '{"outboundSMSMessageRequest":{         "address": "tel:+{{recipient_phone_number}}",         "senderAddress":"tel:+{{country_sender_number}}",         "outboundSMSTextMessage":{             "message": "Hello!"         }     } }',
                        body: JSON.stringify({
                            'outboundSMSMessageRequest': {
                                'address': 'tel:+2250787101707',
                                'senderAddress': 'tel:+2250000',
                                'outboundSMSTextMessage': {
                                    'message': 'Hello, poto cest sms  de lapi la !'
                                }
                            }
                        })
                     })
                     .then(res => res.json())
                    .then(json =>  console.log("json",json))
                    .catch(err => console.error('error:' + err))
                    ;
    }



















    const getToken = async(orangeAuthorizationHeader) =>{

        // const https = require('https');
        const fetch = require(`node-fetch`)










    // let credentials="Basic N1ZIeWJaTk9FYXRnVlZNZ3lkVklnUFR0MnZaR2pDbEE6dVpBSFdyY2ZCd1gyaHJMNg==";
    // let postData = "";
    // postData += "grant_type=client_credentials";
    
    //     let options = {
    //         host: 'api.orange.com',
    //         path: '/oauth/v2/token'
    //     };
    //     options['method'] = 'POST';
    //     options['headers'] = {
    //         'Authorization': credentials,
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Content-Length': Buffer.byteLength(postData)
    //     };
    //     let req = https.request (options, function(response) {
    //         response.setEncoding('utf8');
    //         let responseData = '';
    //         response.on ('data', function(data) { responseData += data; });
    //         response.on ('end', function() { let result = JSON.parse (responseData); });
    //    })
    //    .on('error', (e) => {console.log(e)});
    //    req.write(postData);
    //    req.end();
    








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

        fetch('https://api.orange.com/oauth/v3/token', {
                        method: "POST",
                        body: "grant_type=client_credentials",
                        headers: {
                        'Accept': "application/json",
                        'Authorization': `${orangeAuthorization}`,
                        "Content-Type": "application/x-www-form-urlencoded"
                        }, 
                    })
                    .then(res => res.json())
                    .then(json => {
                        console.log("json",json),
                        setToken(json)}
                        )
                    .catch(err => console.error('error:' + err))
                    ;

                    // console.log("tokkk", tok)
        // let postData = "";
        // postData += "grant_type=client_credentials";
        // fetch('https://api.orange.com/oauth/v3/token', {
        //             method: 'POST',
        //             headers: {
        //                 'Authorization': 'Basic N1ZIeWJaTk9FYXRnVlZNZ3lkVklnUFR0MnZaR2pDbEE6dVpBSFdyY2ZCd1gyaHJMNg==',
        //                 'Accept': 'application/json',
        //                 "Content-Type": "application/x-www-form-urlencoded",
        //                 'Content-Length': "grant_type=client_credentials"
        //                 // 'Content-Length': Buffer.byteLength(postData)
        //             }
        //             // body: new URLSearchParams({
        //             //     'grant_type': 'client_credentials'
        //             // })
        //         })
        //         .then(res => res.json())
        //         .then(json => console.log(json))
        //         .catch(err => console.error('error:' + err))
        //         ;







        // fetch('https://api.orange.com/oauth/v3/token', {
        //         method: 'POST',
        //         headers: {
        //             'Authorization': 'Basic N1ZIeWJaTk9FYXRnVlZNZ3lkVklnUFR0MnZaR2pDbEE6dVpBSFdyY2ZCd1gyaHJMNg==',
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //         },
        //         body: new URLSearchParams({
        //             'grant_type': 'client_credentials'
        //         })
        //         })
        //         .then(res => res.json())
        //         .then(json => console.log(json))
        //         .catch(err => console.error('error:' + err))





        // //         // console.log("tokkk", tok)
        // return new Promise(async(resolve)=>{
        //     console.log("lancement api orange")
          
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

    useEffect(() => {
        getToken()
    }, [])


    return (
        <View style={tw`items-center`}>

        <View style={tw`bg-blue-200 p-2 `}>
            <Text onPress={() => EnvoiSMS()}>Orange </Text>
        </View>
        </View>
    )
}




export default OrangeApiSms ;





const styles = StyleSheet.create({

})