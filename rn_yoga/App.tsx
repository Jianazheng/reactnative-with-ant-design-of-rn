/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'mobx-react';
import AppStore from './src/store/index';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import {navItem,navConfig} from './src/router/router';

const AppNavigator =  createStackNavigator(navItem,navConfig);

const Tabs = createAppContainer(AppNavigator);

type Props = {};
export default class App extends Component<Props> {

  handleNavigationChange = (e:any):void =>{
    console.log(e)
  }
  render() {
    return (
      <Provider store={AppStore}>
        <Tabs 
        onNavigationStateChange={this.handleNavigationChange}
        uriPrefix="/app">
        </Tabs>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
