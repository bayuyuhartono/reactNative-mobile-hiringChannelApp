/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Provider} from 'react-redux';

import store from './src/public/redux/store';

// import component
import Home from './src/screen/Home';
import EngineersList from './src/screen/EngineersList';
import EngineerSingle from './src/screen/EngineerSingle';
import EngineerEdit from './src/screen/EngineerEdit';
import CompanyList from './src/screen/CompanyList';
import CompanySingle from './src/screen/CompanySingle';
import CompanyEdit from './src/screen/CompanyEdit';
import MyAccount from './src/screen/MyAccount';
import UpdateAva from './src/screen/updateAva';
import Login from './src/screen/Login';
import Register from './src/screen/Register';
import SplashScreen from './src/screen/SplashScreen';

// for disable yellow box warn
console.disableYellowBox = false;

const AuthStack = createStackNavigator({
  Login: Login,
  Register: Register,
});

const HomeStack = createStackNavigator({
  Home: Home,
  EngineersList,
  EngineerSingle,
  CompanyList,
  CompanySingle,
});

const AccountStack = createStackNavigator({
  Me: MyAccount,
  EngineerEdit,
  CompanyEdit,
  UpdateAva,
});

const RootStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Account: AccountStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
        } else if (routeName === 'Account') {
          iconName = 'ios-contact';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#009688',
      inactiveTintColor: 'gray',
    },
  },
);

const App = createAppContainer(RootStack);

const MainNavigation = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: SplashScreen,
      App,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    );
  }
}
