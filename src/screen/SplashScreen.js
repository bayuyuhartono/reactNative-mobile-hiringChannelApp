import React from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _cekAuth = async () => {
    const cekToken = await AsyncStorage.getItem('@hiringToken');
    this.props.navigation.navigate(cekToken ? 'App' : 'Auth');
  };

  componentDidMount() {
    setTimeout(() => {
      this._cekAuth();
    }, 2000);
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Text style={styles.textStyles}>Hiring Channel App</Text>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#009688',
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
};

export default SplashScreen;
