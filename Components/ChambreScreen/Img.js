import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image} from "react-native";


// import * as ImagePicker from 'expo-image-picker'; 
   import { ImagePicker } from 'expo-image-multiple-picker' 
// import MultipleImagePicker from '@baronha/react-native-multiple-image-picker'
// import ImagePicker from 'react-native-image-crop-picker';



const Img = (props) => {


    const [image, setImage] = useState([]);
    
    // react-native-multiple-image-picker  porblene : evaluting 
    // const pickImage = async () => {
    //     try {
    //         const response = await MultipleImagePicker.openPicker({
    //           selectedAssets: image,
    //           isExportThumbnail: true,
    //           maxVideo: 1,
    //           usedCameraButton: false,
    //           isCrop: true,
    //           isCropCircle: true,
    //         });
    //         console.log('response: ', response);
    //         setImage(response);
    //       } catch (e) {
    //         console.log(e.code, e.message);
    //       }
    // }

        // react-native-image-crop-piker 
    //    const pickImage = async () => {
    //                  await ImagePicker.openPicker({
    //                         width: 300,
    //                         height: 400,
    //                         cropping: true
    //                     }).then(image => {
    //                         console.log(image);
    //                     });
    //    }
//    expo-image-picker
//  const pickImage = async () => {
//         // No permissions request is necessary for launching the image library
//         let result = await ImagePicker.launchImageLibraryAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         //   allowsEditing: false,
//           allowsMultipleSelection: true,
//           selectionLimit: 10,
//           aspect: [4, 3],
//           quality: 1,
//         });
    
//         console.log(result);
    
//         if (!result.cancelled) {
//           setImage(result.uri);
//         }
//       };


    return (
            
            <ImagePicker
                onSave={(assets) => {console.log(assets)
                    props.onChange(assets)
                    props.open(false)
                }
                }
                onCancel={() => {console.log('no permissions or user go back')
                    props.open(false)
                    }
                }
                multiple
                
                />
        
    )
}


export default Img; 


const Styles = StyleSheet.create({

})