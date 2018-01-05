import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Line} from 'react-chartjs-2';

import axios from 'axios';
import clone from 'clone';

import styles from './Coin.scss';
import loadingImg from '../../imgs/loading-bubbles.svg';


class Coin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingCoin: false,
      chartData: {
        labels: [],
        datasets: [{
            data: [
            ],
        }]
      }
    }
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          type: 'time',
          display: true,
          time: {
            unit: 'day',
            // min: 1499472000 * 1000,
          },
          scaleLabel: {
            display: true,
            labelString: 'Date'
          },
          ticks: {
            callback: function(dataLabel, index) {
              // Hide the label of every 2nd dataset. return null to hide the grid line too
              return index % 4 === 0 ? dataLabel : '';
            }
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'USD'
          },
          ticks: {
            beginAtZero:true,
            callback: function(dataLabel, index) {
              return `$${dataLabel}`;
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, chart) => {
            return this.convertPrice(tooltipItem.yLabel);
          }
        }
      }
    };
  }

  componentDidMount() {
    this.loadData(this.props.match.params.id, this.props.coinSymbol);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.chartOptions && this.state) {
      this.chartOptions.scales.xAxes[0].time.min = nextState.chartData.labels[0];
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.loadData(nextProps.match.params.id, nextProps.coinSymbol);
    }
  }

  convertPrice(rawPrice) {
    return `$${rawPrice}`;
  }

  convertToDate(timestamp) {
    return new Date(timestamp * 1000);
  }

  parseGraphData(history) {
    let labels = history.Data.map(point => this.convertToDate(point.time));
    let values = history.Data.map(point => ({y: point.close, t: this.convertToDate(point.time)}));
    return [values, labels];
  }

  loadData(coinId, coinSymbol) {
    if (this.state.isLoadingCoin) {
      return;
    }
    this.setState({isLoadingCoin: true});
    console.log('loading:', coinId);
    console.log('symbol:', coinSymbol);

    const self = this;
    axios.all([this.getCoinData(coinId), this.getCoinHistory(coinSymbol)])
      .then(axios.spread((coinData, coinHistory) => {
        let isCoinSupported = true;
        if (coinHistory.data.Response === 'Error') {
          console.log('history for this coin is not supported');
          isCoinSupported = false;
        }
        let [historyValues, historyLabels] = this.parseGraphData(coinHistory.data);
        let coin = coinData.data[0];

        this.setState((prevState) => {
          let newChartData = clone(prevState.chartData);
          newChartData.labels = historyLabels;
          newChartData.datasets[0].data = historyValues;
          return {
            ...coin,
            chartData: newChartData,
            isLoadingCoin: false,
            isCoinSupported
          };
        });
      }))
      .catch(err => {
        console.log(err)
        this.setState({isLoadingCoin: false});
      });
  }

  getCoinData(coinId) {
    return axios.get(`https://api.coinmarketcap.com/v1/ticker/${coinId}/`);
  }

  getCoinHistory(coinSymbol) {
    let url = `https://min-api.cryptocompare.com/data/histoday`;
    return axios.get(url, {
      params: {
        fsym: coinSymbol.toUpperCase(),
        tsym: 'USD',
        limit: 60,
        aggregate: 3,
        e: 'Kraken'
      }
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.state.isLoadingCoin ? (
          <img className={styles.loading} src={loadingImg} alt="Loading icon" />
        ) : !this.state.isCoinSupported ? (
          <h3>History for this coin is not available</h3>
        ) : (
          <div>
          <header className={styles.header}>
            <h2 className={styles.header__name}>{this.state.name}</h2>
            <span className={styles.conversionPrice}>${this.state.price_usd}</span>
          </header>
          <div className={styles.content}>
            <Line data={this.state.chartData} options={this.chartOptions} />
          </div>
          </div>
        )}
      </div>
    );
  }
}

Coin.propTypes = {};

export default Coin;
