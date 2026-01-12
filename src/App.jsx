import React from 'react';
import Routes from './Routes';
import { JWTAuthProvider } from './contexts/JWTAuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <JWTAuthProvider>
        <Routes />
      </JWTAuthProvider>
    </LanguageProvider>
  );
}

export default App;