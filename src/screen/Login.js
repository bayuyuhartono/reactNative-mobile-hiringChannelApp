import React, {Component} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SERVER_URL} from 'react-native-dotenv';

export default class Login extends Component {
  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleLogin = _ => {
    if (!this.state.email || !this.state.password) {
      return Alert.alert('Alert', 'email and password is required');
    }
    const formData = {
      email: this.state.email,
      password: this.state.password,
    };

    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    const url = `${SERVER_URL}/api/v1/engineer/login`;
    console.warn(url);
    axios
      .post(url, formData, config)
      .then(response => {
        AsyncStorage.setItem('@hiringEmail', response.data.data[0].email);
        AsyncStorage.setItem('@hiringId', response.data.data[0].id);
        AsyncStorage.setItem('@hiringWho', response.data.data[0].who);
        AsyncStorage.setItem('@hiringToken', response.data.data[0].token);
        this.props.navigation.navigate('App');
      })
      .catch(error => {
        axios
          .post(`${SERVER_URL}/api/v1/company/login`, formData, config)
          .then(response => {
            if (response.data.error) {
              Alert.alert('Alert', 'email and password is required');
            } else {
              AsyncStorage.setItem('@hiringEmail', response.data.data[0].email);
              AsyncStorage.setItem('@hiringId', response.data.data[0].id);
              AsyncStorage.setItem('@hiringWho', response.data.data[0].who);
              AsyncStorage.setItem('@hiringToken', response.data.data[0].token);
              this.props.navigation.navigate('App');
            }
          })
          .catch(() => {
            Alert.alert('Alert', 'email or password not match');
          });
      });
  };

  toRegister = _ => {
    this.props.navigation.navigate('Register');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            autoCapitalize="none"
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({email})}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({password})}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.handleLogin()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.toRegister()}>
          <Text>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#009688',
  },
  loginText: {
    color: 'white',
  },
  label: {
    marginBottom: 10,
  },
});
