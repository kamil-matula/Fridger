import React from 'react';
import { Navigation } from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { CustomTheme } from './src/theme';
import { StatusBar } from 'expo-status-bar';
import SignUpFeedback from './src/screens/login/SignUpFeedback';

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={CustomTheme}>
        {/* <StatusBar style='light' backgroundColor={CustomTheme.colors.richBlack} /> */}
        {/* <Navigation /> */}
        <SignUpFeedback />
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
