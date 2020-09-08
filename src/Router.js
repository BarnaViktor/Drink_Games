import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import MainMenu from './components/MainMenu';
import TruthOrDare from './components/truthOrDare/TruthOrDare';
import IHaveNever from './components/iHaveNever/IHaveNever';
import LetsDrink from './components/letsDrink/LetsDrink';
import CardGames from './components/cardGames/CardGames';
import AddPlayerComponent from './components/AddPlayers';

const RouterComponent = () => {
    return (
        <Router>
            <Stack key='root'>
                <Scene
                    hideNavBar
                    key='main'
                    component={MainMenu}
                >
                </Scene>
                <Scene
                    hideNavBar
                    key="truthOrDare"
                    component={TruthOrDare}
                />
                <Scene
                    hideNavBar
                    key="iHaveNever"
                    component={IHaveNever}
                />
                <Scene
                    hideNavBar
                    key="letsDrink"
                    component={LetsDrink}
                />
                <Scene
                    hideNavBar
                    key="cardGames"
                    component={CardGames}
                />
                <Scene
                    hideNavBar
                    key='addPlayers'
                    component={AddPlayerComponent}
                />
            </Stack>
        </Router>
    )
}
export default RouterComponent