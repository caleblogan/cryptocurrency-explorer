import React from 'react';
import {Link} from 'react-router-dom';

import ScrollArea from 'react-scrollbar';

import CoinItem from "./components/CoinItem/CoinItem"

import styles from './CoinSidebar.scss';

function onFocus(e) {
  console.log('------- grabbing focus ---------');
}

const CoinSidebar = ({coins, activeId}) => {
  let coinList = coins.map(coin => (
    <CoinItem key={coin.id} coin={coin} isActive={coin.id === activeId}/>
  ));
  return (
    <div className={styles.wrapper}>
      <ScrollArea
        speed={1}
        className={styles.scrollArea}
        horizontal={false}
      >
        <ul className={styles.coinList} onFocus={onFocus}>
          {coinList}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default CoinSidebar;
