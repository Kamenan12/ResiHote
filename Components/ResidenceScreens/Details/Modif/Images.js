import { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../../firebase";
import { db } from '../../../../firebase';
import { storage } from '../../../../firebase';
import { query, addDoc, collection, onSnapshot, where, getDocs, doc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, putFile, getDownloadURL } from 'firebase/storage';
import { ImagePicker } from "expo-image-multiple-picker";
import { Button, Icon  } from "@rneui/themed"

import tw from 'twrnc'


const ImageModif = (props) => {
    const Navigation = useNavigation();

    const user = auth.currentUser

    const idDoc = props.route.params.idDoc
    const idDocUser = props.route.params.idDocUser

    const [imageMo, setImageMo] = useState([]);

    const [modif, setModif] = useState(false)

    const annuler = () => {
        Navigation.goBack()
    }

        const uploadImg = async( img) => {
           
            
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function() {
                  resolve(xhr.response);
                };
                xhr.onerror = function() {
                  reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET',img.uri, true);
                xhr.send(null);
              });
            
            
             const imagRef = ref(storage, `images/${img.filename}`);
            ;
               const task =  uploadBytes(imagRef,blob).then(() => {
                console.log("ajouter img");
               })
    
                 try {
                    await task; 
                    const url = await getDownloadURL(imagRef)
                    
                    console.log(url)
                    return url
                    // console.log("imgURl", imgUrl)
                 } catch(e) {
                    console.log(e)
                 }
            //     
                
            
        } 
    

    const ModificationImage = async() => {
                let image = []
                if (imageMo.length !== 0 ){
                    try {
                        imageMo.map(async(img, index) => {
    
                            const imageurl =  await uploadImg(img);
                            console.log(index);
                            image.push(
                                {
                                "image": index,
                                url: imageurl
                                    // `image${index}:${imageurl}`
                                }
                                      );
                            console.log("imgpush", image)
                            if (image.length == imageMo.length) {
                                console.log("imageurl", image)
                                
                                await updateDoc(doc(db, `residences`, idDoc),{
                                            Images: image,
                                            date_update: serverTimestamp()
                                            
                                 })
                                        console.log("Residence modifier")
                            }
    
                        })
    
                        Navigation.navigate("Residence");
                     
                        
    
                            } catch (e) {
                                console.log(e)
                            }
                        
                }

    }

    
    return (
        modif === false ? (

        <View style={[tw`pt-40`, { alignItems: "center", justifyContent: "center"}]}>
            
            <Button title={imageMo.length === 0 ? "Ajoutez des  image" : "Changez les images"} onPress={() => setModif(true)}
             buttonStyle={tw`bg-transparent border rounded-xl`}
             titleStyle={{
                 color: "red"
             }}
             icon={{
                 name: "add-circle",
                 type: "ionicon",
                 size: 15,
                 color: "red"
                 
             }}
             
             iconRight
            />
            
                <View style={tw`flex-row pt-10`}> 
                    <ScrollView horizontal={true}>

                    {imageMo.map((img, index) => (
                        <View key={index}>
                                <Image source={{uri: img.uri}} style={{ height: 300, width: 300}} />
                            </View>
                        
                    ))}
                    </ScrollView>
                </View>
            <View style={tw`pt-15 flex-row justify-between w-80`}>

                <Button title=" Annuler" onPress={() => annuler()} 
                buttonStyle={tw`bg-transparent border rounded-xl`}
                titleStyle={{
                    color: "red"
                }}
                icon={{
                    name: "delete",
                    type: "antdesign",
                    size: 15,
                    color: "red"
                    
                }}
                
                iconRight
                />
                {
                    imageMo.length === 0 ? null : 
                    <Button title= "Ajouter l'image"  
                    buttonStyle={tw`bg-transparent border rounded-xl`}
                    titleStyle={{
                        color: "red"
                    }}
                    icon={{
                        name: "add-circle",
                        type: "ionicon",
                        size: 15,
                        color: "red"
                        
                    }}
                    
                    iconRight onPress={() => ModificationImage()}/>
                }
            </View>
            {console.log("img", imageMo)}
        </View>
        ) :
        <ImagePicker
                onSave={(assets) => {console.log(assets)
                    setImageMo(assets)
                    setModif(false)
                }
                }
                onCancel={() => {console.log('no permissions or user go back')
                    setModif(false)
                    }
                }
                multiple
                
                />
    )
}




export default ImageModif;