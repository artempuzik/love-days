import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import { store, persistor } from './src/store';
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
      </SafeAreaProvider>
  );
}
