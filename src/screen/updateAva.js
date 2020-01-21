import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {SERVER_URL} from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';

import {connect} from 'react-redux';
import {fetchProfile, updateAvatar} from '../public/redux/actions/Profile';

class UpdateAva extends React.Component {
  static navigationOptions = {
    title: 'Update Avatar',
  };

  state = {
    avatarSource: null,
    avatarFile: null,
  };

  constructor(props) {
    super(props);

    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          avatarFile: response,
        });
      }
    });
  }

  handleEditAvatar = async () => {
    if (!this.state.avatarSource) {
      return Alert.alert('Alert', 'File is required');
    }
    const formDataEngineer = new FormData();
    const formDataCompany = new FormData();
    formDataEngineer.append('showcase', {
      name: this.state.avatarFile.fileName,
      type: this.state.avatarFile.type,
      uri: this.state.avatarFile.uri,
    });
    formDataCompany.append('logo', {
      name: this.state.avatarFile.fileName,
      type: this.state.avatarFile.type,
      uri: this.state.avatarFile.uri,
    });

    try {
      let url = `http://3.92.63.204:3030/api/v1/${await AsyncStorage.getItem(
        '@hiringWho',
      )}/avatar/${await AsyncStorage.getItem('@hiringId')}`;
      console.warn(url);
      (await AsyncStorage.getItem('@hiringWho')) === 'engineer'
        ? this.props.updateAvatar(url, formDataEngineer)
        : this.props.updateAvatar(url, formDataCompany);
    } catch (e) {
      // error reading value
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.propsData.updated) {
      this.getData();
      this.props.navigation.navigate('Me');
      Alert.alert('Alert', 'Profil has been updated');
    }
    if (nextProps.propsData.isError) {
      Alert.alert('Alert', 'Error');
    }
  }

  getData = async () => {
    try {
      let url = `http://3.92.63.204:3030/api/v1/${await AsyncStorage.getItem(
        '@hiringWho',
      )}/${await AsyncStorage.getItem('@hiringId')}`;
      this.props.fetchProfile(url);
    } catch (e) {
      // error reading value
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View
            style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
            {!this.state.avatarSource ? (
              <Text>Select a Photo</Text>
            ) : (
              <Image style={styles.avatar} source={this.state.avatarSource} />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleEditAvatar}>
          {this.state.avatarSource && <Text>Save</Text>}
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  propsData: state.profile,
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: url => dispatch(fetchProfile(url)),
  updateAvatar: (url, formData) => dispatch(updateAvatar(url, formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateAva);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
});
