import React, { Component } from 'react';
import { View, Text, Modal, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, CustomButton } from '../common';
import SQLite from 'react-native-sqlite-storage';

class LetsDrink extends Component {
    constructor(props) {
        super(props);

        this.showExitButton = false;
        this.firstVirusCounter = 0;
        this.secondVirusCounter = 0;

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
            db,
            playerOne: '',
            questions: [],
            question: '',
            viruses: [],
            virus: [],
            isVirusIsOn: false,
            truthModal: false,
            dareModal: false,
            infoModal: false,
        }
    }


    async UNSAFE_componentWillMount() {
        await this.getVirusFromDatabase();
        await this.getQuestionFromDatabase();
    }

    componentWillUnmount() {
        const { db } = this.state;
        db.close();
    }

    getRandomPalayer() {
        const randomName = this.props.data[Math.floor(Math.random() * (0 - this.props.data.length) + this.props.data.length)]
        this.setState({ playerOne: randomName });
    }

    async nextQuestionEventHanlder() {
        if (this.state.questions.length === 0) {
            this.showEndGameText();
            return;
        }
        await this.getRandomPalayer();

        let question = this.state.questions.splice(Math.floor(Math.random() * this.state.questions.length), 1)[0];

        switch (question.type) {
            case 'single':
                this.onePlayerQuestion(question.todo);
                break;
            case 'multi':
                this.multiPlayerQuestion(question.todo);
                break;
            case 'virus':
                this.showVirusAlert(question.todo);
                break;
            case 'simple':
                this.setState({ question: question.todo });
                break;
            case 'round':
                this.roundQuestion(question.todo);
                break;
        }
    }

    showEndGameText() {
        endText = 'Köszönjük,hogy velünk játszottál! \n Sajnos nincs több kérdés :(';
        this.setState({ question: endText, isVirusIsOn: false });
        this.showExitButton = true;
    }

    async roundQuestion(question) {
        let questionerArray = this.props.data.filter((str) => { return !str.includes(this.state.playerOne) })
        let playerTwo = questionerArray[Math.floor(Math.random() * (0 - questionerArray.length) + questionerArray.length)]
        question = question.replace('$P1', this.state.playerOne).replace('$P2', playerTwo);
        await this.setState({ question })
    }

    getNextViurs() {
        let virus = this.viruses.splice(Math.floor(Math.random() * this.viruses.length), 1)[0];;
    }

    increaseVirusCounter() {
        if (this.state.virus.length === 1) {
            this.firstVirusCounter = this.firstVirusCounter + 1;
        }
        if (this.state.virus.length === 2) {
            this.firstVirusCounter = this.firstVirusCounter + 1;
            this.secondVirusCounter = this.secondVirusCounter + 1;
        }
    }

    showVirusAlert(virus) {
        this.setState({ isVirusIsOn: true });
        this.setState({ virus: [...this.state.virus, virus] });
        this.setState({ question: virus });
    }

    async onePlayerQuestion(question) {
        question = question.replace('$P1', this.state.playerOne);
        await this.setState({ question })
    }

    async multiPlayerQuestion(question) {
        let questionerArray = this.props.data.filter((str) => { return !str.includes(this.state.playerOne) })
        let playerTwo = questionerArray[Math.floor(Math.random() * (0 - questionerArray.length) + questionerArray.length)]
        question = question.replace('$P1', this.state.playerOne).replace('$P2', playerTwo);
        await this.setState({ question })
    }

    getQuestionFromDatabase() {
        const { db } = this.state;
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM letsdrink WHERE type != "virus";', [], (tx, results) => {
                const rows = results.rows;
                let questions = [];

                for (let i = 0; i < rows.length; i++) {
                    questions.push({
                        ...rows.item(i),
                    });
                }
                this.setState({ questions });
                this.nextQuestionEventHanlder();
            });
        });
    }

    getVirusFromDatabase() {
        const { db } = this.state;
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM letsdrink WHERE type = "virus";', [], (tx, results) => {
                const rows = results.rows;
                let viruses = [];

                for (let i = 0; i < rows.length; i++) {
                    viruses.push({
                        ...rows.item(i),
                    });
                }
                this.setState({ viruses });
            });
        });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#B5ED55' }}>
                <Header
                    backButtonOnPress={() => { Actions.main() }}
                    infoOnPress={() => this.setState({ infoModal: true })}
                />
                {this.state.isVirusIsOn && (
                    <View style={styles.virusHolder}>
                        <Text style={styles.virusText}>{this.state.virus}</Text>
                    </View>)
                }
                <View style={{ position: 'absolute', top: '40%', alignItems: 'center', width: '100%', alignItems: 'center' }}>
                    <Text style={styles.description}>{this.state.question}</Text>
                </View>
                <View style={styles.buttonHolder}>
                    {this.showExitButton ?
                        <CustomButton
                            onPress={() => { Actions.main() }}
                            color='#011A27'
                            textColor='#B5ED55'
                        >
                            Vége
                        </CustomButton> :
                        <CustomButton
                            onPress={() => { this.nextQuestionEventHanlder() }}
                            color='#011A27'
                            textColor='#B5ED55'
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
                                    <Text style={{ fontFamily: 'Lemon-Regular', fontSize: 28, color: '#ffffff', textAlign: 'left', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 30 }}>
                                        A játék 5 típusfeladatből épül fel. Ezekbe kapsz betekintést az alábbi pontokban.{'\n'}{'\n'}
                                                A játéknak szüksége van egy játékos mestere aki kézben fogja tartani a játék irányítását. Az ő személyéről ti játékosok döntetek.{'\n'}{'\n'}
                                        <Text style={{ textDecorationLine: 'underline' }}>Mindenki:</Text> Ebben az esetben mindenkinek el kell végezni a feladatot amit a játék ír. Akik nem tesznek eleget a feladatnak igyanak kettő kortyot!{'\n'}{'\n'}
                                        <Text style={{ textDecorationLine: 'underline' }}>Egyéni:</Text> Csak arra a személyre vonatkozik a feladat akinek a neve szerepel a feladat leírásában. Ha nem teljesíti, igyon meg kettő kortyot!{'\n'}{'\n'}
                                        <Text style={{ textDecorationLine: 'underline' }}>Páros:</Text> A feladat leírásban olvasható két játékosnak kell elvégezni a feladot.Amelyiktek nem teljesíti, igyon meg kettő kortyot!{'\n'}{'\n'}
                                        <Text style={{ textDecorationLine: 'underline' }}>Körjáték:</Text> A kiírt feladatot olyan formában kell elvégezni, hogy a megadott személy elkezdi a feladatot majd a tőle jobbra ülőnek kell folytatni, és igy tovább. Amelyik játékos hibázik, vagy ismétel akkor az ő jutalma 2 korty.{'\n'}{'\n'}
                                        <Text style={{ textDecorationLine: 'underline' }}>Virus:</Text> A virus feladat szólhat egy vagy két bizonyos játékonak, vagy akár az összes játékosnak. Ezeket a feladatokat egészen viszzavonásig kell csinálni, amelyről a játék tudatni fog. Amennyiben valaki nem tartja magát a szabályhoz 2 kortyot kell magábadönteni.{'\n'}
                                    </Text>
                                </ScrollView>
                            </View>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 50 }}>
                                <CustomButton
                                    color={'#B5ED55'}
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
    virusHolder: {
        width: '100%',
        backgroundColor: '#FF6262',
        height: 40,
        marginTop: '5%'
    },
    virusText: {
        fontSize: 24,
        fontFamily: 'Ribeye-Regular',
        textAlign: 'center'
    },
    description: {
        width: '80%',
        fontSize: 28,
        fontFamily: 'Lemon-Regular',
        color: '#011A27',
        textAlign: 'center',
    },
    buttonHolder: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: '10%',
        alignItems: 'center',
        width: '100%'
    }
}


export default LetsDrink