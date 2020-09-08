import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Card, CustomButton } from '../common';
import SQLite from 'react-native-sqlite-storage';

class CardGames extends Component {
    titleMarginTop = 0;
    backgroundColor = '#1E434C';
    textColor = '#FBFF38';

    cardContent = [
        { title: 'Buszozás', description: 'Kártyajáték', function: () => this.setState({ infoModal: true, gameTitle: 'Buszozás' }) },
    ]

    constructor(props) {
        super(props);
        // Az adatbázishoz csatlakozás majd ki lesz szervezve

        // const db = SQLite.openDatabase(
        //     {
        //         name: 'DrinkGamesDB.db',
        //         location: 'default',
        //         createFromLocation: '~www/DrinkGamesDB.db'
        //     }, () => { },
        //     error => {
        //         console.log(error)
        //     }
        // )

        this.state = {
            infoModal: false,
            gameTitle: ''
            // db,
            // cardGames: []
        }
    }

    componentDidMount() {
        // const { db } = this.state;
        // db.transaction(tx => {
        //     tx.executeSql('SELECT * FROM cardGames;', [], (tx, results) => {
        //         const rows = results.rows;
        //         let cardGames = [];

        //         for (let i = 0; i < rows.length; i++) {
        //             cardGames.push({
        //                 ...rows.item(i),
        //             });
        //         }

        //         this.setState({ cardGames });
        //         console.log('siker',cardGames);
        //     });
        // });

    }

    componentWillUnmount() {
        // const { db } = this.state;
        // db.close();
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity style={{ paddingTop: 10 }} onPress={() => { Actions.pop() }}>
                    <FontAwesomeIcon icon={faChevronLeft} size={35} style={{ color: '#000000', paddingLeft: 50 }} />
                </TouchableOpacity>
                <View style={styles.cardContainer}>
                    <Text style={styles.title}>Kártyajátékok</Text>
                    {this.cardContent.map(cardContent => {
                        return (<Card onPress={() => {
                            cardContent.function();
                        }}
                            key={cardContent.color}
                            titleMarginTop={this.titleMarginTop}
                            backgroundColor={this.backgroundColor}
                            color={this.textColor}
                            title={cardContent.title}
                            description={cardContent.description}>
                        </Card>)
                    })}
                </View>
                {(this.state.infoModal) && (
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
                            {this.state.gameTitle === 'Buszozás' && (
                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: '75%' }}>
                                    <ScrollView>
                                        <Text style={{ fontFamily: 'Lemon-Regular', fontSize: 28, color: '#ffffff', textAlign: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 30 }}>
                                            A busz ami garantáltan rosszullétet okoz{'\n'}{'\n'}
                                            Kellékek: Egy pakli ( nagyobb társaság esetén pl 8 fő felett 2 pakli ajánlott),{'\n'} és egy kb 40*40 centis felület amire a lapokat majd le lehet rakni
                                        </Text>
                                    </ScrollView>
                                </View>
                            )}
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 50 }}>
                                <CustomButton
                                    color={'#FBFF38'}
                                    textColor={'rgba(0,0,0,0.75)'}
                                    onPress={() => this.setState({ infoModal: false })}
                                >
                                    Vissza
                           </CustomButton>
                            </View>
                        </View>
                    </Modal>
                )}
            </ScrollView>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#FBFF38'
    },
    cardContainer: {
        alignItems: 'center',
        paddingTop: 40
    },
    title: {
        fontSize: 24,
        fontFamily: 'Ribeye-Regular',
        paddingBottom: 40,
        color: '#011A27'
    }
}
export default CardGames