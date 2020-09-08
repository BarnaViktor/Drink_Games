import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Keyboard } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Actions } from 'react-native-router-flux';
import { CustomButton, Header } from './common';

class AddPlayerComponent extends Component {

    state = {
        textInputName: '',
        players: [],
        error: false,
        infoModal: false,
    }
    addPlayer() {
        if (this.state.players.indexOf(this.state.textInputName) < 0 && this.state.textInputName !== '') {
            this.setState({ players: [...this.state.players, this.state.textInputName], textInputName: '', error: false })
        }
        else {
            this.setState({ textInputName: '' })
        }
    }
    dropPlayer(index) {
        this.setState({ players: this.state.players.filter((x, i) => i != index) })
    }
    startGame() {
        if (this.state.players.length > 1) {
            Keyboard.dismiss();
            Actions.push(this.props.game, this.state.players)
        }
        else {
            this.setState({ error: true })
        }
    }
    renderErrorMessege() {
        if (this.state.error) {
            if (this.state.players.length === 1) {
                return (
                    <Text style={{ paddingTop: 5, color: '#000000', fontSize: 20, fontWeight: '700' }}>Nem hagyjuk, hogy egyedül igyál!</Text>
                )
            }
            else {
                return (
                    <Text style={{ paddingTop: 5, color: '#000000', fontSize: 20, fontWeight: '700' }}>Senki nem akar inni?</Text>
                )
            }
        }
    }
    render() {
        const { titleStyle, playerListStyle, addPlayerContainerStyle, textInputStyle, buttonStyle, buttonTextStyle } = styles;
        return (
            <ScrollView keyboardShouldPersistTaps='always' style={{ backgroundColor: this.props.color }}>
                <Header
                    backButtonOnPress={() => { Actions.pop() }}
                    infoOnPress={() => this.setState({ infoModal: true })}
                />
                <View style={{ backgroundColor: this.props.color, flex: 1, paddingTop: 30, justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 300 }}>
                    <Text style={titleStyle}>Ki Játszik ?</Text>
                    <View style={addPlayerContainerStyle}>
                        <View>
                            <TextInput
                                style={textInputStyle}
                                placeholder="Játékos neve"
                                onChangeText={player => this.setState({ textInputName: player })}
                                numberOfLines={1}
                                maxLength={10}
                                value={this.state.textInputName}
                            />
                        </View>
                        <View style={{ alignSelf: 'center', margin: 10 }}>
                            <TouchableOpacity onPress={() => this.addPlayer()}>
                                <FontAwesomeIcon icon={faCheck} size={30} style={{ color: '#363237' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.state.players.map((player, index, key) => {
                        return (
                            <View style={[(index === key.length - 1) ? { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 } : { borderRadius: 0 }, { flexDirection: 'row', justifyContent: 'space-between', borderColor: '#2D4262', borderWidth: 1.5, borderTopWidth: 0, width: 270, height: 45, alignItems: 'center', paddingLeft: 10 }]}>
                                <Text style={playerListStyle}>{player}</Text>
                                <TouchableOpacity onPress={() => this.dropPlayer(index)} style={{ margin: 10 }}>
                                    <FontAwesomeIcon icon={faTimes} size={30} style={{ color: '#363237' }} />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                    <View style={{ marginTop: 50, width: '100%', alignItems: 'center' }}>
                        <CustomButton
                            onPress={() => this.startGame()}
                            color={"#011A27"}
                            textColor={this.props.color}
                        >
                            Mehet
                        </CustomButton>
                    </View>
                    {this.renderErrorMessege()}
                    {this.state.infoModal && (
                        <Modal
                            animationType="slide"
                            transparent
                            visible={this.state.infoModal}
                            onRequestClose={() => { }}
                        >
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', position: 'relative', paddingVertical: 25, flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                                <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                                    <Text style={{ fontFamily: 'Lemon-Regular', fontSize: 42, color: '#ffffff', textAlign: 'center', justifyContent: 'flex-start', paddingBottom: 30 }}>JátékSzabály</Text>
                                </View>
                                {this.props.game === 'truthOrDare' && (
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: '75%' }}>
                                        <ScrollView>
                                            <Text style={{ fontFamily: 'Lemon-Regular', fontSize: 28, color: '#ffffff', textAlign: 'center', justifyContent: 'center', paddingHorizontal: 5, paddingVertical: 30 }}>
                                                1) Ha a felelést választod és nem válaszolsz iszol 2 kortyot, ha válaszolsz mehet tovább.{"\n"}{"\n"}
                                                2) Amennyiben a merést választod és teljesíted a feladatod, akkor kioszthatsz 3 kortyot, ha viszont nem, akkor neked kell meginnod 3at.
                                            </Text>
                                        </ScrollView>
                                    </View>
                                )}
                                {this.props.game === 'roulette' && (
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: '75%' }}>
                                        <ScrollView>
                                            <Text style={{ fontFamily: 'Lemon-Regular', fontSize: 28, color: '#ffffff', textAlign: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 30 }}>
                                                Pörgesd meg az üveget egy kattintással és tudd meg mennyire vagy szerencsés
                                             </Text>
                                        </ScrollView>
                                    </View>
                                )}
                                {this.props.game === 'letsDrink' && (
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: '75%' }}>
                                        <ScrollView>
                                            <Text style={{ fontFamily: 'Lemon-Regular', fontSize: 28, color: '#ffffff', textAlign: 'left', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 30 }}>
                                                A játék 5 típusfeladatből épül fel. Ezekbe kapsz betekintést az alábbi pontokban.{'\n'}{'\n'}
                                                A játéknak szüksége van egy játékos mestere aki kézben fogja tartani a játék irányítását. Az ő személyéről ti játékosok döntetek.{'\n'}{'\n'}
                                                <Text style={{textDecorationLine:'underline'}}>Mindenki:</Text> Ebben az esetben mindenkinek el kell végezni a feladatot amit a játék ír. Akik nem tesznek eleget a feladatnak igyanak kettő kortyot!{'\n'}{'\n'}
                                                <Text style={{textDecorationLine:'underline'}}>Egyéni:</Text> Csak arra a személyre vonatkozik a feladat akinek a neve szerepel a feladat leírásában. Ha nem teljesíti, igyon meg kettő kortyot!{'\n'}{'\n'}
                                                <Text style={{textDecorationLine:'underline'}}>Páros:</Text> A feladat leírásban olvasható két játékosnak kell elvégezni a feladot.Amelyiktek nem teljesíti, igyon meg kettő kortyot!{'\n'}{'\n'}
                                                <Text style={{textDecorationLine:'underline'}}>Körjáték:</Text> A kiírt feladatot olyan formában kell elvégezni, hogy a megadott személy elkezdi a feladatot majd a tőle jobbra ülőnek kell folytatni, és igy tovább. Amelyik játékos hibázik, vagy ismétel akkor az ő jutalma 2 korty.{'\n'}{'\n'}
                                                <Text style={{textDecorationLine:'underline'}}>Virus:</Text> A virus feladat szólhat egy vagy két bizonyos játékonak, vagy akár az összes játékosnak. Ezeket a feladatokat egészen viszzavonásig kell csinálni, amelyről a játék tudatni fog. Amennyiben valaki nem tartja magát a szabályhoz 2 kortyot kell magábadönteni.{'\n'}
                                            </Text>
                                        </ScrollView>
                                    </View>
                                )}
                                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 50 }}>
                                    <CustomButton
                                        color={this.props.color}
                                        textColor={'rgba(0,0,0,0.75)'}
                                        onPress={() => this.setState({ infoModal: false })}
                                    >
                                        Vissza
                                </CustomButton>
                                </View>
                            </View>
                        </Modal>
                    )}
                </View>
            </ScrollView>
        )
    }
}
const styles = {
    titleStyle: {
        fontFamily: 'Lemon-Regular',
        fontSize: 36,
        color: '#363237',
        paddingBottom: 15,
    },
    playerListStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    addPlayerContainerStyle: {
        borderColor: '#2D4262',
        borderWidth: 1.5,
        borderRadius: 10,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInputStyle: {
        width: 250,
        fontSize: 20,
        fontFamily: 'Lemon-Regular',
    },
    buttonStyle: {
        backgroundColor: '#011A27',
        borderRadius: 10,
        width: 250
    },
    buttonTextStyle: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 27,
        fontFamily: 'Lemon-Regular'
    }
}

export default AddPlayerComponent