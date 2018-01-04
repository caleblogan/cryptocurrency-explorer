import React from 'react';
import {Link} from 'react-router-dom';
import CoinItem from "./components/CoinItem/CoinItem"

import styles from './CoinSidebar.scss';

const CoinSidebar = ({coins, activeId}) => {
  let coinList = coins.map(coin => (
    <CoinItem key={coin.id} coin={coin} isActive={coin.id === activeId}/>
  ));
  return (
    <div>
      <ul className={styles.coinList}>
        {coinList}
      </ul>
    </div>
  );
};

export default CoinSidebar;
