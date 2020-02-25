import React, { Fragment } from 'react';
import loader from '../../img/loader.gif';

export default () => (
  <Fragment>
    <img
      src={loader}
      style={{ width: '100px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);
