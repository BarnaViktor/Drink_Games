import React, { Component } from 'react';
import { View, Text, ScrollView, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { CustomButton, Header } from '../common';
import SQLite from 'react-native-sqlite-storage';


class IHaveNever extends Component {
    constructor(props) {
        super(props);

        this.showExitButton = false;

        // Az adatbázishoz csatlakozás majd ki lesz szervezve

        const db = SQLite.openDatabase(
            {
                name: 'DrinkGamesDB.db',
                location: 'default',
                createFromLocation: '~www/DrinkGamesDB.db'
            }, () => { },
            error => {
                console.log(error)
            }
        )

        this.state = {
            infoModal: false,
            db,
            facts: [],
            fact: ''
        }
    }

    componentDidMount() {
        const { db } = this.state;
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM IHaveNever;', [], (tx, results) => {
                const rows = results.rows;
                let facts = [];

                for (let i = 0; i < rows.length; i++) {
                    facts.push({
                        ...rows.item(i),
                    });
                }

                this.setState({ facts });
                this.nextQuestionEventHanlder();
            });
        });

    }

    componentWillUnmount() {
        const { db } = this.state;
        db.close();
    }


    nextQuestionEventHanlder() {
        let fact;
        if (this.state.facts.length === 0) {
            fact = 'Köszönjük,hogy velünk játszottál! \n Sajnos nincs több kérdés :(';
            this.showExitButton = true;
        }
        else {
            fact = this.state.facts.splice(Math.floor(Math.random() * this.state.facts.length), 1)[0].fact;
        }
        this.setState({ fact });
    }


    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#28D6C8' }}>
                <Header
                    backButtonOnPress={() => { Actions.pop() }}
                    infoOnPress={() => this.setState({ infoModal: true })}
                />
                <View style={{ paddingTop: 50, paddingLeft: 10 }}>
                    <Text style={styles.title}>Én még soha...</Text>
                </View>
                <View style={{ paddingTop: '30%', width: '100%', alignItems: 'center' }}>
                    <Text style={styles.description}>{this.state.fact}</Text>
                </View>
                <View style={styles.buttonHolder}>
                    {this.showExitButton ?
                        <CustomButton
                            onPress={() => { Actions.main() }}
                            color='#011A27'
                            textColor='#28D6C8'
                        >
                            Vége
                        </CustomButton> :
                        <CustomButton
                            onPress={() => { this.nextQuestionEventHanlder() }}
                            color='#011A27'
                            textColor='#28D6C8'
                        >
                            Következő
                   </CustomButton>
                    }
                </View>
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
                                    <Text style={{ fontFamily: 'Lemon-Regular', fontSize: 28, color: '#ffffff', textAlign: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 30 }}>
                                        Amennyiben valamelyik kijelentésre, Én már IGEN lenne a válaszod, jutalmad egy korty.
                                    </Text>
                                </ScrollView>
                            </View>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 50 }}>
                                <CustomButton
                                    color={'#28D6C8'}
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
    title: {
        width: '100%',
        fontSize: 36,
        fontFamily: 'Ribeye-Regular',
        color: '#011A27',
        textAlign: 'center'
    },
    description: {
        width: '80%',
        fontSize: 28,
        fontFamily: 'Lemon-Regular',
        color: '#011A27',
        textAlign: 'center'
    },
    buttonHolder: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: '10%',
        alignItems: 'center',
        width: '100%'
    }

}

export default IHaveNever