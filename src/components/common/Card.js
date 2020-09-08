import React from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native';

const Card = ({ titleMarginTop, backgroundColor, color, title, description, onPress }) => {
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={[styles.card, { backgroundColor: backgroundColor }]}>
                <Text style={[styles.cardTitle, { marginTop: titleMarginTop, color: color }]}>{title}</Text>
                <Text style={[styles.cardDescription, { color: color }]}>{description}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = {
    card: {
        minWidth: '90%',
        maxWidth: '90%',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 0.8,
        elevation: 5,

    },
    cardTitle: {
        fontSize: 22,
        fontFamily: 'Ribeye-Regular'
    },
    cardDescription: {
        fontSize: 16,
        fontFamily: 'Ribeye-Regular'
    }
};

export { Card };