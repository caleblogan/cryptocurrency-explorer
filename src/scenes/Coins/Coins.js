import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Row, Col} from 'reactstrap';

import axios from 'axios';

import styles from './Coins.scss';
import CoinFilter from "./components/CoinFilter/CoinFilter"
import CoinSidebar from "./components/CoinSidebar/CoinSidebar"
import Coin from "./components/Coin/Coin"

class Coins extends Component {

  constructor(props) {
    super(props);
    this.defaultCoinId = 'bitcoin';
    this.state = {
      coins: [],
      isLoadingCoins: true,
      searchValue: '',
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount() {
    this.loadCoins();
  }

  loadCoins() {
    this.setState({isLoadingCoins: true});
    console.log('loading coins');
    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=10')
      .then(data => {
        let coins = data.data;
        this.setState({
          coins: coins,
          isLoadingCoins: false
        });
      })
      .catch(err => {
        console.log(err)
        this.setState({isLoadingCoins: false});
      })
  }

  handleSearchChange(e) {
    this.setState({
      searchValue: e.target.value
    })
  }

  handleSearchSubmit(e) {
    console.log('searched for:', this.state.searchValue);
    e.preventDefault();
  }

  filterCoins() {
    let searchValue = this.state.searchValue.trim().toLowerCase();
    if (searchValue === '') {
      return this.state.coins;
    }
    return this.state.coins.filter(coin => {
      return ~coin.name.trim().toLowerCase().indexOf(searchValue) ||
              coin.symbol.toLowerCase().startsWith(searchValue) ||
              coin.id === this.activeCoinId();
    })
  }

  activeCoinId() {
    let path = this.props.location.pathname.split('/')
                .filter(s => s !== '');
    return path.length === 2 ? path[1] : null;
  }

  render() {
    return (
      <Row noGutters>
        <Col xs="12">
          <CoinFilter
            searchValue={this.state.searchValue}
            onChange={this.handleSearchChange}
            onSubmit={this.handleSearchSubmit}
          />
        </Col>
        <Col md="3">
          <CoinSidebar coins={this.filterCoins()} activeId={this.activeCoinId()}/>
        </Col>
        <Col md="9">
          <Switch>
            <Route exact path="/coins" render={props => (<Redirect to={`/coins/${this.defaultCoinId}`}/>)}/>
            <Route path="/coins/:id" component={Coin}/>
          </Switch>
        </Col>
      </Row>
    );
  }
}

Coins.propTypes = {};

export default Coins;