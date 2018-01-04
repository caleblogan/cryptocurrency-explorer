import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import Coins from "./scenes/Coins/Coins"

import styles from './App.scss';
import Header from "./components/Header/Header"


class App extends React.Component {
  render() {
    return (
      <Container className={styles.container} fluid>
        <Header/>

        <Switch>
          <Route exact path="/" render={() => (
            <Redirect to="/coins"/>
          )}/>
          <Route path="/coins" component={Coins}/>
        </Switch>
      </Container>
    );
  }
}


export default App;
