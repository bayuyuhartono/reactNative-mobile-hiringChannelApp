import React, {Component} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SERVER_URL} from 'react-native-dotenv';

import ProfileEngineer from './ProfileEngineer';
import ProfileCompany from './ProfileCompany';

import {connect} from 'react-redux';
import {fetchProfile, deleteAccount} from '../public/redux/actions/Profile';

class MyAccount extends Component {
  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      who: this.getWho(),
    };
  }

  getWho = async () => {
    let who = '';
    try {
      await AsyncStorage.getItem('@hiringWho').then(res => {
        who = res;
      });
    } catch (e) {
      // error reading value
    }
    return who;
  };

  getData = async () => {
    try {
      let url = `http://3.92.63.204:3030/api/v1/${await AsyncStorage.getItem(
        '@hiringWho',
      )}/${await AsyncStorage.getItem('@hiringId')}`;
      this.props.fetchProfile(url);
      console.warn(url);
      this.setState({who: await AsyncStorage.getItem('@hiringWho')});
    } catch (e) {
      // error reading value
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const {who} = this.state;
    return (
      <>
        <SafeAreaView>
          <ScrollView>
            {who &&
              who === 'engineer' &&
              this.props.propsData.profile.map(display => (
                <ProfileEngineer
                  allProps={display}
                  title="My Profile - Engineer"
                  editNeeded={true}
                  navigate={this.props.navigation}
                />
              ))}
            {who &&
              who !== 'engineer' &&
              this.props.propsData.profile.map(display => (
                <ProfileCompany
                  allProps={display}
                  title="My Profile - Company"
                  editNeeded={true}
                  navigate={this.props.navigation}
                />
              ))}
            {!who && <ActivityIndicator size="large" color="#009688" />}
            <View style={styles.bottomButton}>
              <Button
                title="Log Out"
                color="#009688"
                onPress={async () => {
                  AsyncStorage.removeItem('@hiringEmail');
                  AsyncStorage.removeItem('@hiringId');
                  AsyncStorage.removeItem('@hiringWho');
                  AsyncStorage.removeItem('@hiringToken');
                  Alert.alert('Alert', 'Logged Out');
                  this.props.navigation.navigate('Auth');
                }}
              />
            </View>
            <View style={styles.bottomButton}>
              <Button
                title="Delete This Account"
                color="#9c0d0d"
                onPress={async () => {
                  let url = `${SERVER_URL}/api/v1/${await AsyncStorage.getItem(
                    '@hiringWho',
                  )}/${await AsyncStorage.getItem('@hiringId')}`;
                  this.props.deleteAccount(url);
                  AsyncStorage.removeItem('@hiringEmail');
                  AsyncStorage.removeItem('@hiringId');
                  AsyncStorage.removeItem('@hiringWho');
                  AsyncStorage.removeItem('@hiringToken');
                  Alert.alert('Alert', 'Account has been deleted');
                }}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  bottomButton: {
    marginTop: 10,
  },
});

const mapStateToProps = state => ({
  propsData: state.profile,
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: url => dispatch(fetchProfile(url)),
  deleteAccount: url => dispatch(deleteAccount(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyAccount);
