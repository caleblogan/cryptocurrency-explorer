import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, Input} from 'reactstrap';

import styles from './CoinFilter.scss';

class CoinFilter extends Component {
  render() {
    return (
      <Form onSubmit={this.props.onSubmit}>
        <Input className={styles.searchInput} type="text" value={this.props.searchValue} onChange={this.props.onChange}/>
      </Form>
    );
  }
}

CoinFilter.propTypes = {};

export default CoinFilter;
