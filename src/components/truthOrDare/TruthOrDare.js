import React, { Component } from 'react';
import { View, Text, Modal, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CustomButton, Header } from '../common'

class TruthOrDare extends Component {
    state = {
        selectedPlayer: "",
        truthModal: false,
        dareModal: false,
        infoModal: false,
        questioner: ""
    }
    UNSAFE_componentWillMount() {
        const randomName = this.props.data[Math.floor(Math.random() * (0 - this.props.data.length) + this.props.data.length)]
        this.setState({ selectedPlayer: randomName })
    }
    loopPlayersByClick() {
        let index = this.props.data.indexOf(this.state.selectedPlayer)
        index++
        if (this.props.data.indexOf(this.state.selectedPlayer) !== this.props.data.length - 1) {
            this.setState({ selectedPlayer: this.props.data[index] })
        }
        else {
            this.setState({ selectedPlayer: this.props.data[0] })
        }
        this.setState({ truthModal: false, dareModal: false })
    }
    truthPress() {
        let questionerArray = this.props.data.filter((str) => { return !str.includes(this.state.selectedPlayer) })
        let questioner = questionerArray[Math.floor(Math.random() * (0 - questionerArray.length) + questionerArray.length)]
        this.setState({ truthModal: true, questioner })
    }
    darePress() {
        let questionerArray = this.props.data.filter((str) => { return !str.includes(this.state.selectedPlayer) })
        let questioner = questionerArray[Math.floor(Math.random() * (0 - questionerArray.length) + questionerArray.length)]
        this.setState({ dareModal: true, questioner })
    }
    render() {
        const { viewContainer, orTextStyle,selectedPlayerView,selectedPlayerText,buttonContainerView } = styles
        return (
            <View style={viewContainer}>
                <Header
                    backButtonOnPress={() => { Actions.main() }}
                    infoOnPress={() => this.setState({ infoModal: true })}
                />
                <View style={selectedPlayerView}>
                    <Text style={selectedPlayerText}>{this.state.selectedPlayer}</Text>
                </View>
                <View style={buttonContainerView}>
                    <CustomButton onPress={() => this.truthPress()} textColor={"#FCBFAD"} color={"#2D4262"} width={250}>Felelsz</CustomButton>
                    <Text style={orTextStyle}>Vagy</Text>
                    <CustomButton onPress={() => this.darePress()} color={"#73605B"} textColor={"#FCBFAD"} width={250}>Mersz</CustomButton>
                </View>
                {this.state.truthModal && (
                    <Modal
                        animationType="fade"
                        transparent
                        visible={this.state.truthModal}
                        onRequestClose={() => { }}
                    >
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.75)', position: 'relative', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: "#FCBFAD", width: '95%', justifyContent: 'center', borderRadius: 10, borderWidth: 3, borderColor: '#000000' }}>
                                <Text style={{ padding: 20, fontSize: 35, fontFamily: 'Lemon-Regular', textAlign: 'center' }}>{this.state.questioner} te kérdezhetsz {this.state.selectedPlayer}-től/tól</Text>
                                <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                                    <CustomButton color={"#2D4262"} textColor={"#FCBFAD"} onPress={() => this.loopPlayersByClick()}>Tovább</CustomButton>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
                {this.state.dareModal && (
                    <Modal
                        animationType="fade"
                        transparent
                        visible={this.state.dareModal}
                        onRequestClose={() => { }}
                    >
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.75)', position: 'relative', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: "#FCBFAD", width: '95%', justifyContent: 'center', borderRadius: 10, borderWidth: 3, borderColor: '#000000' }}>
                                <Text style={{ padding: 20, fontSize: 35, fontFamily: 'Lemon-Regular', textAlign: 'center' }}>{this.state.questioner} te adhatsz feladatot {this.state.selectedPlayer}-nak/nek</Text>
                                <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                                    <CustomButton color={"#73605B"} textColor={"#FCBFAD"} onPress={() => this.loopPlayersByClick()}>Tovább</CustomButton>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
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
                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: '75%' }}>
                                <ScrollView>
                                    <Text style={{ fontFamily: 'Lemon-Regular', fontSize: 28, color: '#ffffff', textAlign: 'center', justifyContent: 'center', paddingHorizontal: 5, paddingVertical: 30 }}>
                                        1) Ha a felelést választod és nem válaszolsz iszol 2 kortyot, ha válaszolsz mehet tovább.{"\n"}{"\n"}
                                                2) Amennyiben a merést választod és teljesíted a feladatod, akkor kioszthatsz 3 kortyot, ha viszont nem, akkor neked kell meginnod 3at.
                                            </Text>
                                </ScrollView>
                            </View>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 50 }}>
                                <CustomButton
                                    color={'#FCBFAD'}
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
        )
    }
}
const styles = {
    orTextStyle: {
        paddingVertical: 20,
        fontSize: 25,
        fontFamily: 'Lemon-Regular'
    },
    viewContainer: {
        flex: 1, 
        backgroundColor: "#FCBFAD"
    },
    selectedPlayerView: {
        justifyContent: "flex-start",
        alignItems: 'center', 
        paddingVertical: 110 
    },
    selectedPlayerText: { 
        fontFamily: "Lemon-Regular", 
        fontSize: 30 
    },
    buttonContainerView: {
        justifyContent: 'center', 
        alignItems: 'center'
    }
}
export default TruthOrDare