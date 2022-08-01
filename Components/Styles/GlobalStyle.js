import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    SafeAreaViewAndroid: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 50 : 0
    },
})