import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faInfo } from '@fortawesome/free-solid-svg-icons'

const Header = ({ backButtonOnPress,infoOnPress }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <View style={{width:'87%'}}>
                <TouchableOpacity onPress={backButtonOnPress} style={{ paddingTop: 10, width: 45}}>
                    <FontAwesomeIcon icon={faChevronLeft} size={35} style={{ color: '#000000', paddingLeft: 50 }} />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={infoOnPress} style={{ paddingTop: 10, width: 45 }}>
                    <FontAwesomeIcon icon={faInfo} size={35} style={{ color: '#000000', paddingLeft: 50 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export { Header }