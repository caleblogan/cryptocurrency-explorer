import React, {Component} from 'react';
import PropTypes from 'prop-types';

import axios from 'axios'

import styles from './Coin.scss';
import loadingImg from '../../imgs/loading-bubbles.svg';


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
          ...coin[0],
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
      <div className={styles.coin}>
        {this.state.isLoadingCoin ? (
          <img className={styles.loading} src={loadingImg} alt="Loading icon" />
        ) : (
          <div>
            <h2 className="text-center">{this.state.name}</h2>
          </div>
        )}
      </div>
    );
  }
}

Coin.propTypes = {};

export default Coin;
