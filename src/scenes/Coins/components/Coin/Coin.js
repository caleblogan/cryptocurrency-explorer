import React, {Component} from 'react';
import PropTypes from 'prop-types';

import axios from 'axios'

import styles from './Coin.scss';


class Coin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingCoin: false
    }
  }

  componentDidMount() {
    this.loadData(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.loadData(nextProps.match.params.id);
    }
  }

  loadData(coinId) {
    if (this.state.isLoadingCoin) {
      return;
    }
    this.setState({isLoadingCoin: true});
    console.log('loading:', coinId);
    axios.get(`https://api.coinmarketcap.com/v1/ticker/${coinId}/`)
      .then(data => {
        let coin = data.data;
        this.setState({
          ...coin,
          isLoadingCoin: false
        });
      })
      .catch(err => {
        console.log(err)
        this.setState({isLoadingCoin: false});
      })
  }

  render() {
    let coinId = this.props.match.params.id;
    return (
      <div>
        coinId: {coinId}
      </div>
    );
  }
}

Coin.propTypes = {};

export default Coin;
