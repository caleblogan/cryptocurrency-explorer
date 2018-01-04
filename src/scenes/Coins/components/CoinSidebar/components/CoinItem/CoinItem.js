import React from 'react';
import {Link} from 'react-router-dom';

import thumbnails from './thumbnails.scss';
import styles from './CoinItem.scss';


const CoinItem = ({coin, isActive}) => {
  let classes = [styles.item, isActive ? styles.active : '']
  let thumbnailClass = [styles.thumbnail, thumbnails[`s-s-${coin.id}`]];
  return (
    <Link to={`/coins/${coin.id}`}>
      <li className={classes.join(' ')}>
        <div className={thumbnailClass.join(' ')}></div>
        {coin.name}
        </li>
    </Link>
  );
};

export default CoinItem;
