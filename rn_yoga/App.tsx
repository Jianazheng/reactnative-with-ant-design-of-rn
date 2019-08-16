/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, BackHandler, StatusBarIOS } from 'react-native';
import { Provider, observer, inject } from 'mobx-react';
import store from './src/store/index';
import { createStackNavigator, createAppContainer, NavigationEvents, NavigationState } from 'react-navigation';
import { navItem, navConfig } from './src/router/router';
import { Provider as AntProvider } from '@ant-design/react-native';
import { DeviceEventEmitter } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { Toast } from '@ant-design/react-native';
import { isios } from './src/tools/function'


const AppNavigator = createStackNavigator(navItem, navConfig);

const Tabs = createAppContainer(AppNavigator);

interface Props { };

export default class App extends Component<Props> {

  lastBackPressed: number = new Date().getTime();

  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    if (isios()) {
      StatusBarIOS._nativeModule.getHeight((h) => {
        store.publicStore.setiosmt(h.height)
      });
    }
  }

  componentDidMount() {
    SplashScreen.hide()
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    let lastBackTime = new Date().getTime();
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= lastBackTime) {
      BackHandler.exitApp();
      return false;
    } else {
      this.lastBackPressed = lastBackTime;
      Toast.info('再按一次退出应用', 1.4, undefined, false)
      return true;
    }
  };

  handleNavigationChange = (prevState: object, newState: object, action: object) => {
    if (Platform.OS === 'android') {
      if (newState.routes.length > 1) {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
      } else {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
      }
    }
  }

  render() {
    return (
      <Provider {...store}>
        <AntProvider>
          <Tabs
            onNavigationStateChange={(prevState, newState, action) => { this.handleNavigationChange(prevState, newState, action) }}
            uriPrefix="/app">
          </Tabs>
        </AntProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({

});
