import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card } from './common';

class MainMenuComponent extends Component {
    titleMarginTop = 30
    cardContent = [
        // a kommentezett rész később kerül be!
      /*   { backgroundColor: '#FBFF38', color: '#011A27', title: 'Kártyajátékok', description: 'Ivós kártyajátékok leírása', function: Actions.cardGames },*/
        { backgroundColor: '#28D6C8', color: '#011A27', title: 'Én még soha...', description: 'De ha te igen akkor igyál :)', function: Actions.iHaveNever },
        { backgroundColor: '#B5ED55', color: '#011A27', title: 'Beivós koppintás', description: 'Fontos szöveg', function: ()=> Actions.addPlayers({color:"#B5ED55",game:'letsDrink'}) },
        { backgroundColor: '#FCBFAD', color: '#011A27', title: 'Felelsz vagy mersz', description: 'Merj és itass', function:()=> Actions.addPlayers({color:"#FCBFAD",game:'truthOrDare'}) }
    ]
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#1E434C' }}> 
                <View style={styles.container}>
                    <Text style={styles.title}>IVÓS JÁTÉKOK</Text>
                    <Text style={styles.funText}>Hát akkor húzóra</Text>
                    <View>
                        {this.cardContent.map(cardContent => {
                            return (<Card onPress={() => {
                                cardContent.function();
                            }}
                                key={cardContent.color}
                                titleMarginTop={this.titleMarginTop}
                                backgroundColor={cardContent.backgroundColor}
                                color = {cardContent.color}
                                title={cardContent.title}
                                description={cardContent.description}>
                            </Card>)
                        })}
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E434C'
    },
    title: {
        width: 300,
        fontSize: 36,
        fontFamily: 'Ribeye-Regular',
        marginVertical: 40,
        color: '#F7EC35',
        textAlign: 'center'
    },
    funText: {
        width: 300,
        fontSize: 24,
        textAlign: 'center',
        color: '#F7EC35',
        fontFamily: 'Ribeye-Regular',
        marginBottom: 40,
    }
}
export default MainMenuComponent