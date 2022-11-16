import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from 'twrnc'



const MapScreen = () => {
    


    return (
        <View > 
            <MapView
                style={styles.map}
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            />
                   
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