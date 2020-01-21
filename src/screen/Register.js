import React, {Component} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  Picker,
} from 'react-native';
import {SERVER_URL} from 'react-native-dotenv';

class Register extends Component {
  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      role: 'engineer',
    };

    this.state = {chosenDate: new Date()};
  }

  handleRegister = _ => {
    if (!this.state.email || !this.state.password) {
      return Alert.alert('Alert', 'all the field is required');
    }

    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    const formData = new FormData();
    formData.append('createEmail', this.state.email);
    formData.append('createPassword', this.state.password);
    formData.append('name', this.state.name);
    formData.append('description', '-');
    formData.append('skill', '-');
    formData.append('location', '-');
    formData.append('dateOfBirth', '2000-01-01');
    formData.append('age', null);
    formData.append('expectedSallary', '7000000');

    let rolePlay = this.state.role === 'company' ? 'company' : 'engineer';
    let url = `${SERVER_URL}/api/v1/${rolePlay}`;
    axios
      .post(url, formData, config)
      .then(response => {
        Alert.alert('Alert', `Register as ${rolePlay} Success`);
        this.props.navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Alert', 'error:' + error);
      });
  };

  toLogin = _ => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            autoCapitalize="none"
            placeholder="Name"
            underlineColorAndroid="transparent"
            onChangeText={name => this.setState({name})}
          />
        </View>

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

        <Text style={styles.label}>Role</Text>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={this.state.role}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({role: itemValue})
            }>
            <Picker.Item label="Engineer" value="engineer" />
            <Picker.Item label="Company" value="company" />
          </Picker>
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.regisButton]}
          onPress={() => this.handleRegister()}>
          <Text style={styles.regisText}>Register</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.toLogin()}>
          <Text>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Register;

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
  regisButton: {
    backgroundColor: '#009688',
  },
  regisText: {
    color: 'white',
  },
  label: {
    marginBottom: 10,
  },
  picker: {height: 50, width: 240, marginLeft: 10},
});
