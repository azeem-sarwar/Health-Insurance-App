import React from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import LogoImage from '../src/Images/Aim3.png';

export default class ImageHeader extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={LogoImage}
                    resizeMode='contain'
                />
                <Text style={styles.text}>
                    CompAim
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: 25,
        height: 25,
        zIndex: 999
    },

    text: {
        fontSize: 12
    }

})