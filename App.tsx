import React from 'react';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <AppProvider>
        <AppNavigator />
      </AppProvider>

      <Toast />
    </>
  );
};

export default App;
