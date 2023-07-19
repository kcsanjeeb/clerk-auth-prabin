'use client';

import PropTypes from 'prop-types';

import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------

export function AuthConsumer({ children }) {
  return (
    <AuthContext.Consumer>
      {(auth) => (auth.loading ? <p>loading</p> : children)}
    </AuthContext.Consumer>
  );
}

AuthConsumer.propTypes = {
  children: PropTypes.node,
};

