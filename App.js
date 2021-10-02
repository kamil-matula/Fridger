import React from 'react';
import Navigation from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { CustomTheme } from './src/theme';

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={CustomTheme}>
        <Navigation />
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
