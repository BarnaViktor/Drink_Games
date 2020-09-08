import React  from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ textColor, color, children, onPress }) => {
    return(
        <TouchableOpacity onPress={onPress} style={[styles.customButtonStyle, {backgroundColor: color}]}> 
            <Text style={[styles.textStyle, {color: textColor}]}>{children}</Text>
        </TouchableOpacity>
    )
}
const styles = {
    customButtonStyle: {
        borderRadius: 10,
        width: '60%',
        paddingVertical: 15
    },
    textStyle: {
        alignSelf: 'center',
        margin: 0,
        fontSize: 27,
        fontFamily: 'Lemon-Regular'
    }
}

export { CustomButton }