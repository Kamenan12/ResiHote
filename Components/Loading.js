import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Overlay, Icon } from '@rneui/themed'




const Loading = (props) => {

    // const [visible, setVisible] = useState(false)
    
    return (
        <View>
            <Overlay isVisible={props.visi}>
                <ActivityIndicator size="large" color="#FF2A2A"/>
            </Overlay>
        </View>
    )
}





export default Loading;





const styles = StyleSheet.create({
    
})