import { View, Text, StyleSheet } from "react-native";
import MapViewm, { Marker } from "react-native-maps";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import tw from "twrnc"




const Map = (props) => {
    return (
        <View style={tw``}>
            <Text style={[{fontSize: 24, fontWeight: "600", fontFamily: "serif"}]}> Carte</Text>
            <View style={[styles.container]}>
                <MapView style={[styles.map]}
                mapPadding={{
                    top:0,
                    left: 0,
                    bottom: 200,
                    right: 0
                }}
                provider={PROVIDER_GOOGLE}
                rotateEnabled={false}
                scrollEnabled={false}
                scrollDuringRotateOrZoomEnabled={false}
                minZoomLevel={16}
                initialRegion={{
                    latitude: props.Localite.lat,
                    longitude: props.Localite.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                >
                    <Marker 
                    coordinate={{
                        latitude:props.Localite.lat,
                        longitude: props.Localite.lng
                    }}
                    title="Localisation"
                    identifier="Localisation"
                    />
                </MapView>
            </View>
        </View>
    )
}





export default Map;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
      map: {
        Width: 100,
        minHeight: 200
      },
})