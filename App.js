import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import { store, persistor } from './src/store';
import styles from './src/screens/styles'
import MainStackNavigation from "./src/navigation/MainStackNavigation";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
          <SafeAreaProvider>
              <Provider store={store}>
                  <PersistGate loading={null} persistor={persistor}>
                      <NavigationContainer>
                          <MainStackNavigation />
                      </NavigationContainer>
                  </PersistGate>
              </Provider>
              <Toast autoHide={true} swipeable={true} visibilityTime={1000} text1Style={styles.label} />
          </SafeAreaProvider>
  );
}
