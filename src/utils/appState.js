import { AppState } from 'react-native';

export default appStateHandler = () => {
  let appState = AppState.currentState;

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // App has come to the foreground
      console.log('App has come to the foreground!');
    }

    appState = nextAppState;
  };

  AppState.addEventListener('change', handleAppStateChange);

  // Clean up the event listener
  return () => AppState.removeEventListener('change', handleAppStateChange);
};
