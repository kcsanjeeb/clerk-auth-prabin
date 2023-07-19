'use client';

import PropTypes from 'prop-types';
import { useMemo, useCallback, useState } from 'react';
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';
// config
import { ClerkProvider } from '@clerk/nextjs'
//
import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------

function AuthProviderWrapper({ children }) {
  const { isSignedIn, user, isLoaded} =useAuth0(); // change this
console.log(user)
  // ----------------------------------------------------------------------

  const checkAuthenticated = isSignedIn ? 'authenticated' : 'unauthenticated';

  const status =  isLoaded ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: {
        ...user,
        displayName: user?.name,
        photoURL: user?.picture,
        role: 'admin',
      },
      method: 'clerk',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [status, user]
  );
    //print memoizedValue
  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProviderWrapper.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

export const AuthProvider = ({ children }) => {

  return (
    <ClerkProvider>
      <AuthProviderWrapper>{children}</AuthProviderWrapper>
    </ClerkProvider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};


