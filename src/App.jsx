import React from 'react';
import Routes from './Routes';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;