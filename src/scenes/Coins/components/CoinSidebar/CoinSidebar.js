import React from 'react';
import {Link} from 'react-router-dom';
import ReactScrollableList from 'react-scrollable-list';

import CoinItem from "./components/CoinItem/CoinItem"

import styles from './CoinSidebar.scss';

// class CoinSidebar extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//
//   componentDidMount() {
//   }
//
//   componentDidUpdate() {
//   }
//
//   componentWillUnmount() {
//   }

const CoinSidebar = ({coins, activeId}) => {
  let coinList = coins.map(coin => (
    {id: coin.id, content: <CoinItem key={coin.id + coin.name} coin={coin} isActive={coin.id === activeId}/>}
  ));

  return (
    <div className={styles.wrapper}>
      {/*<ul className={styles.coinList}>*/}
      {/*{coinList}*/}
      {/*</ul>*/}
      <ReactScrollableList
        listItems={coinList}
        heightOfItem={30}
        maxItemsToRender={20}
        style={{overflowY: 'scroll', height: '78vh'}}
      />
    </div>
  );
};

export default CoinSidebar;
