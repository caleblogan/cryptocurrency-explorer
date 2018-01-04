import React from 'react';
import {Row, Col} from 'reactstrap';

import styles from './Header.scss'


const Header = () => {
  return (
    <Row noGutters>
      <Col>
        <header className={styles.header}>
          <h1 className="text-center">Cyrptocurrencies</h1>
        </header>
      </Col>
    </Row>
  );
};

export default Header;
