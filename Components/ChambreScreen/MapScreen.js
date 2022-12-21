import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon, Dialog} from "@rneui/themed";

import tw from 'twrnc'





const MapScreen = (props) => {
            

            // const Description = props.carte.Description
            // const initialRegion = {
            //     lat: 37.78825,
            //     lng: -122.4324
            // Abidjan
            // "lat": 7.539988999999999,
            // "lng": -5.547079999999999,
            // cote divoire
            // lat: 7.539989,
            // lng: -5.547080.
            // }
            const [description, setDescription] = useState('')
            const [localisation, setLocalisation] = useState({
                lat: 7.539988999999999,
                lng: -5.547079999999999
            })

            const [visibleAlert, setVisibleAlert] = useState(false)
        // const Origin = props.carte.localisation ? props.carte.localisation : {
        //     lat: 37.78825,
        //     lng: -122.4324 
        // }
        // const [position, setPosition] = useState()
        const mapRef = useRef(null)




        // useEffect( () => {
            // // if (!Origin) return;
            // const position = {
            //     latitude: localisation.lat || 0,
            //     longitude: localisation.lng || 0,
            // }
            // // setPosition({
            // //     latitude: Origin.lat ,
            // //    longitude: Origin.lng ,
            // // })
            // const newCoord = {}
            // newCoord.latitude = localisation.lat
            // newCoord.longitude = localisation.lng
            // setPosition(newCoord)
            const MoveTo = async (GeoLoca) => {
                const position = {
                    latitude: GeoLoca.lat,
                    longitude: GeoLoca.lng
                }
                const camera = await mapRef.current?.getCamera()
                if( camera ) {
                    // console.log("camero", camera)
                    camera.center = position;
                    // console.log("center", camera.center)
                    mapRef.current?.animateCamera(camera, {duration: 1000})
                }
            }
            const localite = () => {
                props.onChange({
                    localisation: localisation,
                    description: description
                }
                )
                // console.log("localite")
            }
            // if (mapRef.current) {
            //     mapRef.current.animateCamera(
            //         {
            //             center: {
            //                 latitude: localisation.lat,
            //                 longitude: localisation.lng
            //             },
            //             zoom: 15
            //         },
            //         1000
            //     )
            // }
        // }, [localisation])

            const FermeAlert = () => {
                setVisibleAlert(!visibleAlert)
            }



        // console.log("origin:", Origin)


    return (
        <View > 
            <GooglePlacesAutocomplete 
            query={{key: "AIzaSyCiuN2o8Iv39Ei4YNg6hHeEbNZ44tIOsiw",
                    language: 'fr', components: "country:ci"}}
            onPress={(data, details = null) => {
                // console.log(data);   
                let commue = details.address_components.filter(com => com.types[1] === "sublocality")
                let ville = details.address_components.filter(com => com.types[0] === "locality")
                commue[0]  ?  console.log("il est la ", commue) : setVisibleAlert(!visibleAlert) ; 
                // ville ? console.log("Ville 11" , ville[0].long_name): null; 
                // console.log("Ville" ,details.address_components[2]); 
                // console.log("data", data);
                // console.log(details.geometry.location) 
                props.onChange({
                    localisation: localisation,
                    description: data.description,
                    ville: ville[0].long_name,
                    commune: commue[0].long_name ? commue[0].long_name : ""
                }
                )
                setDescription(data.description)
                setLocalisation(details.geometry.location)
                MoveTo(details.geometry.location)
            }}
            listViewDisplayed={false}
            minLength={2} 
            debounce={400}
            fetchDetails={true}
            enablePoweredByContainer={false}
            renderLeftButton={() => 
            <View style={[tw``, {marginRight: 10, marginTop: 15}]}> 
                <Icon type="entypo" name="location" color=""  />
            </View>}
            placeholder="Commune, Quarier" 
            styles={{
                container: {
                    flex: 0,
                    position: 'absolute',
                    width: "100%",
                    zIndex: 1,
                    top: 35
                   
                },
                textInput: {
                    // borderBottomWidth: 1,
                    // borderRadius: 20,
                    fontWeight: "700",
                    marginTop: 7,
                },
                textInputContainer: {
                    
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 10,
                }
            }}/>
            {/* Ajout de google cherche ici */}
                    <View>
                        <Dialog isVisible={visibleAlert}
                        onBackdropPress={FermeAlert}
                        >
                            <Dialog.Title  title="Attention !"/>
                            <Text> 1:Veuillez bien choisir le quarier ou la rue </Text>
                            <Text> 2:Veuillez bien pionter le Marker a l'endroit exacte de la residence </Text>
                            <Text style={{ fontWeight: "600"}}>NB: Cela permet au client de mieux s'oriennter </Text>
                            <Dialog.Actions>
                                <Dialog.Button
                                title="compris"
                                onPress={FermeAlert} />
                            </Dialog.Actions>
                        </Dialog>
                    </View>
             <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                latitude: localisation.lat,
                longitude: localisation.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
                onPress={(e) => [setLocalisation({
                    lat: e.nativeEvent.coordinate.latitude,
                    lng: e.nativeEvent.coordinate.longitude
                }), localite()]}
                >
                    <Marker 
                    coordinate={{
                        latitude: localisation.lat,
                        longitude: localisation.lng,
                    }}
                    title="localisatiion"
                    description={description}
                    identifier="Localisation"
                    />
                </MapView>
        </View>
    )
}




export default MapScreen;





const styles = StyleSheet.create({

    container: {

    },
    map: {
        // width: 350,
        width: Dimensions.get('window').width,
        // height: 430
        height: Dimensions.get('window').height
      },
});