/*
 * @Author: liuxiang
 * @Date: 2026-01-30 15:53:26
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-02-02 00:59:35
 * @Description: file content
 */
import { Platform, useColorScheme } from 'react-native';
import { NavigationBar } from 'react-native-bars';
import BootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@td-design/react-native';
import { useMount } from '@td-design/rn-hooks';

import { linking } from '@/linking';
import { navigationRef } from '@/services/NavigationService';
import { darkTheme, lightTheme } from '@/theme';
import { store, persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';

import { Fallback } from './components/Fallback';
import Stack from './stacks';
import { ToastComponent } from '@/components/Toast';

const Main = () => {
  const theme = useColorScheme();

  useMount(() => {
    const init = async () => {
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  });


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
              <NavigationContainer
                ref={navigationRef}
                linking={linking}
                fallback={<Fallback />}
                theme={theme === 'dark' ? DarkTheme : DefaultTheme}
              >
                <Stack />
              </NavigationContainer>
            </ThemeProvider>
          </GestureHandlerRootView>
          {Platform.OS === 'android' && <NavigationBar barStyle="dark-content" />}
          <ToastComponent />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export const App = Main;
